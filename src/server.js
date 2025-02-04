const cors = require('cors');
const express = require('express');
require('dotenv').config();
const sequelizeController = require('./controllers/sequelize_controller');
const { supplierRoutes } = require('./routes/supplier_routes');
const { addSuppliertoBookingRoute } = require('./routes/booking_supplier');
const { getBookingWithSuppliers } = require('./controllers/core/get_deatils');

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.URL || 'http://localhost'; // Ensure URL fallback is set

// Enable CORS for requests
app.use(cors());

// Middleware to parse the JSON
app.use(express.json());

// Checking the server is healthy
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy!' });
});

app.use("/api", supplierRoutes);
app.use("/api",addSuppliertoBookingRoute);
app.get("/yoo",getBookingWithSuppliers);

async function main() {
    try {
        console.log("Server is running");

        // Wait for DB connection
        const isConnected = await sequelizeController.authenticate();
        
        if (isConnected) {
            // Start the server if DB connection is successful
            const server = app.listen(port, () => {
                console.log(`Server is running on ${url}:${port}`);
            });

            server.on('error', (err) => {
                console.error('Error starting server: ', err);
            });
        } else {
            console.error('Database connection failed. Server not started.');
        }
    } catch (err) {
        console.error('Error during server setup:', err);
    }
}

main();
