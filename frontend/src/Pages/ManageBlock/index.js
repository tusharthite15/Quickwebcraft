import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from './ConfirmationModal';
export default function ManageBlock() {
  const [label, setLabel] = useState("");
  const [library, setLibrary] = useState("");
  const [media, setMedia] = useState("<img src=''/> ");
  const [content, setContent] = useState("");
  const [blocks, setBlocks] = useState([]);
  // const [category, setSelectedOption] = useState("Design/Template");
  const [sortCategory, setSortCategory] = useState("");
  const [searchLabel, setSearchLabel] = useState(""); // New state for search
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subclassifications, setSubclassifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockToDelete, setBlockToDelete] = useState(null);
  const navigate = useNavigate();

  // Function to handle category change
  const handleChange = (e) => {
    // setSelectedOption(e.target.value);
  };

  // Function to handle sorting category change
  // const handleSortChange = (e) => {
  //   setSortCategory(e.target.value);
  // };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL+"/getAllBlocks"
      );
      setBlocks(response.data.data);
    } catch (error) {
      console.error("Error fetching blocks:", error);
    }
  };

  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    subclassification: '',
  });

  const addBlock = async () => {
    const data = {
      id: "image",
      label,
      library,
      media,
      content,
      ...formData,
    };
    try {

      const response = await axios.post(
        process.env.REACT_APP_API_URL+"/addBlock",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     
      setBlocks([...blocks, { ...data, _id: response.data._id }]);
      setLabel("");
      setLibrary("");
      setMedia("<img src=''/> ");
      setContent("");
      // setSelectedCategory("");
      // setSelectedSubcategory("");
      setSubclassifications([]); // Reset subclassifications
      // setSelectedSubclassification(""); // Reset subclassification
      setFormData({ category: '', subcategory: '', subclassification: '' }); // Reset form data
      // Show success notification
      toast.success("Block Added Successfully!");
    } catch (error) {
      console.error("Error adding block:", error);
      // Show error notification
      toast.error("Failed to add the block.");
    }
  };

  

  const deleteBlock = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/deleteBlock`, {
        data: { _id: id },
      });
      setBlocks(blocks.filter((block) => block._id !== id));
      toast.success('Block Deleted Successfully!');
    } catch (error) {
      console.error('Error deleting block:', error);
      toast.error('Failed to delete the block.');
    }
  };

  const handleDeleteClick = (id) => {
    setBlockToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (blockToDelete) {
      deleteBlock(blockToDelete);
    }
    setIsModalOpen(false);
    setBlockToDelete(null);
  };

  // Sort blocks based on the selected category
  const sortedBlocks = sortCategory
    ? blocks.filter((block) => block.category === sortCategory)
    : blocks;

  // Filter blocks by search label
  const filteredBlocks = sortedBlocks.filter((block) =>
    block.label.toLowerCase().includes(searchLabel.toLowerCase())
  );

  const handleBlockClick = (block) => {
    navigate(`/update-block/${block._id}`, { state: { block } });
  };

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
    setFormData({ ...formData, category: categoryId, subcategory: '', subclassification: '' });

    // Fetch subcategories based on selected category
    const selectedCategory = categories.find(category => category._id === categoryId);
    setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
  };

  const handleSelect2Change = (e) => {
    const subcategoryId = e.target.value;
    setFormData({ ...formData, subcategory: subcategoryId, subclassification: '' });

    // Fetch subclassifications based on selected subcategory
    const selectedSubcategory = subcategories.find(subcategory => subcategory._id === subcategoryId);
    setSubclassifications(selectedSubcategory ? selectedSubcategory.subclassifications : []);
  };

  const handleChange1 = (e) => {
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
    <div className="flex flex-col items-center justify-center bg-[#323232] p-10">
      <ToastContainer />
      <p className="text-white font-bold text-3xl">Manage Blocks here</p>

      <div className=" bg-white rounded mt-2 p-4 flex ">
      <div className="flex flex-col mx-10 w-5/6">
        <label className="block text-gray-700 font-medium my-2">Label:</label>
        <input
          type="text"
          placeholder="Enter Block Label"
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
        <textarea rows={3}
          type="text"
          placeholder="Enter Media"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
          className="w-full px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
        />
        <label className="block text-gray-700 font-medium my-2">Content:</label>
        <textarea rows={10}
          type="text"
          placeholder="Enter Block Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
        />
        </div>

        <div className="flex flex-col mx-10 w-5/6">
         <label htmlFor="category" className="block text-gray-700 font-medium my-2">Select Category</label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
              value={formData.category}
              onChange={handleSelect1Change}
            >
              <option value="" disabled>Select a category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
            <label htmlFor="subcategory" className="block text-gray-700 font-medium my-2">Select Subcategory</label>
            <select
              id="subcategory"
              name="subcategory"
              className="w-full px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
              value={formData.subcategory}
              onChange={handleSelect2Change}
              disabled={!subcategories.length} // Disable if no subcategories
            >
              <option value="" disabled>Select a subcategory</option>
              {subcategories.map(subcategory => (
                <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
              ))}
            </select>
            <label htmlFor="subclassification" className="block text-gray-700 font-medium my-2">Select Subclassification</label>
            <select
              id="subclassification"
              name="subclassification"
              className="w-full px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
              value={formData.subclassification}
              onChange={handleChange1}
              disabled={!subclassifications.length} // Disable if no subclassifications
            >
              <option value="" disabled>Select a subclassification</option>
              {subclassifications.map(subclassification => (
                <option key={subclassification._id} value={subclassification._id}>{subclassification.name}</option>
              ))}
            </select>




        <button
          className="bg-black p-2  mx-auto my-4 w-full text-center rounded-md text-white transition duration-150 active:scale-95 hover:opacity-90 "
          onClick={addBlock}
        >
          Add
        </button>
        </div>
      </div>

      {/* Display the blocks */}

      <div className="mt-4 w-full flex flex-col items-center justify-center ">
        <h2 className="text-white font-bold text-3xl">Blocks</h2>
        <div className="w-full flex justify-between items-center">
          <div className="mt-4 items-center">
            <label className="text-white mb-2">Sort by Category:</label>
            <select
              value={sortCategory}
              onChange={(e) => setSortCategory(e.target.value)}
              className="w-full my-2 px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div className=" " >
            <div className="text-white font-bold text-center w-full">Legend</div>
            <div className="mt-2 flex space-x-2   justify-center items-center">
              <div className="flex justify-center items-center ">
                <div className="w-4 h-4 bg-slate-600 rounded-full mr-2"></div>
                <span className="text-white">Library</span>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-white">Category</span>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-white">Subcategory</span>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-white">Subclassification</span>
              </div>
            </div>
          </div>

          {/* Search Block by Label */}
          <div className="mt-4">
            <label className="text-white ">Search by Label: </label>
            <input
              type="text"
              placeholder="Enter Label to Search"
              value={searchLabel}
              onChange={(e) => setSearchLabel(e.target.value)}
              className="w-full my-2 px-4 py-2 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
          </div>
        </div>
        <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {filteredBlocks.map((block) => {
  // Find the category by block.category
  const category = categories.find(cat => cat._id === block.category);
  const categoryName = category?.name || "Unknown Category";

  // Find the subcategory by block.subcategory
  const subcategory = category?.subcategories.find(subcat => subcat._id === block.subcategory);
  const subcategoryName = subcategory?.name || "No Sub";

  // Find the subclassification by block.subclassification
  const subclassification = subcategory?.subclassifications.find(subclass => subclass._id === block.subclassification);
  const subclassificationName = subclassification?.name || "None";

  return (
    <div
      key={block._id}
      className="bg-white p-4 rounded-lg shadow w-[300px] relative h-[250px] overflow-hidden cursor-pointer hover:scale-95 hover:opacity-90 transition duration-150 ease-in"
      onClick={() => handleBlockClick(block)} // Navigate on block click
    >
   <span className="flex justify-between mt-6 mb-2">
  <div className="flex flex-col justify-start mb-2">
    <h3 className="font-bold capitalize mb-1 text-ellipsis overflow-hidden whitespace-nowrap">{block.label}</h3>
    <div className="flex justify-content items-center flex-wrap">
      <p className="my-1 text-[10px] capitalize bg-slate-200 rounded-full text-center px-2 font-bold text-slate-600 border border-slate-500 overflow-hidden whitespace-nowrap text-ellipsis">
        {block.library || "N/A"}
      </p>
      <p className="my-1 border-2 text-[10px] font-bold rounded-full px-2 items-center flex mx-1 border-blue-500 text-blue-600 bg-blue-200 overflow-hidden whitespace-nowrap text-ellipsis">
        {categoryName}
      </p>
      <p className="my-1 border-2 text-[10px] font-bold rounded-full px-2 items-center flex border-purple-500 text-purple-600 bg-purple-200 overflow-hidden whitespace-nowrap text-ellipsis">
        {subcategoryName}
      </p>
      <p className="border-2 text-[10px] font-bold rounded-full px-2 items-center mx-1 flex border-green-500 text-green-600 bg-green-200 overflow-hidden whitespace-nowrap text-ellipsis">
        {subclassificationName}
      </p>
    </div>
  </div>
</span>


      <div className="mb-2" dangerouslySetInnerHTML={{ __html: block.content }} />

      <button
        onClick={(e) => {
          e.stopPropagation(); // Stop navigation on delete
          handleDeleteClick(block._id);
        }}
        className="absolute top-2 right-2 p-1 text-red-500 hover:border-2 hover:bg-red-500 rounded-full hover:text-white active:scale-95 transition"
        aria-label="Delete Block"
      >
        <Cross2Icon width={20} height={20} />
      </button>
    </div>
  );
})}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      {/* Display the blocks END */}
    </div>
  );
}
