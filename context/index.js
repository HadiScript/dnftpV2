import axios from "axios";
import { useRouter } from "next/router";
import { useState, createContext, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const router = useRouter();

  const [state, setState] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    let data = JSON.parse(window.localStorage.getItem("auth"));
    setState({ ...state, user: data });
  }, []);

  // const token = state && state.token ? state.token : "";

  //   axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  //   axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

  //   axios.interceptors.response.use(
  //     function (response) {
  //       return response;
  //     },
  //     function (err) {
  //       let res = err.response;

  //       if (res.status === 401 && res.config && !res.config_isRetryRequest) {
  //         setState(null);
  //         window.localStorage.removeItem("auth");
  //         // router.pust("/login");
  //       }
  //     }
  //   );

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
