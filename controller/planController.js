import Plan from '../models/planModel.js';

const millisecondsInDay = 86400000;

const whichPhase = (startDateMilliseconds) => {
  const todayDateMilliseconds = new Date().getTime();
  if (todayDateMilliseconds < startDateMilliseconds) {
    return 'not-started';
  } else if (
    todayDateMilliseconds <
    startDateMilliseconds + 2 * millisecondsInDay
  )
    return 'employee';
  else if (
    todayDateMilliseconds <
    startDateMilliseconds + 4 * millisecondsInDay
  ) {
    return 'sub-branch';
  } else if (
    todayDateMilliseconds <
    startDateMilliseconds + 6 * millisecondsInDay
  ) {
    return 'branch';
  } else if (
    todayDateMilliseconds <
    startDateMilliseconds + 8 * millisecondsInDay
  ) {
    return 'department';
  }
  return 'completed';
};

export const addPlan = async (req, res) => {
  try {
    const { startDate, phaseDuration } = req.body;
    console.log(startDate);
    let endDate = startDate;
    endDate.setDate(endDate.getDate() + 8);

    const plan = new Plan({
      startDate,
      endDate,
      phaseDuration,
      phase: 'employee',
    });
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

export const getRecentPlan = async (req, res) => {
  try {
    const plan = Plan.findOne.sort({ created_at: -1 });
    if (!plan) {
      throw new Error('No plan exists');
    }
    const { startDate, phaseDuration } = plan;
    const todayDateMilliseconds = new Date().getTime();
    const endingDate =
      startDate.getTime() + millisecondsInDay * phaseDuration * 4;
    if (endingDate > todayDateMilliseconds) {
      return res.send({
        success: false,
        message: 'Current Plan expired',
        plan,
      });
    }
    plan = { ...plan, phase: whichPhase(startDate.getTime()) };
    res.send({
      success: true,
      message: 'Plan fetched successfully.',
      plan,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

/*
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
*/
