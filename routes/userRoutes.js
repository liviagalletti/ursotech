const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser); // Rota para registrar
router.post('/login', userController.loginUser); // Rota para login
router.get('/', userController.getUsers); // Rota para listar usuários

module.exports = router;
