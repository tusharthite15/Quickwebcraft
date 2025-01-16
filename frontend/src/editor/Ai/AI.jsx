import React, { useState, useEffect } from "react";
import { RiImageCircleAiFill } from "react-icons/ri"; 

export default function Ai() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const fetchImages = async (query) => {
    try {
      const response = await fetch(
        // const accessKey = "KmAl00U7hxyRuHW5mBmMh-rbbRK0hPp-lZwfBJ6xrMk";
        `https://api.unsplash.com/search/photos?page=1&query=${query}&per_page=30&client_id=${'_vt3xOKqrAzJwa5A0EORtkLP41vnqg3QKvWGpLL8QY8'}`
      );
      const data = await response.json();
      setImages(data.results || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchImages(searchQuery);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="w-full p-4">
      <div className="flex gap-4 mb-4">
        <button className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm">
          ALL
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md text-sm"
          onClick={() => setShowSearchBar(!showSearchBar)}
        >
          <RiImageCircleAiFill size={20} className="text-yellow-400" />
          <span>AI-Image</span>
        </button>
      </div>

      {/* Search Bar */}
      {showSearchBar && (
        <div className="mb-4">
          <div className="relative">
            <input
              type="search"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Search images..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span className="absolute right-4 top-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z"
                />
              </svg>
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <img
            key={image.id}
            className="img-fluid img-thumbnail"
            src={image.urls.small}
            alt={image.alt_description || "Image"}
          />
        ))}
      </div>
    </div>
  );
}