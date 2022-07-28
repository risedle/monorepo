import getBaseConfig from "./getBaseConfig";

export const getTransactionExplorerURL = (address: string): string => {
    const { explorerURL } = getBaseConfig();
    const url = `${explorerURL}/tx/${address}`;
    return url;
};

export default getTransactionExplorerURL;
