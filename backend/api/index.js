const express = require("express");
const app = express();

const dbConnect = require('../config/database');
app.use(express.json());

const cors = require('cors')
app.use(cors())

dbConnect();


const {checkuser,createuser,fetchuser,updateuser,api} = require('../controllers/User');


const {addBlock,deleteBlock, getAllBlocks,updateBlock,getAllBlocksBycategoryName,getBlocksBySubcategoryName} = require('../controllers/Block');
const {site,sites,createsite,deletesite,renamesite,duplicateSite,updatesubdomain,sitesbysubdomain,sitesbydomain,updateproject,projectload,updatedomain} = require('../controllers/Site');
const feedbackController = require('../controllers/Feedback'); 
const {addCategory, getCategories,addSubcategory,addSubclassification,getSubcategoriesByCategory} = require('../controllers/Category');

app.get('/api', api);
app.post('/checkuser', checkuser);
app.post('/createuser', createuser);
app.post('/fetchuser', fetchuser);      
app.post('/updateuser', updateuser);
app.post('/sites', sites);
app.post('/site', site);
app.post('/createsite', createsite);
app.post('/deletesite', deletesite);
app.post('/renamesite', renamesite);
app.post('/duplicateSite', duplicateSite);
app.post('/addBlock',addBlock);
app.delete('/deleteBlock',deleteBlock);
app.get('/getAllBlocks',getAllBlocks);
app.post('/updatesubdomain', updatesubdomain);
app.post('/updatedomain', updatedomain);
app.post('/sitesbysubdomain', sitesbysubdomain);
app.post('/sitesbydomain', sitesbydomain);
app.put('/updateBlock',updateBlock);
app.post('/updateproject', updateproject);
app.post('/projectload', projectload);
app.get('/projectload', projectload);
app.post('/feedback', feedbackController.addFeedback);
app.post('/addCategory',addCategory);
app.get('/getCategories',getCategories);
app.get('/getAllblocksbyCategories/:catagory',getSubcategoriesByCategory);
app.get('/getblocksbysubCategories/:categoryName/:subcategoryName',getBlocksBySubcategoryName);
app.get('/getblockbysubcat/:name',getAllBlocksBycategoryName);
app.post('/addsubcategory/:id',addSubcategory);
app.post('/addSubclassification/:categoryId/:subcategoryId', addSubclassification);

app.listen(8080, () => console.log("Server ready on port 8080."));

module.exports = app;