const regionService = require("../services/regionService");

/**
 * Returns a list of all regions.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
const getRegions = async (req, res) => {
  try {
    const regions = await regionService.getAllRegions();
    return res.status(200).json({
      success: true,
      message: regions
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: "Failed to fetch regions.", error 
    });
  }
};

/**
 * Returns region details by name.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
const getRegionDetail = async (req, res) => {
  const { regionName } = req.params;

  try {
    const region = await regionService.getRegionByName(regionName);

    if (region) {
      return res.status(200).json({
        success: true,
        message: region
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Region '${regionName}' not found.`
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch region detail.", error
    });
  }
};

/**
 * Getting manners from the region.
 */
const getRegionManners = async (req, res) => {
  const { regionName } = req.params;

  try {
    const manners = await regionService.getMannersByRegionName(regionName);
    if (manners) {
      return res.status(200).json({
        success: true,
        message: manners
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Region '${regionName}' not found.`
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch manners.", error
    });
  }
};

/**
 * Get places from the region.
 */
const getRegionPlaces = async (req, res) => {
  const { regionName } = req.params;

  try {
    const places = await regionService.getPlacesByRegionName(regionName);
    if (places) {
      return res.status(200).json({
        success: true,
        message: places
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Region '${regionName}' not found.`
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch places.", error
    });
  }
};

/**
 * Get foods from the region.
 */
const getRegionFoods = async (req, res) => {
  const { regionName } = req.params;

  try {
    const foods = await regionService.getFoodsByRegionName(regionName);
    if (foods) {
      return res.status(200).json({
        success: true,
        message: foods
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Region '${regionName}' not found.`
      });
    }
  } catch (error) {
    return res.status(500).json({success: false,
      message: "Failed to fetch foods.", error });
  }
};

module.exports = {
  getRegions,
  getRegionDetail,
  getRegionManners,
  getRegionPlaces,
  getRegionFoods,
};
