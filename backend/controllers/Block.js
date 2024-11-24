const Block = require('../models/Block'); // Make sure to adjust the path as needed
const Category = require('../models/Category'); // Import the Category model


exports.addBlock = async (req, res) => {
    try {
        console.log("Block:", req.body);
        const { label, library, media, content, category, subcategory, subclassification } = req.body;

        // Validate required fields
        if (!label || !library || !media || !content || !category || !subcategory || !subclassification) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Create the new block with subcategory and subclassification
        const response = await Block.create({
            label,
            library, 
            media,
            content,
            category,
            subcategory,
            subclassification
        });

        return res.status(201).json({
            success: true,
            message: "Block created successfully",
            _id: response._id // Return the newly created block's _id
        });
    } catch (error) {
        console.error("Error adding block:", error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

exports.deleteBlock = async (req, res) => {
    try {
        const { _id } = req.body; // Extract the _id from the request body
        if (!_id) {
            return res.status(400).json({ success: false, message: "Block ID is required." });
        }

        // Delete the block by its ID directly
        const deletedBlock = await Block.findByIdAndDelete(_id);

        if (!deletedBlock) {
            return res.status(404).json({ success: false, message: "Block not found." });
        }

        return res.status(200).json({
            success: true,
            message: "Deleted"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

exports.getAllBlocks = async (req, res) => {
    try {
        const blocks = await Block.find({});
        return res.status(200).json({
            success: true,
            data: blocks
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Controller function to fetch blocks by subcategory name
exports.getAllBlocksBycategoryName = async (req, res) => {
    try {
        const { name } = req.params;
    
        // Find the category by name
        const category = await Category.findOne({ name: name.trim() });
    
        if (!category) {
          return res.status(404).json({ error: `Category '${name}' not found.` });
        }
    
        // Initialize the response structure
        const response = {
          category: category.name,
          subcategories: []
        };
    
        // Iterate through each subcategory
        for (const subcategory of category.subcategories) {
          // Find all components matching the category and subcategory
          const components = await Block.find({
            category: category._id,
            subcategory: subcategory._id
          }).select('-__v'); // Exclude __v field if not needed
    
          // Structure each subcategory with its components
          response.subcategories.push({
            subcategory: subcategory.name,
            components: components.map(comp => ({
              id: comp._id,
              label: comp.label,
              library: comp.library,
              media: comp.media,
              content: comp.content,
              subclassification: comp.subclassification
            }))
          });
        }
    
        res.json(response);
      } catch (err) {
        console.log(err);
      }
};



exports.getBlocksBySubcategoryName = async(req, res) => {
    const { categoryName, subcategoryName } = req.params;

    try {
        // Step 1: Find the category by name
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).send(`Category '${categoryName}' not found`);
        }

        // Step 2: Find the subcategory by name within the category
        const subcategory = category.subcategories.find(sub => sub.name === subcategoryName);
        if (!subcategory) {
            return res.status(404).send(`Subcategory '${subcategoryName}' not found in '${categoryName}'`);
        }

        // Step 3: Retrieve blocks associated with the found category and subcategory
        const blocks = await Block.find({
            category: category._id,
            subcategory: subcategory._id
        });

        // Step 4: Return the blocks to the client
        res.json(blocks);
    } catch (error) {
        console.error('Error fetching blocks:', error);
        res.status(500).send('Error fetching blocks');
    }
}
  
  



exports.updateBlock = async (req, res) => {
    const { _id, label, library, media, content, category, subcategory, subclassification } = req.body;
  
    // Validate required fields
    if (!label || !media || !library || !content || !category || !subcategory || !subclassification) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      // Find the block by ID and update it
      const updatedBlock = await Block.findByIdAndUpdate(
        _id,
        { label,library, media, content, category, subcategory, subclassification },
        { new: true } // This option returns the updated document
      );
  
      if (!updatedBlock) {
        return res.status(404).json({ message: 'Block not found' });
      }
  
      res.status(200).json({ message: 'Block updated successfully', data: updatedBlock });
    } catch (error) {
      console.error("Error updating block:", error);
      res.status(500).json({ message: 'Server error' });
    }
};

  
