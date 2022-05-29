
const useAddCoin = ({ service }) => {

  const addCoin = async (coin, existingCredit = 0) => {
    try {
      const data = await service.addCoin(coin, existingCredit);
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
  
  return addCoin;
};

export default useAddCoin;
