const formatTokenAddress = (address: string): string => {
    // Get first six
    const first = address.slice(0, 6);
    const last = address.slice(-4);
    const formattedAddress = `${first}...${last}`;
    return formattedAddress;
};

export default formatTokenAddress;
