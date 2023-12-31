"use client";
import Chart from "@/app/parts/Chart";
import { Badge } from "@/components/ui/badge";
import { get_coin_data } from "@/endpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { memo } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
async function getData(url) {
  return await axios.get(url).then((res) => {
    return res.data;
  });
}
const page = memo(({ params: { id } }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => getData(get_coin_data(id)),
  });

  if (!data) return <div>Loading...</div>;
  const {
    market_cap_rank,
    name,
    image,
    symbol,
    market_data: {
      current_price: { usd },
      price_change_percentage_24h,
      market_cap: { usd: market_cap_usd },
      total_volume: { usd: total_volume_usd },
      total_supply,
      max_supply,
    },
  } = data;
  return (
    <div className="bg-background text-text min-h-screen min-w-full text-sm md:text-base px-2 py-4 md:p-10 flex flex-col md:flex-row md:items-center md:justify-around gap-8">
      <div>
        <Badge className="bg-accent" variant="outline">
          # {market_cap_rank}
        </Badge>
        <p className="text-2xl font-semibold my-2">
          <img className="inline-block mr-2" src={image.thumb} alt="" />
          {name}
          <span className="text-gray-700 ml-4 uppercase text-sm">{symbol}</span>
        </p>
        <p className="font-semibold text-3xl">
          $ {usd}{" "}
          <span
            className={`${
              price_change_percentage_24h?.toFixed(2) < 0
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            <span className="">
              {price_change_percentage_24h?.toFixed(2) < 0 ? (
                <IoMdArrowDropdown className="inline-block text-red-600" />
              ) : (
                <IoMdArrowDropup className="inline-block text-green-600" />
              )}
            </span>
            <span className="text-xl">
              {price_change_percentage_24h?.toFixed(2)} %
            </span>
          </span>
        </p>
        <p className="mt-8 font-semibold">
          <p className="text-gray-600 mb-2 ">
            {" "}
            <span className="bg-gray-700 rounded-[15px] text-white px-2 mr-4">
              Market Cap :
            </span>{" "}
            ${market_cap_usd}
          </p>
          <p className="text-gray-600 mb-2">
            {" "}
            <span className="bg-gray-700 rounded-[15px] text-white px-2 mr-4">
              24H Trading Volume :
            </span>
            ${total_volume_usd}
          </p>
          <p className="text-gray-600 mb-2">
            {" "}
            <span className="bg-gray-700 rounded-[15px] text-white px-2 mr-4">
              Total Supply :
            </span>
            ${total_supply}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="bg-gray-700 rounded-[15px] text-white px-2 mr-4">
              Max Supply :
            </span>{" "}
            ${max_supply}
          </p>
        </p>
      </div>
      <div>
        <Chart id={id} />
      </div>
    </div>
  );
});

export default page;
