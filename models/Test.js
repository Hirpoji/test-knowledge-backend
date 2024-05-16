import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  option: { type: String },
  isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
    questionText: { type: String },
    questionType: { type: String },
    answer: [answerSchema] 
  });

const TestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    questions: [questionSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Test", TestSchema);
