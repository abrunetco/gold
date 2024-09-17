import { HiX } from "react-icons/hi";
import Links from "./components/Links";

// import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes";

const Sidebar = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const { open, onClose } = props;
  return (
    <aside
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col border-e border-gray-200 bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 xl:min-w-[300px] ${
        open ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <span
        className="absolute end-4 top-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="ms-1 mt-1 h-2.5 text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          سیستم صرافی افق
        </div>
      </div>
      <div className="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Nav item end */}
    </aside>
  );
};

export default Sidebar;
