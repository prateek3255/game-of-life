import "tailwindcss/tailwind.css";
import Head from "next/head";
import ReactModal from "react-modal";
import type { AppProps } from "next/app";
import '@components/InfoModal/style.css';

if (typeof(window) !== 'undefined') {
  ReactModal.setAppElement('body')
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
