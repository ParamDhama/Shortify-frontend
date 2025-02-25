import PropTypes from "prop-types";
import { FaDownload, FaRegTrashAlt, FaLink, FaCalendarAlt } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const RecentQRCode = ({ links , handleDelete }) => {
  // Get the most recent link (last item in the array)
  const latestLink = links.length > 0 ? links[links.length - 1] : null;

  if (!latestLink) {
    return (
      <div className="bg-gray-100 md:bg-white md:p-4 md:rounded-md md:shadow-md md:mb-2 max-md:text-center py-4">
        <h2 className="text-lg font-bold text-gray-700 mb-2">RECENT QR CODE</h2>
        <p className="text-gray-500 text-sm">No QR codes generated yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 md:bg-white md:p-4 md:rounded-md md:shadow-md md:mb-2 max-md:text-center py-4">
      {/* Header */}
      <h2 className="text-lg font-bold text-gray-700 mb-2">RECENT QR CODE</h2>

      {/* QR Code Container */}
      <div className="md:flex items-center space-x-4 p-4">
        {/* QR Code Image */}
        <img 
          src={latestLink.qrCode} 
          alt="QR Code" 
          className="md:w-36 w-full mix-blend-multiply" 
        />

        {/* Link & Date */}
        <div className="flex-1 flex flex-col">
          <p className="flex items-center text-gray-600 font-medium">
            <FaLink className="mr-2" /> 
            <a 
              href={`/redirect/${latestLink.slug}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline"
            >
              Shortify.com/redirect/{latestLink.slug}
            </a>
          </p>
          <p className="flex items-center text-gray-600 text-sm mt-2">
            <FaCalendarAlt className="mr-2" />
            {new Date(latestLink.createdAt).toLocaleString()}
          </p>

          {/* Action Buttons */}
          <div className="flex max-md:flex-col max-md:space-y-3 space-x-3 mt-3">
            <button 
              className="flex items-center max-md:justify-center space-x-2 bg-primary text-white text-sm font-bold px-4 md:py-1 py-2 rounded-md hover:bg-secondary max-md:w-full"
              onClick={() => {
                const link = document.createElement("a");
                link.href = latestLink.qrCode;
                link.download = "QRCode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <FaDownload />
              <span>Download</span>
            </button>
            <button onClick={() => handleDelete(latestLink.slug)} className="md:p-1 p-2 max-md:space-x-2 bg-red-700 text-white font-bold text-sm rounded-md hover:bg-red-800 max-md:flex max-md:justify-center max-md:items-center">
              <span className="max-md:hidden"><FaRegTrashAlt /></span>
              <span className="md:hidden">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Define Prop Types
RecentQRCode.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      qrCode: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecentQRCode;
