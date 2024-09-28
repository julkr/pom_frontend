import { useReadContract } from 'wagmi';
import { pomTokenConfig } from './contracts';
import { keccak256 } from 'viem';
import { ethers } from 'ethers';


export function GetTokenJsonData(nameAtCommunity: string) {
  let [nameValue, communityValue] = nameAtCommunity.split("@");
  const buffer = Buffer.from(nameValue + communityValue, 'utf8');
  const hashValue = keccak256(new Uint8Array(buffer));
  const tokenId_ = ethers.getBigInt(hashValue).toString();


  const { data, refetch, isError, isLoading, error } = useReadContract({
    ...pomTokenConfig,
    functionName: 'tokenURI',
    args: [tokenId_],
    //watch: true,
  });

  return {
    data,
    refetch,
    isError,
    isLoading,
    error,
  };
}
