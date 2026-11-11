import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectCartItems,
  selectTotalPrice,
  clearCart,
} from "../features/cart/cartSlice";

export const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const [isDone, setIsDone] = useState(false);

  const handleOrder = () => {
    dispatch(clearCart());
    setIsDone(true);
  };

  if (isDone) {
    return (
      <div className="text-center mt-3">
        <h2 className="success-text">Đặt hàng thành công!</h2>
        <p>Cảm ơn bạn đã ủng hộ cửa hàng ShopMini.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Thanh toán</h2>
      {items.length === 0 ? (
        <p>Giỏ hàng rỗng.</p>
      ) : (
        <div>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.title} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Tổng đơn hàng: ${totalPrice.toFixed(2)}</h3>
          <button onClick={handleOrder} className="btn btn-success mt-3">
            Đặt hàng
          </button>
        </div>
      )}
    </div>
  );
};
