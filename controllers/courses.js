
// import { ObjectId } from 'mongodb';
const saveValid = require('../validation/courseValidator')
// const Course = require('../models/Course')
const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db('student').collection('courses').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
    }
    catch (error) {
        console.log("Error fetching courses.", error);
    }
};



const getSingle = async (req, res) => {
    try {
         const courseId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('student').collection('courses').find({ _id: courseId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
    }
    catch (error) {
        console.log("Error fetching courses.", error)
    }
};

const createCourse = async (req, res) => {
  const { error, value: courseData } = saveValid.courseValidator(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const response = await mongodb.getDatabase().db("student").collection("courses").insertOne(courseData);
    
    if (response.acknowledged) {
      res.status(201).json("Course created successfully." );
    } else {
      res.status(500).json("Failed to create course. Operation not acknowledged." );
    }

  } catch {
    console.error("Error while creating course."); 
    res.status(500).json("An internal server error occurred.");
  }
};


const updateCourse = async (req, res) => {
    const courseId = new ObjectId(req.params.id);
    const { error, value: courseData } = saveValid.courseValidator(req.body);
    if (error) {
        return res.status(400).json("Error while trying to update course. Try checking your internet connection.");
    }
    try {
        const response = await mongodb.getDatabase().db("student").collection("courses").replaceOne({ _id: courseId }, courseData)
    
        if (response.modifiedCount > 0) {
            res.status(200).send("Yay, Course Updated Successfully.");
        } else {
            res.status(500).json("Nothing to modify.");
        }
    }
    catch {
        console.error("Error while creating course."); 
    res.status(500).json("An internal server error occurred.");
        // console.log("An internal Error occured with the server.")
    }
}

const deleteCourse = async (req, res) => {
    const courseId = new ObjectId(req.params.id);
    try {
         const response = await mongodb.getDatabase().db("student").collection("courses").deleteOne({ _id: courseId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json("Error while attempting to delete course.");
    }
    } catch {
        console.log("Error while trying to delete course.")
    }
   
}
 
module.exports = {
    getAll,
    getSingle,
    createCourse,
    updateCourse,
    deleteCourse
};
