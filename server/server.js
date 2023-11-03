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
        const results = await db.query("SELECT * FROM restaurants ORDER BY id ASC");
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
        const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [id]);
        res.status(200).json({
            status: "success",
            results: results.rowCount,
            data: {
                restaurant: results.rows
            }
        });
        
    } catch (err) {
        console.log(err);    
    }
});

//Create a restaurant
app.post("/api/v1/restaurants", async (req, res)=>{
   try {
    const results = await db.query("INSERT INTO restaurants(name, location, price_range) VALUES($1, $2, $3) RETURNING *", [req.body.name, req.body.location, req.body.price_range]);
    res.status(200).json({
        status: "success",
        results: results.rowCount,
        data: {
            restaurant: results.rows
        },
    });
    
   } catch (err) {
    console.log(err);
    
   }
    
});

//Update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res)=>{

    try {
        const {id} = req.params;
        const {name, location, price_range} = req.body;

        const results = await db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *', [name, location, price_range, id]);

        res.status(200).json({
            status: 'success',
            results: results.rowCount,
            data: {
                restaurant: results.rows
            },
        })  
    } catch (err) {
        console.log(err);
        
    }
});

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res)=>{
    try {
        const {id} = req.params;

        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [id]);

        res.status(204).json({
            status: 'Success',
        });
        
    } catch (err) {
        console.log(err);
        
    }
});

const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log(`Server is up and listening on port ${port}`);
});