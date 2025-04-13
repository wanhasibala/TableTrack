import { ChevronRight, CreditCard, Wallet } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";

export const Method = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { paymentMethods, selectedMethod, setSelectedMethod, loading } = usePaymentMethods();

  const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethod(methodId);
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded" />
          <div className="w-full flex justify-between items-center border-b border-b-slate-200 py-2.5">
            <div>
              <div className="h-5 bg-gray-200 w-24 mb-1 rounded" />
              <div className="h-4 bg-gray-200 w-16 rounded" />
            </div>
            <div className="w-4 h-4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {selectedPaymentMethod?.icon_url ? (
            <img 
              src={selectedPaymentMethod.icon_url} 
              alt={selectedPaymentMethod.name || ''} 
              className="w-8 h-8 object-contain"
            />
          ) : (
            <Wallet size={32} />
          )}
          <div className="w-full flex justify-between items-center border-b border-b-slate-200 py-2.5">
            <div>
              <p className="large">Payment Method</p>
              <p className="">{selectedPaymentMethod?.name || 'Select method'}</p>
              {selectedPaymentMethod?.fee_percentage && (
                <p className="text-xs text-gray-500">
                  Fee: {selectedPaymentMethod.fee_percentage}%
                </p>
              )}
            </div>
            <ChevronRight />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Payment Method</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                  selectedMethod === method.id
                    ? "bg-primary text-white"
                    : "bg-neutral-100 hover:bg-neutral-200"
                }`}
                onClick={() => handleSelectMethod(method.id)}
              >
                {method.icon_url ? (
                  <img 
                    src={method.icon_url} 
                    alt={method.name || ''} 
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <Wallet size={24} />
                )}
                <div className="flex flex-col items-start">
                  <span className="text-lg">{method.name}</span>
                  {method.fee_percentage && (
                    <span className={`text-xs ${
                      selectedMethod === method.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      Fee: {method.fee_percentage}%
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
