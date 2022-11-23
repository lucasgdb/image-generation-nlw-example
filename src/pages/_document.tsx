import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css"
        />

        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <body>
        <Main />

        <a
          className="github-fork-ribbon"
          href="https://github.com/lucasgdb/image-generation-nlw-example"
          data-ribbon="Fork me on GitHub"
          title="Fork me on GitHub"
          target="_blank"
          rel="noreferrer noopener"
        >
          Fork me on GitHub
        </a>

        <NextScript />
      </body>
    </Html>
  );
}
