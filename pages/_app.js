// import App from 'next/app'
import Layout from "../components/layout";
import "../styles.css";
import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import { AccountContextProvider } from "../components/context/AccountContext";
import { ModalContextProvider } from "../components/context/ModalContext";

export default function MyApp({ Component, pageProps }) {
  const APP_NAME = "finatic";
  const APP_DESCRIPTION = "Decentralised Crowdfunding";
  const APP_URL = "https://finatic.vercel.app";
  return (
    <AccountContextProvider>
      <ModalContextProvider>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover"
          />

          <title>{`${APP_NAME} | ${APP_DESCRIPTION}`}</title>
          <meta name="description" content={APP_DESCRIPTION} />

          <meta name="application-name" content={APP_NAME} />
          <meta name="theme-color" content="#FFFFFF" />

          <link rel="shortcut icon" href="/favicon.ico" />

          <link rel="canonical" href={APP_URL} />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={APP_NAME} />
          <meta name="twitter:description" content={APP_DESCRIPTION} />
          <meta name="twitter:url" content={APP_URL} />
          <meta name="twitter:image" content={`${APP_URL}/og_logo.png`} />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={APP_NAME} />
          <meta property="og:site_name" content={APP_NAME} />
          <meta property="og:description" content={APP_DESCRIPTION} />
          <meta property="og:url" content={APP_URL} />
          <meta property="og:image" content={`${APP_URL}/og_logo.png`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta name="google" content="notranslate" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalContextProvider>
    </AccountContextProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }
