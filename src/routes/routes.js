const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get('/readall', userController.userReadAll);
router.get('/read/:id', userController.userRead);
router.post('/create', userController.userCreate);
router.put('/update/:id', userController.userUpdate);
router.delete('/delete/:id', userController.userDelete);

module.exports = router;