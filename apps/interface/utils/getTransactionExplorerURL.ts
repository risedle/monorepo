import getBaseConfig from "./getBaseConfig";

const getTransactionExplorerURL = (address: string): string => {
    const { explorerURL } = getBaseConfig();
    const url = `${explorerURL}/tx/${address}`;
    return url;
};

export default getTransactionExplorerURL;
