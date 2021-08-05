import {
  abi as QUOTER_ABI,
  // bytecode as QUOTER_BYTECODE,
} from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { Contract } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export interface PriceQuote {
  quote: string;
}

export async function getQuote(
  // address: string,
  hre: HardhatRuntimeEnvironment,
): Promise<PriceQuote> {
  const quoter = new Contract(
    "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6", // <- Mainnet
    QUOTER_ABI,
    hre.ethers.provider,
  );
  console.log("Fetching Quote");
  const res0 = await quoter.callStatic.quoteExactInputSingle(
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    3000,
    1,
    "3970198701504627469655355",
  );

  const res1 = await quoter.callStatic.quoteExactOutputSingle(
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    3000,
    1,
    "3970198701504627469655355",
  );

  console.log(res0);

  console.log(res1);
  return {
    quote: "Hello! Joe.",
  };
}
