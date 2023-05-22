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

const MovimentacaoEstoque = sequelize.define('movimentacao_estoque', {
    id_movest: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_equipamento: {
        type: Sequelize.INTEGER,
        references: {
            model: 'equipamento',
            key: 'id_equipamento',
        },
    },
    tipo_movimento: Sequelize.STRING,
    quantidade: Sequelize.INTEGER,
    saldo_estoque: Sequelize.INTEGER
}, {
    tableName: 'movimentacao_estoque',
    timestamps: false
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

module.exports = { app, MovimentacaoEstoque };

app.post('/movimentacao', async (req, res) => {
    try {
        const movimentacao = await MovimentacaoEstoque.create(req.body);
        res.status(201).json(movimentacao);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar movimentação' });
    }
});

app.get('/movimentacao', async (req, res) => {
    try {
        const movimentacaos = await MovimentacaoEstoque.findAll();
        res.status(200).json(movimentacaos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar movimentações' });
    }
});

app.get('/movimentacao/:id', async (req, res) => {
    try {
        const movimentacao = await MovimentacaoEstoque.findByPk(req.params.id);
        if (movimentacao) {
            res.status(200).json(movimentacao);
        } else {
            res.status(404).json({ message: 'Movimentação não encontrada' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar movimentação' });
    }
});

app.put('/movimentacao/:id', async (req, res) => {
    try {
        const movimentacao = await MovimentacaoEstoque.findByPk(req.params.id);
        if (movimentacao) {
            await movimentacao.update(req.body);
            res.status(200).json(movimentacao);
        } else {
            res.status(404).json({ message: 'Movimentação não encontrada' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar movimentação' });
    }
});

app.delete('/movimentacao/:id', async (req, res) => {
    try {
        const movimentacao = await MovimentacaoEstoque.findByPk(req.params.id);
        if (movimentacao) {
            await movimentacao.destroy();
            res.status(200).json({ message: 'Movimentação excluída com sucesso' });
        } else {
            res.status(404).json({ message: 'Movimentação não encontrada' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao excluir movimentação' });
    }
});