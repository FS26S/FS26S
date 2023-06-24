async function postPatrimonios(req,res){
    const url = `http://localhost:8000/equipamento`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });
    const data = await response.json();
    if (response.status == 201) {
        res.status(201).json({message: "Patrimônio cadastrado com sucesso!"});
    }
    else 
        res.status(data.status).json(data.message);
}

async function getPatrimonios(req,res){
    const response = await fetch('http://localhost:8000/equipamento');
    const data = await response.json();
    if (response.status == 200) {
        res.status(200).json(data);
    }
    else
        res.status(data.status).json(data.message);
}


export default function handler(req,res){
    switch (req.method) {
        case "GET":
            return getPatrimonios(req,res);
        case "POST":
            return postPatrimonios(req,res);
        default:
            res.status(405).json({message: "Método não suportado"});
            break;
    }
}