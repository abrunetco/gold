import { Media } from "@gold/api";
import { UppyOptions as CoreUppyOptions } from "@uppy/core";
import { Restrictions } from "@uppy/core/lib/Restricter";
import { UppyContext, UppyMeta } from "providers/uppy";
import { useContext, useEffect } from "react";

export type UppyOptions = Partial<
  Omit<CoreUppyOptions<UppyMeta, Media>, "locale" | "meta" | "restrictions"> & {
    meta: Partial<UppyMeta>;
    restrictions: Partial<Restrictions>;
  }
>;

export function useUppy(options?: UppyOptions) {
  const uppy = useContext(UppyContext);
  useEffect(() => {
    if (options) uppy.setOptions(options);
  }, []);
  return uppy;
}
