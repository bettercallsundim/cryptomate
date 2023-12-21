"use client";
import { getData, get_coin_chart } from "@/endpoints";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { memo, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = memo(({ id }) => {
  const [day, setDay] = useState(7);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coinChart", id, day],
    queryFn: () => getData(get_coin_chart(id, day)),
    placeholderData: keepPreviousData,
  });
  console.log(id, day, get_coin_chart(id, day));
  console.log(data);
  function getTime(timestamp) {
    const date = new Date(timestamp);
    const options = { month: "short", day: "numeric" };

    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <p className="pl-40 mb-4">
        <button
          className="rounded-[15px] font-semibold hover:scale-[1.05] bg-primary px-4 py-1 mr-2"
          onClick={() => {
            setDay(7);
          }}
        >
          7d
        </button>
        <button
          className="rounded-[15px] font-semibold hover:scale-[1.05] bg-primary px-4 py-1 mr-2"
          onClick={() => {
            setDay(15);
          }}
        >
          15d
        </button>
        <button
          className="rounded-[15px] font-semibold hover:scale-[1.05] bg-primary px-4 py-1 mr-2"
          onClick={() => {
            setDay(30);
          }}
        >
          30d
        </button>
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data.prices}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          {/* <CartesianGrid strokeDasharray="1 1" /> */}
          <XAxis
            name="my data"
            dataKey={(entry) => {
              return getTime(entry[0]);
            }}
          />
          <YAxis dataKey={(entry) => entry[1]} />
          <Tooltip />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey={(entry) => entry[1]}
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default Chart;
