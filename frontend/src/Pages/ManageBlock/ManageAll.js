import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageAll() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subclassifications, setSubclassifications] = useState([]);
  const [formData, setFormData] = useState({
    selectField1: '',
    selectField2: '',
    selectField3: '',
  });

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+'/getCategories'); // Adjust the URL as needed
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSelect1Change = async (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, selectField1: categoryId, selectField2: '', selectField3: '' });

    // Fetch subcategories based on selected category
    const selectedCategory = categories.find(category => category._id === categoryId);
    setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
  };

  const handleSelect2Change = (e) => {
    const subcategoryId = e.target.value;
    setFormData({ ...formData, selectField2: subcategoryId, selectField3: '' });

    // Fetch subclassifications based on selected subcategory
    const selectedSubcategory = subcategories.find(subcategory => subcategory._id === subcategoryId);
    setSubclassifications(selectedSubcategory ? selectedSubcategory.subclassifications : []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can make the API call to submit the data
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Manage Classification</h2>

        <form onSubmit={handleSubmit}>
          {/* Select Field 1 (Categories) */}
          <div className="mb-4">
            <label htmlFor="selectField1" className="block text-gray-700 font-medium mb-2">Select Category</label>
            <select
              id="selectField1"
              name="selectField1"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.selectField1}
              onChange={handleSelect1Change}
            >
              <option value="" disabled>Select a category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Select Field 2 (Subcategories) */}
          <div className="mb-4">
            <label htmlFor="selectField2" className="block text-gray-700 font-medium mb-2">Select Subcategory</label>
            <select
              id="selectField2"
              name="selectField2"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.selectField2}
              onChange={handleSelect2Change}
              disabled={!subcategories.length} // Disable if no subcategories
            >
              <option value="" disabled>Select a subcategory</option>
              {subcategories.map(subcategory => (
                <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
              ))}
            </select>
          </div>

          {/* Select Field 3 (Subclassifications) */}
          <div className="mb-4">
            <label htmlFor="selectField3" className="block text-gray-700 font-medium mb-2">Select Subclassification</label>
            <select
              id="selectField3"
              name="selectField3"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.selectField3}
              onChange={handleChange}
              disabled={!subclassifications.length} // Disable if no subclassifications
            >
              <option value="" disabled>Select a subclassification</option>
              {subclassifications.map(subclassification => (
                <option key={subclassification._id} value={subclassification._id}>{subclassification.name}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="bg-blue-500 hover:text-white border-2 px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManageAll;