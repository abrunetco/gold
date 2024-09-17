import { Config, ConfigPatch, configPath } from "@gold/api";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import client from "api/client";
import Card from "components/card";
import { PropsWithChildren, useCallback } from "react";
import { MdOutlineSettings } from "react-icons/md";
import SmartForm from "components/form/SmartForm";
import { SubmitBtn } from "components/form/controls";

type Keys = "goldPriceConfig" | "siteSeoConfig";

interface ConfigFormProviderProps {
  name: Keys;
  className?: string;
}

export function ConfigForm(props: PropsWithChildren<ConfigFormProviderProps>) {
  const { data: remoteData } = useQuery<Config>({
    queryKey: [props.name],
    queryFn: async () => client.service(configPath).get(configPath),
    placeholderData: keepPreviousData,
  });

  const mutation = useMutation({
    mutationFn: (formData: ConfigPatch) =>
      client.service(configPath).patch(configPath, formData),
  });
  const { mutate } = mutation;

  const onSubmit = useCallback(
    (data: Config[Keys]) => mutate({ [props.name]: data }),
    [props.name, mutate],
  );

  return (
    <Card extra={props.className}>
      <SmartForm<Config[Keys]>
        className="h-full w-full gap-10"
        onSubmit={onSubmit}
        remoteData={remoteData?.[props.name]}
      >
        <div className="flex items-center justify-between">
          <h2 className="flex items-center justify-center gap-2 text-lg font-bold text-navy-700 dark:text-white">
            <MdOutlineSettings className="me-1 h-6 w-6" />
            {configsTitlesMap[props.name]}
          </h2>

          <SubmitBtn type="save" />
        </div>
        {props.children}
      </SmartForm>
    </Card>
  );
}

const configsTitlesMap: Record<Keys, string> = {
  goldPriceConfig: "تنظیمات قیمت طلا",
  siteSeoConfig: "تنظیمات سئو",
};
