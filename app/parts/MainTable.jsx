"use client";

import millify from "millify";
import { useRouter } from "next/navigation";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
const MainTable = ({ data }) => {
  console.log("data from table", data);
  const router = useRouter();
  if (!data) return <div>Loading...</div>;
  const {} = data;
  return (
    <table className=" text-primary w-full blurred-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Price</th>
          <th className="hidden md:table-cell">Volume</th>
          <th className="hidden md:table-cell">Market Cap</th>
          <th className="hidden md:table-cell">Low 24h</th>
          <th className="hidden md:table-cell">High 24h</th>
          <th className="hidden md:table-cell">24h Price Change %</th>
        </tr>
      </thead>
      <tbody className="text-text">
        {data?.length > 0 &&
          data.map(
            (
              {
                name,
                id,
                image,
                symbol,
                current_price,
                market_cap,
                market_cap_rank,
                total_volume,
                high_24h,
                low_24h,
                price_change_percentage_24h,
              },
              ind
            ) => (
              <tr
                onClick={() => {
                  router.push(`/coins/${id}`);
                }}
                className="hover:bg-gray-800 cursor-pointer"
                key={ind}
              >
                <td>{market_cap_rank}</td>
                <td className="flex items-center gap-x-2">
                  <img
                    className="rounded-full w-[20px] h-[20px]"
                    src={image}
                    alt=""
                  />
                  <span>{name}</span>
                </td>
                <td>$ {current_price}</td>
                <td className="hidden md:table-cell">
                  $ {millify(total_volume)}
                </td>
                <td className="hidden md:table-cell">
                  $ {millify(market_cap)}
                </td>
                <td className="hidden md:table-cell">$ {low_24h}</td>
                <td className="hidden md:table-cell">$ {high_24h}</td>
                <td className="hidden md:table-cell">
                  <span
                    className={`${
                      price_change_percentage_24h?.toFixed(2) < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {price_change_percentage_24h?.toFixed(2)}{" "}
                  </span>
                  {price_change_percentage_24h?.toFixed(2) < 0 ? (
                    <IoMdArrowDropdown className="inline-block text-red-600" />
                  ) : (
                    <IoMdArrowDropup className="inline-block text-green-600" />
                  )}
                </td>
              </tr>
            )
          )}
      </tbody>
    </table>
  );
};

export default MainTable;
