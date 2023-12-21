"use client";

import { useRouter } from "next/navigation";

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
          <th>Volume</th>
          <th>Market Cap</th>
          <th>Low 24h</th>
          <th>High 24h</th>
          <th>24h Price Change %</th>
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
                <td>{current_price}</td>
                <td>{total_volume}</td>
                <td>{market_cap}</td>
                <td>{low_24h}</td>
                <td>{high_24h}</td>
                <td>{price_change_percentage_24h}</td>
              </tr>
            )
          )}
      </tbody>
    </table>
  );
};

export default MainTable;
