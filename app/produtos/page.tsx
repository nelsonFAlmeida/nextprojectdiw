"use client";

import useSWR from "swr";
import Product from "@/app/models/interfaces";
import Card from "@/app/components/Card/Card";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductsPage() {
  const { data, error, isLoading } = useSWR<Product[], Error>(
    "https://deisishop.pythonanywhere.com/products/",
    fetcher
  );
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(newFilteredData);
    }
  }, [search, data]);

  const addItemToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeItemFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const buy = () => {
    fetch("/api/deisishop", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map((product) => product.id),
        name: "",
        student: false,
        coupon: "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        setCart([]);
      })
      .catch((e) => {
        console.log("Erro ao comprar", e);
      });
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>No data available</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>DEISI Shop</h1>

      {/* Filtro */}
      <h3>Filtros</h3>
      <input
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Produtos */}
      <h2>Produtos</h2>
      <div style={{ listStyle: "none", padding: 0 }}>
        {filteredData.map((product) => (
          <Card
            key={product.id}
            product={product}
            onButtonClick={addItemToCart}
            buttonLabel="+ Adicionar ao carrinho"
          />
        ))}
      </div>

      {/* Carrinho */}
      <h2>Carrinho</h2>
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <Card
              key={product.id}
              product={product}
              onButtonClick={() => removeItemFromCart(product.id)}
              buttonLabel="Remover do carrinho"
            />
          ))}
          <button onClick={buy} style={{ marginTop: "10px" }}>
            Comprar
          </button>
        </div>
      )}
    </div>
  );
}
