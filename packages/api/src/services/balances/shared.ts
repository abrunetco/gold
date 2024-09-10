// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from "@feathersjs/feathers";
import type { ClientApplication } from "../../client";
import type {
  Balance,
  BalanceData,
  BalancePatch,
  BalanceQuery,
  BalanceService,
} from "./class";

export type { Balance, BalanceData, BalancePatch, BalanceQuery };

export type BalanceClientService = Pick<
  BalanceService<Params<BalanceQuery>>,
  (typeof balanceMethods)[number]
>;

export const balancePath = "balances" as const

export const balanceMethods: Array<keyof BalanceService> = [
  "find",
  "get",
  "create",
  "patch",
  "remove",
];

export const balanceClient = (client: ClientApplication) => {
  const connection = client.get("connection");

  client.use(balancePath, connection.service(balancePath), {
    methods: balanceMethods,
  });
};

// Add this service to the client service type index
declare module "../../client" {
  interface ServiceTypes {
    [balancePath]: BalanceClientService;
  }
}
