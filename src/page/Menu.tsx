import { MenuHeader } from "@/components/Menu/Header";
import { Search } from "@/components/Menu/Search";
import { Category } from "@/components/Menu/Category";
import { Items } from "@/components/Menu/Item";
import { Banner } from "@/components/Menu/Banner";
import { useParams } from "react-router";
import { MenuProvider } from "@/context/MenuContext";

const Menu = () => {
  const params = useParams();

  return (
    <MenuProvider>
      <div className="flex flex-col gap-5">
        <MenuHeader />
        {!params.orderId && <Banner />}
        <Search />
        <Category />
        <Items />
      </div>
    </MenuProvider>
  );
};

export default Menu;
