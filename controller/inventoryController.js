import User from "../models/userModel.js";
import Item from "../models/itemModel.js";

export const addInventory = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const inventoryItems = await Promise.all(
      req.body.map(async (inventoryItem) => {
        console.log(inventoryItem);
        const item = await Item.findById(inventoryItem.itemId);
        user.inventory.forEach((x, index) => {
          if (x.itemId === inventoryItem.itemId) {
            user.inventory[index].quantity += inventoryItem.quantity;
            return {
              itemId: "duplicate",
            };
          }
        });
        return {
          ...inventoryItem,
          name: item.name,
          description: item.description,
          company: item.company,
          category: item.category,
          imageUrl: item.imageUrl,
        };
      })
    );
    const updatedInventoryItem = inventoryItems.filter(
      (inventoryItem) => inventoryItem.itemId !== "duplicate"
    );
    user.inventory.push(...updatedInventoryItem);
    await user.save();

    res.send({
      success: true,
      message: "Items added to inventory successfully.",
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
    const user = await User.findById(userId);
    res.send({
      success: true,
      message: "Inventory items fetched successfully.",
      inventory: user.inventory,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
      inventory: [],
    });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { userId, updatedQuantity, inventoryId } = req.body;
    const user = await User.findById(userId);
    user.inventory.forEach((inventoryItem, index) => {
      if (inventoryItem._id.toString() === inventoryId) {
        user.inventory[index].quantity = updatedQuantity;
      }
    });
    await user.save();
    res.send({
      success: true,
      message: "Inventory item updated successfully.",
      inventory: user.inventory,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
