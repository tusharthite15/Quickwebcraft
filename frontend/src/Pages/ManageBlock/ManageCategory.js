import React, { useState } from 'react';
import axios from 'axios'; // Importing axios

function ManageCategory() {
  const [formData, setFormData] = useState({
    name: '',
    subcategories: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the form data to be sent to the backend

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL+'/addCategory', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // You can reset the form or show a success message here
      setFormData({ name: '',
        subcategories: [], });
    } catch (error) {
      console.error('Error:', error);
      // Handle error here (e.g., show a notification)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Category</h2>

        <form onSubmit={handleSubmit}>
          {/* Field 1 */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Category</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="bg-blue-500 hover:text-white border-2 px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManageCategory;
