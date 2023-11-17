import Item from "../models/itemModel.js";

export const addItem = async (req, res) => {
  try {
    const item = await Item.findOne({
      name: new RegExp(`^${req.body.name}$`, "i"),
    });
    if (item) throw new Error("Item Already exists.");
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

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.send({
      success: true,
      message: "Items fetched successfully.",
      items,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
      items: [],
    });
  }
};
