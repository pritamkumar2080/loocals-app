import {
  ref,
  set,
} from "firebase/database";

import { db } from "./firebase";

import { shops } from "./data/shops";

const uploadShops =
  async () => {

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

uploadShops();