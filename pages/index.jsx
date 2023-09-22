import Head from 'next/head';
import commonStyles from './common.module.sass';
import styles from './home.module.sass';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Harry <a>Assayag</a>
        </h1>

        <div className={styles.nav}>
          <div href="/" className={styles.card}>
            Home
          </div>

          <div href="/about" className={styles.card}>
            About
          </div>
          
          <div className={styles.card}>
            Portfolio
          </div>
        </div>

        <div className={commonStyles.sectionBorder}>
          <div className={commonStyles.section}>
            <h2 className={commonStyles.heading}>About me</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minima cum quo adipisci iste, aliquam odio. Impedit quidem repudiandae officiis repellat omnis, molestiae, et aliquid nihil ea officia non aut?
            </p>
          </div>
        </div>

        <div className={commonStyles.sectionBorder}>
          <div className={commonStyles.section}>
            <h2 className={commonStyles.heading}>Portfolio</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minima cum quo adipisci iste, aliquam odio. Impedit quidem repudiandae officiis repellat omnis, molestiae, et aliquid nihil ea officia non aut?
            </p>
          </div>
        </div>
      </main>

      <footer className={commonStyles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          min-height: 100%;
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
