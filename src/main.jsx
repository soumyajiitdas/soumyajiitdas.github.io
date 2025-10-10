import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// --- Restore correct path after redirect from 404.html ---
if (sessionStorage.redirect) {
    const redirectPath = sessionStorage.redirect;
    delete sessionStorage.redirect;
    window.history.replaceState(null, "", redirectPath);
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);