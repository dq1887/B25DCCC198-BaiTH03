import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectCartItems,
  selectTotalPrice,
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";

export const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  if (items.length === 0) {
    return (
      <div>
        <h2>Giỏ hàng của bạn đang trống</h2>
        <Link to="/">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Giỏ hàng</h2>
      <div className="mt-3">
        {items.map((item) => (
          <div key={item.id} className="cart-item-row">
            <img src={item.image} alt={item.title} className="cart-item-img" />
            <div className="cart-item-info">
              <h4 style={{ margin: 0 }}>{item.title}</h4>
              <p style={{ margin: 0 }}>${item.price}</p>
            </div>
            <div className="cart-actions">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Math.max(1, parseInt(e.target.value) || 1),
                    }),
                  )
                }
                className="cart-quantity-input"
              />
              <button
                className="btn-danger"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Tổng tiền: ${totalPrice.toFixed(2)}</h3>
        <button
          onClick={() => navigate("/checkout")}
          className="btn btn-success mt-3"
        >
          Tiến hành Thanh toán
        </button>
      </div>
    </div>
  );
};
