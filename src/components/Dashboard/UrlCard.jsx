/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaCopy, FaChartBar, FaTimes, FaDownload } from "react-icons/fa";
import UrlAnalytics from "./UrlAnalytics";

function UrlCard({ url, index, handleDeleteUrl }) {
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/redirect/${url.slug}`);
    alert("✅ Short URL copied to clipboard!");
  };

  const handleDownloadQR = () => {
    if (!url.qrCode) return;

    const link = document.createElement("a");
    link.href = url.qrCode;
    link.download = `QR_${url.slug}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* URL Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
      >
        {/* Original URL */}
        <p className="text-gray-600 text-sm">Original URL:</p>
        <a
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 break-all block hover:underline"
        >
          {url.originalUrl}
        </a>

        {/* Shortened URL */}
        <p className="text-gray-600 text-sm mt-2">Shortened URL:</p>
        <div className="flex items-center justify-between">
          <a
            href={`/redirect/${url.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 font-semibold hover:underline"
          >
            {window.location.origin}/redirect/{url.slug}
          </a>
          <button
            onClick={handleCopy}
            className="text-green-700 hover:text-green-900 ml-2"
            aria-label="Copy URL"
          >
            <FaCopy />
          </button>
        </div>

        {/* Clicks & Created At */}
        <p className="text-gray-500 text-xs mt-2">Clicks: {url.clicks}</p>
        <p className="text-gray-400 text-xs">Created: {new Date(url.createdAt).toLocaleString()}</p>

        {/* QR Code Section */}
        {url.qrCode && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-secondary font-semibold">QR Code:</p>
            <img
              src={url.qrCode}
              alt="QR Code"
              className="w-36 h-36 mt-2 border border-green-300 rounded-md shadow-md"
            />
            <button
              onClick={handleDownloadQR}
              className="mt-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-secondary transition flex items-center gap-2"
            >
              <FaDownload />
              Download QR
            </button>
          </div>
        )}

        {/* Buttons Section */}
        <div className="flex justify-between gap-2 mt-3">
          {/* Show Analytics Button */}
          <button
            onClick={() => setShowAnalytics(true)}
            className="flex-1 bg-green-700 text-white px-3 py-1 rounded-lg hover:bg-secondary transition flex justify-center items-center gap-2"
          >
            <FaChartBar /> View Analytics
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDeleteUrl(url.slug)}
            className="flex-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition flex justify-center items-center gap-2"
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      </motion.div>

      {/* URL Analytics Popup Modal */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50"
            onClick={() => setShowAnalytics(false)} // Close when clicking outside
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/5 lg:w-3/5"
              onClick={(e) => e.stopPropagation()} // Prevent close on content click
            >
              {/* Close Button */}
              <button
                onClick={() => setShowAnalytics(false)}
                className="absolute top-4 right-4 text-green-700 hover:text-green-900 text-xl"
                aria-label="Close Analytics"
              >
                <FaTimes />
              </button>

              {/* Analytics Data */}
              <UrlAnalytics id={url._id} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default UrlCard;
