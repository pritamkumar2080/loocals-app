import {
  ref,
  get,
  set,
} from "firebase/database";

import { db } from "../firebase";

// GET ALL SHOPS
export const getFirebaseShops =
  async () => {

    try {

      const snapshot =
        await get(
          ref(db, "shops")
        );

      if (snapshot.exists()) {

        return Object.values(
          snapshot.val()
        );

      }

      return [];

    } catch (error) {

      console.log(error);

      return [];
    }
  };

// UPLOAD SHOPS
export const uploadShopsToFirebase =
  async (shops) => {

    try {

      await set(
        ref(db, "shops"),
        shops
      );

      console.log(
        "Shops Uploaded ✅"
      );

    } catch (error) {

      console.log(error);
    }
  };

// ADD SHOP
export const addFirebaseShop =
  async (shop) => {

    try {

      const shops =
        await getFirebaseShops();

      const updatedShops = [
        ...shops,
        shop,
      ];

      await set(
        ref(db, "shops"),
        updatedShops
      );

      return true;

    } catch (error) {

      console.log(error);

      return false;
    }
  };

// DELETE SHOP
export const deleteFirebaseShop =
  async (shopId) => {

    try {

      const shops =
        await getFirebaseShops();

      const updatedShops =
        shops.filter(
          (shop) =>
            String(shop.id) !==
            String(shopId)
        );

      await set(
        ref(db, "shops"),
        updatedShops
      );

      return true;

    } catch (error) {

      console.log(error);

      return false;
    }
  };