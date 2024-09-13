import {
  type EntityName,
  accountPath,
  balancePath,
  categoryPath,
  invoicePath,
  goldPricePath,
  productPath,
  userPath,
} from "@gold/api";
import { IconName } from "components/icons/type";

interface EntityMarkup {
  single: string;
  polar: string;
  icon: IconName;
}

export const MARKUP_MAP: Record<EntityName, EntityMarkup> = {
  [accountPath]: {
    single: "حساب",
    polar: "حساب‌ها",
    icon: "Profile",
  },
  [balancePath]: {
    single: "بالانس",
    polar: "بالانس‌ها",
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
