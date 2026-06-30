// Polyfills para Node.js globals que usan @aztec/bb.js, @noir-lang/noir_js y Stellar SDK
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;
if (typeof window !== "undefined") window.Buffer = Buffer;

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
