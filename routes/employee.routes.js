const { Router } = require("express");
const User = require("../models/User");

const router = Router();

const msPerDay = 24 * 60 * 60 * 1000;

router.post("/add/vacation", async (req, res) => {
  try {
    const { date, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(200)
        .json({ message: "User was deleted or didn't exist" });
    }

    if (Date.now() > new Date(date.start)) {
      return res.status(200).json({ message: "Choosen date less than now" });
    }

    for (let item of user.vacationList) {
      const vacExpression_1 = item.start <= date.start && item.end >= date.end;

      const vacExpression_2 =
        item.start <= date.start && item.end >= date.start;

      const vacExpression_3 = item.start <= date.end && item.end >= date.end;

      if (vacExpression_1 || vacExpression_2 || vacExpression_3) {
        return res
          .status(200)
          .json({ message: "Such vacation already exists" });
      }
    }

    const timeEnd = new Date(date.end).getTime();
    const timeStart = new Date(date.start).getTime();

    const vacLength = Math.floor((timeEnd - timeStart) / msPerDay) + 1;

    const newBalance = user.balance - vacLength;

    if (newBalance < 0) {
      return res.status(200).json({
        message: "You don't have enough days on your balance for such vacation"
      });
    }

    user.vacationList.push(date);

    user.balance = newBalance;

    await user.save();

    res.status(200).json({ user, message: "Vacation added successfully" });
  } catch (e) {}
});

router.delete("/delete/vacation", async (req, res) => {
  try {
    const { userId, index } = req.body;

    let user = await User.findById(userId);

    if (!user) {
      return res
        .status(200)
        .json({ message: "User was deleted or didn't exist" });
    }

    const timeEnd = new Date(user.vacationList[index].end).getTime();
    const timeStart = new Date(user.vacationList[index].start).getTime();

    const vacLength = Math.floor((timeEnd - timeStart) / msPerDay) + 1;

    user.balance += vacLength;

    user.vacationList.splice(index, 1);

    await user.save();

    res
      .status(200)
      .json({ user, message: "Vacation was successfully deleted" });
  } catch (e) {}
});

router.post("/update/vacation", async (req, res) => {
  try {
    const { userId, index, date } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(200)
        .json({ message: "User was deleted or didn't exist" });
    }

    if (Date.now() > new Date(date.start)) {
      return res.status(200).json({ message: "Choosen date less than now" });
    }

    for (let i = 0; i < user.vacationList.length; i++) {
      const item = user.vacationList[i];
      if (index !== i) {
        const vacExpression_1 =
          item.start <= date.start && item.end >= date.end;

        const vacExpression_2 =
          item.start <= date.start && item.end >= date.start;

        const vacExpression_3 = item.start <= date.end && item.end >= date.end;

        if (vacExpression_1 || vacExpression_2 || vacExpression_3) {
          return res
            .status(200)
            .json({ message: "Such vacation already exists" });
        }
      }
    }

    let timeEnd = new Date(user.vacationList[index].end).getTime();
    let timeStart = new Date(user.vacationList[index].start).getTime();

    let vacLength = Math.floor((timeEnd - timeStart) / msPerDay) + 1;

    let newBalance = user.balance + vacLength;

    timeEnd = new Date(date.end).getTime();
    timeStart = new Date(date.start).getTime();

    vacLength = Math.floor((timeEnd - timeStart) / msPerDay) + 1;

    newBalance -= vacLength;

    if (newBalance < 0) {
      return res.status(200).json({
        message: "You don't have enough days on your balance for such vacation"
      });
    }

    user.vacationList[index] = date;

    user.balance = newBalance;

    await user.save();

    res
      .status(200)
      .json({ user, message: `Vacation №${index + 1} updated successfully` });
  } catch (e) {}
});

module.exports = router;
