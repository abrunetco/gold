import { Table } from "@tanstack/react-table";
import { createContext, useContext } from "react";

export const TableContext = createContext<Table<any>>(undefined as Table<any>);

export const useTableContext = () => useContext(TableContext);
