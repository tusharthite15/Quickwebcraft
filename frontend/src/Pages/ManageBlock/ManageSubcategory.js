import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing axios

function ManageSubcategory() {
  const [formData, setFormData] = useState({
    selectField: '',
    name: '', // Subcategory name
    subclassifications: [] // Initialize empty array for subclassifications
  });

  const [categories, setCategories] = useState([]); // State to hold category data

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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/addsubcategory/${formData.selectField}`, {
        name: formData.name,
        subclassifications: [] // Send an empty array for subclassifications
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Reset the form or show a success message here
      setFormData({ selectField: '', name: '', subclassifications: [] });
    } catch (error) {
      console.error('Error:', error);
      // Handle error here (e.g., show a notification)
    }
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+'/getCategories'); // Adjust the URL to your fetch route
        setCategories(response.data.categories); // Assuming the response structure is { categories: [...] }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Manage Subcategory</h2>

        <form onSubmit={handleSubmit}>
          {/* Select Field */}
          <div className="mb-4">
            <label htmlFor="selectField" className="block text-gray-700 font-medium mb-2">Select Category</label>
            <select
              id="selectField"
              name="selectField"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.selectField}
              onChange={handleChange}
            >
              <option value="" disabled>Select a category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Subcategory Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subcategory name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="bg-blue-500 hover:text-white border-2 px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Add Subcategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManageSubcategory;
