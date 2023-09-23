import React, { useEffect } from "react";
import Head from "next/head";
import commonStyles from "./common.module.sass";
import styles from "./home.module.sass";

export default function Home() {
  const embedSpotify = async () => {
    const response = await fetch("/api/spotify");
    const uri = await response.text();
    const element = document.getElementById("embed-iframe");

    element.innerHTML = `
      <iframe
        style="border-radius:12px"
        src="https://open.spotify.com/embed/track/${uri}?utm_source=generator"
        width="20%"
        height="10%"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    `
  };

    useEffect(() => embedSpotify())

  return (
    <div className={commonStyles.container}>
      <Head>
        <title>harry.assayag</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
          </div>
        </h1>
        <div id="embed-iframe"></div>
        <div className={styles.nav}>
          <a href="#home" className={styles.card}>
            Home
          </a>

          <a href="#about" className={styles.card}>
            About
          </a>

          <a href="#portfolio" className={styles.card}>
            Portfolio
          </a>

          <a href="#gear" className={styles.card}>
            Gear
          </a>

          <a href="#contact" className={styles.card}>
            Contact
          </a>
        </div>
        <div className={commonStyles.sectionBorder}>
          <a id="about" />
          <div className={commonStyles.section}>
            <h2 className={commonStyles.heading}>About me</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              minima cum quo adipisci iste, aliquam odio. Impedit quidem
              repudiandae officiis repellat omnis, molestiae, et aliquid nihil
              ea officia non aut?
            </p>
          </div>
        </div>
        <div className={commonStyles.sectionBorder}>
          <a id="portfolio" />
          <div className={commonStyles.section}>
            <h2 className={commonStyles.heading}>Portfolio</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              minima cum quo adipisci iste, aliquam odio. Impedit quidem
              repudiandae officiis repellat omnis, molestiae, et aliquid nihil
              ea officia non aut?
            </p>
          </div>
        </div>
        <div className={commonStyles.sectionBorder}>
          <a id="gear" />
          <div className={commonStyles.section}>
            <h2 className={commonStyles.heading}>Gear</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              minima cum quo adipisci iste, aliquam odio. Impedit quidem
              repudiandae officiis repellat omnis, molestiae, et aliquid nihil
              ea officia non aut?
            </p>
          </div>
        </div>
        <div className={commonStyles.sectionBorder}>
          <a id="contact" />
          <div className={commonStyles.section}>
            <h2 className={commonStyles.heading}>Contact</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              minima cum quo adipisci iste, aliquam odio. Impedit quidem
              repudiandae officiis repellat omnis, molestiae, et aliquid nihil
              ea officia non aut?
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
