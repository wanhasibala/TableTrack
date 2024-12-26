import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Database } from "@/types/supabase";
import { rupiahFormat } from "@/lib/formatting";
import { Minus, Plus } from "lucide-react";

type Menu = Database["public"]["Tables"]["menu_item"]["Row"] & {
  quantity?: number;
};

interface MenuDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: Menu;

  onItemCountChange: (id: string, newQuantity: number) => void; // Callback to update quantity
}

export const MenuDetailDialog: React.FC<MenuDetailDialogProps> = ({
  isOpen,
  onClose,
  item,
  onItemCountChange,
}) => {
  const { id, name, price, description, menu_image, quantity } = item;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="fixed bottom-0 left-0 w-full bg-white rounded-t-lg p-4"
        style={{ transform: "none" }}
      >
        <div className="mt-4 flex flex-col gap-4">
          <img
            src={menu_image || "/placeholder-image.jpg"}
            className="h-[200px] object-cover w-full rounded-lg"
            // alt={name}
          />
          <div className="flex flex-col gap-2 relative">
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            <h3 className="text-lg font-bold text-gray-800">
              {rupiahFormat(price || 0)}
            </h3>
          </div>
          {quantity !== 0 && (
            <div className="absolute top-[72%] -translate-y-[50%] right-5 flex justify-center gap-2 bg-secondary text-white px-2 py-1 rounded-full">
              <Button
                className="p-1 bg-white text-black rounded-full h-[24px]"
                onClick={() => onItemCountChange(id, Math.max(0, quantity - 1))} // Decrease quantity, ensuring it doesn't go below 0
              >
                <Minus size={10} />
              </Button>
              <p>{quantity}</p>
              <Button
                className="p-1 bg-white text-black rounded-full h-[24px]"
                onClick={() => onItemCountChange(id, quantity + 1)} // Increase quantity
              >
                <Plus size={10} />
              </Button>
            </div>
          )}
          {quantity === 0 ? (
            <Button
              variant="default"
              className="mt-4"
              onClick={() => {
                onItemCountChange(id, 1);

                // onClose(); // Close the dialog
              }}
            >
              Add Item
            </Button>
          ) : (
            <Button
              variant="default"
              className="mt-4"
              onClick={() => {
                onClose(); // Close the dialog
              }}
            >
              Save
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
