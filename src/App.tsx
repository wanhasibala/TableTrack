import "./App.css";
import { Header } from "@/components/order/Header";
import { Search } from "./components/order/Search";
import { Category } from "./components/order/Category";
import { Items } from "./components/order/Item";
import { Footer } from "./components/Footer";
import { useState } from "react";

interface Item {
  id: number;
  name: string;
  price: number;
  count: number;
  description: string;
}
function App() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Latte", price: 5.0, count: 0, description: "" },
    { id: 2, name: "Cappuccino", price: 4.5, count: 0, description: "" },
    { id: 3, name: "Espresso", price: 3.0, count: 0, description: "" },
  ]);
  const totalItems = items.reduce((count, item) => count + item.count, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );
  return (
    <>
      <div className="w-[90vw] max-w-sm border-black flex  flex-col gap-5 ">
        <Header />
        <Search />
        <Category />
        <Items items={items} setItems={setItems} />
        {totalItems > 0 && (
          <Footer totalItems={totalItems} totalPrice={totalPrice} />
        )}
      </div>
    </>
  );
}

export default App;
