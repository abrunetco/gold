import {
  type EntityName,
  balancePath,
  categoryPath,
  invoicePath,
  goldPricePath,
  productPath,
  userPath,
  configPath,
  settingPath,
} from "@gold/api";
import { IconName } from "components/icons/type";

interface EntityMarkup {
  single: string;
  polar: string;
  icon: IconName;
}

export const MARKUP_MAP: Record<EntityName, EntityMarkup> = {
  [configPath]: {
    single: "تنظیمات",
    polar: "تنظیمات",
    icon: "Profile",
  },
  [settingPath]: {
    single: "تنظیمات",
    polar: "تنظیمات",
    icon: "Profile",
  },
  [balancePath]: {
    single: "تراکنش",
    polar: "تراکنش‌ها",
    icon: "Profile",
  },
  [categoryPath]: {
    single: "دسته‌بندی",
    polar: "دسته‌بندی‌ها",
    icon: "Profile",
  },
  [invoicePath]: {
    single: "فاکتور",
    polar: "فاکتورها",
    icon: "Profile",
  },
  [goldPricePath]: {
    single: "قیمت طلا",
    polar: "تاریخچه قیمت طلا",
    icon: "Profile",
  },
  [productPath]: {
    single: "محصول",
    polar: "محصولات",
    icon: "Profile",
  },
  [userPath]: {
    single: "کاربر",
    polar: "کاربران",
    icon: "Profile",
  },
};
