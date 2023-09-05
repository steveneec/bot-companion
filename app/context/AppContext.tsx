import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useDispatch} from 'react-redux';
import {loadString} from '../shared/LocalStorage';
import {setIsSign} from '../store/features/auth/authSlice';
import {getAllContacts, getSettings, getUser} from '../services/user.service';
import {
  setContacts,
  setSettings,
  setToken,
  setUser,
} from '../store/features/user/userSlice';
import Toast from 'react-native-toast-message';

export const AppContext = createContext<any>({showToast: () => {}});

export function AppContextProvider(props: PropsWithChildren) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadToken();
  }, []);

  function showToast(props: {type: string; text1: string; text2: string}) {
    Toast.show({type: props.type, text1: props.text1, text2: props.text2});
  }

  async function loadToken() {
    const token = await loadString('authToken');

    if (token) {
      dispatch(setToken(token));
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

  return (
    <AppContext.Provider value={{showToast}}>
      {props.children}
      <Toast />
    </AppContext.Provider>
  );
}
