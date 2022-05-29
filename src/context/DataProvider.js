import { createContext } from 'react';
import PropTypes from 'prop-types';
import useDataState from './useDataState';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const value = useDataState();

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default DataProvider;
