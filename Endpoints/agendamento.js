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

const Agendamento = sequelize.define('agendamento', {
    id_agendamento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_sala: {
        type: Sequelize.INTEGER,
        references: {
            model: 'sala',
            key: 'id_sala'
        }
    },
    id_equipamento: {
        type: Sequelize.INTEGER,
        references: {
            model: 'equipamento',
            key: 'id_equipamento'
        }
    },
    id_pessoa: {
        type: Sequelize.INTEGER,
        references: {
            model: 'pessoa',
            key: 'id_pessoa'
        }
    },
    data_agendamento: Sequelize.DATEONLY,
    hora_inicio: Sequelize.TIME,
    hora_fim: Sequelize.TIME,
    observacoes: Sequelize.TEXT
}, {
    tableName: 'agendamento',
    timestamps: false
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

module.exports = { app, Agendamento };

app.post('/agendamento', async (req, res) => {
    try {
        const agendamento = await Agendamento.create(req.body);
        res.status(201).json(agendamento);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar agendamento' });
    }
});

app.get('/agendamento', async (req, res) => {
    try {
        const agendamento = await Agendamento.findAll();
        res.status(200).json(agendamento);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar agendamentos' });
    }
});

app.get('/agendamento/:id', async (req, res) => {
    try {
        const agendamento = await Agendamento.findByPk(req.params.id);
        if (agendamento) {
            res.status(200).json(agendamento);
        } else {
            res.status(404).json({ message: 'Agendamento não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar agendamento' });
    }
});

app.put('/agendamento/:id', async (req, res) => {
    try {
        const agendamento = await Agendamento.findByPk(req.params.id);
        if (agendamento) {
            await agendamento.update(req.body);
            res.status(200).json(agendamento);
        } else {
            res.status(404).json({ message: 'Agendamento não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar agendamento' });
    }
});

app.delete('/agendamento/:id', async (req, res) => {
    try {
        const agendamento = await Agendamento.findByPk(req.params.id);
        if (agendamento) {
            await agendamento.destroy();
            res.status(200).json({ message: 'Agendamento excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Agendamento não encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao excluir agendamento' });
    }
});