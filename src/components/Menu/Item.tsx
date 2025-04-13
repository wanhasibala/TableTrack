import React from "react";
import { Button } from "../ui/button";
import { Footer } from "../Footer";
import { useNavigate, useParams } from "react-router";
import { useItemsLoader } from "./ItemLoader";
import { MenuItemList, MenuItemListSkeleton } from "./MenuItemList";
import { useOrder } from "@/hooks/useOrder";
import { useMenuContext } from "@/context/MenuContext";
import type { MenuItem } from "./ItemLoader";

type RouteParams = Record<string, string | undefined> & {
  orderId?: string;
  tableId?: string;
  client_name?: string;
};

export const Items = () => {
  const params = useParams<RouteParams>();
  const navigate = useNavigate();
  const { selectedCategory, searchTerm, priceRange } = useMenuContext();

  const { items: allItems, loading, error, setItems } = useItemsLoader(params);

  const { handleOrder, isProcessing } = useOrder({
    orderId: params.orderId,
    tableId: params.tableId,
    clientName: params.client_name
  });

  // Determine the active condition
  const isOrderPage = Boolean(params.orderId);
  const isTablePage = Boolean(params.tableId);

  const handleItemCountChange = (id: string, newQuantity: number) => {
    setItems((prevItems: MenuItem[]) =>
      prevItems.map((item: MenuItem) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Filter items based on category, search term, and price range
  const displayedItems = allItems.filter((item: MenuItem) => {
    const matchesCategory = selectedCategory === "all" || item.category?.id === selectedCategory;
    
    const matchesSearch = searchTerm === "" || (
      (item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const matchesPrice = (item.price || 0) >= priceRange.min && 
                        (item.price || 0) <= priceRange.max;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const totalItems = displayedItems.reduce(
    (total: number, item: MenuItem) => total + (item.quantity || 0),
    0
  );
  
  const totalPrice = displayedItems.reduce(
    (total: number, item: MenuItem) =>
      total + (item.price || 0) * (item.quantity || 0),
    0
  );

  if (loading) {
    return <MenuItemListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">
          Failed to load menu items. Please try again.
        </p>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  const selectedItems = displayedItems.filter((item: MenuItem) => item.quantity > 0);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <p className="large">
            {isOrderPage ? "Edit Order" : isTablePage ? "Menu Items" : "Menu"}
          </p>
        </div>

        {displayedItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No items found. Try adjusting your filters or search term.
          </div>
        ) : (
          <MenuItemList 
            items={displayedItems} 
            onItemCountChange={handleItemCountChange} 
          />
        )}
      </div>
      
      {totalItems > 0 && (
        <Footer
          totalItems={totalItems}
          totalPrice={totalPrice}
          onClick={() => handleOrder(selectedItems)}
          text={isOrderPage ? "Update Order" : "Order Now"}
          disabled={isProcessing}
        />
      )}
    </>
  );
};
