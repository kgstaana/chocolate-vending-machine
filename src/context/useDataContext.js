import { useContext } from 'react';
import { DataContext } from './DataProvider';

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('DataContext context missing');
  }

  return context;
}

export default useDataContext;
