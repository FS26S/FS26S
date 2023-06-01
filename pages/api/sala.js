async function getSala(id, res) {
    const response = await fetch(`http://localhost:3000/sala/${id}`);
    const data = await response.json();
    if (response.status === 200) {
        res.status(200).json(data);
    } else {
        res.status(response.status).json(data);
    }
}

async function updateSala(id, req, res) { }

async function cadastrarSala(req, res) {
    const body = {
        nome: req.body.descricao,
        localizacao: req.body.bloco,
        tipo: req.body.tipo, 
        flaginativo: req.body.situacao
    }
    const response = await fetch(`http://localhost:3000/sala`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.status === 201){
        res.status(201).json({message: 'Cadastro realizado com sucesso!'})
    }
    else{
        res.status(500).json(response.message)
    }
}

async function deleteSala(id, res) {
    const response = await fetch(`http://localhost:3000/sala/${id}`, {
        method: "DELETE",
    })
    if (response.status === 200){
        res.status(200).json({message: 'Sala excluída com sucesso!'})
    }
    else{
        res.status(response.status).json(response.message)
    }
}


export default function handler(req, res) {
    const { id } = req.query;
    const { method } = req;

    switch (method) {
        case "POST":
            return cadastrarSala(req, res);
        case "GET":
            return getSala(id, res);
        case "PUT":
            return updateSala(id, req, res);
        case "DELETE":
            return deleteSala(id, res);
        default:
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}