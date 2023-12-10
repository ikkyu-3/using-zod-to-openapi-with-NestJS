"use client";

import useSWR from "swr";
import axios from "axios";
import { Error, Pets } from "@repo/openapi";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Page(): JSX.Element {
  const { data, error, isLoading } = useSWR<Pets, Error>("/pets", fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error: {error.message}</div>;
  }

  return <pre>{data ? JSON.stringify(data, null, 4) : "empty data"}</pre>;
}
