import { useParams } from "react-router-dom";

/* eslint-disable react/prop-types */
const DetailsPage = () => {
  const blockId = useParams().id;
  console.log(blockId);

  const blockDetails = {
    id: blockId,
    name: "Cool Block",
    description: "A cool-looking block with all the details displayed.",
    imageUrl: "https://placeimg.com/400/400/tech", // Example image URL
    otherDetails: "More information about the block.",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-10 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-white">
                {blockDetails.name}
              </h2>
              <img
                src={blockDetails.imageUrl || placeholderImage}
                alt={blockDetails.name}
                className="w-16 h-16 rounded-full"
              />
            </div>
            <p className="mt-4 text-lg text-gray-200">
              {blockDetails.description}
            </p>
          </div>
          <div className="px-6 py-6 sm:px-10 bg-white">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Other Details
            </h3>
            <p className="text-gray-600">{blockDetails.otherDetails}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
