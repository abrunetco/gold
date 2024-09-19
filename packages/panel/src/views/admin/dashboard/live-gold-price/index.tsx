import { MdArrowDropUp } from "react-icons/md";
import Card from "components/card";
import useGoldPriceQuery, { CandleTypes } from "./useQuery";
import { GoldPrice } from "@gold/api";
import { useEffect, useMemo, useState } from "react";
import { useTickTock } from "hooks/clock";
import LineChart from "components/charts/LineChart";
import { ApexOptions } from "apexcharts";
import { CandleTypesMenu } from "./ChartMenu";

const PercentFormatter = new Intl.NumberFormat("fa-IR", {
  style: "percent",
  signDisplay: "always",
});

const DateTimeFormatter = Intl.DateTimeFormat("fa-IR", {
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const DateFormatter = Intl.DateTimeFormat("fa-IR", {
  month: "long",
  day: "numeric",
});

const TimeFormatter = Intl.DateTimeFormat("fa-IR", {
  hour: "2-digit",
  minute: "2-digit",
});

const PriceFormatter = Intl.NumberFormat("fa-IR", {
  currency: "IRR",
  style: "currency",
  maximumFractionDigits: 0,
  roundingIncrement: 5000,
});

export default function GoldPriceCandles() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [candle, setCandle] = useState<CandleTypes>("mm");
  const query = useGoldPriceQuery(candle);
  useTickTock(query.refetch);
  const flatData = useMemo<Array<GoldPrice | undefined>>(
    () => (query.data?.pages ?? []).flatMap((page) => page.data),
    [query.data],
  );
  const [lineChartData, categories] = useMemo(() => {
    const data = flatData.map((rec) => rec.v);
    const categories = flatData.map((rec) => rec.createdAt);
    return [
      [
        {
          name: "قیمت طلا",
          data,
          color: "#4318FF",
        },
      ],
      categories,
    ];
  }, [flatData]);

  const lastPoint = useMemo(() => {
    const point = {
      value: 0,
      change: 0,
      stringified: "",
      className: "",
      date: new Date(),
    };
    const [p0, p1] = flatData;
    if (p0 && p1) {
      point.date = new Date(p0.createdAt);
      point.value = p0.v;
      point.stringified = p0.stringified;
      point.change = p1.v !== 0 ? (p0.v - p1.v) / p1.v : 0;
    }
    point.className = point.change < 0 ? "text-red-500" : "text-green-500";
    return point;
  }, [flatData]);

  useEffect(() => setRefreshKey((k) => k + 1), [lastPoint]);

  return (
    <Card className="!p-[20px] texcenter h-[400px]">
      <div className="relative flex">
        <CandleTypesMenu value={candle} onChange={setCandle} />
      </div>

      <div className="h-full w-full">
        <div className="absolute end-5 top-0 flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            {lastPoint.stringified}
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">
              {DateTimeFormatter.format(lastPoint.date)}
            </p>
            <div className="flex flex-row items-center justify-center">
              <MdArrowDropUp className={`font-medium ${lastPoint.className}`} />
              <p className={`text-sm font-bold ${lastPoint.className}`}>
                {PercentFormatter.format(lastPoint.change)}
              </p>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          {query.isLoading ? null : (
            <LineChart
              key={refreshKey}
              chartOptions={lineChartOptions(categories, candle)}
              chartData={lineChartData}
            />
          )}
        </div>
      </div>
    </Card>
  );
}

const lineChartOptions = (
  categories: number[],
  candle: CandleTypes,
): ApexOptions => {
  const Formatter = ["hh", "mm"].includes(candle)
    ? TimeFormatter
    : DateFormatter;

  return {
    chart: {
      type: "line",

      toolbar: {
        show: false,
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: "Vazirmatn Variable",
      },
      x: {
        format: "dd/MM/yy HH:mm",
        formatter: (i: number) => {
          const value = categories[i];
          return value ? DateTimeFormatter.format(new Date(value)) : "";
        },
      },
      y: {
        formatter: PriceFormatter.format.bind(null),
        title: {
          formatter: () => "  ",
        },
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
          fontFamily: "Vazirmatn Variable",
          cssClass: "text-end",
        },
        rotate: 0,
        hideOverlappingLabels: true,
        showDuplicates: false,
        formatter: (value: string) => {
          return value ? Formatter.format(new Date(value)) : "";
        },

        datetimeFormatter: ["hh", "mm"].includes(candle)
          ? {
              hour: "2-digit",
              minute: "2-digit",
            }
          : {
              month: "long",
              day: "numeric",
            },
      },
      type: "datetime",
      categories,
    },

    yaxis: {
      show: false,
    },
  };
};
