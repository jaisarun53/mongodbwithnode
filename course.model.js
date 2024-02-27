import mongoose from "mongoose";
//  set rules
const CourseSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  price: Number,
  tutorName: String,
});
// create table
const Course = mongoose.model("Course", CourseSchema);

export default Course;
