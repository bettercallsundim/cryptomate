"use client";
import { Button } from "@/components/ui/button";
import { getData, get_coin_chart } from "@/endpoints";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { memo, useState } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

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
      <p>
        <Button
          onClick={() => {
            setDay(7);
          }}
        >
          7d
        </Button>
        <Button
          onClick={() => {
            setDay(15);
          }}
        >
          15d
        </Button>
        <Button
          onClick={() => {
            setDay(30);
          }}
        >
          30d
        </Button>
      </p>
      <LineChart
        width={500}
        height={250}
        data={data.prices}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
        <Line type="monotone" dataKey={(entry) => entry[1]} stroke="#8884d8" />
      </LineChart>
    </div>
  );
});

export default Chart;
