import item from "../models/itemModel.js";

const addItem = async (req, res) => {
  try {
    // const items = req.body;
    item.insertMany(req.body);
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
export default addItem;