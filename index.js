import express from "express";
import connectDB from "./connect.db.js";
import Course from "./course.model.js";
import mongoose from "mongoose";
const app = express();
// to make unserstand json
app.use(express.json());

//============================database connectiuon==================
connectDB();
// ===============================routs ======================
app.post("/course/add", async (req, res) => {
  const newCourse = req.body;
  await Course.create(newCourse);
  return res.status(201).send({ message: "course is added sussfully" });
});
// ==========get courselist=======
app.get("/course/list", async (req, res) => {
  const courseList = await Course.find();
  return res.status(200).send({ message: "success", courseList });
});
// =============find course by _id=============
app.get("/course/detail/:id", async (req, res) => {
  const courseId = req.params.id;
  // to validate mongo id
  const isValidMongoId = mongoose.isValidObjectId(courseId);
  // if not valid mongoid
  if (!isValidMongoId) {
    return res.status(400).send({ message: "no valid mongo id" });
  }
  const requiredCourse = await Course.findOne({ _id: courseId });
  if (!requiredCourse) {
    return res.status(404).send({ message: "course does not exist" });
  }

  return res
    .status(200)
    .send({ message: "success", coursedetails: requiredCourse });
});
// =================delete by id=================
app.delete("/course/delete/:id", async (req, res) => {
  // extract course id from req.params
  const courseId = req.params.id;
  // check for mongo id validity
  const isValidMongoId = mongoose.isValidObjectId(courseId);
  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "invalid mongo id" });
  }
  // find course by id
  const requiredCourse = await Course.findOne({ _id: courseId });
  // if not course, throw error
  if (!requiredCourse) {
    return res.status(404).send({ message: "course doen not exist" });
  }
  // delete course
  await Course.deleteOne({ _id: courseId });
  // send response
  return res.status(200).send({ message: "deleted sussfully" });
});

// ==============================port $ server============================
const PORT = 4500;

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
