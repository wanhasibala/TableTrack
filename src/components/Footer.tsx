import { Button } from "./ui/button";

interface FooterProps {
  totalItems: number;
  totalPrice: number;
}
export const Footer: React.FC<FooterProps> = ({ totalItems, totalPrice }) => {
  return (
    <footer className="h-[100px] fixed bottom-0 left-0 w-full flex justify-between items-center shadow-[0_-4px_6px_0px_rgba(0,0,0,0.09)]  border  bg-white py-5 px-8">
      <div>
        <p className="subtle-medium">{totalItems} items</p>
        <h4>${totalPrice}</h4>
      </div>
      <Button className="bg-primary rounded-full">
        <p>Order Now</p>
      </Button>
    </footer>
  );
};
