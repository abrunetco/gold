import { StrictIconProps } from "../type";

export default function (props: StrictIconProps) {
  return (
    <svg
      data-name={props.name}
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill={props.bg}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill={props.color}
      />
    </svg>
  );
};