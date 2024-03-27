import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";
import { useUrlFilter } from "../hooks/useUrlQuery";
import { CharacterType } from "../types/app.type";
import {
  API_URL,
  FILTER_PARAMS,
  REFRESH_FILTER_PARAMS,
} from "../constants/filters";

interface AppContextProps {
  results: {
    status: string;
    data: CharacterType[];
  };
  getDefaultParamValue: (params: string, defaultValue: string) => string;
  handleSelectFilter: (name: string, value: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const { apiQuery, getDefaultParamValue, handleSelectFilter } = useUrlFilter(
    FILTER_PARAMS,
    API_URL,
    REFRESH_FILTER_PARAMS
  );
  const [results, setResults] = useState({
    status: "loading",
    data: [],
  });

  const fetchApi = async () => {
    setResults({
      status: "loading",
      data: [],
    });
    try {
      const response = await fetch(apiQuery);
      const data = await response.json();
      setResults({
        status: "success",
        data: data?.results || [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [apiQuery]);

  const contextValue = { results, getDefaultParamValue, handleSelectFilter };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};
