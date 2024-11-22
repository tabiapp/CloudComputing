const express = require("express");
const {
  getRegions,
  getRegionDetail,
  getRegionManners,
  getRegionPlaces,
  getRegionFoods,
} = require("../controllers/regionController");

const router = express.Router();

/**
 * GET /api/regions
 * Get a list of all regions.
 */
router.get("/", getRegions);

/**
 * GET /api/regions/:regionName
 * Get details of a region.
 */
router.get("/:regionName", getRegionDetail);

/**
 * GET /api/regions/:regionName/manners
 * Get manners from the region.
 */
router.get("/:regionName/manners", getRegionManners);

/**
 * GET /api/regions/:regionName/places
 * Get places from the region.
 */
router.get("/:regionName/places", getRegionPlaces);

/**
 * GET /api/regions/:regionName/foods
 * Get foods from the region.
 */
router.get("/:regionName/foods", getRegionFoods);

module.exports = router;
