const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
const Supplier = require("./models/Supplier");
const AceFeedMasterData = require("./models/Acefeed");
const PaymentTerms = require("./models/PaymentTerms");

dotenv.config();

class SequelizeController {
    static _instance = null;
    _sequelize = null;
    models = {};

    constructor() {
        if (SequelizeController._instance) {
            return SequelizeController._instance;
        }

        SequelizeController._instance = this;
        this._sequelize = new Sequelize(
            process.env.DB_NAME || '',
            process.env.DB_USER || '',
            process.env.DB_PASSWORD || '',
            {
                host: process.env.DB_HOST || '',
                port: parseInt(process.env.DB_PORT || '5432'),
                dialect: 'postgres',
                pool: {
                    max: 10,
                    min: 0,
                    acquire: 60000,
                    idle: 10000,
                },
            }
        );

        this.initializeModels();
        // this.associateModels();
    }

    async authenticate() {
        try {
            await this._sequelize.authenticate();
            console.log('Database connection established successfully.');
            await this._sequelize.sync({ alter: true });
            return true;
        } catch (err) {
            console.error('Unable to connect to the database:', err);
            return false;
        }
    }

    initializeModels() {
        if (Object.keys(this.models).length === 0) {
            console.log("Initializing models...");
            this.models["Supplier"] = Supplier(this._sequelize);
            this.models["AceFeedMasterData"] = AceFeedMasterData(this._sequelize);
            this.models["PaymentTerms"] = PaymentTerms(this._sequelize);
        }
    }

    associateModels() {
        console.log("Associating models...");

        const { BookingDetails, Supplier, BookingSupplier } = this.models;

        // Many-to-Many Relationship
        BookingDetails.belongsToMany(Supplier, { through: BookingSupplier, foreignKey: "bookingId" });
        Supplier.belongsToMany(BookingDetails, { through: BookingSupplier, foreignKey: "supplierId" });
    }

    getModel(name) {
        if (!this.models[name]) {
            throw new Error(`Model '${name}' not found. Ensure models are initialized.`);
        }
        return this.models[name];
    }
}

const sequelizeInstance = new SequelizeController();
module.exports = sequelizeInstance;
