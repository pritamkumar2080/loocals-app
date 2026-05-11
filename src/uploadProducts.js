import { ref, set } from "firebase/database";
import { db } from "./firebase";
import { products } from "./data/products";

// UPLOAD PRODUCTS
const uploadProducts = async () => {

  try {

    await set(
      ref(db, "products"),
      products
    );

    console.log(
      "Products uploaded successfully 😄"
    );

  } catch (error) {

    console.log(error);

  }

};

uploadProducts();