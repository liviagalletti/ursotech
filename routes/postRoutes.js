const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Rota para listar todos os posts
router.get('/', postController.getPosts);

// Rota para criar um novo post
router.post('/', postController.createPost);

// Rota para obter um post específico
router.get('/:id', postController.getPostById);

// Rota para atualizar um post
router.put('/:id', postController.updatePost);

// Rota para deletar um post
router.delete('/:id', postController.deletePost);

module.exports = router;
