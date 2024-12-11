'use client'

import useSWR from 'swr';
import Product from "@/app/models/interfaces";
import Card from "@/app/components/Card/Card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductsPage() {
  const { data, error,isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products/', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>No data available</div>;
  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Products</h1>
      <div style={{ listStyle: 'none', padding: 0 }}>
        {data.map((product) => (
          <Card product = {product}></Card>
        ))}
      </div>
    </div>
  );
}