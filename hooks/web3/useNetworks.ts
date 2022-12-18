import { useEffect } from "react";
import useSWR from "swr";
// import useSwr from "swr";
import { CryptoHookFactory } from "../../types/hooks";

const NETWORKS: { [k: string]: string } = {
  1: "Ethereum main network",
  3: "Ropsten test network",
  4: "Rinkby test network",
  5: "Goerli test network",
  42: "Kovan test network",
  56: "Binance Smart Chain",
  1337: "Ganache test network",
};

const targetId = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID as string;
const targetNetwork = NETWORKS[targetId];

type UseNetworkResponse = {
  isLoading: boolean;
  isSupported: boolean;
  targetNetwork: string;
  isConnetedToNetwork : boolean;
};

type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>;

export type UseNetworkHook = ReturnType<NetworkHookFactory>;

export const hookFactory: NetworkHookFactory =
  ({ provider, isLoading }) =>
  () => {
    const { data, isValidating, ...swr } = useSWR(
      provider ? "web3/useNetwork" : null,
      async () => {
        const chainId = (await provider!.getNetwork()).chainId;

        if (!chainId) {
          throw "not network, please refresh your chrome or connect to other one";
        }

        return NETWORKS[chainId];
      },
      {
        revalidateOnFocus: false,
      }
    );

      const _isSupported = data === targetNetwork;

    return {
      ...swr,
      data,
      isValidating,
      targetNetwork,
      isSupported : _isSupported,
      isConnetedToNetwork : !isLoading && _isSupported,
      isLoading: isLoading as boolean,
    };
  };
