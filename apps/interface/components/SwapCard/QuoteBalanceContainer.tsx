import { BoxProps, Box, useColorModeValue } from "@chakra-ui/react";
import { useAccount, useContractReads, erc20ABI } from "wagmi";
import { utils } from "ethers";
import { useEffect, useState } from "react";

// Utils
import getBaseConfig from "@/utils/getBaseConfig";

// Sub-components
import Balance from "./Balance";

// ABI
import ChainlinkABI from "@/abis/ChainlinkABI";

const SwapCardQuoteBalanceContainer = (props: BoxProps) => {
    // Data
    const {
        defaultQuoteAddress,
        defaultQuoteDecimals,
        defaultQuoteChainlinkAddress,
        defaultQuoteChainlinkDecimals,
    } = getBaseConfig();

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");

    // States
    const [isLoaded, setIsLoaded] = useState(false);
    const [amount, setAmount] = useState(0);
    const [amountUSD, setAmountUSD] = useState(0);

    // Get connected user
    const { address } = useAccount();
    // TODO(pyk): add toast when error
    const { data } = useContractReads({
        contracts: [
            {
                addressOrName: defaultQuoteAddress,
                contractInterface: erc20ABI,
                functionName: "balanceOf",
                args: address,
            },
            {
                addressOrName: defaultQuoteChainlinkAddress,
                contractInterface: ChainlinkABI,
                functionName: "latestAnswer",
            },
        ],
        watch: true,
        cacheOnBlock: true,
    });

    // NOTE: we use useEffect here to prevent React Hydration Error
    // read more: https://nextjs.org/docs/messages/react-hydration-error
    useEffect(() => {
        // Make sure data is correct; otherwise return early
        if (!data || (data && data.length != 2)) {
            setIsLoaded(false);
            setAmount(0);
            setAmountUSD(0);
            return;
        }

        // Process data
        const balance = data[0] ?? 0;
        const price = data[1] ?? 0;
        const amount = parseFloat(
            utils.formatUnits(balance, defaultQuoteDecimals)
        );
        const quotePrice = parseFloat(
            utils.formatUnits(price, defaultQuoteChainlinkDecimals)
        );
        const amountUSD = amount * quotePrice;

        setIsLoaded(true);
        setAmount(amount);
        setAmountUSD(amountUSD);
    }, [data, defaultQuoteDecimals, defaultQuoteChainlinkDecimals]);

    return (
        <Box
            paddingX="4"
            paddingTop="2"
            margin="0 !important"
            background={gray2}
            width="100%"
            {...props}
        >
            <Balance
                amount={amount}
                amountUSD={amountUSD}
                width="max-content"
                isLoaded={isLoaded}
            />
        </Box>
    );
};

export default SwapCardQuoteBalanceContainer;
