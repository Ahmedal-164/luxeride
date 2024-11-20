// storage.js
import localforage from "localforage";

export const storeUserToken = async (token) => {
  try {
    await localforage.setItem("userToken", token);
  } catch (error) {
    console.error("Error storing the token", error);
  }
};

export const getUserToken = async () => {
  try {
    return await localforage.getItem("userToken");
  } catch (error) {
    console.error("Error retrieving the token", error);
    return null;
  }
};

export const removeUserToken = async () => {
  try {
    await localforage.removeItem("userToken");
  } catch (error) {
    console.error("Error removing the token", error);
  }
};
