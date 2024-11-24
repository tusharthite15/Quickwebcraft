import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateBlock() {
  const location = useLocation();
  const navigate = useNavigate();
  const block = location.state.block; // Get the block data passed through navigation
  
  const [label, setLabel] = useState(block.label);
  const [media, setMedia] = useState(block.media);
  const [content, setContent] = useState(block.content);
  const [library, setLibrary] = useState(block.library);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subclassifications, setSubclassifications] = useState([]);

  const [formData, setFormData] = useState({
    selectField1: block.category,
    selectField2: block.subcategory,
    selectField3: block.subclassification,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+"/getCategories");
        setCategories(response.data.categories);

        // Auto-select subcategories and subclassifications based on block data
        const selectedCategory = response.data.categories.find(
          (category) => category._id === block.category
        );
        setSubcategories(selectedCategory ? selectedCategory.subcategories : []);

        const selectedSubcategory = selectedCategory?.subcategories.find(
          (subcategory) => subcategory._id === block.subcategory
        );
        setSubclassifications(selectedSubcategory ? selectedSubcategory.subclassifications : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [block]);

  const handleSelect1Change = async (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, selectField1: categoryId, selectField2: "", selectField3: "" });

    // Fetch subcategories based on selected category
    const selectedCategory = categories.find((category) => category._id === categoryId);
    setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
    setSubclassifications([]); // Clear subclassifications when category changes
  };

  const handleSelect2Change = (e) => {
    const subcategoryId = e.target.value;
    setFormData({ ...formData, selectField2: subcategoryId, selectField3: "" });

    // Fetch subclassifications based on selected subcategory
    const selectedSubcategory = subcategories.find((subcategory) => subcategory._id === subcategoryId);
    setSubclassifications(selectedSubcategory ? selectedSubcategory.subclassifications : []);
  };

  const handleSelect3Change = (e) => {
    const { selectField3, value } = e.target;
    setFormData({
      ...formData,
      selectField3: value,
    });
  };

  const handleUpdateBlock = async () => {
    const updatedBlock = {
      _id: block._id,
      label,
      library,
      media,
      content,
      category: formData.selectField1,
      subcategory: formData.selectField2,
      subclassification: formData.selectField3,
    };

    try {
      await axios.put(process.env.REACT_APP_API_URL+"/updateBlock", updatedBlock, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Block updated successfully!");

      // Delay navigation to allow the toast to display
      setTimeout(() => {
        navigate("/admin/manageblock");
      }, 2000); // Adjust the time (in milliseconds) as needed
    } catch (error) {
      console.error("Error updating block:", error);
      toast.error("Oops! Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#323232] p-10 ">
      <ToastContainer />
      <p className="text-white font-bold text-3xl">Update Block</p>
      <div className=" bg-white rounded mt-2 p-4 flex ">
      <div className="flex flex-col mx-10 w-5/6">
        <label className="block text-gray-700 font-medium my-2">Label:</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
        />
        <label className="block text-gray-700 font-medium my-2">Library:</label>
        <input
          type="text"
          placeholder="Enter Block library"
          value={library}
          onChange={(e) => setLibrary(e.target.value)}
          className="w-full px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
        />
        <label className="block text-gray-700 font-medium my-2">Media:</label>
        <textarea
          rows={3}
          type="text"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
          className="w-full px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
        />

        <label className="block text-gray-700 font-medium my-2">Content:</label>
        <textarea
          rows={12}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
        />
        </div>
      <div className="flex flex-col mx-10 w-5/6">
        <label className="block text-gray-700 font-medium my-2">Category:</label>
        <select
          value={formData.selectField1}
          onChange={handleSelect1Change}
           className="w-full px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label className="block text-gray-700 font-medium my-2">Subcategory:</label>
        <select
          value={formData.selectField2}
          onChange={handleSelect2Change}
           className="w-full px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
          disabled={!subcategories.length}
        >
          <option value="" disabled>Select a subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>
              {subcategory.name}
            </option>
          ))}
        </select>

        <label className="block text-gray-700 font-medium my-2">Subclassifications:</label>
        <select
          value={formData.selectField3}
          onChange={handleSelect3Change}
           className="w-full px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
          disabled={!subclassifications.length}
        >
          <option value="" disabled>Select a subclassification</option>
          {subclassifications.map((subclassification) => (
            <option key={subclassification._id} value={subclassification._id}>
              {subclassification.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleUpdateBlock}
          className="bg-black p-2  mx-auto my-4 w-full text-center rounded-md text-white transition duration-150 active:scale-95 hover:opacity-90 "
        >
          Update Block
        </button>
        </div>
      </div>
    </div>
  );
}
