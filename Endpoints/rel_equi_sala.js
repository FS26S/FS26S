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

const RelEquiSala = sequelize.define('rel_equi_sala', {
  id_relacionamento: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_equipamento: {
    type: Sequelize.INTEGER,
    references: {
      model: 'equipamento',
      key: 'id_equipamento',
    },
  },
  id_sala: {
    type: Sequelize.INTEGER,
    references: {
      model: 'sala',
      key: 'id_sala',
    },
  },
  observacoes: Sequelize.TEXT,
}, {
  tableName: 'rel_equi_sala',
  timestamps: false
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

module.exports = { app, RelEquiSala };

app.post('/relacionamento', async (req, res) => {
  try {
      const relEquiSala = await RelEquiSala.create(req.body);
      res.status(201).json(relEquiSala);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao criar o relacionamento' });
  }
});

app.get('/relacionamento', async (req, res) => {
  try {
      const relEquiSalas = await RelEquiSala.findAll();
      res.status(200).json(relEquiSalas);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar os relacionamentos' });
  }
});

app.get('/relacionamento/:id', async (req, res) => {
  try {
      const relEquiSala = await RelEquiSala.findByPk(req.params.id);
      if (relEquiSala) {
          res.status(200).json(relEquiSala);
      } else {
          res.status(404).json({ message: 'Relacionamento não encontrado' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar o relacionamento' });
  }
});

app.put('/relacionamento/:id', async (req, res) => {
  try {
      const relEquiSala = await RelEquiSala.findByPk(req.params.id);
      if (relEquiSala) {
          await relEquiSala.update(req.body);
          res.status(200).json(relEquiSala);
      } else {
          res.status(404).json({ message: 'Relacionamento não encontrado' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao atualizar o relacionamento' });
  }
});

app.delete('/relacionamento/:id', async (req, res) => {
  try {
      const relEquiSala = await RelEquiSala.findByPk(req.params.id);
      if (relEquiSala) {
          await relEquiSala.destroy();
          res.status(200).json({ message: 'Relacionamento excluído com sucesso' });
      } else {
          res.status(404).json({ message: 'Relacionamento não encontrada' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao excluir o relacionamento' });
  }
});