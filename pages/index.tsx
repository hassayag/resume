import React, { useEffect } from "react";
import Head from "next/head";
import commonStyles from "../components/common.module.sass";
import styles from "./main.module.sass";

import Sidebar from "../components/sidebar/sidebar";
import Home from "../components/home/home";

export default function Main() {
  const embedSpotify = async () => {
    const response = await fetch("/api/spotify");
    const uri = await response.text();
    const element = document.getElementById("embed-iframe");
    if (element) {
      element.innerHTML = "";
  
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
    // TODO - when iframe has loaded, get the background colour of the iframe and apply it to the theme's accent
    // const iframe = document.getElementById('spotify-iframe');
    // iframe.addEventListener('load', (event) => {
    //   const iframe = document.getElementById('spotify-iframe');
    //   console.log({event})
    //   const spotifyBackground = document.getElementsByClassName(`BackgroundColorContainer_backgroundColorContainer__KSQbl`)
    //   console.log({spotifyBackground})
    // });
  };

  useEffect(() => {
    embedSpotify();
  }, []);

  return (
    <>
      <Sidebar />
      <div className={commonStyles.container}>
        <Head>
          <title>harry.assayag</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
         <Home/>
        </main>
      </div>
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
    </>
  );
}
