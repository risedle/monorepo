// replacer returns a function that can be used to replace string `a` with
// string `b` and execute the result to callback
export function replacer(
    a: string,
    b: string,
    callback: (v: string) => void
): (input: string) => void {
    return (input: string) => {
        const v = input.replace(a, b);
        callback(v);
    };
}

export default replacer;
