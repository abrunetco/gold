import { useState, useEffect, useCallback, useMemo } from "react";
import { DateObject } from "react-multi-date-picker";
import { debounce } from "utils/lodash";

interface IMongoRegex {
  $regex: string;
  $options: string;
}

export function useMongoRegex(outerValue?: IMongoRegex, $options = "xs") {
  const [keyword, setKeyword] = useState(outerValue?.$regex ?? "");

  useEffect(() => {
    if (outerValue?.$regex !== keyword) setKeyword(outerValue?.$regex ?? "");
  }, [outerValue]);

  const filter = useMemo(() => {
    if (keyword) {
      const $regex = keyword
        .trim()
        .split(" ")
        .filter((v) => !!v)
        .join("|");
      return { $regex, $options };
    }
    return undefined;
  }, [keyword, $options]);

  return [filter, keyword, setKeyword] as const;
}

interface IMongoDateRange {
  $gte?: number;
  $lte?: number;
}

export function useMongoDateRange(outerValue?: IMongoDateRange) {
  const _gte = outerValue?.$gte ? new DateObject(outerValue?.$gte) : undefined;
  const _lte = outerValue?.$lte ? new DateObject(outerValue?.$lte) : undefined;
  const [range, setRange] = useState<
    DateObject | DateObject[] | DateObject[][]
  >(_gte && _lte ? [_gte, _lte] : undefined);

  const filter = useMemo(() => {
    let $lte: number, $gte: number;
    if (range) {
      const [d1, d2] = Array.isArray(range) ? range : [range];
      if (Array.isArray(d1)) {
        $gte = d1[0]?.toJSON();
        $lte = d1[1]?.toJSON();
      } else {
        $gte = d1?.toJSON();
        if (Array.isArray(d2)) {
          $lte = d2[1]?.toJSON();
        } else {
          $lte = d2?.toJSON();
        }
      }
      return $gte && $lte ? { $gte, $lte } : undefined;
    }
    console.log("[setFilterValue] !range");
    return undefined;
  }, [range]);

  return [filter, range, setRange] as const;
}

export function useDebounced<T>(outerState: T, t = 500) {
  const [state, setState] = useState(outerState);

  const debounceCallback = useCallback(
    debounce((v: T) => {
      setState(v);
    }, t),
    [setState],
  );

  useEffect(() => {
    debounceCallback(outerState);
  }, [debounceCallback, outerState]);

  return state;
}
