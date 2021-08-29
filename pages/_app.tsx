import "tailwindcss/tailwind.css";
import Head from "next/head";
import ReactModal from "react-modal";
import type { AppProps } from "next/app";
import "../css/style.css";

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/game-of-life/favicons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/game-of-life/favicons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/game-of-life/favicons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/game-of-life/favicons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/game-of-life/favicons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/game-of-life/favicons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/game-of-life/favicons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/game-of-life/favicons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/game-of-life/favicons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/game-of-life/favicons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/game-of-life/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/game-of-life/favicons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/game-of-life/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/game-of-life//manifest.json" />
        <meta name="msapplication-TileColor" content="#60a5fa" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#60a5fa" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap"
          rel="stylesheet"
        />

        <title>Game of Life</title>
        <meta name="title" content="Game of Life" />
        <meta
          name="description"
          content="Play John Conway's Game of Life, learn how it works and what makes it so special"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://prateeksurana.me/game-of-life" />
        <meta
          property="og:title"
          content="Game of Life"
        />
        <meta
          property="og:description"
          content="Play John Conway's Game of Life, learn how it works and what makes it so special"
        />
        <meta
          property="og:image"
          content="http://prateeksurana.me/game-of-life/og.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://prateeksurana.me/game-of-life" />
        <meta
          property="twitter:title"
          content="Game of Life"
        />
        <meta
          property="twitter:description"
          content="Play John Conway's Game of Life, learn how it works and what makes it so special"
        />
        <meta
          property="twitter:image"
          content="http://prateeksurana.me/game-of-life/og.png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
