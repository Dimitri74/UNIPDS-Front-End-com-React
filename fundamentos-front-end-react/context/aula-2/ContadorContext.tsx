"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type ContadorType = number | null;

type ContadorContextType = {
  contador: ContadorType;
  setContador: Dispatch<SetStateAction<ContadorType>>;
};

export const ContadorContext = createContext<ContadorContextType>({
  contador: 0,
  setContador: () => {},
});

export default function ContadorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [contador, setContador] = useState<ContadorType>(() => {
    if (typeof window === "undefined") return null;

    const contadorLocalStorage = localStorage.getItem("contador");
    return contadorLocalStorage === null ? 0 : +contadorLocalStorage;
  });

  useEffect(() => {
    if (contador !== null) {
      localStorage.setItem("contador", contador.toString());
    }
  }, [contador]);

  return (
    <ContadorContext.Provider value={{ contador, setContador }}>
      {children}
    </ContadorContext.Provider>
  );
}
