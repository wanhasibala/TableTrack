import { useState } from 'react';
import { orderService } from '@/services/orderService';
import { MenuItem } from '@/components/Menu/ItemLoader';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

interface UseOrderProps {
  orderId?: string;
  tableId?: string;
  clientName?: string;
}

export const useOrder = ({ orderId, tableId, clientName }: UseOrderProps) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOrder = async (selectedItems: MenuItem[]) => {
    if (selectedItems.length === 0) return;
    
    setIsProcessing(true);
    try {
      if (orderId) {
        await orderService.updateExistingOrder(orderId, selectedItems);
        toast.success("Order updated successfully!", { position: "top-center" });
        navigate(`/cart/${orderId}`);
      } else if (tableId) {
        const order = await orderService.createTableOrder(tableId, selectedItems);
        toast.success("Order has been created", { position: "top-center" });
        navigate(`/cart/${order.id}`);
      } else if (clientName) {
        const order = await orderService.createClientOrder(clientName, selectedItems);
        toast.success("Order has been submitted", { position: "top-center" });
        navigate(`/cart/${order.id}`);
      } else {
        toast("No action available.", { position: "top-center" });
      }
    } catch (err) {
      console.error("Error processing order:", err);
      toast.error(err instanceof Error ? err.message : "Failed to process order.", {
        position: "top-center"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleOrder,
    isProcessing
  };
};