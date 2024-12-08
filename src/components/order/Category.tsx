import React from "react";

const category = [
  "Promo",
  "Coffe",
  "Non Coffe",
  "Food",
  "Snacks",
  "Sparkling",
  "Merch",
  "All Items",
];

export const Category = () => {
  return (
    <div>
      <p className="large mb-2.5"> Category</p>
      <div className=" grid grid-cols-4 gap-2.5">
        {category.map((item) => {
          return (
            <div className="flex rounded-lg text-sm font-medium items-center justify-center bg-neutral-200 h-10">
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
