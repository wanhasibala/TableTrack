import { MenuHeader } from "@/components/Menu/Header";
import { Search } from "@/components/Menu/Search";
import { Category } from "@/components/Menu/Category";
import { Items } from "@/components/Menu/Item";
import { Banner } from "@/components/Menu/Banner";

const Menu = () => {
  return (
    <div className="flex flex-col gap-5">
      <MenuHeader />
      <Banner />
      <Search />
      <Category />
      <Items />
    </div>
  );
};
export default Menu;