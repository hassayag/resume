import React, { useEffect } from 'react';
import commonStyles from '../common.module.sass';
import styles from './home.module.sass';
import Carousel from '../carousel/carousel'
import {Email} from '@mui/icons-material';
import { PROJECT_ITEMS } from './constants';

const Home = ({pageIsHidden}: {pageIsHidden: boolean}) => {
    const embedSpotify = async () => {
        const response = await fetch('/api/spotify');
        const uri = await response.text();
        const element = document.getElementById('embed-iframe');
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

    const homeClass = [styles.column]
    if (pageIsHidden) {
        homeClass.push(styles.hide)
    }

    return (<>
        <div className={homeClass.join(' ')}>
            <a id="home" />
            <h1 className={styles.title}>
                Harry <a>Assayag</a>
                <br/>
                <span id={styles.blurb}>Software Developer</span>
            </h1>

            <div className={commonStyles.sectionBorder}>
                <a className="anchor" id="about" />
                <div className={commonStyles.section}>
                    <h2 className={commonStyles.heading}>About me</h2>
                    <p>
                        Hey, I'm Harry, a full-stack software developer with a wide range of experience, from COBOL to Typescript! <br/><br/> Over the last three years my focus has been on backend Node web development and AWS infrastructure. Besides coding, I am privvy to music production, sourdough, and unnecessarily long boardgames.
                        <br/><br/>
                        My resume can be found <a href="CV.pdf" download="Harry Assayag CV 2025.pdf">here</a>
                    </p>
                    <br/>
                    <br/>

                    <div style={{fontSize: 12, fontStyle: 'italic', textAlign: 'center'}}> Checkout what I'm listening to:</div>
                    <div id="embed-iframe"></div>
                </div>
            </div>
            <div className={commonStyles.sectionBorder}>
                <a className="anchor" id="projects" />
                <div className={commonStyles.section}>
                    <h2 className={commonStyles.heading}>Projects</h2>
                    <Carousel items={PROJECT_ITEMS}/>
                </div>
            </div>
            <div className={commonStyles.sectionBorder}>
                <a className="anchor" id="gear" />
                <div className={commonStyles.section}>
                    <h2 className={commonStyles.heading}>Gear</h2>
                        <ul style={{fontSize: '1rem'}}>
                            <li>Keychron K8 Pro</li>
                            <li>Logitech G502X</li>
                            <li>Sennheiser Momentum 2</li>
                            <li>AMD Radeon 6800XT</li>
                        </ul>
                </div>
            </div>
            <div className={commonStyles.sectionBorder}>
                <a className="anchor" id="contact" />
                <div className={commonStyles.section}>
                    <h2 className={commonStyles.heading}>Contact</h2>
                    <div className={styles.contactItems}>
                        <div className={[styles.item, commonStyles.link].join(' ')}>
                            <Email style={{position: 'relative', bottom: 2, color: '#7c558c'}}/>
                            <div><a href='mailto:haassayag@gmail.com'>haassayag@gmail.com</a></div>
                        </div>

                        <a className={[styles.item, commonStyles.link].join(' ')} href="https://uk.linkedin.com/in/harryassayag" target="_blank" rel="noopener noreferrer">
                            <img style={{width: 20, position: 'relative', bottom: 2}} src="/linkedin-blue.svg" alt="linkedin" />
                            <span>harryassayag</span>
                        </a>          
                    </div>                    
                </div>
            </div>
        </div>
    </>);
};

export default Home;
