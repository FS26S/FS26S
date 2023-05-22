const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sequelize = new Sequelize('fs26s', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
});

const Sala = sequelize.define('sala', {
    id_sala: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: Sequelize.STRING,
    tipo: Sequelize.STRING,
    localizacao: Sequelize.STRING,
    flaginativo: Sequelize.BOOLEAN
}, {
    tableName: 'sala',
    timestamps: false
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

module.exports = { app, Sala };

app.post('/sala', async (req, res) => {
    try {
        const sala = await Sala.create(req.body);
        res.status(201).json(sala);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar sala' });
    }
});

app.get('/sala', async (req, res) => {
    try {
        const salas = await Sala.findAll();
        res.status(200).json(salas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar salas' });
    }
});

app.get('/sala/:id', async (req, res) => {
    try {
        const sala = await Sala.findByPk(req.params.id);
        if (sala) {
            res.status(200).json(sala);
        } else {
            res.status(404).json({ message: 'Sala não encontrada' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar sala' });
    }
});

app.put('/sala/:id', async (req, res) => {
    try {
        const sala = await Sala.findByPk(req.params.id);
        if (sala) {
            await sala.update(req.body);
            res.status(200).json(sala);
        } else {
            res.status(404).json({ message: 'Sala não encontrada' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar sala' });
    }
});

app.delete('/sala/:id', async (req, res) => {
    try {
        const sala = await Sala.findByPk(req.params.id);
        if (sala) {
            await sala.destroy();
            res.status(200).json({ message: 'Sala excluída com sucesso' });
        } else {
            res.status(404).json({ message: 'Sala não encontrada' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao excluir sala' });
    }
});