export const searchAssets = async (url: string, walletAddress: string) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "searchAssets",
        params: {
          ownerAddress: walletAddress, // user's wallet address
          grouping: [
            "collection",
            "46pcSL5gmjBrPqGKFaLbbCmR6iVuLJbnQy13hAe7s6CC", // Genesis Token Collection NFT Address
          ],
          page: 1, // Starts at 1
          limit: 1000,
        },
      }),
    });
    const { result } = await response.json();
    return result
  };