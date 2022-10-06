/**
 * Commonly used functions in router
 */
import type { Controller } from "@/controllers/lib";

interface ControllerInfo {
    method: "GET" | "POST";
    handle: Controller;
}

/**
 * Registry stores map of URLPattern to controller info.
 *
 * This is used to match a HTTP request to a controller.
 */
export const RouteRegistry = new Map<URLPattern, ControllerInfo>();

/**
 * Register "GET" HTTP request for specific path and controller.
 */
export const get = (path: string, controller: Controller) => {
    const compiledPattern = new URLPattern({ pathname: path });
    RouteRegistry.set(compiledPattern, { method: "GET", handle: controller });
};
