import User from "../models/userModel.js";
import Item from "../models/itemModel.js";

export const addInventory = async (req, res) => {
  try {
    const { userId } = req.body;
    // console.log(req.body);
    const user = await User.findById(userId);
    user.inventory.push(...req.body);
    await user.save();

    res.send({
      success: true,
      message: "Item added to inventory successfully.",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const getInventory = async (req, res) => {
  try {
    const { userId } = req.body;
    // console.log(req.body);
    const user = await User.findById(userId);
    let inventoryArray = [];
    user.inventory.forEach((element) => {
      if (element.itemId === Item.findById()) {
        inventoryArray.push(user.orders);
      }
    });
    res.send({
      success: true,
      message: "Inventory items fecthed successfully.",
      inventory: inventoryArray,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
