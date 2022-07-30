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

export const SwapCardQuoteBalanceContainer = (props: BoxProps) => {
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
        onError(error) {
            console.error("SwapCardQuoteBalanceContainer: error", error);
        },
    });

    // NOTE: we use useEffect here to prevent React Hydration Error
    // read more: https://nextjs.org/docs/messages/react-hydration-error
    useEffect(() => {
        console.debug("SwapCardQuoteBalanceContainer: data", data);

        // show zero balance if account is not connected
        if (data && data[0] == null) {
            setIsLoaded(true);
            setAmount(0);
            setAmountUSD(0);
        }

        // show real balance if account is connected
        if (data && data.length == 2) {
            const amount = parseFloat(
                utils.formatUnits(data[0], defaultQuoteDecimals)
            );
            const quotePrice = parseFloat(
                utils.formatUnits(data[1], defaultQuoteChainlinkDecimals)
            );
            const amountUSD = amount * quotePrice;

            setIsLoaded(true);
            setAmount(amount);
            setAmountUSD(amountUSD);
        }
    });

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
