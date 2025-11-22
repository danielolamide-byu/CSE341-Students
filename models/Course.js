

// const mongodb = require('mongodb')
import mongodb from 'mongoose';

const courseScheme = new mongodb.Schema({
    _id: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    department: {
        type: String,
        rerequired: true,
    },
});

const Course = mongodb.model("Course", courseScheme);

export default Course;
