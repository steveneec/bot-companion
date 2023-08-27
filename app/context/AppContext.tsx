import {PropsWithChildren, createContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {loadString} from '../shared/LocalStorage';
import {setIsSign} from '../store/features/auth/authSlice';
import {getAllContacts, getSettings, getUser} from '../services/user.service';
import {
  setContacts,
  setSettings,
  setUser,
} from '../store/features/user/userSlice';

const AppContext = createContext({});

export function AppContextProvider(props: PropsWithChildren) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadToken();
  }, []);

  async function loadToken() {
    const token = await loadString('authToken');

    if (token) {
      const responses = await Promise.all([
        getUser(token),
        getSettings(token),
        getAllContacts(token),
      ]);

      if (responses[0]) {
        dispatch(setUser(responses[0]));
        dispatch(setIsSign(true));
        dispatch(setSettings(responses[1]));
        dispatch(setContacts(responses[2]));
      }
    }

    setReady(true);
  }

  if (!ready) {
    return null;
  }

  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
}
