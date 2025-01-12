import { ChefHat, CircleCheck, Clipboard, Icon, Wallet } from "lucide-react";
import React from "react";
const status = [
  { name: "Active", iconName: Clipboard, count: 3, color: "#884405" },
  { name: "Not Paid", iconName: Wallet, count: 4, color: "#C17604" },
  { name: "In Progress", iconName: ChefHat, count: 5, color: "#1F0302" },
  { name: "Closed", iconName: CircleCheck, count: 2, color: "#166534" },
];

export const CardOrderGrid = () => {
  return (
    <div className="mt-5 grid grid-cols-2 gap-5">
      {status.map((item) => {
        return (
          <div className="border text-sm p-2 flex flex-col gap-2 rounded-lg">
            <div className="w-full justify-between flex">
              {item.name}{" "}
              <div
                className="p-1 rounded-full"
                style={{ backgroundColor: item.color }}
              >
                <item.iconName size={12} color="white" />{" "}
              </div>
            </div>

            <h3>{item.count} </h3>
          </div>
        );
      })}
    </div>
  );
};
