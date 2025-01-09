import { Button } from "../ui/button";
import { Card } from "./CardList";
import { Footer } from "../Footer";
import { useParams } from "react-router";
import { Database } from "@/types/supabase";
import { useItemsLoader } from "./ItemLoader";
import { useHandleOrder } from "./useHandlerOrder";

type MenuItem = Database["public"]["Tables"]["menu_item"]["Row"];
type OrderItem = {
  id: string;
  quantity: number;
  menu_item: MenuItem;
};

export const Items = () => {
  const params = useParams();
  const { items, loading, error, setItems } = useItemsLoader(params);
  // Determine the active condition
  const isOrderPage = Boolean(params.orderId);
  const isTablePage = Boolean(params.tableId);
  console.log(items);
  const { handleOrderClick } = useHandleOrder(params, items);

  const handleItemCountChange = (id: string, newQuantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <>
      <div>
        <div className="flex justify-between">
          <p className="large">
            {isOrderPage ? "Edit Order" : isTablePage ? "Menu" : "Menu"}
          </p>
          {!isOrderPage && (
            <Button className="text-xs hover:border-none" variant={"link"}>
              View all
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <Card
              quantity={item.quantity}
              item={item}
              key={item.id}
              onItemCountChange={handleItemCountChange}
            />
          ))}
        </div>
      </div>
      {totalItems > 0 && (
        <Footer
          totalItems={totalItems}
          totalPrice={totalPrice}
          onClick={handleOrderClick}
          text={isOrderPage ? "Update Order" : "Order Now"}
        />
      )}
    </>
  );
};
