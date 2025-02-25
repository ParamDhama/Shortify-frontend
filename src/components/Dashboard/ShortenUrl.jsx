/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaCopy, FaDownload } from "react-icons/fa";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";
import useInput from "../../hooks/useInput";
import { jwtDecode } from "jwt-decode";

function ShortenUrl({ close }) {
  const { input, setInput, handleChange } = useInput();
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodeToken = jwtDecode(token);
        const expiryDate = new Date(decodeToken.exp * 1000);
        const currentDate = new Date();
  
        if (expiryDate > currentDate) {
          apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
        } else {
          localStorage.removeItem("token");
        }
      }
  
      // Prepare request data
      const requestData = {
        originalUrl: input.originalUrl,
      };
  
      // Only include the title if it's not empty
      if (input.title && input.title.trim().length > 0) {
        requestData.title = input.title.trim();
      }
  
      const res = await apiClient.post(endpoints.url.CREATE_URL, requestData);
      setItems(res.data);
      setInput({ originalUrl: "", title: "" }); // Reset input fields
    } catch (err) {
      setError("❌ Failed to shorten URL. Please try again.");
      console.error(err);
    }
  
    setLoading(false);
  };
  
  const handleCopy = () => {
    if (!items) return;
    const shortUrl = `${window.location.origin}/redirect/${items.slug}`;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!items?.qrCode) return;
    const link = document.createElement("a");
    link.href = items.qrCode;
    link.download = `QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#EFF4F0] max-md:pt-20 min-h-screen p-6 w-full flex flex-col items-center">
      
      {/* Back Button */}
      <button onClick={() => close()} className="font-bold text-lg mb-4 self-start">
        &larr; Back
      </button>

      {/* Responsive Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left Side - Form */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Create New</h2>
          <p className="text-sm text-gray-600 mb-6">
            Below are your shortened URL options. Copy your preferred link or click the checkbox to share.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Destination URL */}
            <div>
              <label className="text-gray-700 font-medium text-sm">Destination URL</label>
              <input
                type="text"
                name="originalUrl"
                placeholder="https://example.com/all-your-long-link"
                value={input.originalUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Title */}
            <div>
              <label className="text-gray-700 font-medium text-sm">Title (Optional)</label>
              <input
                type="text"
                name="title"
                placeholder="Link or page title"
                value={input.title || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Shortening..." : "Shorten Your URL"}
            </button>
          </form>
        </div>

        {/* Right Side - Shortened URL Display */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Be on the lookout.</h3>
          <p className="text-sm text-gray-600 mb-4">
            Your shortened URL options will be shown here.
          </p>

          {items && (
            <>
{/* Shortened URL Display */}
<div className="p-4 bg-green-50 rounded-lg border border-green-300">
  <p className="text-secondary font-semibold mb-2">Short URL:</p>
  
  {/* URL Container */}
  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-300">
    <a
      href={`/redirect/${items.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline hover:text-green-900 whitespace-nowrap overflow-hidden text-ellipsis"
      style={{ maxWidth: "80%" }}  // Ensures the URL stays within the box
    >
      {window.location.origin}/redirect/{items.slug}
    </a>
    
    {/* Copy Button */}
    <button
      onClick={handleCopy}
      className="ml-2 bg-primary text-white p-2 rounded-lg hover:bg-secondary transition flex items-center justify-center"
    >
      <FaCopy />
    </button>
  </div>

  {/* Copy Status */}
  {copied && <p className="text-green-600 text-sm mt-2">Copied to clipboard!</p>}
</div>

              {/* QR Code Display */}
              {items.qrCode && (
                <div className="mt-4 flex flex-col items-center">
                  <p className="text-secondary font-semibold">QR Code:</p>
                  <img
                    src={items.qrCode}
                    alt="QR Code"
                    className="w-40 h-40 mt-2 border border-green-300 rounded-md shadow-md"
                  />
                  <button
                    onClick={handleDownloadQR}
                    className="mt-3 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition flex items-center gap-2"
                  >
                    <FaDownload />
                    Download QR
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default ShortenUrl;
