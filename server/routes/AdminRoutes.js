const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const Category = require("../models/CategorySchema");

const Item = require("../models/ItemSchema");

const router = require("express").Router();

// create cat

router.post("/", async (req , res) => {
    const newCategory = new Category(req.body);

    try{
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    }catch(err) {
        res.status(500).json(err)
    }
});


//create item by id of category

router.put("/addItem/:id", async (req,res) => {
    try{
        const newItem = new Item(req.body);
        
        const saveNewItem = await newItem.save();
        const specifiedCategory = await Category.findByIdAndUpdate(req.params.id, {
            $push: { items: newItem}
        }, {new:true});
      
        console.log(await Category.findOne().populate("items"));
        res.status(200).json(specifiedCategory)
    }catch(err) {
        res.status(500).json(err)
    }

})

//delete category

router.delete("/deleteCategory/:id", async (req,res) => {
    try{
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json("Category is deleted")

    }catch (err){
        res.status(500).json(err)
    }
});

//delete item

router.put("/deleteItem/:CategoryId/:ItemId", async (req,res) => {
    try{
        await Item.findByIdAndDelete(req.params.ItemId)
        Category.findOneAndUpdate(
            { _id: req.params.CategoryId},
            { $pull: {items: req.params.ItemId}},
            { new: true },
            function(err) { 
                if(err){ console.log(err)}
            }
        )
        res.status(200).json("Item has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
});

//get all category with items

router.get("/findallcatwithitems", async (req,res) => {
    try{
        const allCategoriesWithItems = await Category.find().populate('items');
        res.status(200).json(allCategoriesWithItems)
    }catch(err) {
        res.status(500).json(err)
    }
})

//get items
router.get("/findallitems", async (req,res) => {
    try{
        const allItems = await Item.find()
        res.status(200).json(allItems);
        
    }catch(err) {
        res.status(500).json(err)
    }
})




//get all category
router.get("/findallcat", async (req,res) => {
    try{
        const allCategories = await Category.find();
        res.status(200).json(allCategories)
    }catch(err) {
        res.status(500).json(err)
    }
})

// edit category

router.put('/updateCategory/:id', async (req,res) => {
    try{
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true})
        res.status(200).json(updatedCategory)
    } catch(err) {
        res.status(500).json(err)
    }
})

//edit item 

router.put("/updateItem/:ItemId", async (req,res) => {
    try{
      const updatedItem = await Item.findByIdAndUpdate(req.params.ItemId, {
        $set: req.body
      }, {new:true})
        res.status(200).json(updatedItem)
    }catch(err){
        res.status(500).json(err)
    }
});

//admin Login
router.post('/login', (req,res) => {
    try{
        const AdminInfo = req.body

        if(AdminInfo.username == process.env.AdminUsername && AdminInfo.password == process.env.AdminPassword){
            jwt.sign({admin: AdminInfo, role:'admin'}, process.env.jwtSecret, async (err, token) => {
                res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000})
                return res.status(200).json(true)
            }) 
        } else {
            return res.send(false).status(403)
        }
    }catch(err){
       console.log("Error at Admin Login" + err)
    }
})

module.exports = router;