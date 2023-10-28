import Item from "../models/itemModel.js";

export const addItem = async (req, res) => {
  try {
    // const items = req.body;
    const item = new Item(req.body);
    await item.save();
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
