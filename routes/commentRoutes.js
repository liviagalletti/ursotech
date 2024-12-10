const express = require('express');
const router = express.Router();
const { createComment } = require('../controllers/commentController'); // Importando o controlador

// Rota para criar um comentário
router.post('/', createComment);

module.exports = router;
