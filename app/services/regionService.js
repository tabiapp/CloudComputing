const db = require("../utils/firebase");

/**
 * Retrieve all regions from Firestore.
 * @returns {Promise<Array>} List region.
 */
const getAllRegions = async () => {
  const regionsSnapshot = await db.collection("regions").get();
  const regions = regionsSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    thumbnailImg: doc.data().thumbnailImg,
    iconCity: doc.data().iconCity,
  }));
  return regions;
};

/**
 * Retrieve region details based on the name of the Firestore.
 * @param {string} regionName - Name region.
 * @returns {Promise<Object|null>} Detail region or null if not found.
 */
const getRegionByName = async (regionName) => {
  const regionSnapshot = await db
    .collection("regions")
    .where("name", "==", regionName)
    .get();

  if (regionSnapshot.empty) {
    return null;
  }

  const regionData = regionSnapshot.docs[0].data();

  // Get subcollections (foods dan places)
  const mannersSnapshot = await db
    .collection("regions")
    .doc(regionSnapshot.docs[0].id)
    .collection("manners")
    .get();
  const foodsSnapshot = await db
    .collection("regions")
    .doc(regionSnapshot.docs[0].id)
    .collection("foods")
    .get();

  const placesSnapshot = await db
    .collection("regions")
    .doc(regionSnapshot.docs[0].id)
    .collection("places")
    .get();

  const manners = mannersSnapshot.docs.map((doc) => doc.data());
  const foods = foodsSnapshot.docs.map((doc) => doc.data());
  const places = placesSnapshot.docs.map((doc) => doc.data());

  return { ...regionData, manners, foods, places };
};


/**
 * Retrieve manners based on the region name.
 * @param {string} regionName - Name region.
 * @returns {Promise<Array|null>} Manners or null if not found.
 */

const getMannersByRegionName = async (regionName) => {
  const regionSnapshot = await db
    .collection("regions")
    .where("name", "==", regionName)
    .get();

  if (regionSnapshot.empty) return null;

  const placesSnapshot = await db
    .collection("regions")
    .doc(regionSnapshot.docs[0].id)
    .collection("manners")
    .get();

  return placesSnapshot.docs.map((doc) => doc.data());
};

/**
 * Retrieve places based on the region name.
 * @param {string} regionName - Namw region.
 * @returns {Promise<Array|null>} List places or null if not found.
 */
const getPlacesByRegionName = async (regionName) => {
  const regionSnapshot = await db
    .collection("regions")
    .where("name", "==", regionName)
    .get();

  if (regionSnapshot.empty) return null;

  const placesSnapshot = await db
    .collection("regions")
    .doc(regionSnapshot.docs[0].id)
    .collection("places")
    .get();

  return placesSnapshot.docs.map((doc) => doc.data());
};

/**
 * Retrieve foods based on the region name.
 * @param {string} regionName - Name region.
 * @returns {Promise<Array|null>} List of foods or null if region is not found.
 */
const getFoodsByRegionName = async (regionName) => {
  const regionSnapshot = await db
    .collection("regions")
    .where("name", "==", regionName)
    .get();

  if (regionSnapshot.empty) return null;

  const foodsSnapshot = await db
    .collection("regions")
    .doc(regionSnapshot.docs[0].id)
    .collection("foods")
    .get();

  return foodsSnapshot.docs.map((doc) => doc.data());
};

module.exports = {
  getAllRegions,
  getRegionByName,
  getMannersByRegionName,
  getPlacesByRegionName,
  getFoodsByRegionName,
};
