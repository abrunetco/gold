/* eslint-disable */
import { Link, useLocation } from "react-router-dom";
import { ComponentType } from "react";
import { BsDash } from "react-icons/bs";
// chakra imports

export interface LinkType {
  name: string;
  Icon: ComponentType;
  path: string;
}

export const SidebarLinks = (props: { links: LinkType[] }): JSX.Element => {
  // Chakra color mode
  let location = useLocation();

  const { links } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return routeName === location.pathname
  };

  return (
    <>
      {links.map((link, index) => {
        const Icon = link.Icon ?? BsDash
      return (
        <Link key={index} to={link.path}>
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li
              className="my-[3px] flex cursor-pointer items-center px-8"
              key={index}
            >
              <span
                className={`${
                  activeRoute(link.path) === true
                    ? "font-bold text-brand-500 dark:text-white"
                    : "font-medium text-gray-600 dark:text-gray-300"
                }`}
              >
                <Icon />
              </span>
              <p
                className={`leading-1 ms-4 flex ${
                  activeRoute(link.path) === true
                    ? "font-bold text-navy-700 dark:text-white"
                    : "font-medium text-gray-600 dark:text-gray-300"
                }`}
              >
                {link.name}
              </p>
            </li>
            {activeRoute(link.path) ? (
              <div className="absolute end-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
            ) : null}
          </div>
        </Link>
      );
    })}
    </>
  )
};

export default SidebarLinks;
