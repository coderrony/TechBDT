
export const calculateCartTotal = (carts: any) => {
  if (!carts || !Array.isArray(carts)) return 0; // Guard clause for invalid input

  const total = carts.reduce((acc: number, cart: any) => {
      return acc + cart.product.price * cart.quantity;
  }, 0);

  return total; // Make sure to return the calculated total
};
