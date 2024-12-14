import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Category } from "./page/Category.tsx";
import { Order } from "./page/Order.tsx";
import Cart from "./page/Cart.tsx";
import Checkout from "./page/Checkout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/menu" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
