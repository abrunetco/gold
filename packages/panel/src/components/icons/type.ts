import * as ICONS from "./list";
export type IconName = keyof typeof ICONS;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  bg?: string;
  className?: string;
}

export type StrictIconProps = Required<IconProps>;
