import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";
import cn from "utils/cn";

const NftCard = (props: {
  image: string;
  title: string;
  author: string;
  bidders: string[];
  download?: string;
  price: string | number;
  className?: string;
}) => {
  const { title, author, price, image, bidders, className: extra } = props;
  const [heart, setHeart] = useState(true);
  return (
    <Card
      className={cn(
        "3xl:p-![18px] flex h-full w-full flex-col bg-white !p-4",
        extra,
      )}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={image}
            className="mb-3 h-full w-full rounded-md 3xl:h-full 3xl:w-full"
            alt=""
          />
          <button
            onClick={() => setHeart(!heart)}
            className="absolute end-3 top-3 flex items-center justify-center rounded-md bg-white p-2 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-md text-xl hover:bg-gray-50 dark:text-navy-900">
              {heart ? (
                <IoHeartOutline />
              ) : (
                <IoHeart className="text-brand-500" />
              )}
            </div>
          </button>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {" "}
              {title}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              By {author}{" "}
            </p>
          </div>

          <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
            <span className="z-0 ms-px inline-flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
              +5
            </span>
            {bidders.map((avt, key) => (
              <span
                key={key}
                className="z-10 -me-3 h-8 w-8 rounded-full border border-white dark:!border-navy-800"
              >
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={avt}
                  alt=""
                />
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
              Current Bid: {price} <span>ETH</span>
            </p>
          </div>
          <button className="linear rounded-md bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90">
            Place Bid
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
