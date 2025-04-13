import React, { useState, useEffect } from "react";
import { useMenuContext } from "@/context/MenuContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const PriceFilter = () => {
  const { priceRange, setPriceRange, isFilterOpen, setIsFilterOpen } =
    useMenuContext();
  const [localMin, setLocalMin] = useState(priceRange.min);
  const [localMax, setLocalMax] = useState(priceRange.max);

  useEffect(() => {
    setLocalMin(priceRange.min);
    setLocalMax(priceRange.max);
  }, [priceRange, isFilterOpen]);

  const handleApply = () => {
    setPriceRange({ min: localMin, max: localMax });
    setIsFilterOpen(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleNumberInput = (value: string, type: "min" | "max") => {
    const numValue = value === "" ? 0 : parseInt(value.replace(/\D/g, ""));
    if (type === "min") {
      setLocalMin(numValue);
    } else {
      setLocalMax(numValue);
    }
  };

  return (
    <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <DialogContent className=" bg-white w-[80vw] rounded-md sm:w-[400px]">
        <DialogHeader>
          <DialogTitle>Filter Price Range</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium block">Minimum Price</label>
              <div className="flex gap-4 items-center">
                <Input
                  type="text"
                  value={formatPrice(localMin)}
                  onChange={(e) => handleNumberInput(e.target.value, "min")}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={localMin}
                  onChange={(e) => setLocalMin(Number(e.target.value))}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium block">Maximum Price</label>
              <div className="flex gap-4 items-center">
                <Input
                  type="text"
                  value={formatPrice(localMax)}
                  onChange={(e) => handleNumberInput(e.target.value, "max")}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={localMax}
                  onChange={(e) => setLocalMax(Number(e.target.value))}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setLocalMin(0);
              setLocalMax(1000000);
            }}
          >
            Reset
          </Button>
          <Button onClick={handleApply}>Apply Filter</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
