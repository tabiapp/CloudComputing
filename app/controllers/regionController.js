const regionService = require("../services/regionService");

/**
 * Mengembalikan daftar semua region.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
const getRegions = async (req, res) => {
  try {
    const regions = await regionService.getAllRegions();
    res.status(200).json({ regions });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch regions.", error });
  }
};

/**
 * Mengembalikan detail region berdasarkan nama.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
const getRegionDetail = async (req, res) => {
  const { regionName } = req.params;

  try {
    const region = await regionService.getRegionByName(regionName);

    if (region) {
      res.status(200).json(region);
    } else {
      res.status(404).json({ message: `Region '${regionName}' not found.` });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch region detail.", error });
  }
};

/**
 * Mendapatkan manners dari region.
 */
const getRegionManners = async (req, res) => {
  const { regionName } = req.params;

  try {
    const manners = await regionService.getMannersByRegionName(regionName);
    if (manners) {
      res.status(200).json({ manners });
    } else {
      res.status(404).json({ message: `Region '${regionName}' not found.` });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch manners.", error });
  }
};

/**
 * Mendapatkan places dari region.
 */
const getRegionPlaces = async (req, res) => {
  const { regionName } = req.params;

  try {
    const places = await regionService.getPlacesByRegionName(regionName);
    if (places) {
      res.status(200).json({ places });
    } else {
      res.status(404).json({ message: `Region '${regionName}' not found.` });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch places.", error });
  }
};

/**
 * Mendapatkan foods dari region.
 */
const getRegionFoods = async (req, res) => {
  const { regionName } = req.params;

  try {
    const foods = await regionService.getFoodsByRegionName(regionName);
    if (foods) {
      res.status(200).json({ foods });
    } else {
      res.status(404).json({ message: `Region '${regionName}' not found.` });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch foods.", error });
  }
};

module.exports = {
  getRegions,
  getRegionDetail,
  getRegionManners,
  getRegionPlaces,
  getRegionFoods,
};
