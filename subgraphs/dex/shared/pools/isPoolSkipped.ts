// Return false if one of the token is exists inside whitelist, otherwise it
// will return true
export function isPoolSkipped(
    whitelist: Array<string>,
    tokens: Array<string>
): bool {
    for (let i = 0; i < tokens.length; i++) {
        const isExists = whitelist.includes(tokens[i]);
        if (isExists) return false;
    }
    return true;
}
