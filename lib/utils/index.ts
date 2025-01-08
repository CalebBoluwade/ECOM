export const formatPrice = (price: number, currency: string) => {
  const formatter = new Intl.NumberFormat("en-US", {
    currency,
    style: "currency",
    unitDisplay: "long",
  });

  return formatter.format(price);
};

export const calculateTotalDiscount = (items: IProduct[]): number => {
  return Number(
    items
      .reduce((discount, item) => {
        const itemPrice = calculateItemPrice(
          item.price,
          item.discountPercentage
        );
        return discount + (item.price - itemPrice);
      }, 0)
      .toFixed(2)
  );
};

export const calculateSubtotal = (items: IProduct[], VAT: number) => {
  return (
    Number(
      items.reduce((total, item) => {
        const itemPrice = calculateItemPrice(
          item.price,
          item.discountPercentage
        );
        return total + itemPrice * item.cartQuantity;
      }, 0)
    ) + VAT
  );
};

export const calculateItemPrice = (
  price: number,
  discountPercentage: number
): number => {
  if (discountPercentage) {
    return Number((price * (1 - discountPercentage / 100)).toFixed(2));
  }
  return price;
};

/**
 * Generates a direct Google Drive image URL.
 * @param {string} driveUrl - The public Google Drive file URL.
 * @returns {string} - The direct image URL.
 */

export const generateGoogleDriveImageUrl = (driveUrl: string) => {
  try {
    // Extract the file ID using a regular expression
    const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match || !match[1]) {
      throw new Error("Invalid Google Drive URL");
    }

    const fileId = match[1];
    // Return the formatted direct URL
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  } catch (error: unknown) {
    console.error("Error generating Google Drive URL:", error);
    return null; // Handle invalid URLs gracefully
  }
};

export const capitalizeFirstLetter = (word: string): string => {
  if (!word) return ""; // Handle empty or null input
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// export const removeFromCart = (
//   // cart: CartItem[],
//   productId: string
// ): CartItem[] => {
//   return productList.filter((item) => item._id !== productId);
// };
