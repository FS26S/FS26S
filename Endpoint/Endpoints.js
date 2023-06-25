const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Op } = require('sequelize');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sequelize = new Sequelize('fs26s', 'postgres', /*'1234'*/ '123456', {
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


const Equipamento = sequelize.define('equipamento', {
    id_equipamento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: Sequelize.STRING,
    marca: Sequelize.STRING,
    estoque: Sequelize.INTEGER,
    flaginativo: Sequelize.BOOLEAN
}, {
    tableName: 'equipamento',
    timestamps: false
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

app.listen(8000, () => console.log('Servidor rodando na porta 8000'));


module.exports = { app, Sala };
module.exports = { app, Equipamento };
module.exports = { app, Pessoa };
module.exports = { app, Agendamento };
module.exports = { app, RelEquiSala };
module.exports = { app, MovimentacaoEstoque };

//SALA
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

//EQUIPAMENTO
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

//PESSOA
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

//AGENDAMENTO
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

app.get('/agendamento/sala/:id', async (req, res) => {
    try {
        const agendamento = await Agendamento.findAll({
            where: {
                id_sala: req.params.id,
                data_agendamento: {
                    [Op.gte]: new Date().toISOString().slice(0, 10)
                }
            },
            order: [
                ['data_agendamento', 'ASC'],
                ['hora_inicio', 'ASC']
            ],    
        });
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

//RELACIONAMENTO
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

app.get('/relacionamento/sala/:id', async (req, res) => {
    //buscando o relacionamento pelo id da sala
    try {
        const relEquiSala = await RelEquiSala.findAll({ where: { id_sala: req.params.id } });
        if (relEquiSala.length > 0) {
            res.status(200).json(relEquiSala);
        } else {
            res.status(404).json({ message: 'Não foi encontrado nenhum patrimônio cadastro para a sala com o código informado' });
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

//MOVIMENTACAO
app.post('/movimentacao', async (req, res) => {
    try {
        const movimentacao = await MovimentacaoEstoque.create(req.body);
        await Equipamento.update({ estoque: movimentacao.saldo_estoque }, { where: { id_equipamento: req.body.id_equipamento } });
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

