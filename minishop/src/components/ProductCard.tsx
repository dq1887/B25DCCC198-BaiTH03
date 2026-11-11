import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-link">
        <img
          src={product.image}
          alt={product.title}
          className="product-card-img"
        />
        <h4 className="product-card-title">{product.title}</h4>
        <p className="product-price">${product.price}</p>
      </Link>
      <button onClick={() => dispatch(addToCart(product))} className="btn mt-3">
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};
