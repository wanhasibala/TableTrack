import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Order } from "./page/Order.tsx";
import Cart from "./page/Cart.tsx";
import Checkout from "./page/Checkout.tsx";
import { FormOrder } from "./page/FormOrder.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import Payment from "./page/Payment.tsx";
import PaymentStatus from "./page/PaymentStatus.tsx";
import { TrackOrder } from "./page/TrackOrder.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="menu/:tableId" element={<Order />} />
        <Route path="menu/order/:orderId" element={<Order />} />
        <Route path="menu" element={<Order />} />
        {/* <Route path="order/:tableId/details" element={<OrderDetails />} /> */}
        <Route path="/cart/:orderId" element={<Cart />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/form-order/:orderId" element={<FormOrder />} />
        <Route path="/checkout/:orderId" element={<Checkout />} />
        <Route path="/payment/:orderId" element={<Payment />} />
        <Route path="/payment-status/:orderId" element={<PaymentStatus />} />
        <Route path="/track-order/:orderId" element={<TrackOrder />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
);
