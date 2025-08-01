import Item from "../models/item.model";

export const getUserItems = async (req, res) => {
    try {
        const {category, location, type, dateLost} = req.query;

        const filter = {email: req.user.email};
        if (category) filter.category = category;
        if (location) filter.location = location;
        if (type) filter.type = type;
        if (dateLost) filter.dateLost = dateLost;
        if (dateFound) filter.dateFound = dateFound;

        const items = await Item.find(filter).sort({createdAt:-1});
        res.json({success: true, data:items}); // send data back to frontend 
    } catch (err) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
};

// req is passed from the authorisepostowner middleware to this
// the middleware attaches item to the req 
export const getItemById = (req, res) => {
  if (!req.item) {
    // Misconfigured route (middleware missing or failed)
    return res.status(500).json({ success: false, message: 'Item not loaded' });
  }
  return res.json({ success: true, data: req.item });
}; // for when you want to edit one specific item 

export const updateItem = async (req, res) => {
    try {
        const {
            name, 
            description, 
            category,
            location, 
            type, 
            dateLost = '',
            dateFound = '',
        } = req.body;

        const update = {
        // construct new object with the fields obtained in req.body
            ...(name !== undefined && {name}),
            ...(description !== undefined && {description}),
            ...(category !== undefined && {category}),
            ...(location !== undefined && {location}),
            ...(type !== undefined && {type}),
            dateLost : type === 'lost' ? dateLost : '',
            dateFound: type === 'found' ? dateFound : '',
        };

        if (req.file) {
            update.image = req.file.filename;
        }

        const id = req.item?._id || req.params.id;

        const doc = await Item.findByIdAndUpdate(id, update, {
            new: true, 
            runValidators: true,
        });

        if (!doc) return res.status(404).json({success:false, message: 'Not Found'});
        res.json({success:true, data: doc}); // send updated item back to frontend (safety)
    } catch (err) {
        res.status(500).json({success: false, message: "Server Error"});
    }
};


export const deleteItem = async (req, res) => {
    try {
        const id = req.item?._id || req.params.id;
        const doc = await Item.findByIdAndDelete(id);
        if (!doc) return res.status(404).json({success: false, message: 'Not Found'});

        res.json({success: true, message: 'Deleted'});
    } catch (err) {
        res.status(500).json({success: false, message: "Server Error"});
    }
};