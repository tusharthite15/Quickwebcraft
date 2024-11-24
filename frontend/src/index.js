import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { SpeedInsights } from '@vercel/speed-insights/react';
// import { Analytics } from '@vercel/analytics/react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="658388937620-bjls65c8q39tmc9v25kj5s8ok40ejoeg.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
      {/* <SpeedInsights /> */}
      {/* <Analytics /> */}
    </React.StrictMode>
  </GoogleOAuthProvider>,
);

reportWebVitals();