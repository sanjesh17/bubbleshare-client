import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUpload } from "react-icons/fi";

const BubbleDetails = ({ bubbleId, onClose }) => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, [bubbleId]);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://bubbleshare-be.onrender.com/bubbles/${bubbleId}/photos`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch photos");

      setPhotos(
        data.map((photo) => ({
          ...photo,
          previewUrl: `https://drive.google.com/thumbnail?id=${photo.fileId}&sz=w800`,
          downloadUrl: `https://drive.google.com/uc?id=${photo.fileId}`, // Full resolution link
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG, GIF, and WEBP images are allowed.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `https://bubbleshare-be.onrender.com/bubbles/${bubbleId}/upload`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");

      setPhotos((prev) => [
        ...prev,
        {
          fileId: data.fileId,
          previewUrl: `https://drive.google.com/thumbnail?id=${data.fileId}&sz=w800`,
          downloadUrl: `https://drive.google.com/uc?id=${data.fileId}`,
        },
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-6">
      <motion.div
        className="bg-white p-6 rounded-2xl w-full max-w-4xl shadow-lg relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bubble Images</h2>
          <button
            className="text-lg text-gray-600 hover:text-black"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600 text-center">Loading images...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <label
              htmlFor="fileUpload"
              className="w-full h-56 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:bg-gray-100"
            >
              <FiUpload className="text-gray-500 text-4xl mb-2" />
              <span className="text-gray-500">
                {uploading ? "Uploading..." : "Upload Image"}
              </span>
              <input
                type="file"
                accept="image/jpeg, image/png, image/gif, image/webp"
                onChange={handleFileUpload}
                className="hidden"
                id="fileUpload"
              />
            </label>
            {photos.length > 0 ? (
              photos.map((photo, index) => (
                <motion.div
                  key={photo.fileId}
                  className="w-full h-56 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a
                    href={photo.downloadUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={photo.previewUrl}
                      alt="Bubble Photo"
                      className="w-full h-full object-cover rounded-xl shadow-md"
                    />
                  </a>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-2"></p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BubbleDetails;
