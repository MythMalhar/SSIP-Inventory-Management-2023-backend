import Item from "../models/itemModel.js";

export const addItem = async (req, res) => {
  try {
    // const items = req.body;
    const item = await Item.findOne({
      name: req.body.name,
      company: req.body.company,
    });
    console.log(item);
    if (item) throw new Error("Item Already existed.");
    await new Item(req.body).save();
    res.send({
      success: true,
      message: "Item added successfully.",
    });
  } catch (err) {
    res.send({
      success: true,
      message: err.message,
    });
  }
};

export const getItem = async (req, res) => {
  try {
    const item = await Item.find({});
    res.send({
      success: true,
      message: "Items fetched successfully.",
      data: item,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
