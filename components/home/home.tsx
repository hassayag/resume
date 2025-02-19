import React, { useEffect, useState } from 'react';
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

    const [letterGlowIndex, setLetterGlowIndex] = useState(-1)

    const startGlowLoop = () => {
        const interval = setInterval(() => {
        setLetterGlowIndex((value) => {
            // if reaches the end of the title, stop the loop
            if (value === 'HarryAssayag'.length-1) {
                clearInterval(interval)
                return -1
            }
            return value + 1
        })
    }, 80)}

    useEffect(() => {
        // trigger animation on initial load, then run it every 5s
        setTimeout(() => startGlowLoop(), 500)
        setInterval(() => startGlowLoop(), 5000)

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
                    <span className={[styles.black, letterGlowIndex === 0 ? styles.flash : undefined].join(' ')}>H</span>
                    <span className={[styles.black, letterGlowIndex === 1 ? styles.flash : undefined].join(' ')}>a</span>
                    <span className={[styles.black, letterGlowIndex === 2 ? styles.flash : undefined].join(' ')}>r</span>
                    <span className={[styles.black, letterGlowIndex === 3 ? styles.flash : undefined].join(' ')}>r</span>
                    <span className={[styles.black, letterGlowIndex === 4 ? styles.flash : undefined].join(' ')}>y</span>
                    <span> </span>
                    <span className={[styles.purple, letterGlowIndex === 5 ? styles.flash : undefined].join(' ')}>A</span>
                    <span className={[styles.purple, letterGlowIndex === 6 ? styles.flash : undefined].join(' ')}>s</span>
                    <span className={[styles.purple, letterGlowIndex === 7 ? styles.flash : undefined].join(' ')}>s</span>    
                    <span className={[styles.purple, letterGlowIndex === 8 ? styles.flash : undefined].join(' ')}>a</span>    
                    <span className={[styles.purple, letterGlowIndex === 9 ? styles.flash : undefined].join(' ')}>y</span>    
                    <span className={[styles.purple, letterGlowIndex === 10 ? styles.flash : undefined].join(' ')}>a</span>   
                    <span className={[styles.purple, letterGlowIndex === 11 ? styles.flash : undefined].join(' ')}>g</span>    
                    <br />
                    <span id={styles.blurb}>Software Developer</span>
                </h1>

                <div className={[commonStyles.sectionBorder, commonStyles.sectionBorderAlt].join(' ')}>
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

                <div className={[commonStyles.sectionBorder, commonStyles.sectionBorderAlt].join(' ')} style={{boxShadow: 'none'}}>
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
