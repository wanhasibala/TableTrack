import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { icons } from "lucide-react";

const icon = [
  { name: "ClipboardList", status: "Not Paid" },
  { name: "ChefHat", status: "In Progress" },
  { name: "CircleCheckBig", status: "Order Served" },
];
export const ProgressBar = ({ status }: { status: string }) => {
  const statusIndex = icon.findIndex((item) => item.status === status);
  const getProgressValue = () => {
    if (status === "Not Paid") return 0;
    if (status === "In Progress") return 50;
    if (status === "Order Served") return 100;
    return 0;
  };
  return (
    <div className="relative flex justify-between">
      {icon.map((item, index) => {
        //@ts-ignore
        const IconComponent = icons[item.name];
        return (
          <div
            className={cn(
              "h-10 w-10 bg-primary flex rounded-full justify-center items-center z-10",
              index <= statusIndex ? "bg-tertiary" : "bg-primary",
            )}
          >
            <IconComponent />
          </div>
        );
      })}

      <Progress
        value={getProgressValue()}
        className="h-[10px] absolute top-[40%] left-12 w-[72%] z-0"
      />
    </div>
  );
};
