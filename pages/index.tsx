import React, { useState } from 'react';
import Head from 'next/head';
import { Code } from '@mui/icons-material';

import commonStyles from '../components/common.module.sass';
import styles from './main.module.sass';

import Sidebar from '../components/sidebar/sidebar';
import Home from '../components/home/home';

export default function Main() {
    const [pageIsHidden, setPageIsHidden] = useState(false);
    const toggleHidePage = () => {
        setPageIsHidden(!pageIsHidden);
    };

    return (
        <div className={styles.root}>
            {/* <Background /> */}
            <Sidebar toggleHidePage={toggleHidePage} />
            <div className={styles.main}>
                <Head>
                    <title>Harry Assayag</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <Home pageIsHidden={pageIsHidden} />
                </main>
            </div>
            <footer className={styles.footer}>
                <div className={styles.links}>
                    <a href="https://github.com/hassayag" target="_blank" rel="noopener noreferrer">
                        <img src="/github.svg" alt="github" className={commonStyles.link} />
                    </a>
                    <a href="https://uk.linkedin.com/in/harryassayag" target="_blank" rel="noopener noreferrer">
                        <img src="/linkedin-blue.svg" alt="linkedin" className={commonStyles.link} />
                    </a>

                    <a
                        href="https://open.spotify.com/user/hazzarius?si=bb02b8c9aeba426a"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/spotify.svg" alt="spotify" className={commonStyles.link} />
                    </a>
                    <a href="https://www.instagram.com/hassayag/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/instagram.svg"
                            alt="instagram"
                            className={commonStyles.link}
                            style={{ height: 25 }}
                        />
                    </a>
                </div>
                <div className={styles.bottom}>
                    <div style={{width: 120}}></div>
                    <div>Harry Assayag ©2025</div>
                    <a style={{marginBottom: 12, marginRight: 12}} href="https://github.com/hassayag/resume" rel="noopener noreferrer">
                        <span
                            className={commonStyles.link}
                        >
                            Source code
                            <Code style={{ position: 'relative', top: 7, paddingLeft: 5, color: '#7c558c' }} />
                        </span>
                    </a>
                </div>
            </footer>
        </div>
    );
}
