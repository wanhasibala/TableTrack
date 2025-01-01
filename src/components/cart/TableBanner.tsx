import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router";

export const TabbleBanner = ({
  table,
  customer_name,
}: {
  table?: string | null;
  customer_name?: string;
}) => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-[url('/TableInformation.svg')] w-full p-5 bg-fit bg-black text-white flex justify-between items-center rounded-[10px]">
      <div>
        <p>Table No {table} </p>
        <h4>Mr. {customer_name}</h4>
      </div>
      <Button
        className="bg-primary rounded-full border border-slate-400 h-8 text-sm"
        onClick={() => navigate(`/form-order/${params.orderId}`)}
      >
        Edit
      </Button>
    </div>
  );
};
