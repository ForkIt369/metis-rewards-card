import { useState, useEffect } from 'react';

const formatMetisValue = (value: string): string => {
  const num = parseFloat(value) / 1e18; // Convert from wei to METIS
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

export const useMetisBalance = (address: string) => {
  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(true);
  
  const fetchBalance = async () => {
    try {
      // Using Web3 JSON-RPC call
      const response = await fetch('https://andromeda.metis.io/?owner=1088', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [address, 'latest'],
          id: 1
        })
      });
      
      const data = await response.json();
      if (data.result) {
        const balanceInWei = parseInt(data.result, 16).toString();
        setBalance(formatMetisValue(balanceInWei));
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Metis balance:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 120000); // Refresh every 2 minutes
    return () => clearInterval(interval);
  }, [address]);
  
  return { balance, loading };
};
