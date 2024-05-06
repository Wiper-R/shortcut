import { RefetchOptions } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useContext } from "react";

type RefetchCallback = (options?: RefetchOptions) => any;

type DataProviderContext<T> = {
  data: T;
  refetch: RefetchCallback;
};

type DataProviderProps<T> = DataProviderContext<T> & PropsWithChildren;

const DataProviderContext = createContext<DataProviderContext<any> | null>(
  null,
);

export function DataProvider<T>({
  data,
  refetch,
  children,
}: DataProviderProps<T>) {
  return (
    <DataProviderContext.Provider value={{ data, refetch }}>
      {children}
    </DataProviderContext.Provider>
  );
}

export function useDataProvider<T>() {
  const ctx = useContext(DataProviderContext) as DataProviderContext<T> | null;
  if (!ctx)
    throw new Error(
      `${useDataProvider.name} should be used inside of ${DataProvider.name}`,
    );
  return ctx;
}
