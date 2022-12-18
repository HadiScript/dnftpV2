import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers";
import { SWRResponse } from "swr";
import { NftMarketContract } from "./nftMarketContract";

export type Web3Dependancies = {
  provider: providers.Web3Provider;
  contract: NftMarketContract;
  ethereum: MetaMaskInpageProvider;
  isLoading : boolean;
};

export type CryptoHookFactory<D = any, R = any, P = any> = {
  (d: Partial<Web3Dependancies>): CryptoHandlerHook<D, R, P>;
};

export type CryptoHandlerHook<D = any, R = any, P = any> = (
  params?: P
) => CryptoSwrRresponse<D, R>;

export type CryptoSwrRresponse<D = any, R = any> = SWRResponse<D> & R;

// export type CryptoHookFactory<D = any, P = any> = {
//   (d: Partial<Web3Dependancies>): (params: P) => SWRResponse<D>;
// };
