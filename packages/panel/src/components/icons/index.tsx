import * as ICONS from "./list";
import { IconProps } from "./type";

export default function Icon(props: IconProps) {
  const Component = ICONS[props.name];
  return (
    <Component
      className={props.className}
      name={props.name}
      size={props.size ?? 18}
      color={props.color ?? "currentColor"}
      bg={props.bg ?? "none"}
    />
  );
}
