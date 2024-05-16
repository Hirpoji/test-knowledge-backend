import Test from "../models/Test.js";

export const getAll = async (req, res) => {
  try {
    const tests = await Test.find(req.userId).populate("user").exec();
    res.status(200).json({ tests });
  } catch {
    res.status(404).json({ message: "Не удалось получить статьи" });
  }
};

export const getOne = async (req, res) => {
  try {
    const testId = req.params.id;
    const tests = await Test.findById(testId);

    if (!tests) {
      res.status(404).json({ message: "Не удалось получить статью" });
    }
    res.status(200).json({ tests });
  } catch {
    res.status(404).json({ message: "Не удалось получить статью" });
  }
};

export const createTest = async (req, res) => {
  try {
    const doc = new Test({
      title: req.body.title,
      description: req.body.description,
      questions: req.body.questions,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const test = await doc.save();

    res.json(test);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось создать тест" });
  }
};

export const remove = async (req, res) => {
  try {
    const testId = req.params.id;

    const deleteTest = await Test.findOneAndDelete({ _id: testId });

    if (!deleteTest) {
      return res.status(404).json({ message: "Статья не найдена" });
    }

    res.status(200).json(deleteTest);
  } catch {
    res.status(404).json({ message: "Не удалось получить статью" });
  }
};

export const update = async (req, res) => {
  try {
    const testId = req.params.id;

    const test = await Test.updateOne(
      { _id: testId },
      {
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );

    res.status(200).json(test);
  } catch {
    res.status(404).json({ message: "Не удалось обновить статью" });
  }
};
