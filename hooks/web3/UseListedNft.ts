import { ethers } from "ethers";
import { useCallback } from "react";
import useSWR from "swr";
import { CryptoHookFactory } from "../../types/hooks";
import { Nft } from "../../types/nft";

type UseListedNftsResponse = {
  buyNft: (token: number, value: number) => Promise<void>;
};
type ListedNftsHookFactory = CryptoHookFactory<any, UseListedNftsResponse>;

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>;

export const hookFactory: ListedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? "web3/useListedNfts" : null,
      async () => {
        const nfts = [] as Nft[];
        const coreNfts = await contract!.getAllNftOnSale();

        for (let i = 0; i < coreNfts.length; i++) {
          const item = coreNfts[i];
          const tokenURI = await contract!.tokenURI(item.tokenId);
          const metaRes = await fetch(tokenURI); // fetchting from pinate data
          const meta = await metaRes.json();

          nfts.push({
            price: parseFloat(ethers.utils.formatEther(item.price)),
            tokenId: item.tokenId.toNumber(),
            creator: item.creator,
            isListed: item.isListed,
            meta,
          });
        }
        // console.log(nfts, "from nsts")
        return nfts;
      }
    );

    const _contract = contract;
    const buyNft = useCallback(
      async (tokenId: number, value: number) => {
        try {
          const res = await _contract!.buyNft(tokenId, {
            value: ethers.utils.parseEther(value.toString()),
          });
          await res?.wait();
          alert("You bough Nft, See Your profile page");
        } catch (error: any) {
          console.log(error);
        }
      }, [_contract]
    )

    return {
      ...swr,
      buyNft,
      data: data || [],
    };
  };
