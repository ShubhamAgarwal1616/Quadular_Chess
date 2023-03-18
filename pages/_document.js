import Document, { Html, Head, Main, NextScript } from 'next/document';


export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="apple-touch-icon" href="../public/logo192.png"/>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}
