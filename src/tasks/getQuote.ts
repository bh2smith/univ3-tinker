import { Token } from "@uniswap/sdk-core";
import { Pool } from "@uniswap/v3-sdk";
import { task } from "hardhat/config";

import { tokenDetails } from "../ts/erc20";
import { getQuote } from "../ts/quoter";

const setupQuoter: () => void = () => {
  task("getQuote")
    .addParam("tokenIn", "Input Token")
    .addParam("tokenOut", "Output Token")
    .addParam("fee", "fee amount that pool charges")
    .setAction(async ({ tokenIn, tokenOut, fee }, hre) => {
      const tokenA = await tokenDetails(tokenIn, hre);
      const tokenB = await tokenDetails(tokenOut, hre);
      const poolAddress = await Pool.getAddress(
        new Token(1, tokenA.address, tokenA.decimals || 0),
        new Token(1, tokenB.address, tokenB.decimals || 0),
        fee,
      );
      console.log("Got Pool Address", poolAddress);

      const quote = await getQuote(hre);

      console.log("Got Quote?", quote);
    });
};

export { setupQuoter };
