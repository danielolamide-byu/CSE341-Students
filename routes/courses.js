
const express = require('express');

const router = express.Router();


const courses = require('../controllers/courses');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', courses.getAll);
router.get('/:id', courses.getSingle)
router.post('/', courses.createCourse)
router.put('/:id', courses.updateCourse)
router.delete('/:id', courses.deleteCourse)

module.exports = router;

