'use client'

import useSWR from 'swr';
import Product from "@/app/models/interfaces";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductsPage() {
  const { data, error,isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products/', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>No data available</div>;
  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Products</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.map((product) => (
          <li key={product.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}