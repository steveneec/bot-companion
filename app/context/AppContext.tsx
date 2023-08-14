import {PropsWithChildren, createContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {loadString} from '../shared/LocalStorage';
import {setIsSign} from '../store/features/auth/authSlice';
import {getUser} from '../services/user.service';
import {setUser} from '../store/features/user/userSlice';

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
      const user = await getUser(token);
      dispatch(setUser(user));
      dispatch(setIsSign(true));
    }
    setReady(true);
  }

  if (!ready) {
    return null;
  }

  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
}
