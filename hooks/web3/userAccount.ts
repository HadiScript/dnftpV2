//@ts-nocheck

import axios from "axios";
import { UserContext } from "../../context";
import { useContext, useEffect } from "react";
import useSWR from "swr";
// import useSwr from "swr";
import { CryptoHookFactory } from "../../types/hooks";

type UseAccountResponse = {
  connect: () => void;
  isLoading: boolean;
  isInstalled: boolean;
};

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>;

export type UseAccountHook = ReturnType<AccountHookFactory>;

export const hookFactory: AccountHookFactory =
  ({ provider, ethereum, isLoading }) =>
  () => {
    const [state, setState] = useContext(UserContext);
    const { data, isValidating, mutate, ...swr } = useSWR(
      provider ? "web3/useAccount" : null,
      async () => {
        const accounts = await provider!.listAccounts();
        const account = accounts[0];
        if (!account) {
          throw "Cannot retreive account! Please, connect to web3 wallet.";
        }
        // saving();
        return account;
      },
      {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }
    );
    useEffect(() => {
      ethereum?.on("accountsChanged", handleAccountsChanged);
      return () => {
        ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      };
    });

    const saving = async (acc: any) => {
      // const accounts = args[0] as string[];
      try {
        // console.log("am going to send request");

        const { data } = await axios.post(
          `http://localhost:8000/api/my-profile`,
          { account: acc }
        );
        // console.log("after the res form user account", data);

        setState({ user: data });

        window.localStorage.setItem("auth", JSON.stringify(data));
        // console.log(state.user, "use accounts hooks");
      } catch (error) {
        console.log(error);
      }
    };

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      // console.log(accounts[0], "here is account");

      if (accounts.length === 0) {
        console.error("Please, connect to Web3 wallet");
      } else if (accounts[0] !== data) {
        window.localStorage.removeItem("auth");
        saving(accounts[0]);

        setTimeout(() => {
          mutate(accounts[0]);
        }, 1000);
      }
    };

    const connect = async () => {
      try {
        // console.log("am going to connect all new account");
        ethereum?.request({ method: "eth_requestAccounts" });
      } catch (e) {
        console.error(e);
      }
    };

    return {
      ...swr,
      data,
      isValidating,
      isLoading: isLoading as boolean,
      isInstalled: ethereum?.isMetaMask || false,
      mutate,
      connect,
    };
  };
