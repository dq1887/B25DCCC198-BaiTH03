import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAppSelector } from "../app/hooks";
import { selectTotalQuantity } from "../features/cart/cartSlice";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const totalQuantity = useAppSelector(selectTotalQuantity);

  return (
    <header className="header-container">
      <Link to="/" className="header-brand">
        MiniShop
      </Link>

      <nav className="header-nav">
        <Link to="/">Trang chủ</Link>
        <Link to="/cart">Giỏ hàng ({totalQuantity})</Link>

        <button className="btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Tối" : "☀️ Sáng"}
        </button>

        {user ? (
          <div className="user-info">
            <span>
              Xin chào, <strong>{user.username}</strong>
            </span>
            <button className="btn" onClick={logout}>
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </nav>
    </header>
  );
};
