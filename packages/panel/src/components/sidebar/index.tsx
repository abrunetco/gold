import { HiX } from "react-icons/hi";
import Links, { LinkType } from "./components/Links";
import cn from "utils/cn";
import { useState } from "react";
import { sidebarExtraLinks } from "./sidebar";
// import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";

const Sidebar = (props: {
  open: boolean;
  links: LinkType[];
  className?: string;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const { open, onClose, links, className } = props;
  const [showUiLinks, setShowUILinks] = useState(false);
  const sideLinks = showUiLinks ? [...links, ...sidebarExtraLinks] : links;
  return (
    <aside
      className={cn(
        "sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col border-e border-gray-200 bg-white/80 pb-10 shadow-2xl shadow-white/5 backdrop-blur-xl transition-all dark:border-[#ffffff33] dark:bg-navy-900/80 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 xl:min-w-[300px]",
        open ? "translate-x-0" : "translate-x-96",
        className,
      )}
    >
      <span
        className="absolute end-4 top-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div
        className={`mx-[56px] mt-[50px] flex items-center`}
        onDoubleClick={() => setShowUILinks((l) => !l)}
      >
        <div className="ms-1 mt-1 h-2.5 text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          سیستم صرافی افق
        </div>
      </div>
      <div className="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1 dark:text-white">
        <Links links={sideLinks} />
      </ul>

      {/* Nav item end */}
    </aside>
  );
};

export default Sidebar;
