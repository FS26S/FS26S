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

const Equipamento = sequelize.define('equipamento', {
    id_equipamento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: Sequelize.STRING,
    marca: Sequelize.STRING,
    flaginativo: Sequelize.BOOLEAN
}, {
    tableName: 'equipamento',
    timestamps: false
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

module.exports = { app, Equipamento };

app.post('/equipamento', async (req, res) => {
    try {
        const equipamento = await Equipamento.create(req.body);
        res.status(201).json(equipamento);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar equipamento' });
    }
});

app.get('/equipamento', async (req, res) => {
    try {
        const equipamentos = await Equipamento.findAll();
        res.status(200).json(equipamentos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar equipamentos' });
    }
});

app.get('/equipamento/:id', async (req, res) => {
    try {
        const equipamento = await Equipamento.findByPk(req.params.id);
        if (equipamento) {
            res.status(200).json(equipamento);
        } else {
            res.status(404).json({ message: 'Equipamento não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar equipamento' });
    }
});

app.put('/equipamento/:id', async (req, res) => {
    try {
        const equipamento = await Equipamento.findByPk(req.params.id);
        if (equipamento) {
            await equipamento.update(req.body);
            res.status(200).json(equipamento);
        } else {
            res.status(404).json({ message: 'Equipamento não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar equipamento' });
    }
});

app.delete('/equipamento/:id', async (req, res) => {
    try {
        const equipamento = await Equipamento.findByPk(req.params.id);
        if (equipamento) {
            await equipamento.destroy();
            res.status(200).json({ message: 'Equipamento excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Equipamento não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao excluir equipamento' });
    }
});