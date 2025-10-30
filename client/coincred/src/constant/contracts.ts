import ERC20abi from "../constant/ERC20abi.json"

import CoinCredAbi from "../constant/coincredabi.json"
import { Wusdc,CoinCredContract ,LiskSepoliaETH } from "./addresses/address"




export interface RequestLoan{
    loanRequester:string,
    lender:string,
    tokenRequest:string,
    tokenAmount:bigint,
    tokenProfit:bigint,
    loanId:number,
    funded:boolean,
    dueDate:number,
    collateralAddr:string,
    collateralAmount:bigint,
    isRepaid:boolean,
    
}
type HexString = `0x${string}`| undefined;

interface createRequests{
    _tokenRequest:string,
    _tokenAmount:BigInt,
    _tokenProfit:BigInt,
    duration:number,
    _collateralAddress:string,
    _value:bigint,

}


//address _tokenRequest,uint256 _tokenAmount, uint256 _tokenProfit,uint256 duration,address _collateralAddress, uint256 _collateralAmount
export const UseContractCoincred =()=>{
     const createRequest =({_tokenRequest:tokenAddress,_tokenAmount:tokenAmount,_tokenProfit:tokenProfit,_collateralAddress:collateralAddress,duration:duration,_value:value}:createRequests)=>{
        // For ETH collateral (address 0x0), pass ETH amount as both _collateralAmount and msg.value
        // For ERC20 collateral, pass the token amount as _collateralAmount and 0 as msg.value
        const collateralAmount = value; // Always pass the collateral amount
        const ethValue = collateralAddress === "0x0000000000000000000000000000000000000000" ? value : BigInt(0);
        
        return{abi:CoinCredAbi,
            address:CoinCredContract as `0x${string}`,
            functionName:"createLoanRequest",
            args:[tokenAddress,tokenAmount,tokenProfit,duration,collateralAddress,collateralAmount],
            value: ethValue
        }
     }
     const approve = (amount:BigInt)=>{
        return{abi:ERC20abi,
            address:Wusdc as `0x${string}`,
            functionName:"approve",
            args:[CoinCredContract,amount]
     }
    }
    const mint = (address:HexString)=>{
        return{abi:ERC20abi,
            address:Wusdc as `0x${string}`,
            functionName:"mint",
            args:[address]
     }
    }

    const lendToken = (loanId:number)=>{
        return {
            abi:CoinCredAbi,
            address:CoinCredContract as `0x${string}`,
            functionName:"lendtoken",
            args:[loanId]
        }
    }

    

    const liquidate=(loanId:number)=>{
        return {
            abi:CoinCredAbi,
            address:CoinCredContract as `0x${string}`,
            functionName:"liquidate",
            args:[loanId]
        }
    }

    const RepayLoan=(loanId:number)=>{
        return {
            abi:CoinCredAbi,
            address:CoinCredContract as `0x${string}`,
            functionName:"RepayLoan",
            args:[loanId]
    }}

    const cancelLoanRequest=(loanId:number)=>{
        return {
            abi:CoinCredAbi,
            address:CoinCredContract as `0x${string}`,
            functionName:"cancelLoanRequest",
            args:[loanId]
        }
    }


const getAllRequest =()=>{
    return {abi:CoinCredAbi,
        address:CoinCredContract as `0x${string}`,
        functionName:"getAllRequest",
        args:[]
    }
}
const getAllUserLoanRequests =(userAddress:HexString)=>{
    return {abi:CoinCredAbi,
        address:CoinCredContract as `0x${string}`,
        functionName:"getAllUserLoanRequests",
        args:[userAddress]
        }
}

const getAllLenderRequest =(lenderAddress:HexString)=>{
    return {abi:CoinCredAbi,
        address:CoinCredContract as `0x${string}`,
        functionName:"getAllLenderRequest",
        args:[lenderAddress]
        }
}


const getCurrentBlockTimeStamp =()=>{
    return{abi:CoinCredAbi,
        address:CoinCredContract as `0x${string}`,
        functionName:"getCurrentBlockTimeStamp",
        args:[]
        
    }
}

const getAllLoanRequestIssued =()=>{
    return{abi:CoinCredAbi,
        address:CoinCredContract,
        functionName:"getAllLoanRequestIssued",
        args:[]
    }
}

     return {createRequest,
        approve,getAllLenderRequest,
        getAllLoanRequestIssued,
        getAllRequest,
        cancelLoanRequest,
        RepayLoan,lendToken
        ,getAllUserLoanRequests,
        getCurrentBlockTimeStamp,
        liquidate,
    mint}
     


}