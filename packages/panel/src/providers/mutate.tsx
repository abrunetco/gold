// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Common, Entity, EntityName } from "@gold/api";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import client from "api/client";
import BrandLoading from "components/progress/BrandLoading";
import React, { PropsWithChildren, useCallback, useMemo } from "react";

interface MutateProviderProps<
  N extends EntityName,
  E extends Common = Entity<N>,
> extends UseMutationOptions<E> {
  service: N;
  uid: string;
  path?: keyof E;
}

export default function SmartMutateProvider<
  N extends EntityName,
  E extends Common = Entity<N>,
>(props: PropsWithChildren<MutateProviderProps<N>>) {
  const { service, uid, path, children, ...mutationOptions } = props;
  const query = useQuery<E>({
    queryKey: [service, uid, path],
    // @ts-expect-error: we can't infer all types here
    queryFn: async () => client.service(service).get(uid),
    placeholderData: keepPreviousData,
  });

  const mutation = useMutation({
    // @ts-expect-error: we can't infer all types here
    ...mutationOptions,
    mutationFn: (formData: Partial<E>) =>
      // @ts-expect-error: we can't infer all types here
      client.service(service).patch(uid, formData),
  });
  const { mutate } = mutation;

  const onSubmit = useCallback(
    (data: any) => {
      // @ts-expect-error: we can't infer all types here
      if (path) mutate({ [path]: data });
      else mutate(data);
    },
    [path, mutate],
  );

  const defaultValues = useMemo(
    // @ts-expect-error: we can't infer all types here
    () => (path ? remoteData?.[path] : query.data),
    [query.data, path],
  );

  if (query.isLoading) return <BrandLoading />;
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.createElement(child.type, {
        ...child.props,
        defaultValues,
        remoteData: defaultValues,
        onSubmit,
      });
    }
    return child;
  });
}
