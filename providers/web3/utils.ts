//@ts-nocheck

import { createContext, FunctionComponent, useContext, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, ethers, providers } from "ethers";
import { setupHooks, Web3Hooks } from "hooks/web3/SetupHooks";
import { Web3Dependancies } from "types/hooks";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

type Nullable<T> = {
  [p in keyof T]: T[p] | null;
};

export type Web3State = {
  isLoading: boolean; // true while loading web 3 state
  hooks: Web3Hooks;
} & Nullable<Web3Dependancies>;


export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks({isLoading : true} as any),
  };
};

export const createWeb3State = ({
  ethereum,
  provider,
  contract,
  isLoading,
}: Web3Dependancies ) => {
  return {
    ethereum,
    provider,
    contract,
    isLoading: true,
    hooks: setupHooks({ ethereum, provider, contract, isLoading }),
  };
};

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (
  name: string,
  provider: providers.Web3Provider
): Promise<Contract> => {
  if (!NETWORK_ID) {
    return Promise.reject("Network ID is not defined!");
  }

  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();

  if (Artifact.networks[NETWORK_ID].address) {
    const contract = new ethers.Contract(
      Artifact.networks[NETWORK_ID].address,
      Artifact.abi,
      provider
    );

    return contract;
  } else {
    return Promise.reject(`Contract ${name}, connot be loaded`);
  }
};
