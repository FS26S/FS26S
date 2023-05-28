export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body;

    const response = await fetch('http://localhost:3000/pessoa',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    if (response.status === 201){
        res.status(201).json({message: 'Pessoa cadastrada com sucesso!'})
    }
    else{
        res.status(500).json({message: 'Erro ao cadastrar pessoa!'})
    }
}