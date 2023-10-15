"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { ReactNode, useEffect, useState } from "react";
import { login } from "./login";

const Layout = ({ children }: { children: ReactNode }) => {
  const { setVisible } = useWalletModal();
  const { publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (publicKey && isLoading) {
      (async () => {
        await login(publicKey.toString());
        setIsLoading(false);
      })();
    }
  }, [publicKey]);

  return (
    <div className="h-full border-x border-[#111]">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <button
            className="px-6 bg-orange-600 h-12 rounded text-white"
            onClick={() => setVisible(true)}
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Layout;
