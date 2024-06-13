import { Heart, HeartIcon, HomeIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
}
export default Sidebar;

const DesktopSidebar = () => {
  return (
    <div className=" bg-slate-200 p-3 md:p-10 border-r min-h-screen w-24 md:w-64 hidden sm:block">
      <div className="flex flex-col gap-40 sticky top-10 left-0">
        <div className="w-full ">
          <img src="/logo.svg" alt="logo" className="hidden md:block" />
          <img src="/mobile_logo.svg" alt="logo" className="block md:hidden" />
        </div>
        <ul className="flex flex-col items-center md:items-start gap-8">
          <Link to="/" className="flex gap-1">
            <HomeIcon size={"24"} />
            <span className="font-bold hidden md:block ">Home</span>
          </Link>
          <Link to="/favorite" className="flex gap-1">
            <HeartIcon size={"24"} />
            <span className="font-bold hidden md:block">Favourites</span>
          </Link>
        </ul>
      </div>
    </div>
  );
};
const MobileSidebar = () => {
  return (
    <div className=" bg-[#ffffff] flex justify-center gap-10 border-t fixed w-full left-0 bottom-0 z-10 p-2 sm:hidden">
      <Link to="/">
        <HomeIcon size={"24"} className="cursor-pointer" />
      </Link>
      <Link to="/favorite">
        <Heart size={"24"} className="cursor-pointer" />
      </Link>
    </div>
  );
};
