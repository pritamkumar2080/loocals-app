import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext();

export const useWishlist = () =>
  useContext(WishlistContext);

export const WishlistProvider = ({
  children,
}) => {

  // LOAD
  const [wishlist, setWishlist] = useState(() => {

    const saved = localStorage.getItem(
      "wishlist"
    );

    return saved
      ? JSON.parse(saved)
      : [];

  });

  // SAVE
  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);

  // ADD
  const addToWishlist = (product) => {

    const exist = wishlist.find(
      (item) => item.id === product.id
    );

    if (exist) return;

    setWishlist([
      ...wishlist,
      product,
    ]);

  };

  // REMOVE
  const removeFromWishlist = (id) => {

    setWishlist(
      wishlist.filter(
        (item) => item.id !== id
      )
    );

  };

  // CHECK
  const isInWishlist = (id) => {

    return wishlist.some(
      (item) => item.id === id
    );

  };

  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

};