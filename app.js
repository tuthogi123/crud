const express =require("express");
const mongoose = require("mongoose");
const joi = require("@hapi/joi");
const dotenv = require("dotenv")
require('dotenv').config();


const app = express();
app.use(express.urlencoded({ extended: false }));


app.use(express.json())

const port = process.env.PORT || 4000;


const genres = [
    { id: 1, "name": "reggae" },
    { id: 2, "name": "rhumba" },
    { id: 3, "name": "bongo" },
    { id: 4, "name": "blues" },
    { id: 5, "name": "gospel" }


];


app.get("/api/genres", (req, res) => {
    res.send(genres)


});
app.get("/api/genres/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send("the genre with given id was not found");
    res.send(genre)

})


app.post("/api/genres/post", (req, res) => {
    const { error } = validategenre(req.body);
    if (error)  return res.status(404).send(result.error.details[0].message);

    const genre = {
        name: req.params.body,
        id: genres.length + 1

    };
    genres.push(genre);
    res.send(genre)
});

app.put("/api/courses/put/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseint(req.params.id))
    if (!genre) return res.status(404).send("the genre with given id was not found");

    const { error } = validategenre(req.body);
    if (error)return res.status(404).send(result.error.details[0].message);
    
    genre.name = req.body.name
    res.send(genre);
});

// function validategenre(genre) {
//     const schema = {
//         name: joi.string().min(3)
//     };
//     return joi.validate(genre, schema)

// }

app.delete("/api/genres/delete",(req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send("the genre with given id was not found");

   const index = genre.indexof(genre)
   genre.splice(index,1)
   res.send(genre);



})

const connectToMongoDB = async () => {
    try {
      await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB Atlas');
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    } catch (error) {
      console.error('Error connecting to MongoDB Atlas:', error);
      process.exit(1); // Exit the process if unable to connect to the database
    }
  };
  
  connectToMongoDB()









