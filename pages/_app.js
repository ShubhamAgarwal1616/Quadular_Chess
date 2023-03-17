import '../src/app.global.scss';
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
        <Head>
            <title>Quadular</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="theme-color" content="#000000"/>
            <meta
                name="description"
                content="Quadular chess game"
            />
        </Head>
        <Component {...pageProps} />
    </>
  );
}
