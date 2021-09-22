import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/image/favicon.jpg?v1" />
        </Head>
        <body className='vurox-dark-version vurox-admin-template'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument