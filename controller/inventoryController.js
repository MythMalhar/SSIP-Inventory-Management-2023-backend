import User from '../models/userModel.js';
import Item from '../models/itemModel.js';

export const addInventory = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const inventoryItems = await Promise.all(
      req.body.map(async (inventoryItem) => {
        const item = await Item.findById(inventoryItem.itemId);
        let flag = false;
        user.inventory.forEach((x, index) => {
          if (x.itemId.toString() === inventoryItem.itemId) {
            user.inventory[index].quantity += +inventoryItem.quantity;
            flag = true;
          }
        });
        if (flag === true)
          return {
            itemId: 'duplicate',
          };
        return {
          ...inventoryItem,
          name: item.name,
          description: item.description,
          company: item.company,
          category: item.category,
          imageUrl: item.imageUrl,
          minValue: item.minValue,
          maxValue: item.maxValue
        };
      })
    );
    const updatedInventoryItem = inventoryItems.filter(
      (inventoryItem) => inventoryItem.itemId !== 'duplicate'
    );
    user.inventory.push(...updatedInventoryItem);
    await user.save();

    res.send({
      success: true,
      message: 'Items added to inventory successfully.',
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
      message: 'Inventory items fetched successfully.',
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
      message: 'Inventory item updated successfully.',
      inventory: user.inventory,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const { userId } = req.body;
    const { inventoryId } = req.params;
    const user = await User.findById(userId);

    const updatedInventory = user.inventory.filter(
      (inventoryItem) => inventoryItem._id.toString() !== inventoryId
    );
    user.inventory = updatedInventory;

    await user.save();

    res.send({
      success: true,
      message: 'deleted successfully',
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};