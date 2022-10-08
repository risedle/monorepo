/**
 * When deploying a Module Worker, any bindings will not be available as
 * global runtime variables. Instead, they are passed to the handler as a
 * parameter.
 *
 * This Env interface define list of available binding.
 *
 * Docs: https://developers.cloudflare.com/workers/platform/environment-variables/
 */
export interface Env {
    __STATIC_CONTENT: string;
}
