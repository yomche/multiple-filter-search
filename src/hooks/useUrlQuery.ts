import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function useUrlFilter(
  params: string[],
  apiUrl: string,
  refreshParams?: string[]
) {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [apiQuery, setApiQuery] = useState<string>(apiUrl);
  const [queryString, setQueryString] = useState<string>("");

  useEffect(() => {
    setQueryString(search);
    setApiQuery(`${apiUrl}${search}`);
  }, []);

  const handleSelectFilter = (name: string, value: string) => {
    const filter = convertParamsToFilterObject(params);
    filter[name] = value;
    if (
      refreshParams &&
      refreshParams?.length > 0 &&
      !refreshParams.includes(name) &&
      refreshParams.indexOf(name) === -1
    ) {
      refreshParams.forEach((param) => {
        filter[param] = "";
      });
    }
    const query = buildQuery(params, filter);
    setApiQuery(`${apiUrl}${query}`);
    setQueryString(query);
    navigate(query, { replace: true });
  };

  const buildQuery = (
    params: string[],
    filter: { [key: string]: string }
  ): string => {
    let url = "?";
    params.forEach((param) => {
      url += `&${param}=${filter[param]}`;
    });
    return url.replace("&", "");
  };

  const convertParamsToFilterObject = (
    params: string[]
  ): { [key: string]: string } => {
    const filter: { [key: string]: string } = {};
    params.forEach((param: string) => {
      filter[param] = searchParams.get(param) || "";
    });
    return filter;
  };

  const getDefaultParamValue = (params: string, defaultValue: string) => {
    return searchParams.get(params) || defaultValue;
  };

  return {
    apiQuery,
    queryString,
    getDefaultParamValue,
    handleSelectFilter,
  };
}
