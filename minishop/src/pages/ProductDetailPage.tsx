import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Đang tải chi tiết sản phẩm...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  return (
    <div className="product-detail-container">
      <img
        src={product.image}
        alt={product.title}
        className="product-detail-img"
      />
      <div className="product-detail-info">
        <h2>{product.title}</h2>
        <p className="product-category">Danh mục: {product.category}</p>
        <h3 className="product-price">${product.price}</h3>
        <p>{product.description}</p>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="btn mt-3"
        >
          Thêm vào giỏ hàng
        </button>
        <div className="mt-3">
          <Link to="/">← Quay lại Trang chủ</Link>
        </div>
      </div>
    </div>
  );
};
