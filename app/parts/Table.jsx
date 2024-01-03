"use client";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import { getDataFromLocal } from "@/lib/localStorage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "./firebase.config";

const Table = ({ data }) => {
  const [saved, setSaved] = useState([]);
  useEffect(() => {
    getSaved();
  }, []);

  const router = useRouter();
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
              <td>
                {" "}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addSave(coin.id);
                    getSaved();
                  }}
                >
                  {saved.includes(coin.id) ? (
                     <MdFavorite />
                  ) : (
                    <MdFavoriteBorder />
                  )}
                </button>
              </td>
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
