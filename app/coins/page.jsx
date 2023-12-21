"use client";
import { getData, get_coin_list, get_coins_data } from "@/endpoints";
import { useQuery } from "@tanstack/react-query";
import { memo, useState } from "react";
import MainTable from "../parts/MainTable";

const page = memo(() => {
  const [page, setPage] = useState(1);
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
  console.log(coinlist?.length);
  return (
    <div>
      <MainTable data={data} />
    </div>
  );
});

export default page;
