export type NftAttribute = {
  trait_type: "attact" | "health" | "speed";
  value: string;
};

export type NftMeta = {
  name: string;
  description: string;
  image: string;
  category: string;
  attributes: NftAttribute;
};

export type NftCore = {
  tokenId: number;
  price: number;
  creator: string;
  isListed: boolean;
};

export type Nft = {
  meta: NftMeta;
} & NftCore;

export type FileReq = {
  bytes: Uint8Array;
  contentType: string;
  fileName: string;
};

export type PinataRes = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate: boolean;
};
