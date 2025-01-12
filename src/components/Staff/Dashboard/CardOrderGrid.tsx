import React from "react";

const status = [
  { name: "Active", count: 2 },
  { name: "Not Paid", count: 4 },
  { name: "In Progress", count: 5 },
  { name: "Closed", count: 5 },
];
export const CardOrderGrid = () => {
  return (
    <div className="mt-5 grid grid-cols-2 gap-5">
      {status.map((item) => (
        <div className="border text-sm p-2 flex flex-col gap-2 rounded-lg">
          <div className="w-full ">{item.name}</div>
          <h3>{item.count}</h3>
        </div>
      ))}
    </div>
  );
};
