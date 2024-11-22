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
 * Mendapatkan daftar semua region.
 */
router.get("/", getRegions);

/**
 * GET /api/regions/:regionName
 * Mendapatkan detail dari satu region.
 */
router.get("/:regionName", getRegionDetail);

/**
 * GET /api/regions/:regionName/manners
 * Mendapatkan manners dari region.
 */
router.get("/:regionName/manners", getRegionManners);

/**
 * GET /api/regions/:regionName/places
 * Mendapatkan places dari region.
 */
router.get("/:regionName/places", getRegionPlaces);

/**
 * GET /api/regions/:regionName/foods
 * Mendapatkan foods dari region.
 */
router.get("/:regionName/foods", getRegionFoods);

module.exports = router;
