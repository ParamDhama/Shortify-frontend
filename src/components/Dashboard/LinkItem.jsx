/* eslint-disable react/prop-types */
import { FaDownload, FaRegClock, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";

function LinkItem({ link, handleDelete }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/redirect/${link.slug}`);
  };
  const handleDownloadQR = () => {
    const items = link;
    if (!items?.qrCode) return;
    const linkURI = document.createElement("a");
    linkURI.href = items.qrCode;
    linkURI.download = `QR.png`;
    document.body.appendChild(linkURI);
    linkURI.click();
    document.body.removeChild(linkURI);
  };


  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm w-full">
      {/* Container for main content */}
      <div className="flex max-md:flex-col justify-between md:items-center gap-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* QR Code */}
          <img
            src={link.qrCode}
            alt="QR Code"
            className="w-20 h-20 bg-primary rounded-md"
          />

          {/* Link Info */}
          <div>
            <h2 className="text-gray-900 font-semibold">{link.title || "Untitled"}</h2>
            <a
              href={`/redirect/${link.slug}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold hover:underline text-sm"
            >
              {window.location.origin}/redirect/{link.slug}
            </a>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-2 font-bold">
          <button 
            onClick={handleCopy} 
            className="bg-primary text-white py-1 px-3 rounded-md flex items-center text-sm space-x-2 hover:bg-secondary"
          >
            <MdOutlineContentCopy /> <span>Copy</span>
          </button>

          <button 
            onClick={handleDownloadQR}
            className="bg-primary text-white py-1 px-3 rounded-md flex items-center text-sm space-x-2 hover:bg-secondary"
          >
            <FaDownload /> <span>Download</span>
          </button>

          <button 
            onClick={() => handleDelete(link.slug)} 
            className="bg-red-700 text-white py-1 px-3 rounded-md flex items-center text-sm space-x-2 hover:bg-red-800"
          >
            <FaRegTrashAlt /> <span>Delete</span>
          </button>
        </div>
      </div>

      {/* URL (for mobile view) */}
      <p className="md:hidden text-sm text-gray-600 mt-2">{link.originalUrl}</p>

      {/* Click count & Date */}
      <div className="text-gray-500 text-xs flex items-center gap-4 mt-1">
        <span>Clicks: {link.clicks}</span>
        <span className="flex items-center space-x-1">
          <FaRegClock /> 
          <span> {new Date(link.createdAt).toLocaleString()}</span>
        </span>
      </div>
    </div>
  );
}

export default LinkItem;
