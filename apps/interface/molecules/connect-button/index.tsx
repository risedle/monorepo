/**
 * Connect Button Component
 *
 * Usage:
 *
 *     <ConnectButton />
 */

const ConnectButton = () => {
    /**
     * Handle Connect event
     */
    function handleConnect() {
        console.debug("Connect clicked");
    }
    return <button onClick={handleConnect}>Connect</button>;
};
