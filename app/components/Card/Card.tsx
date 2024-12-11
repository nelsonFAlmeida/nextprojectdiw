import React from "react";
import Product from "@/app/models/interfaces";

interface CardProps {
  product: Product;
  onButtonClick: (product: Product) => void;
  buttonLabel: string; // Permite definir o texto do botão
}

export default function Card({ product, onButtonClick, buttonLabel }: CardProps) {
  return (
    <div key={product.id}>
      <div
        style={{
          marginBottom: "20px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100px", height: "100px" }}
        />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
        <p>
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </p>
        <button onClick={() => onButtonClick(product)}>{buttonLabel}</button>
      </div>
    </div>
  );
}
