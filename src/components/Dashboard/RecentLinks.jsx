import PropTypes from "prop-types";
import { FaRegClock, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";

const RecentLinks = ({ links }) => {
  // Get only the last 3 links
  const recentLinks = links.slice(-3).reverse(); 

  return (
    <div className="bg-white p-4 rounded-md shadow">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 mb-3">
        <h2 className="text-sm font-bold text-gray-700">RECENTLY GENERATED LINKS</h2>
        <span className="text-gray-600 font-semibold text-sm">{recentLinks.length} Results</span>
      </div>

      {/* Links List */}
      <ul className="space-y-3">
        {recentLinks.map((link, index) => (
          <li key={index} className="bg-white p-3 rounded-md md:items-center justify-between border border-gray-300 shadow-sm">
            <div>
              {/* Link */}
              <div className="flex items-center justify-between">
                <a 
                  href={`/redirect/${link.slug}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-semibold"
                >
                  {window.location.origin}/redirect/{link.slug}
                </a>
              
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button 
                    className="p-2 bg-primary text-white rounded-md hover:bg-secondary"
                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}/redirect/${link.slug}`)}
                  >
                    <MdOutlineContentCopy />
                  </button>
                  <button className="p-2 bg-red-700 text-white rounded-md hover:bg-red-800">
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>

              {/* Original URL */}
              <p className="text-xs text-gray-600 mt-1">{link.originalUrl}</p>
            </div>

            {/* Date & Time */}
            <div className="flex items-center text-gray-500 text-xs mt-2">
              <FaRegClock />
              <p className="ml-1">{new Date(link.createdAt).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ✅ Define Prop Types
RecentLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      originalUrl: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecentLinks;
