const { addSuppliersToBooking } = require("../controllers/core/booking_supplier_controller");


const addSuppliertoBookingRoute = require("express").Router();

addSuppliertoBookingRoute.post("/addSuppliertoBooking",addSuppliersToBooking);

module.exports={
    addSuppliertoBookingRoute
}