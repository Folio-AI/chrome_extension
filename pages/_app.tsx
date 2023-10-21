import React from 'react';

import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return ( 
        <div className="h-screen main-sidebar">
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp;