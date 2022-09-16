import getBaseConfig from "./getBaseConfig";

const getTokenExplorerURL = (address: string): string => {
    const { explorerURL } = getBaseConfig();
    const url = `${explorerURL}/token/${address}`;
    return url;
};

export default getTokenExplorerURL;
