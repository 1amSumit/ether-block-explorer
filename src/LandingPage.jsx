/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { NavLink, useNavigate } from "react-router-dom";

const settings = {
  apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

const LandingPage = () => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [formattedTimestamp, setFormattedTimestamp] = useState("");
  const [blockNumber, setBlockNumber] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [tsx, setTsx] = useState({});

  const naviagte = useNavigate();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    async function getTsx() {
      const x = await alchemy.core.getBlockWithTransactions(blockNumber);
      setTsx(x);

      setIsLoading(false);
      console.log(tsx.timestamp);
    }

    getBlockNumber();
    getTsx();
  }, [blockNumber, tsx]);

  useEffect(() => {
    const getTimeStamp = () => {
      const currentDate = new Date();
      const pastDate = new Date(tsx.timestamp * 1000);

      const formattedDate = pastDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const timeDifferenceSeconds = Math.floor((currentDate - pastDate) / 1000);
      if (timeDifferenceSeconds < 60) {
        setFormattedTimestamp(
          `${timeDifferenceSeconds} sec ago (${formattedDate})`
        );
      } else {
        const timeDifferenceMinutes = Math.floor(timeDifferenceSeconds / 60);
        setFormattedTimestamp(
          `${timeDifferenceMinutes} min ago (${formattedDate})`
        );
      }
    };

    getTimeStamp();
  }, [tsx.timestamp]);

  const submitForm = () => {
    if (enteredNumber.trim().length === 0) {
      return;
    }

    naviagte(`/details/${enteredNumber}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-indigo-600">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          EtherView
        </h1>
        <div className="flex">
          <input
            type="number"
            value={enteredNumber}
            onChange={(e) => setEnteredNumber(e.target.value)}
            className="w-full rounded-full py-2 px-4 text-gray-800 focus:outline-none"
            placeholder="Enter Block Number"
          />
          <button
            onClick={submitForm}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-2 rounded-full"
          >
            Search
          </button>
        </div>
      </div>
      <NavLink
        to={`/details/${blockNumber}`}
        className="mt-8 bg-opacity-75 shadow-2xl cursor-pointer bg-white rounded-lg p-6 max-w-lg w-full backdrop-blur-lg"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Current Block</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Block Number:</p>
            <p className="text-lg font-bold">
              {isLoading ? "Loading..." : blockNumber}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Timestamp:</p>
            <p className="text-md font-bold">
              {isLoading ? "Loading..." : formattedTimestamp}
            </p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default LandingPage;
