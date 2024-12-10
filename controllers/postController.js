const Post = require('../models/post');

// Função para listar todos os posts
const getPosts = async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Função para criar um novo post
  const createPost = async (req, res) => {
    try {
      const { title, content, author } = req.body;
  
      const post = new Post({
        title,
        content,
        author,
      });
  
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Função para obter um post específico
  const getPostById = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }
  
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Função para atualizar um post
  const updatePost = async (req, res) => {
    try {
      const { title, content, author } = req.body;
  
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { title, content, author },
        { new: true }
      );
  
      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }
  
      res.json(post);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Função para deletar um post
  const deletePost = async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
  
      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }
  
      res.json({ message: 'Post deletado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getPostWithComments = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('comments');
      
      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }
  
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
  module.exports = {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    getPostWithComments
  };