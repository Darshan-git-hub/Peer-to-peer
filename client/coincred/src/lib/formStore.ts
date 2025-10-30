import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Optional: for localStorage persistence

interface FormState {
  collateralAmount: number;
  collateralToken: string;
  borrowToken: string;
  borrowAmount: number;
  profitAmount: number;
  borrowerAddress: string;
  duration: number; // in seconds
  setCollateralAmount: (amount: number) => void;
  setCollateralToken: (token: string) => void;
  setBorrowToken: (token: string) => void;
  setBorrowAmount: (amount: number) => void;
  setProfitAmount: (amount: number) => void;
  setBorrowerAddress: (address: string) => void;
  setDuration: (duration: number) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      collateralAmount: 0.001,
      collateralToken: 'ETH',
      borrowToken: 'USDC',
      borrowAmount: 10,
      profitAmount: 1,
      borrowerAddress: '',
      duration: 86400, // 1 day default
      setCollateralAmount: (amount) => set({ collateralAmount: amount }),
      setCollateralToken: (token) => set({ collateralToken: token }),
      setBorrowToken: (token) => set({ borrowToken: token }),
      setBorrowAmount: (amount) => set({ borrowAmount: amount }),
      setProfitAmount: (amount) => set({ profitAmount: amount }),
      setBorrowerAddress: (address) => set({ borrowerAddress: address }),
      setDuration: (duration) => set({ duration: duration }),
      resetForm: () => set({
        collateralAmount: 0.001,
        collateralToken: 'ETH',
        borrowToken: 'USDC',
        borrowAmount: 10,
        profitAmount: 1,
        borrowerAddress: '',
        duration: 86400,
      }),
    }),
    { name: 'coincred-form-storage' } // Persists to localStorage
  )
);