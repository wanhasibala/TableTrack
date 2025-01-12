import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Menu from "./page/Menu.tsx";
import Cart from "./page/Cart.tsx";
import Checkout from "./page/Checkout.tsx";
import { FormOrder } from "./page/FormOrder.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import Payment from "./page/Payment.tsx";
import PaymentStatus from "./page/PaymentStatus.tsx";
import { TrackOrder } from "./page/TrackOrder.tsx";
import { Category } from "./page/Category.tsx";
import ProtectedRoute from "./context/ProtectedAuth.tsx";
import { Dashboard } from "./page/protected/Dashboard.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Login } from "./page/Auth/Login.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:client_name" element={<Menu />} />
          <Route path="menu/:tableId" element={<Menu />} />
          <Route path="menu/order/:orderId" element={<Menu />} />
          {/* <Route path="/menu" element={<Menu />} /> */}
          <Route path="/category/:categoryId" element={<Category />} />

          {/* <Route path="order/:tableId/details" element={<OrderDetails />} /> */}
          <Route path="/cart/:orderId" element={<Cart />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/form-order/:orderId" element={<FormOrder />} />
          <Route path="/checkout/:orderId" element={<Checkout />} />
          <Route path="/payment/:orderId" element={<Payment />} />
          <Route path="/payment-status/:orderId" element={<PaymentStatus />} />
          <Route path="/track-order/:orderId" element={<TrackOrder />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
