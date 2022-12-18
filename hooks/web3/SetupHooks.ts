import { Web3Dependancies } from "../../types/hooks";
import {
  hookFactory as createAccountHook,
  UseAccountHook,
} from "./userAccount";

import {
  hookFactory as createNetworkHook,
  UseNetworkHook,
} from "./useNetworks";

import {
  hookFactory as createListedNftsHook,
  UseListedNftsHook,
} from "./UseListedNft";

import {
  hookFactory as createOwnedNftsHook,
  UseOwnedNftsHook,
} from "./useOnwedNfts";

export type Web3Hooks = {
  useAccount: UseAccountHook;
  useNetwork: UseNetworkHook;
  useListedNfts: UseListedNftsHook;
  useOwnedNfts: UseOwnedNftsHook;
};

export type SetupHooks = {
  (d: Web3Dependancies): Web3Hooks;
};

export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps),
    useNetwork: createNetworkHook(deps),
    useListedNfts: createListedNftsHook(deps),
    useOwnedNfts: createOwnedNftsHook(deps),
  };
};
