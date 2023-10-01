import React from 'react';
import commonStyles from '../common.module.sass'
import styles from './home.module.sass'

const Home = () => {
    return (<>
    <a id="home" />
    <h1 className={styles.title}>
      Harry <a>Assayag</a>
      <div className={styles.links}>
        <a
          href="https://github.com/hassayag"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/github.svg" alt="github" className={styles.link} />
        </a>
        <a
          href="https://uk.linkedin.com/in/harryassayag"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/linkedin-blue.svg"
            alt="linkedin"
            className={styles.link}
          />
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
          minima cum quo adipisci iste, aliquam odio. Impedit quidem
          repudiandae officiis repellat omnis, molestiae, et aliquid nihil
          ea officia non aut? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Error minima cum quo adipisci iste, aliquam
          odio. Impedit quidem repudiandae officiis repellat omnis,
          molestiae, et aliquid nihil ea officia non aut? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Error minima cum
          quo adipisci iste, aliquam odio. Impedit quidem repudiandae
          officiis repellat omnis, molestiae, et aliquid nihil ea officia
          non aut?
        </p>
      </div>
    </div>
    <div className={commonStyles.sectionBorder}>
      <a className="anchor" id="projects" />
      <div className={commonStyles.section}>
        <h2 className={commonStyles.heading}>Projects</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
          minima cum quo adipisci iste, aliquam odio. Impedit quidem
          repudiandae officiis repellat omnis, molestiae, et aliquid nihil
          ea officia non aut? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Error minima cum quo adipisci iste, aliquam
          odio. Impedit quidem repudiandae officiis repellat omnis,
          molestiae, et aliquid nihil ea officia non aut? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Error minima cum
          quo adipisci iste, aliquam odio. Impedit quidem repudiandae
          officiis repellat omnis, molestiae, et aliquid nihil ea officia
          non aut?
        </p>
      </div>
    </div>
    <div className={commonStyles.sectionBorder}>
      <a className="anchor" id="gear" />
      <div className={commonStyles.section}>
        <h2 className={commonStyles.heading}>Gear</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
          minima cum quo adipisci iste, aliquam odio. Impedit quidem
          repudiandae officiis repellat omnis, molestiae, et aliquid nihil
          ea officia non aut? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Error minima cum quo adipisci iste, aliquam
          odio. Impedit quidem repudiandae officiis repellat omnis,
          molestiae, et aliquid nihil ea officia non aut? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Error minima cum
          quo adipisci iste, aliquam odio. Impedit quidem repudiandae
          officiis repellat omnis, molestiae, et aliquid nihil ea officia
          non aut?
        </p>
      </div>
    </div>
    <div className={commonStyles.sectionBorder}>
      <a className="anchor" id="contact" />
      <div className={commonStyles.section}>
        <h2 className={commonStyles.heading}>Contact</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
          minima cum quo adipisci iste, aliquam odio. Impedit quidem
          repudiandae officiis repellat omnis, molestiae, et aliquid nihil
          ea officia non aut? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Error minima cum quo adipisci iste, aliquam
          odio. Impedit quidem repudiandae officiis repellat omnis,
          molestiae, et aliquid nihil ea officia non aut? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Error minima cum
          quo adipisci iste, aliquam odio. Impedit quidem repudiandae
          officiis repellat omnis, molestiae, et aliquid nihil ea officia
          non aut?
        </p>
      </div>
    </div>
    </>)
}

export default Home