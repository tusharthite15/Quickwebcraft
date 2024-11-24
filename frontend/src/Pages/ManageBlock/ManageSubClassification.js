import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageSubClassification() {
  const [formData, setFormData] = useState({
    selectField1: '',
    selectField2: '',
    name: 'General'
  });

  const [categories, setCategories] = useState([]); // State to hold categories
  const [subcategories, setSubcategories] = useState([]); // State to hold subcategories

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

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // If the first select is changed, fetch the corresponding subcategories
    if (name === 'selectField1') {
      const selectedCategory = categories.find(category => category._id === value);
      if (selectedCategory) {
        setSubcategories(selectedCategory.subcategories); // Set subcategories based on selected category
        setFormData(prev => ({ ...prev, selectField2: '' })); // Reset the second select field
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const categoryId = formData.selectField1; // Assuming category ID is the value of selectField1
    const subcategoryId = formData.selectField2; // Assuming subcategory ID is the value of selectField2
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/addSubclassification/${categoryId}/${subcategoryId}`, {
        name: formData.name // Assuming textField is the name for subclassification
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setFormData({ selectField1: '', selectField2: '', textField: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Manage SubClassification</h2>

        <form onSubmit={handleSubmit}>
          {/* Select Field 1 - Categories */}
          <div className="mb-4">
            <label htmlFor="selectField1" className="block text-gray-700 font-medium mb-2">Select Category</label>
            <select
              id="selectField1"
              name="selectField1"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.selectField1}
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

          {/* Select Field 2 - Subcategories */}
          <div className="mb-4">
            <label htmlFor="selectField2" className="block text-gray-700 font-medium mb-2">Select Subcategory</label>
            <select
              id="selectField2"
              name="selectField2"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.selectField2}
              onChange={handleChange}
              disabled={!formData.selectField1} // Disable if no category is selected
            >
              <option value="" disabled>Select a subcategory</option>
              {subcategories.map(subcategory => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          {/* Text Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Text Input</label>
            <p className='text-xs text-red-500'>"IMPORTANT:" If you have no subclassification still add<b> General</b>  </p>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter some text"
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

export default ManageSubClassification;
