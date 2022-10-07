/**
 * Commonly used functions in controller implementation
 */

/**
 * Return 404 response
 */
export function notfound(message: string): Response {
    return new Response(message, { status: 404 });
}
