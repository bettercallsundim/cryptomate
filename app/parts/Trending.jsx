"use client";
import { getData, get_trending } from "@/endpoints";
import { useQuery } from "@tanstack/react-query";
import Table from "./Table";

const Trending = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trending"],
    queryFn: () => getData(get_trending()),
    // refetchInterval: 5 * 1000,
  });
  console.log(data);

  return (
    <div className="text-sm md:text-base px-2 py-4 md:p-10 bg-[#111111]">
      <Table data={data} />
    </div>
  );
};

export default Trending;
