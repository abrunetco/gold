import { Updater } from "@tanstack/react-table";
import { useState, useEffect } from "react";

export function useDebounce<T>(i: T, cb: (value: T) => void, t = 500) {
  const [value, setValue] = useState(i);

  useEffect(() => {
    setValue(i);
  }, [i]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      cb(value);
    }, t);

    return () => clearTimeout(timeout);
  }, [value]);

  return [value, setValue] as const;
}

interface IMongoRegex {
  $regex: string;
  $options: string;
}

export function useMongoRegex(
  outerValue?: IMongoRegex,
  cb?: (v?: IMongoRegex) => void,
  $options = "xs",
) {
  const [value, setValue] = useState(outerValue?.$regex ?? "");

  useEffect(() => {
    if (outerValue?.$regex !== value) setValue(outerValue?.$regex ?? "");
  }, [outerValue]);

  useEffect(() => {
    if (!value) return cb();
    const $regex = String(value)
      .trim()
      .split(" ")
      .filter((v) => !!v)
      .join("|");
    return cb({ $regex, $options });
  }, [value, $options]);

  return [value, setValue] as const;
}

interface IMongoRange {
  $lte?: number;
  $gte?: number;
}

export function useMongoRange(
  outerValue?: IMongoRange,
  cb?: (v?: Updater<IMongoRange>) => void,
) {
  const [lte, setLte] = useState(outerValue?.$lte);
  const [gte, setGte] = useState(outerValue?.$gte);

  useEffect(() => {
    if (outerValue?.$lte !== lte) setLte(outerValue?.$lte);
    if (outerValue?.$gte !== gte) setGte(outerValue?.$gte);
  }, [outerValue]);

  useEffect(() => {
    if (!lte && !gte) return cb();

    cb({
      $lte: !isNaN(lte) ? lte : undefined,
      $gte: !isNaN(gte) ? gte : undefined,
    });
  }, [lte, gte]);

  return { lte, setLte, gte, setGte };
}
