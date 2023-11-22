import Plan from '../models/planModel.js';

const millisecondsInDay = 86400000;

const whichPhase = (startDateMilliseconds, phaseDuration) => {
  const todayDateMilliseconds = new Date().getTime();
  if (todayDateMilliseconds < startDateMilliseconds) {
    return 'not-started';
  } else if (
    todayDateMilliseconds <
    startDateMilliseconds + phaseDuration * millisecondsInDay
  )
    return 'employee';
  else if (
    todayDateMilliseconds <
    startDateMilliseconds + 2 * phaseDuration * millisecondsInDay
  ) {
    return 'sub-branch';
  } else if (
    todayDateMilliseconds <
    startDateMilliseconds + 3 * phaseDuration * millisecondsInDay
  ) {
    return 'branch';
  } else if (
    todayDateMilliseconds <
    startDateMilliseconds + 4 * phaseDuration * millisecondsInDay
  ) {
    return 'department';
  }
  return 'completed';
};

export const addPlan = async (req, res) => {
  try {
    let { startDate, phaseDuration } = req.body;
    startDate = new Date(startDate);
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 8);

    const plan = new Plan({
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      phaseDuration,
      phase: 'employee',
    });
    await plan.save();
    res.send({
      success: true,
      message: 'Plan added successfully.',
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
    let plan = await Plan.findOne().sort({ created_at: -1 }).exec();
    if (!plan) {
      throw new Error('No plan exists');
    }
    let { startDate, endDate, phaseDuration } = plan;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const todayDateMilliseconds = new Date().getTime();
    if (endDate.getTime() < todayDateMilliseconds) {
      return res.send({
        success: false,
        message: 'Current Plan expired',
        plan,
      });
    }
    plan = {
      ...plan,
      phase: whichPhase(startDate.getTime(), phaseDuration),
    };
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
