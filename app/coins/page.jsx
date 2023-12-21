"use client";
import { getData, get_coin_list, get_coins_data } from "@/endpoints";
import { useQuery } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import MainTable from "../parts/MainTable";
import Pagination from "../parts/Pagination";

const page = memo(() => {
  const [page, setPage] = useState(1);
  const [coinLength, setCoinLength] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allCoinsWithData", limit, page],
    queryFn: () => getData(get_coins_data(limit, page)),
    // refetchInterval: 5 * 1000,
  });
  const { data: coinlist } = useQuery({
    queryKey: ["allCoins"],
    queryFn: () => getData(get_coin_list()),
    // refetchInterval: 5 * 1000,
  });
  useEffect(() => {
    if (coinlist?.length) {
      setCoinLength(coinlist?.length);
    }
  }, []);

  return (
    <div className="bg-[#111111] p-10">
      <MainTable data={data} />
      <Pagination setPage={setPage} coinLength={coinLength} limit={limit} />
    </div>
  );
});

export default page;
