'use client';
import Head from 'next/head';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Toaster } from 'react-hot-toast';
import '@styles/globals.css';

const RootLayout = ({ children }) => {
  library.add(fas, fab, far);
  return (
    <html lang="en">
      <Head>
        <title>Mockupgo</title>
        <meta name="description" content="The admin panel for Mockupgo" />
      </Head>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
