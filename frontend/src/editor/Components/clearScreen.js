import React from "react";

const Modal = ({ show, message, onConfirm, onClose }) => {
  if (!show) return null; // Do not render if `show` is false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm animate-fade-in">
        <p className="text-gray-800 text-lg font-semibold mb-4">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
