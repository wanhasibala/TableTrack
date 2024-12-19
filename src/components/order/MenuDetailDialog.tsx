import React from "react";
import { Dialog, DialogContent, DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";

interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface MenuDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
}

export const MenuDetailDialog: React.FC<MenuDetailDialogProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  const { name, price, description } = item;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="fixed bottom-0  left-0 w-[100vw]  bg-white rounded-t-lg p-4"
        style={{ transform: "none" }}
      >
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold">Price: ${price.toFixed(2)}</p>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => onClose}>
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
