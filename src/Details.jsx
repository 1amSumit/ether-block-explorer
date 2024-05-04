import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

const DetailsPage = () => {
  const blockId = useParams().id.toString();

  const [tsx, setTsx] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTsx = async () => {
      const transaction = await alchemy.core.getBlockWithTransactions(+blockId);
      setTsx(transaction);
      setIsLoading(false);
    };

    getTsx();
  }, [blockId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(tsx);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-indigo-600">
      <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{`Block #${tsx.number} Details`}</h1>
        <div className="mb-4">
          <strong>Block Number:</strong> {tsx.number}
        </div>
        <div className="mb-4">
          <strong>Block Hash:</strong> {tsx.hash}
        </div>
        <div className="mb-4">
          <strong>Timestamp:</strong>{" "}
          {new Date(tsx.timestamp * 1000).toLocaleString()}
        </div>
        <div className="mb-4">
          <strong>Transactions:</strong> {tsx.transactions.length}
        </div>
        <div className="mb-4">
          <strong>Miner:</strong> {tsx.miner}
        </div>
        <div className="mb-4">
          <strong>Gas Used:</strong> {parseInt(tsx.gasUsed._hex, 16)}
        </div>
        <div className="mb-4">
          <strong>Difficulty:</strong> {parseInt(tsx.difficulty._hex, 16)}
        </div>
        <div className="mb-4">
          <strong>Block Size:</strong> {tsx.size} bytes
        </div>
        <div className="mb-4">
          <strong>Gas Limit:</strong> {parseInt(tsx.gasLimit._hex, 16)}
        </div>
        <div className="mb-4">
          <strong>Parent Hash:</strong> {tsx.parentHash}
        </div>
        <div className="mb-4">
          <strong>Nonce:</strong> {parseInt(tsx.nonce, 16)}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
