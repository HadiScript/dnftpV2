// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftMarket is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    struct NftItem {
        uint256 tokenId;
        uint256 price;
        address creator;
        bool isListed;
    }

    uint256 public listingPrice = 0.025 ether;

    Counters.Counter private _listedItems;
    Counters.Counter private _tokenIds;

    
    uint256[] private _allNfts;
    mapping(uint => uint) private _idToNftIndex;

    mapping(string => bool) private _usedTokenURIs;
    mapping(uint256 => NftItem) private _idToNftItem;

    mapping(address => mapping(uint => uint)) private _ownedTokens;
    mapping(uint => uint) private _idToOwnedIndex;




    event NftItemCreated(
        uint256 tokenId,
        uint256 price,
        address creator,
        bool isListed
    );

    constructor() ERC721("CreaturesNFT", "CNFT") {}

    function setListingPrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "price must be atleast 1 eth");
        listingPrice = newPrice;
    }


    function getNftItem(uint256 tokenId) public view returns (NftItem memory) {
        return _idToNftItem[tokenId];
    }

    function listedItemsCount() public view returns (uint256) {
        return _listedItems.current();
    }

    function tokenURIExists(string memory tokenURI) public view returns (bool) {
        return _usedTokenURIs[tokenURI] == true;
    }

    function totalSupply() public view returns(uint){
        return _allNfts.length;
    }

    function tokenByIndex(uint index) public view returns(uint){
        require(index < totalSupply(), "index out of the bounce");
         return _allNfts[index];
    }

    function tokenOfOwnerByIndex(address owner, uint index) public view returns(uint){
        require(index < ERC721.balanceOf(owner), "index out of the bounce");
        return _ownedTokens[owner][index];
    }

    function getOwnedNfts() public view returns(NftItem[] memory){
      uint ownedItemsCount = ERC721.balanceOf(msg.sender);
      NftItem[] memory items = new NftItem[](ownedItemsCount);

      for (uint i = 0; i < ownedItemsCount; i++) {  
            uint tokenId = tokenOfOwnerByIndex(msg.sender, i);
            NftItem storage item = _idToNftItem[tokenId];
            items[i] = item;
      }

      return items;
    }

    
    function getAllNftOnSale() public view returns(NftItem[] memory){
       uint allItemsCount = totalSupply();
       uint currentIndex = 0;
       NftItem[] memory items = new NftItem[](_listedItems.current());

      for(uint i=0; i< allItemsCount; i++){
        uint tokenId = tokenByIndex(i);
        NftItem storage item = _idToNftItem[tokenId];
      
        if(item.isListed == true){
            items[currentIndex] = item;
            currentIndex +=1;
        }      
      }
        return items;

    }

    function buyNft(uint256 tokenId) public payable {
        uint256 price = _idToNftItem[tokenId].price;
        address owner = ERC721.ownerOf(tokenId);

        require(msg.sender != owner, "You already own this nft");
        require(msg.value == price, "Please submit the correct price");

        _idToNftItem[tokenId].isListed = false;
        _listedItems.decrement();

        _transfer(owner, msg.sender, tokenId);
        payable(owner).transfer(msg.value);
    }

    function mintToken(string memory tokenURI, uint256 price)
        public
        payable
        returns (uint256)
    {
        require(!tokenURIExists(tokenURI), "Token URI already exists");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _tokenIds.increment();
        _listedItems.increment();

        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _createNftItem(newTokenId, price);
        _usedTokenURIs[tokenURI] = true;

        return newTokenId;
    }


    function placeNftOnSale(uint tokenId, uint newPrice) public payable {
       
        require(ERC721.ownerOf(tokenId) == msg.sender, "Not Own NFT");
        require(_idToNftItem[tokenId].isListed == false, "item soled");   
        require(msg.value == listingPrice, "Price must be equal to listing price");   

        _idToNftItem[tokenId].isListed = true;
        _idToNftItem[tokenId].price = newPrice;
        _listedItems.increment();

    }


    // all private functions

    function _createNftItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "price must be atleast 1eth");

        _idToNftItem[tokenId] = NftItem(tokenId, price, msg.sender, true);

        emit NftItemCreated(tokenId, price, msg.sender, true);
    }


    // minting tokens
    function _beforeTokenTransfer(
        address from,
        address to,
        uint tokenId
        ) internal virtual override {

            
        super._beforeTokenTransfer(from, to, tokenId);
        if(from == address(0)){
            _addTokenToAllTokensEnumeration(tokenId);
        } else if(from != to){
            _removeTokenFromOwnerEnumeration(from, tokenId);
        }

        if(to == address(0)){
            _removeTokenFromAllEnumeration(tokenId);
        }else 
        if(to != from){
            _addTokenToOwnerTokensEnumeration(to, tokenId);
        }

   
    }

    function _addTokenToAllTokensEnumeration(uint tokenId) private {
        _idToNftIndex[tokenId] = _allNfts.length;
        _allNfts.push(tokenId);
    }


     function _addTokenToOwnerTokensEnumeration(address to,uint tokenId) private {
      uint length = ERC721.balanceOf(to);

      _ownedTokens[to][length] = tokenId;
      _idToOwnedIndex[tokenId] = length;
    }

    function _removeTokenFromOwnerEnumeration(address from,uint tokenId) private {
  uint lastTokenIndex = ERC721.balanceOf(from) - 1;
  uint tokenIndex = _idToOwnedIndex[tokenId];

 if(tokenIndex != lastTokenIndex){
    uint lastTokenId = _ownedTokens[from][lastTokenIndex];

    _ownedTokens[from][tokenIndex] = lastTokenId;
    _idToOwnedIndex[lastTokenId] = tokenIndex;
 } 
 delete _idToOwnedIndex[tokenId];
 delete _ownedTokens[from][lastTokenIndex];
}

function _removeTokenFromAllEnumeration(uint tokenId) private {
  uint lastTokenIndex = _allNfts.length - 1;
  uint tokenIndex = _idToNftIndex[tokenId];
  uint lasttokenId = _allNfts[lastTokenIndex];

  _allNfts[tokenIndex] = lasttokenId;
  _idToNftIndex[lasttokenId] = tokenIndex;

  delete _idToNftIndex[tokenId];
  _allNfts.pop();
}
}
