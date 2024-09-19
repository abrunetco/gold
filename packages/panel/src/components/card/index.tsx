import cn from "utils/cn";

function Card(props: {
  variant?: string;
  className?: string;
  children?: JSX.Element | any[];
  [x: string]: any;
}) {
  const { className, children, ...rest } = props;
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
