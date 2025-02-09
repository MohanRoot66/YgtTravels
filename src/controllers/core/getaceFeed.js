const sequelizeController = require("../sequelize_controller");

const GetAceFeed = async (req, res) => {
  try {
    // Fetch the AceFeedMasterData model
    const AceFeedModel = sequelizeController.getModel("AceFeedMasterData");
    
    // Fetch all AceFeedMasterData entries from the database
    const data = await AceFeedModel.findAll();

    console.log("Data for ACE",data);

    // Send success response
    res.status(200).json({
      message: "Data fetched successfully",
      data,
    });

  } catch (error) {
    console.error("Error fetching AceFeedMasterData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = GetAceFeed;
