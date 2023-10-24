require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());

//Get all restaurants
app.get("/api/v1/restaurants", (req, res)=>{
    res.status(200).json({
        status: "success",
        data: {
            restaurants: ["mcdonalds", "wendys"]
        }
    });
});

//Get one restaurant
app.get("/api/v1/restaurants/:id", (req, res)=>{
    console.log(req.params);
});

//Create a restaurant
app.post("/api/v1/restaurants", (req, res)=>{
    console.log(req.body);
});

//Edit a restaurant
app.put("/api/v1/restaurants/:id", (req, res)=>{

});

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", (req, res)=>{

});

const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log(`Server is up and listening on port ${port}`);
});