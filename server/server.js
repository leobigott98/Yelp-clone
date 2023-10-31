require("dotenv").config();
const express = require("express");
const db = require("./db")
const morgan = require("morgan");

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());

//Get all restaurants
app.get("/api/v1/restaurants", async (req, res)=>{

    try {
        const results = await db.query("SELECT * FROM restaurants");
        res.status(200).json({
            status: "success",
            results: results.rowCount,
            data: {
                restaurants: results.rows
            }
        });     
    } catch (err) {
        console.log(err);
    }

    
});

//Get one restaurant
app.get("/api/v1/restaurants/:id", async (req, res)=>{
    try {
        const {id} = req.params;
        const getOneRest = await db.query("SELECT * FROM restaurants WHERE id = $1", [id]);
        res.status(200).json({
            status: "success",
            results: getOneRest.rowCount,
            data: {
                restaurant: getOneRest.rows
            }
        });
        
    } catch (err) {
        console.log(err);    
    }
});

//Create a restaurant
app.post("/api/v1/restaurants", async (req, res)=>{
   try {
    const create = await db.query("INSERT INTO restaurants(name, location, price_range) VALUES($1, $2, $3)", [req.body.name, req.body.location, req.body.price_range]);
    res.status(200).json({
        status: "success",
        output: "inserted"
    });
    
   } catch (err) {
    console.log(err);
    
   }
    
});

//Update a restaurant
app.put("/api/v1/restaurants/:id", (req, res)=>{
    console.log(req.params.id);
    console.log(req.body);

    res.status(200).json({
        status: "success",
        data: {
            restaurant: "mcdonalds"
        }
    });
});

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", (req, res)=>{
    res.status(204).json({
        status: "success"
    });
});

const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log(`Server is up and listening on port ${port}`);
});