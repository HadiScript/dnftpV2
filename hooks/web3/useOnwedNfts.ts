import { ethers, utils } from "ethers";
import { useCallback } from "react";
import useSWR from "swr";
import { CryptoHookFactory } from "../../types/hooks";
import { Nft } from "../../types/nft";

type UseOwnedNftsResponse = {
  listNft: (tokenId: number, price: number) => Promise<void>;
};
type OwnedNftsHookFactory = CryptoHookFactory<any, UseOwnedNftsResponse>;

export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>;

export const hookFactory: OwnedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? "web3/useListedNfts" : null,
      async () => {
        const nfts = [] as Nft[];
        const coreNfts = await contract!.getOwnedNfts();

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
    const listNft = useCallback(
      async (tokenId: number, price: number) => {
        try {
          const result = await _contract!.placeNftOnSale(
            tokenId,
            ethers.utils.parseEther(price.toString()),
            {
              value: ethers.utils.parseEther((0.025).toString()),
            }
          );

          await result?.wait();
          alert("Item has been listed");
        } catch (error: any) {
          console.log(error);
        }
      },
      [_contract]
    );

    return {
      ...swr,
      listNft,
      data: data || [],
    };
  };
