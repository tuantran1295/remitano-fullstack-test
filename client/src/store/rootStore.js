import { createContext, useContext } from "react";
import { action } from "mobx";
import { useLocalObservable } from 'mobx-react-lite';

export const RootStoreContext = createContext(null);

export const RootStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    userInfo:  JSON.parse(localStorage.getItem('userInfo')),

    setUserInfo: action((info) => {
      localStorage.setItem("userInfo", JSON.stringify(info));
      store.userInfo = info;
    }),
    logOut: action(() => {
      localStorage.removeItem("userInfo");
    }),
  }));

  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};
export const useRootStore = () => useContext(RootStoreContext);