const db = require("../utils/firebase");

/**
 * Mengambil semua regions dari Firestore.
 * @returns {Promise<Array>} Daftar region.
 */
const getAllRegions = async () => {
  const regionsSnapshot = await db.collection("regions").get();
  const regions = regionsSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    thumbnailImg: doc.data().thumbnailImg,
  }));
  return regions;
};

/**
 * Mengambil detail region berdasarkan nama dari Firestore.
 * @param {string} regionName - Nama region.
 * @returns {Promise<Object|null>} Detail region atau null jika tidak ditemukan.
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

  // Ambil subcollections (foods dan places)
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

  const foods = foodsSnapshot.docs.map((doc) => doc.data());
  const places = placesSnapshot.docs.map((doc) => doc.data());

  return { ...regionData, foods, places };
};


/**
 * Mengambil manners berdasarkan nama region.
 * @param {string} regionName - Nama region.
 * @returns {Promise<string|null>} Manners atau null jika tidak ditemukan.
 */
const getMannersByRegionName = async (regionName) => {
  const regionSnapshot = await db
    .collection("regions")
    .where("name", "==", regionName)
    .get();

  if (regionSnapshot.empty) return null;

  return regionSnapshot.docs[0].data().manners || null;
};

/**
 * Mengambil places berdasarkan nama region.
 * @param {string} regionName - Nama region.
 * @returns {Promise<Array|null>} Daftar places atau null jika region tidak ditemukan.
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
 * Mengambil foods berdasarkan nama region.
 * @param {string} regionName - Nama region.
 * @returns {Promise<Array|null>} Daftar foods atau null jika region tidak ditemukan.
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
