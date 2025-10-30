// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {CoinCred} from "../src/CoinCred.sol";

contract CreateLoans is Script {
    function run() external {
        uint256 deployerPk = vm.envUint("PRIVATE_KEY");
        address payable coinCred = payable(0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9);
        address wusdc = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
        
        vm.startBroadcast(deployerPk);

        // Loan 1: 2 ETH collateral, 0.2 USDC borrow, 200 basis points (2%)
        CoinCred(coinCred).createLoanRequest{value: 2 ether}(
            wusdc,           // token to borrow
            0.2 ether,       // amount to borrow
            200,             // profit in basis points (2%)
            7 days,          // duration
            address(0),      // ETH collateral
            2 ether          // collateral amount
        );
        console.log("Loan 1 created");

        // Loan 2: 0.5 ETH collateral, 0.05 USDC borrow, 50 basis points (0.5%)
        CoinCred(coinCred).createLoanRequest{value: 0.5 ether}(
            wusdc,
            0.05 ether,
            50,
            3 days,
            address(0),
            0.5 ether
        );
        console.log("Loan 2 created");

        // Loan 3: 3 ETH collateral, 0.3 USDC borrow, 300 basis points (3%)
        CoinCred(coinCred).createLoanRequest{value: 3 ether}(
            wusdc,
            0.3 ether,
            300,
            14 days,
            address(0),
            3 ether
        );
        console.log("Loan 3 created");

        // Loan 4: 1.5 ETH collateral, 0.15 USDC borrow, 150 basis points (1.5%)
        CoinCred(coinCred).createLoanRequest{value: 1.5 ether}(
            wusdc,
            0.15 ether,
            150,
            5 days,
            address(0),
            1.5 ether
        );
        console.log("Loan 4 created");

        // Loan 5: 4 ETH collateral, 0.4 USDC borrow, 400 basis points (4%)
        CoinCred(coinCred).createLoanRequest{value: 4 ether}(
            wusdc,
            0.4 ether,
            400,
            10 days,
            address(0),
            4 ether
        );
        console.log("Loan 5 created");

        vm.stopBroadcast();

        console.log("=== ALL LOANS CREATED ===");
        console.log("Total loans: 5");
    }
}
