import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Category } from "./page/Category.tsx";
import { Order } from "./page/Order.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
