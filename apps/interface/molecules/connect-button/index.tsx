/**
 * Connect Button Component
 *
 * Usage:
 *
 *     <ConnectButton />
 */
import React from "react";

const ConnectButton = () => {
    /**
     * Handle Connect event
     */
    function handleConnect() {
        console.debug("Connect clicked");
    }

    return <button onClick={handleConnect}>Connect Click</button>;
};

export default ConnectButton;
