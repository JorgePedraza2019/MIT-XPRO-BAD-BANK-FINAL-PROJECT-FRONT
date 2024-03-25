import { Html, Head, Main, NextScript } from "next/document"; // Importing components from Next.js document

export default function Document() {
  return (
    <Html lang="en"> {/* Setting the language of the document to English */}
      <Head /> {/* Including meta tags, links, and other elements in the head of the document */}
      <body>
        <Main /> {/* Rendering the main content of the application */}
        <NextScript /> {/* Including Next.js scripts */}
      </body>
    </Html>
  );
}
