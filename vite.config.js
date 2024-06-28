var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dependencies } from "./package.json";
function renderChunks(deps) {
    var chunks = {};
    Object.keys(deps).forEach(function (key) {
        if (["react", "react-router-dom", "react-dom"].includes(key))
            return;
        chunks[key] = [key];
    });
    return chunks;
}
// https://vitejs.dev/config/
export default defineConfig({
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: __assign({ vendor: ["react", "react-router-dom", "react-dom"] }, renderChunks(dependencies)),
            },
        },
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "./src/components"),
            "@contexts": path.resolve(__dirname, "./src/contexts"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@lib": path.resolve(__dirname, "./src/lib"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@routes": path.resolve(__dirname, "./src/routes"),
        },
    },
});
