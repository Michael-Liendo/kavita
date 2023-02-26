import Head from 'next/head';

import Footer from './Footer';
import Navbar from './Navbar/Navbar';

export default function Layout({
  title,
  description,
  url,
  image,
  type,
  keywords,
  children,
}: {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
  keywords?: string;
  children: JSX.Element;
}) {
  return (
    <>
      <Head>
        <title>{title ? title : 'Kevita'}</title>
        <meta name="description" content={description ? description : 'Without description'} />
        <meta property="og:title" content={title ? title : 'Kevita'} />

        <meta
          property="og:description"
          content={description ? description : 'Without og description'}
        />
        <meta name="theme-color" content="#3bd6cf" />

        <meta property="og:site_name" content={title ? title : 'Kevita'} />
        <meta property="og:image" content={image ? image : ''} />
        <meta property="og:url" content={url ? url : 'https://michaelliendo.com/'} />
        <meta property="og:type" content={type ? type : 'website'} />

        <meta name="keywords" content={keywords} />

        <link rel="canonical" href={url ? url : 'https://michaelliendo.com/'} />

        <meta name="robots" content="follow" />
        <meta name="author" content="Michael Liendo" />
        <meta name="publisher" content="Michael Liendo" />
        <meta name="copyright" content="Michael Liendo" />
      </Head>
      <Navbar />
      <main className="mx-8 lg:mx-28 xl:mx-40 2xl:mx-60 min-h-[82vh]">{children}</main>
      <Footer />
    </>
  );
}
