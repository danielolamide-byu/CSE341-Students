


// import { ObjectId } from 'mongodb';
const saveValid = require('../validation/personalInfoValidator')
// const Course = require('../models/Course')
const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db('student').collection('personal_info').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
    }
    catch (error) {
        console.log("Error fetching student personal information.", error);
    }
};



const getSingle = async (req, res) => {
    try {
         const infoId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('student').collection('personal_info').find({ _id: infoId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
    }
    catch (error) {
        console.log("Error fetching student personal information.", error)
    }
};

const createPersonalInfo = async (req, res) => {
  const { error, value: infoData } = saveValid.personalInfoValidator(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const response = await mongodb.getDatabase().db("student").collection("personal_info").insertOne(infoData);
    
    if (response.acknowledged) {
      res.status(201).json("Student personal information successfully created." );
    } else {
      res.status(500).json("Failed to create student personal information. Operation not acknowledged." );
    }

  } catch {
    console.error("Error while creating  student personal information."); 
    res.status(500).json("An internal server error occurred.");
  }
};


const updatePersonalInfo = async (req, res) => {
    const infoId = new ObjectId(req.params.id);
    const { error, value: infoData } = saveValid.personalInfoValidator(req.body);
    if (error) {
        return res.status(400).json("Error while trying to update student personal information. Try checking your internet connection.");
    }
    try {
        const response = await mongodb.getDatabase().db("student").collection("personal_info").replaceOne({ _id: infoId }, infoData)
    
        if (response.modifiedCount > 0) {
            res.status(200).send("Yay, Student Personal Information Updated Successfully.");
        } else {
            res.status(500).json("Nothing to modify.");
        }
    }
    catch {
        console.error("Error while creating student personal information."); 
    res.status(500).json("An internal server error occurred.");
        // console.log("An internal Error occured with the server.")
    }
}

const deletePersonalInfo = async (req, res) => {
    const infoId = new ObjectId(req.params.id);
    try {
         const response = await mongodb.getDatabase().db("student").collection("personal_info").deleteOne({ _id: infoId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json("Error while attempting to delete  student personal information.");
    }
    } catch {
        console.log("Error while trying to delete student personal information.")
    }
   
}
 
module.exports = {
    getAll,
    getSingle,
    createPersonalInfo,
    updatePersonalInfo,
    deletePersonalInfo
};
