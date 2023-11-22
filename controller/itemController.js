import Item from '../models/itemModel.js';

export const addItem = async (req, res) => {
  try {
    const { userId } = req.body;
    let item = await Item.findOne({
      name: new RegExp(`^${req.body.name}$`, 'i'),
    });
    if (item) throw new Error('Item Already exists.');
    item = { ...item, userId: userId.toString() };

    await new Item(req.body).save();
    res.send({
      success: true,
      message: 'Item added successfully.',
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
    const { status, user_id } = req.body;
    let items;
    if (user_id) {
      items = await Item.find({ userId: user_id });
    } else if (!status || status === 'accepted') {
      items = [
        ...(await Item.find({ status: 'accepted' })),
        ...(await Item.find({ status: { $nin: ['pending', 'accepted'] } })),
      ];
    } else items = await Item.find({ status: 'pending' });
    res.send({
      success: true,
      message: 'Items fetched successfully.',
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

export const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    let item = await Item.findOne({ _id: itemId });
    item = { ...item, ...req.body };
    await item.save();
    res.send({
      success: true,
      message: 'Items Updated successfully.',
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    await Item.findOneAndDelete({ _id: itemId });
    res.send({
      success: true,
      message: 'Items Updated successfully.',
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
