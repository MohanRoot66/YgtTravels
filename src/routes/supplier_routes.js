const  {insertSupplierDetails, getSupplierByCode, getAllSuppliers, getSupplierTerms,updateSupplierDetails, getSupplierRules}  = require("../controllers/core/supplier_controller");

const supplierRoutes = require("express").Router();

supplierRoutes.get("/suppliers",getAllSuppliers);
supplierRoutes.get("/suppliers/:supplierCode",getSupplierByCode);
supplierRoutes.put("/suppliers/:supplierCode", updateSupplierDetails);
supplierRoutes.get("/suppliers/terms/:supplierCode",getSupplierTerms);
supplierRoutes.get("/suppliers/rules/:supplierCode",getSupplierRules);
supplierRoutes.post("/addSupplier",insertSupplierDetails);


module.exports={
    supplierRoutes
}