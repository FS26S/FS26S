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

const Pessoa = sequelize.define('pessoa', {
  id_pessoa: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: Sequelize.STRING,
  email: Sequelize.STRING,
  senha: Sequelize.STRING
}, {
  tableName: 'pessoa',
  timestamps: false
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

module.exports = { app, Pessoa };

app.post('/pessoa', async (req, res) => {
  try {
      const pessoa = await Pessoa.create(req.body);
      res.status(201).json(pessoa);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao criar pessoa' });
  }
});

app.get('/pessoa', async (req, res) => {
  try {
      const pessoas = await Pessoa.findAll();
      res.status(200).json(pessoas);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar pessoas' });
  }
});

app.get('/pessoa/:id', async (req, res) => {
  try {
      const pessoa = await Pessoa.findByPk(req.params.id);
      if (pessoa) {
          res.status(200).json(pessoa);
      } else {
          res.status(404).json({ message: 'Pessoa não encontrada' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar pessoa' });
  }
});

app.put('/pessoa/:id', async (req, res) => {
  try {
      const pessoa = await Pessoa.findByPk(req.params.id);
      if (pessoa) {
          await pessoa.update(req.body);
          res.status(200).json(pessoa);
      } else {
          res.status(404).json({ message: 'Pessoa não encontrada' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao atualizar pessoa' });
  }
});

app.delete('/pessoa/:id', async (req, res) => {
  try {
      const pessoa = await Pessoa.findByPk(req.params.id);
      if (pessoa) {
          await pessoa.destroy();
          res.status(200).json({ message: 'Pessoa excluída com sucesso' });
      } else {
          res.status(404).json({ message: 'Pessoa não encontrada' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao excluir pessoa' });
  }
});