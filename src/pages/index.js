import Head from "next/head"; // Importing the Head component from Next.js
import Home from "./home"; // Importing the Home component from the home directory

export default function Index() {
  return (
    <>
      <Head> {/* Setting the title, viewport meta tag, and favicon for the page */}
        <title>Bad Bank Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home /> {/* Rendering the Home component */}
    </>
  );
}
