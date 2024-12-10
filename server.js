const express = require('express');
const connectDB = require('./db/connect');
const  postRoutes  = require('./routes/postRoutes');
const  commentRoutes  = require('./routes/commentRoutes'); 
const userRoutes = require('./routes/userRoutes')
require('dotenv').config();

const app = express();

// Middleware para analisar JSON (se necessário)
app.use(express.json());

// Conecta ao MongoDB
connectDB();

// Usando as rotas de usuários
app.use('/users', userRoutes);

// Usando as rotas de posts
app.use('/posts', postRoutes);

// Rota para criar comentário
app.use('/comments', commentRoutes);

// Rota principal
app.get('/', (req, res) => {
  res.send('Conexão funcionando!');
});

// Inicia o servidor
const PORT = process.env.PORT || 3000; // Permite configurar a porta pelo .env
app.listen(PORT, () => console.log)