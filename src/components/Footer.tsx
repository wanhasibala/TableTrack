import { Navigate, useNavigate, useNavigation } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface FooterProps {
  totalItems?: number;
  totalPrice?: number;
  variant?: "full" | "half";
  // link: string;
  text: string;
  onClick: () => void;
}
export const Footer: React.FC<FooterProps> = ({
  totalItems = 0,
  totalPrice = 0,
  variant,
  // link,
  onClick,
  text,
}) => {
  const navigate = useNavigate();
  return (
    <footer className="h-[80px] fixed bottom-0 left-0 w-full flex justify-between items-center shadow-[0_-4px_6px_0px_rgba(0,0,0,0.09)]  border  bg-white py-5 px-8">
      {variant !== "full" && (
        <div className="w-full">
          <p className="subtle-medium">{totalItems} items</p>
          <p className="font-semibold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "idr",
            }).format(totalPrice)}
          </p>
        </div>
      )}
      <Button
        className={cn("bg-primary rounded-full ", {
          "w-full": variant === "full",
        })}
        onClick={onClick}
      >
        <p>{text}</p>
      </Button>
    </footer>
  );
};
