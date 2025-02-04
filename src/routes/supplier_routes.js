const  {insertSupplierDetails}  = require("../controllers/core/supplier_controller");

const supplierRoutes = require("express").Router();

supplierRoutes.post("/addSupplier",insertSupplierDetails);

module.exports={
    supplierRoutes
}