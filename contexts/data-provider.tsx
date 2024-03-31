import { PropsWithChildren, createContext, useContext, useState } from "react";

type DataProviderContext<T> = {
  data: T;
  setData: (data: T) => void;
};

type DataProviderProps<T> = { data: T } & PropsWithChildren;

const DataProviderContext = createContext<DataProviderContext<any> | null>(
  null,
);

export function DataProvider<T>({
  data: _data,
  children,
}: DataProviderProps<T>) {
  const [data, setData] = useState(_data);
  return (
    <DataProviderContext.Provider value={{ data, setData }}>
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
