import {Provider} from 'react-redux';
import Navigation from './app/navigation';
import store from './app/store';
import {AppContextProvider} from './app/context/AppContext';

export default function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <Navigation />
      </AppContextProvider>
    </Provider>
  );
}
