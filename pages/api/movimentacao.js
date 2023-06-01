async function getMovimentacao(req, res) {
    const response = await fetch(`http://localhost:3000/movimentacao`);
    const data = await response.json();
    if (response.status === 200) {
        res.status(200).json(data);
    } else {
        res.status(response.status).json(data);
    }
}
async function updateMovimentacao(req, res) {}
async function cadastrarMovimentacao(req, res) {
    const body = req.body
    const response = await fetch(`http://localhost:3000/movimentacao`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await response.json();
    if (response.status === 200) {
        res.status(200).json({ message: 'Cadastro realizado com sucesso!' })
    } else {
        res.status(response.status).json(data.message)
    }

}
async function deleteMovimentacao(req, res) {
    const response = await fetch(`http://localhost:3000/movimentacao/${req.query.id}`, {
        method: "DELETE",
    })
    const data = await response.json();
    if (response.status === 200) {
        res.status(200).json(data.message)
    } else {
        res.status(response.status).json(data.message)
    }
}

export default function handler(req, res) {
    switch (req.method) {
        case "POST":
            return cadastrarMovimentacao(req, res);
        case "GET":
            return getMovimentacao(req, res);
        case "PUT":
            return updateMovimentacao(req, res);
        case "DELETE":
            return deleteMovimentacao(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}