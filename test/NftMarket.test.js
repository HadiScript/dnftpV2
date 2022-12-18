const { ethers } = require("ethers");




const NftMarket = artifacts.require("NftMarket");

contract("NftMarket", (accounts) => {
  let _contract = null;
  let _nftPrice = ethers.utils.parseEther("0.3").toString();
  let _listingPrice = ethers.utils.parseEther("0.025").toString();

  before(async () => {
    _contract = await NftMarket.deployed();
  });
  describe("Mint token", () => {
    const tokenURI = "https://test.com";
    before(async () => {
      await _contract.mintToken(tokenURI, _nftPrice, {
        from: accounts[0],
        value: _listingPrice,
      });
    });

    it("owner of the first token should be address[0]", async () => {
      const owner = await _contract.ownerOf(1);
      assert.equal(
        owner,
        accounts[0],
        "Owner of token is not matching address[0]"
      );
    });

    it("first token should point to the correct tokenURI", async () => {
      const actualTokenURI = await _contract.tokenURI(1);
      assert.equal(actualTokenURI, tokenURI, "tokenURI is not correctly set");
    });

    it("should not be possible to create a NFT with used tokenURI", async () => {
      try {
        await _contract.mintToken(tokenURI, _nftPrice, {
          from: accounts[0],
        });
      } catch (error) {
        assert(error, "NFT was minted with previously used tokenURI");
      }
    });

    it("should have one listed item ", async () => {
      const listedItemsCounts = await _contract.listedItemsCount();

      // console.log(listedItemsCounts.toString(), "here is the listed items count from the last test")

      assert.equal(
        listedItemsCounts.toNumber(),
        1,
        "listed items count is not 1"
      );
    });

    it("should have create nft iitem ", async () => {
      const nftItem = await _contract.getNftItem(1);

      // console.log(nftItem, "here is the nft")

      assert.equal(nftItem.tokenId, 1, "toke id is not one");
      assert.equal(nftItem.price, _nftPrice, "price is not correct");
      assert.equal(nftItem.creator, accounts[0], "creator is not correct");
      assert.equal(nftItem.isListed, true, "token isnot listed yet !");
    });
  });




  describe("Buying Nft", () => {
    before(async()=>{
      await _contract.buyNft(1, {
        from : accounts[1],
        value : _nftPrice
      });
    })

    it("should unlist the item", async () => {
      const listedItem = await _contract.getNftItem(1);
      assert.equal(listedItem.isListed, false, "item is not unlist yet")
    })


    it("should decrease listed item count", async () => {
      const listedItemsCount = await _contract.listedItemsCount();
      assert.equal(listedItemsCount.toNumber(), 0, "item is not zero, not decreameted")
    })

    it("should change the owner", async () => {
      const currentOwer = await _contract.ownerOf(1);
      assert.equal(currentOwer, accounts[1], "item is not unlist yet")
    })


  })



  describe("Token Transfer", () => {
   
    before(async()=>{
      const tokenUri = "https://test-json-2.com"
      await _contract.mintToken(tokenUri, _nftPrice, {
        from : accounts[0],
        value : _listingPrice
      });
    })

    it("should have two nfts created", async () => {
      const totalSupply = await _contract.totalSupply();
      assert.equal(totalSupply.toNumber(), 2, "not having 2 tokens")
    })

    it("should to able to get nft by index", async () => {
      const nftId1 = await _contract.tokenByIndex(0);
      const nftId2 = await _contract.tokenByIndex(1);
      
      
      assert.equal(nftId1.toNumber(), 1, "havnt get id 1 token")
      assert.equal(nftId2.toNumber(), 2, "havnt get id 2 token")
   
    })


    it("should have one listed Nft", async () => {
      const allNfts = await _contract.getAllNftOnSale();
      // console.log(allNfts, "all nfts")
      assert.equal(allNfts[0].tokenId, 2, "NFt has a wrong id")
    })

    it("accunt[1] should have one owned Nft", async () => {
      const ownedNfts = await _contract.getOwnedNfts({from : accounts[1]});
      // console.log(allNfts, "all nfts")
      assert.equal(ownedNfts[0].tokenId, 1, "NFt has a wrong id")
    })

    it("accunt[0] should have one owned Nft", async () => {
      const ownedNfts = await _contract.getOwnedNfts({from : accounts[0]});
      // console.log(allNfts, "all nfts")
      assert.equal(ownedNfts[0].tokenId, 2, "NFt has a wrong id")
    })


  })


  
  describe("Token Transfer to new owner", () => {
   
    before(async()=>{
      await _contract.transferFrom(
        accounts[0],
        accounts[1],
        2
      );
    })

    it("accounts[0] should own 0 tokens", async () => {
      const ownedNfts = await _contract.getOwnedNfts({from : accounts[0]});
      assert.equal(ownedNfts.length, 0, "invalid lenght ot token")
    })


    it("accounts[1] should own 2 tokens", async () => {
      const ownedNfts = await _contract.getOwnedNfts({from : accounts[1]});
      assert.equal(ownedNfts.length, 2, "invalid lenght ot token")
    })

  })

  describe("List an Nft", () => {
    before(async () => {
      await _contract.placeNftOnSale(
        1,
        _nftPrice, { from: accounts[1], value: _listingPrice}
      )
    })

    it("should have two listed items", async () => {
      const listedNfts = await _contract.getAllNftOnSale();

      assert.equal(listedNfts.length, 2, "Invalid length of Nfts");
    })

    it("should set new listing price", async () => {
      await _contract
        .setListingPrice(_listingPrice, {from: accounts[0]});
      const listingPrice = await _contract.listingPrice();

      assert.equal(listingPrice.toString(), _listingPrice, "Invalid Price");
    })

  })





});
