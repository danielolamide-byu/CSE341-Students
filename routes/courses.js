
const express = require('express');

const router = express.Router();


const courses = require('../controllers/courses');
const { isAuthenticated } = require('../middleware/authenticate');
router.get('/', courses.getAll);

router.get('/:id', courses.getSingle)
router.post('/', isAuthenticated, courses.createCourse)
router.put('/:id', isAuthenticated, courses.updateCourse)
router.delete('/:id', isAuthenticated, courses.deleteCourse)

module.exports = router;

