"use client";

import { useRouter } from "next/navigation";

const Table = ({ data }) => {
  console.log("data from table", data);
  const router = useRouter();
  if (!data) return <div>Loading...</div>;
  return (
    <table className=" text-primary w-full blurred-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Price</th>
          <th className="hidden md:table-cell">Volume</th>
          <th className="hidden md:table-cell">Market Cap</th>
          <th className="hidden md:table-cell">24h</th>
        </tr>
      </thead>
      <tbody className="text-text">
        {data?.coins?.length > 0 &&
          data.coins.map(({ item: coin }, ind) => (
            <tr
              onClick={() => {
                router.push(`/coins/${coin.id}`);
              }}
              className="hover:bg-gray-800 cursor-pointer"
              key={ind}
            >
              <td>{coin.score + 1}</td>
              <td className="flex items-center gap-x-2">
                <img className="rounded-full" src={coin.thumb} alt="" />
                <span>{coin.name}</span>
              </td>
              <td>{coin.data.price}</td>
              <td className="hidden md:table-cell">{coin.data.total_volume}</td>
              <td className="hidden md:table-cell">{coin.data.market_cap}</td>
              <td className="hidden md:table-cell">
                {coin.data.price_change_percentage_24h.usd}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
