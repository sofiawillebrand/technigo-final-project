import mongoose from "mongoose";

const CheckedTaskSchema = new mongoose.Schema({
  checkedAt: {
    type: Date,
    default: () => Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
});

const CheckedTask = mongoose.model("CheckedTask", CheckedTaskSchema);

export default CheckedTask;
