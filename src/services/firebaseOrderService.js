import {ref,get,set,} from "firebase/database";

import { db } from "../firebase";

// GET ALL ORDERS
export const getFirebaseOrders = async () => {
    try {
      const snapshot = await get(
        ref(db, "orders")
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

// ADD ORDER
export const addFirebaseOrder =
  async (order) => {
    try {
      const orders = await getFirebaseOrders();

      const updatedOrders = [
        ...orders,
        order,
      ];

      await set(
        ref(db, "orders"),
        updatedOrders
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };