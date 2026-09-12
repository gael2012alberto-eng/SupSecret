const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Base de datos temporal
const users = [];

app.post('/api/register', (req, res) => {
    const { username, password, gender, classification } = req.body;
    const existingUser = users.find(u => u.username === username);
    
    if (existingUser) {
        return res.status(400).json({ mensaje: "El usuario ya existe" });
    }
    
    users.push({ username, password, gender, classification });
    res.json({ mensaje: "Usuario registrado con éxito" });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(400).json({ mensaje: "Usuario o contraseña incorrectos" });
    }
    
    res.json({ mensaje: "Inicio de sesión exitoso", username: user.username, gender: user.gender });
});

app.listen(PORT, () => {
    console.log(`SupScret corriendo en el puerto ${PORT}`);
});
