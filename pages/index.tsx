import React from 'react';
import Head from 'next/head';
import commonStyles from '../components/common.module.sass';
import styles from './main.module.sass';

import Sidebar from '../components/sidebar/sidebar';
import Home from '../components/home/home';
import Background from '../components/background/background';

export default function Main() {
    return (
        <>
            <Background />
            <Sidebar />
            <div className={commonStyles.container}>
                <Head>
                    <title>harry.assayag</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <Home />
                </main>
            </div>
            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
                </a>
            </footer>
        </>
    );
}
