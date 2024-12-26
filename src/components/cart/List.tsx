import { Square, SquareCheck } from "lucide-react";
import { Card } from "../Menu/CardList";
import React, { useEffect, useState } from "react";
import { supabase } from "@/db/supabaseClient";
import { Footer } from "../Footer";
import { useNavigate, useParams } from "react-router";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setRawItems } from "../state/itemSlice";

interface Item {
  id: string;
  name: string;
  price: number;
  count: number;
  description: string;
  src: string;
}

export const List = ({ setLoading }: { setLoading: boolean }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      setLoading = true;
      const { data, error } = await supabase
        .from("order_item")
        .select("*, order(*,table(*)), menu_item(*)")
        .eq("order_id", params.orderId);
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        const itemsWithCount = (data || []).map((item) => ({
          ...item.menu_item,
          count: item.quantity,
        }));
        setItems(itemsWithCount);

        window.localStorage.setItem("reduxState", JSON.stringify(data));
        dispatch(setRawItems(data));
        setLoading = false;
      }
    }
    fetchOrders();
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      const newSet = new Set(prevSelectedIds);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set()); // Deselect all
    } else {
      setSelectedIds(new Set(items.map((item) => item.id))); // Select all
    }
  };

  const deleteSelected = async () => {
    const idsToDelete = Array.from(selectedIds);
    try {
      const { error } = await supabase
        .from("order_item")
        .delete()
        .in("item_id", idsToDelete)
        .eq("order_id", params.orderId); // Adjust column name if needed

      if (error) throw error;

      // Update state after deletion
      setItems((prevItems) =>
        prevItems.filter((item) => !selectedIds.has(item.id)),
      );
      setSelectedIds(new Set());
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  const totalItems = items.reduce((total, item) => total + item.count, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );

  return (
    <>
      <div className="flex items-center justify-between border-b border-b-slate-200 pb-1">
        <div className="flex items-center gap-2">
          {selectedIds.size === items.length ? (
            <SquareCheck
              size={16}
              className="text-slate-500 cursor-pointer"
              onClick={selectAll}
            />
          ) : (
            <Square
              size={16}
              className="text-slate-200 cursor-pointer"
              onClick={selectAll}
            />
          )}
          <p className="large text-slate-600">Selected Menu</p>
        </div>
        {selectedIds.size > 0 && (
          <Button
            variant={"destructive"}
            className="text-sm h-6 rounded-full w-fit"
            onClick={deleteSelected}
          >
            Delete
          </Button>
        )}
      </div>
      {items.map((item) => (
        <div
          className="flex gap-2 w-full items-center cursor-pointer"
          onClick={() => toggleSelect(item.id)}
          key={item.id}
        >
          {selectedIds.has(item.id) ? (
            <SquareCheck size={16} className="text-slate-500" />
          ) : (
            <Square size={16} className="text-slate-200" />
          )}
          <div className="w-full">
            <Card
              item={item}
              MenuDetailDialog={false}
              onItemCountChange={(id, newCount) => {
                setItems((prevItems) =>
                  prevItems.map((prevItem) =>
                    prevItem.id === id
                      ? { ...prevItem, count: newCount }
                      : prevItem,
                  ),
                );
              }}
            />
          </div>
        </div>
      ))}
      {totalItems > 0 && (
        <Footer
          totalItems={totalItems}
          totalPrice={totalPrice}
          variant="half"
          onClick={() => {
            navigate(`/checkout/${params.orderId}`);
          }}
          text="Order Now"
        />
      )}
    </>
  );
};
