import { useState } from "react";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";
import useInput from "../../hooks/useInput";

function ShortenUrl() {
  const { input, setInput, handleChange } = useInput();
  const [items, setItems] = useState(null); // ✅ Corrected useState

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post(endpoints.url.CREATE_URL, {
        originalUrl: input.originalUrl,
      });
      setItems(res.data);
      setInput({}); // ✅ Resets input after successful submission
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Shorten URL</h2>
      <form onSubmit={handleSubmit}>
        <label>Link: </label>
        <input
          type="text"
          name="originalUrl"
          value={input.originalUrl}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>

      {/* ✅ Prevents errors by checking if items exist */}
      {items && (
        <div>
          <p>Slug: {items?.slug}</p>
          <p>QR Code: {items?.qrCode}</p>
        </div>
      )}
    </div>
  );
}

export default ShortenUrl;
