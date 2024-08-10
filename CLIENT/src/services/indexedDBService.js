import { openDB } from "idb";

const dbPromise = openDB("countries-db", 1, {
  upgrade(db) {
    // Create an object store for countries, using cca2 as the primary key
    db.createObjectStore("countries", { keyPath: "cca2" });
  },
});

// Save all countries to IndexedDB
export const saveALlCountries = async (countries) => {
  const db = await dbPromise;
  const tx = db.transaction("countries", "readwrite");
  countries.forEach((country) => tx.store.put(country));
  await tx.done;
};

// Get all countries from IndexedDB
export const getAllCountries = async () => {
  const db = await dbPromise;
  const tx = db.transaction("countries", "readonly");
  const countries = await tx.store.getAll();
  return countries;
};

// Check if IndexedDB has any countries stored
export const checkCountriesExist = async () => {
  const db = await dbPromise;
  const tx = db.transaction("countries", "readonly");
  const count = await tx.store.count();
  return count > 0;
};
