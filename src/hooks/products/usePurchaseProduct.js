
const usePurchaseProduct = ({ service }) => {
  const purchaseProduct = async (product, credit) => {
    try {
      const data = await service.purchaseProduct(product, credit);
      return {
        data,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error
      }
    }
  };
  
  return purchaseProduct;
};

export default usePurchaseProduct;
