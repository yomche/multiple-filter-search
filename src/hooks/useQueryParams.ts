import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const useQueryParams = (
  url: string,
  params: string[],
  refreshParams?: string[]
) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const [apiQuery, setApiQuery] = useState(url);
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    setQueryString(search);
    setApiQuery(`${url}${search}`);
  }, []);

  const handleSelectFilter = (name: string, value: string) => {
    const filter = convertParamsToFilterObject(params);
    filter[name] = value;
    if (
      refreshParams &&
      refreshParams?.length > 0 &&
      !refreshParams.includes(name)
    ) {
      refreshParams.forEach((param) => {
        filter[param] = "";
      });
    }
    const query = buildQuery(params, filter);
    setApiQuery(`${url}${query}`);
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
};
