const fdebts: Record<string, string> = {
    BNBRISE: "0x1f6b34d12301d6bf0b52db7938fc90ab4f12fe95",
    BNBDROP: "0xFEc2B82337dC69C61195bCF43606f46E9cDD2930",
    CAKERISE: "0x1f6b34d12301d6bf0b52db7938fc90ab4f12fe95",
    CAKEDROP: "0xbd163D07015ae3c0701304E20FEBAB421A2020aA",
};

const getFuseDebtAddress = (symbol: string): string => {
    return fdebts[symbol];
};

export default getFuseDebtAddress;
