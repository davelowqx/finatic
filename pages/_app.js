// import App from 'next/app'
import Layout from "../components/layout";
import "../styles.css";
import { AccountContextProvider } from "../components/context/AccountContext";
import { ModalContextProvider } from "../components/context/ModalContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AccountContextProvider>
      <ModalContextProvider>
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
