import { Tooltip } from "@chakra-ui/tooltip";
const TooltipHorizon = (props: {
  extra: string;
  trigger: JSX.Element;
  content: JSX.Element;
  placement: "left" | "right" | "top" | "bottom";
}) => {
  const { extra, trigger, content, placement } = props;
  return (
    <Tooltip
      placement={placement}
      label={content}
      className={`w-max rounded-xl bg-white px-4 py-3 text-sm shadow-xl shadow-shadow dark:!bg-navy-700 dark:shadow-none ${extra}`}
    >
      {trigger}
    </Tooltip>
  );
};

export default TooltipHorizon;
