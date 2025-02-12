import React, { useState } from 'react';
import Head from 'next/head';
import commonStyles from '../components/common.module.sass';
import styles from './main.module.sass';

import Sidebar from '../components/sidebar/sidebar';
import Home from '../components/home/home';

export default function Main() {
    const [pageIsHidden, setPageIsHidden] = useState(false)
    const toggleHidePage = () => {
        setPageIsHidden(!pageIsHidden)
    }
    
    return (
        <div className={styles.root}>
            {/* <Background /> */}
            <Sidebar toggleHidePage={toggleHidePage}/>
            <div className={commonStyles.container}>
                <Head>
                    <title>Harry Assayag</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <Home pageIsHidden={pageIsHidden}/>
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

                <a
                    href="https://github.com/hassayag/resume"
                    rel="noopener noreferrer"
                >
                    Source code <img src="/github.svg" alt="Github" className={styles.logo} />
                </a>


                <span style={{flexGrow: 1}}>Copyright © 2025 Harry Assayag All Right Reserved.</span>
            </footer>
        </div>
    );
}
