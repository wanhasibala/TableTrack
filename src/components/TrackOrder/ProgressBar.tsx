import { Progress } from "@/components/ui/progress";
import { ClipboardList, icons } from "lucide-react";
import React from "react";

const icon = [
  { name: "ClipboardList" },
  { name: "ChefHat" },
  { name: "CircleCheckBig" },
];
export const ProgressBar = () => {
  return (
    <div className="relative flex justify-between">
      {icon.map((item) => {
        //@ts-ignore
        const IconComponent = icons[item.name];
        return (
          <div className="h-10 w-10 bg-tertiary flex rounded-full justify-center items-center z-10">
            <IconComponent />
          </div>
        );
      })}

      <Progress value={50} className="h-[10px] absolute top-[40%] z-0" />
    </div>
  );
};
