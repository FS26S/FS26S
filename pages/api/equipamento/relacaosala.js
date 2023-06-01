async function getRelacaoSala(req,res){
    const response = await fetch(`http://localhost:3000/relacionamento/sala/${req.query.id}`,{
        method: "GET",
    })
    const data = await response.json();
    res.status(response.status).json(data);
}

async function deleteRelacaoSala(req,res){
    const response = await fetch(`http://localhost:3000/relacionamento/${req.query.id}`,{
        method: "DELETE",
    })
    const data = await response.json();
    res.status(response.status).json(data.message);
}

export default function handler (req,res){
    switch(req.method){
        case "GET":
            return getRelacaoSala(req,res);
        case "DELETE":
            return deleteRelacaoSala(req,res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}