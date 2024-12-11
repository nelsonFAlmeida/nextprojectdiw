import React from 'react'
import Product from "@/app/models/interfaces";

export default function Card(props) {
  return (
    <div key={props.product.id}>
            <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <img src={props.product.image} alt={props.product.title} style={{ width: '100px', height: '100px' }} />
            <h2>{props.product.title}</h2>
            <p>{props.product.description}</p>
            <p>Category: {props.product.category}</p>
            <p>Price: ${props.product.price.toFixed(2)}</p>
            <p>
              Rating: {props.product.rating.rate} ({props.product.rating.count} reviews)
            </p>
          </div>
    </div>
  )
}
