import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-1/3">
        <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
        <p>Are you sure you want to delete this block?</p>
        <div className="flex justify-end mt-4">
          <button className="mr-2 p-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
