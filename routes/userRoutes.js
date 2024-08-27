require('dotenv').config();
const router = require("express").Router();
const UsuarioBD = require('../bd/UsuarioBD');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = process.env.SECRET_KEY; 

router.get('/login', (req, res) => {
    res.render('login');
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    try {
        const usuariobd = new UsuarioBD();
        const usuario = await usuariobd.obtenerUsuarioPorCorreo(correo);

        if (usuario && await bcrypt.compare(contrasena, usuario.contrasena)) {
            const token = jwt.sign(
                { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo },
                secret,
                { expiresIn: '1h' }
            );
            res.cookie('token', token, { httpOnly: true, secure: false });
            res.redirect('/'); //paguina a donde se redireccionara al verificar las credenciales 
        } else {
            res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});