interface Script {
    src: string;
    async?: boolean;
    crossorigin?: "anonymous" | "use-credentials" | "";
    defer?: boolean;
    fetchpriority?: "high" | "low" | "auto";
    integrity?: string;
    nomodule?: boolean;
    nonce?: string;
    referrerpolicy?:
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url";
    type?: string;
}

export function scripts(): Array<Script> {
    return [
        {
            src: "src/",
        },
    ];
}
