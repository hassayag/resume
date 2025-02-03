import React, { useEffect } from 'react';
import commonStyles from '../common.module.sass';
import styles from './home.module.sass';
import Carousel from '../carousel/carousel'
import {Email, Phone} from '@mui/icons-material';

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
                <br />
                <span id={styles.blurb}>Software Developer</span>
                <div className={styles.links}>
                    <a href="https://github.com/hassayag" target="_blank" rel="noopener noreferrer">
                        <img src="/github.svg" alt="github" className={styles.link} />
                    </a>
                    <a href="https://uk.linkedin.com/in/harryassayag" target="_blank" rel="noopener noreferrer">
                        <img src="/linkedin-blue.svg" alt="linkedin" className={styles.link} />
                    </a>

                    <a
                        href="https://open.spotify.com/user/hazzarius?si=bb02b8c9aeba426a"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/spotify.svg" alt="spotify" className={styles.link} />
                    </a>
                </div>
            </h1>
            <div id="embed-iframe"></div>

            <div className={commonStyles.sectionBorder}>
                <a className="anchor" id="about" />
                <div className={commonStyles.section}>
                    <h2 className={commonStyles.heading}>About me</h2>
                    <p>
                        Hey, I'm Harry, a full-stack software developer with a wide range of experience, from COBOL to Typescript! Over the last three years my focus has been on backend Node web development and AWS infrastructure. Besides coding, I am privvy to music production, sourdough, and unnecessarily long boardgames.
                        <br/><br/>
                        My resume can be found <a href="CV.pdf" download="Harry Assayag CV 2025.pdf">here</a>
                    </p>
                </div>
            </div>
            <div className={commonStyles.sectionBorder}>
                <a className="anchor" id="projects" />
                <div className={commonStyles.section}>
                    <h2 className={commonStyles.heading}>Projects</h2>
                    <Carousel></Carousel>
                </div>
            </div>
            <div className={commonStyles.sectionBorder}>
                <a className="anchor" id="gear" />
                <div className={commonStyles.section}>
                    <h2 className={commonStyles.heading}>Gear</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minima cum quo adipisci iste,
                        aliquam odio. Impedit quidem repudiandae officiis repellat omnis, molestiae, et aliquid nihil ea
                        officia non aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minima cum quo
                        adipisci iste, aliquam odio. Impedit quidem repudiandae officiis repellat omnis, molestiae, et
                        aliquid nihil ea officia non aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                        minima cum quo adipisci iste, aliquam odio. Impedit quidem repudiandae officiis repellat omnis,
                        molestiae, et aliquid nihil ea officia non aut?
                    </p>
                </div>
            </div>
            <div className={commonStyles.sectionBorder}>
                <a className="anchor" id="contact" />
                <div className={commonStyles.section}>
                    <h2 className={commonStyles.heading}>Contact</h2>
                    <div className={styles.contactItems}>
                        <div className={styles.item}>
                            <Email style={{position: 'relative', bottom: 2}}/>
                            <div><a href='mailto:haassayag@gmail.com'>haassayag@gmail.com</a></div>
                        </div>

                        <a className=   {styles.item} href="https://uk.linkedin.com/in/harryassayag" target="_blank" rel="noopener noreferrer">
                            <img style={{width: 20, position: 'relative', bottom: 2}} src="/linkedin-blue.svg" alt="linkedin" />
                            <span>harryassayag</span>
                        </a>        
                        <a className={styles.item} href="https://github.com/hassayag" target="_blank" rel="noopener noreferrer">
                            <img style={{width: 20, position: 'relative', bottom: 2}} src="/github.svg" alt="github" />
                            <span>hassayag</span>
                        </a>          
                    </div>                    
                </div>
            </div>
        </div>
    </>);
};

export default Home;
