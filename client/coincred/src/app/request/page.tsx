import React, { useEffect } from "react";
import { useAccount } from "wagmi"; // Wagmi hook for connection status
import { useFormStore } from "@/lib/formStore"; // Zustand store for form persistence
import LoanRequests from "@/components/LoanRequests";

export default function RequestPage() {
  const { address, isConnected } = useAccount(); // Monitor wallet connection (global from navbar)
  const { setBorrowerAddress } = useFormStore(); // Access store for borrower sync

  // Sync borrower address from wallet on connection or page load
  useEffect(() => {
    if (isConnected && address) {
      setBorrowerAddress(address);
    }
  }, [isConnected, address, setBorrowerAddress]);

  return (
    <main className="h-screen"> {/* Full-screen layout for immersion */}
      <LoanRequests /> {/* Primary loan request form/component */}
    </main>
  );
}