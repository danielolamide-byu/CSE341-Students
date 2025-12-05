

const express = require('express');

const router = express.Router();


const personalInfo = require('../controllers/personalInfo');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', personalInfo.getAll);
router.get('/:id', personalInfo.getSingle);
router.post('/', isAuthenticated, personalInfo.createPersonalInfo);
router.put('/:id', isAuthenticated, personalInfo.updatePersonalInfo);
router.delete('/:id', isAuthenticated, personalInfo.deletePersonalInfo);

module.exports = router;

