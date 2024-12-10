const Comment = require ('../models/comments');
const Post = require('../models/post');

const createComment = async (req, res) => {
  try {
    const { content, author, postId } = req.body;

    // Verificando se o post existe
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    // Criando o comentário
    const newComment = new Comment({
      content,
      author,
      postId,
    });

    // Salvando o comentário
    await newComment.save();

    res.status(201).json(newComment); // Retornando o comentário criado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar o comentário' });
  }
};

module.exports = {
  createComment,
};
