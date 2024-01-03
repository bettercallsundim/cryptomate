"use client";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import { getDataFromLocal } from "@/lib/localStorage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import millify from "millify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { db } from "./firebase.config";
const MainTable = ({ data }) => {
  console.log("data from table", data);
  const router = useRouter();
  const [saved, setSaved] = useState([]);
  useEffect(() => {
    const email = getDataFromLocal("user").email;

    if (email) getSaved();
  }, []);

  const addSave = async (coinID) => {
    const email = getDataFromLocal("user").email;
    let initCoins = await getSaved();
    try {
      if (initCoins.includes(coinID)) {
        const docRef = await setDoc(doc(db, email, "data"), {
          savedCoins: initCoins.filter((coin) => coin !== coinID),
        });
      } else {
        const docRef = await setDoc(doc(db, email, "data"), {
          savedCoins: [...initCoins, coinID],
        });
      }
      getSaved();
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };
  const getSaved = async () => {
    const email = getDataFromLocal("user").email;

    const docRef = doc(db, email, "data");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSaved(docSnap.data().savedCoins);
      return docSnap.data().savedCoins;
    } else {
      return [];
    }
  };
  if (!data) return <div>Loading...</div>;
  const {} = data;
  return (
    <table className=" text-primary w-full blurred-table">
      <thead>
        <tr>
          <th>Saved</th>
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
                <td>
                  {" "}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addSave(id);
                      getSaved();
                    }}
                  >
                    {saved.includes(id) ? <MdFavorite /> : <MdFavoriteBorder />}
                  </button>
                </td>
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
