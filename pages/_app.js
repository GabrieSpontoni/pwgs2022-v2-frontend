import Head from "next/head";

import { AuthProvider } from "../src/hook/auth";
import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}

export default MyApp;
