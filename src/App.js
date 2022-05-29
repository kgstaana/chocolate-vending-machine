import DataProvider from './context/DataProvider';
import VendingMachine from './modules/VendingMachine';

const App = () => {
  return (
    <DataProvider>
      <VendingMachine />
    </DataProvider>
  );
}

export default App;
