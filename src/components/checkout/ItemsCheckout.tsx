import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "./Card";
import { Plus } from "lucide-react";
import { Method } from "./Method";
import { useNavigate, useParams } from "react-router";
import { supabase } from "@/db/supabaseClient";
import { Total } from "./Total";
interface Item {
  id: string;
  name: string;
  price: number;
  count: number;
  description: string;
}
export const ItemsCheckout = () => {
  const [item, setItem] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("order_item")
        .select("*, order(*,table(*)), menu_item(*)")
        .eq("order_id", params.orderId);
      if (error) {
        console.error(error);
      } else {
        const itemsWithCount = (data || []).map((item) => ({
          ...item.menu_item,
          count: item.quantity,
        }));
        setItem(itemsWithCount);
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);
  const totalPrice = item.reduce(
    (total, item) => total + item.price * item.count,
    0
  );
  item.sort((a, b) => {
    const createdA = new Date(a.created_at || 0).getTime();
    const createdB = new Date(b.created_at || 0).getTime();
    return createdA - createdB;
  });
  return (
    <div>
      <div className="w-full flex justify-between items-center border-b border-b-slate-200 py-[10px]">
        <p className="large">Your Items</p>
        <Button
          variant={"link"}
          className="text-primary underline "
          onClick={() => navigate(`/menu/order/${params.orderId}`)}
        >
          See Menu
        </Button>
      </div>
      <div>
        {item.map((i: Item) => (
          <Card name={i.name} price={i.price} amount={i.count} key={i.id} />
        ))}
      </div>
      <div className="py-5 border-b border-b-slate-200">
        <Button
          className="text-sm px-4 py-2 h-fit"
          onClick={() => navigate(`/menu/order/${params.orderId}`)}
        >
          <Plus />
          Add Items
        </Button>
      </div>

      {!loading && <Total price={totalPrice} />}
    </div>
  );
};
