const User = require('../models/users');
const bcrypt = require('bcryptjs');

// Registrar um novo usuário
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        // Verificar se o e-mail já está em uso
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "E-mail já registrado" });
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar o usuário
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Usuário registrado com sucesso", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
};

// Autenticar usuário (login)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
        }

        // Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "E-mail ou senha inválidos" });
        }

        // Verificar a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "E-mail ou senha inválidos" });
        }

        res.status(200).json({ message: "Login bem-sucedido", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
};

// Listar usuários
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Evita enviar senhas
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
};