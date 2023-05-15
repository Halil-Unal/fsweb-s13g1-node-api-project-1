// SUNUCUYU BU DOSYAYA KURUN
const express =require("express");
const server = express();
let id = 0;

function getId() {
    return ++id;
}
let datas = [
    {
        id: getId(),
        name: "Sam",
        bio:"having-fun"
    },
    {
        id: getId(),
        name: "Merry",
        bio:"sad"
    },
]
server.use(express.json());

server.get("/",(req,res)=>{
    res.send("server is up and running")
})

server.get("/datas",(req,res)=>{
    if(!datas) {
        res.status(500).json({message:"kullanıcı bilgileri alınamadı"});
    }
    else{
        res.json(datas)
    }
 
})
server.post('/datas', (req,res)=>{
    const newdata = {
        id: getId(),
        name: req.body.name
    }
    datas.push(newdata);
    res.status(201).json(newdata);
})

server.put("/datas/:id", (req, res) => {
    datas = datas.map((data) => {
      if (data.id == req.params.id) {
        return {
          id: data.id,
          name: req.body.name,
          bio: req.body.bio,
        };
      } else {
        return data;
      }
    });
    res.json(datas);
  });


server.delete('/datas/:id', (req,res)=>{

    let data = datas.find(data=>data.id == req.params.id);

    if(!data) {
        res.status(404).json({message:"data not found"});
    } else {
        datas = datas.reduce((total,item)=> {
            if (item.id == req.params.id){
                return total
            } else {
                total.push(item);
                return total
            }
           },[]); 
    
        
        res.json(datas);
    }
})

module.exports = server; // SERVERINIZI EXPORT EDİN {}
