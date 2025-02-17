import React, { useEffect } from 'react';
import commonStyles from '../common.module.sass';
import styles from './home.module.sass';
import Carousel from '../carousel/carousel';
import { PROJECT_ITEMS } from './constants';
import { ContactForm } from '../contact-form/contact-form';

const Home = ({ pageIsHidden }: { pageIsHidden: boolean }) => {
    const embedSpotify = async () => {
        const response = await fetch('/api/spotify');
        const uri = await response.text();
        const element = document.getElementById('spotify-iframe');
        if (element) {
            element.innerHTML = '';

            element.innerHTML = `
        <iframe
            id="spotify-iframe"
            style="border-radius:12px"
            src="https://open.spotify.com/embed/track/${uri}?utm_source=generator"
            width="100%"
            height="200px"
            padding-right="25%"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        ></iframe>
    `;
        }
    };

    useEffect(() => {
        embedSpotify();
    }, []);

    const homeClass = [styles.column];
    if (pageIsHidden) {
        homeClass.push(styles.hide);
    }

    return (
        <>
            <div className={homeClass.join(' ')}>
                <a id="home" />
                <h1 className={styles.title}>
                    Harry <a>Assayag</a>
                    <br />
                    <span id={styles.blurb}>Software Developer</span>
                </h1>

                <div className={commonStyles.sectionBorder}>
                    <a className="anchor" id="about" />
                    <div className={commonStyles.section}>
                        <h2 className={commonStyles.heading}>About me</h2>
                        <p>
                            Hey, I&apos;m Harry, a full-stack software developer with a wide range of experience, from COBOL
                            to Typescript! <br />
                            <br /> Over the last three years my focus has been on backend Node web development and AWS
                            infrastructure. Besides coding, I am privvy to music production, sourdough, and
                            unnecessarily long boardgames.
                            <br />
                            <br />
                            My resume can be found{' '}
                            <a href="CV.pdf" download="Harry Assayag CV 2025.pdf">
                                here
                            </a>
                        </p>
                        <br />
                        <br />

                        <div style={{ fontSize: 12, fontStyle: 'italic', textAlign: 'center' }}>
                            {' '}
                            Checkout what I&apos;m listening to:
                        </div>
                        <div id="spotify-iframe"></div>
                    </div>
                </div>

                <div className={commonStyles.sectionBorder}>
                    <a className="anchor" id="projects" />
                    <div className={commonStyles.section}>
                        <h2 className={commonStyles.heading}>Projects</h2>
                        <Carousel items={PROJECT_ITEMS} />
                    </div>
                </div>

                <div className={commonStyles.sectionBorder}>
                    <a className="anchor" id="contact" />
                    <div className={commonStyles.section}>
                        <h2 className={commonStyles.heading}>Contact</h2>
                        <p>Please get in touch below and I will get back to you as soon as possible.</p>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
