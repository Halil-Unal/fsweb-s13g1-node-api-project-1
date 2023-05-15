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

server.get("/datas",async (req,res)=>{
    try{
    if(!datas) {
        res.status(500).json({message:"kullanıcı bilgileri alınamadı"});
    }
    else{
       await res.json(datas)
    }
}
catch(error){
    res.status(500).json({message:"bilgiler alınamadı"})
}
})
server.post('/datas', async (req, res) => {
    try{
  const { name, bio } = req.body;

  if (!name || !bio) {
    return res.status(400).json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
  }

  const newdata = {
    id: getId(),
    name: name,
    bio: bio
  };

 await datas.push(newdata);
  return res.status(201).json(newdata);
}
catch(error){
    res.status(500).json({message:"hata oluştu"})
}
});


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
