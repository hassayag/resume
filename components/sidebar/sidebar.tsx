import React, { useState, useEffect } from 'react';
import { Home, Info, MenuBook, Devices, Email } from '@mui/icons-material';
import styles from './sidebar.module.sass';

const SCROLL_OFFSET = 200;

const Sidebar = ({ toggleHidePage }: { toggleHidePage: () => void }) => {
    const items = {
        home: <Home className={styles.icon} />,
        about: <Info className={styles.icon} />,
        projects: <MenuBook className={styles.icon} />,
        // gear: <Devices className={styles.icon} />,
        contact: <Email className={styles.icon} />,
    };

    const [scrollPos, setScrollPos] = useState(0);
    const [activeCard, setActiveCard] = useState('');

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPos(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        updateClosestAnchor();
    }, [scrollPos]);

    // Function to find the closest anchor tag
    const updateClosestAnchor = () => {
        const anchors = document.getElementsByClassName('anchor');
        let closestAnchor = 'home';
        let minDistance: number | null = null;

        for (let i = 0; i < anchors.length; i++) {
            const anchor = anchors[i] as HTMLElement;
            const distance = (anchor.offsetTop - (scrollPos + SCROLL_OFFSET)) ** 2;
            if (minDistance === null || distance < minDistance) {
                closestAnchor = anchors[i].id;
                minDistance = distance;
            }
        }

        if (scrollPos < SCROLL_OFFSET / 4) {
            closestAnchor = 'home';
        }
        setActiveCard(closestAnchor);
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggleHamburger = () => {
        setIsOpen(!isOpen);
    };

    const sidebarClasses = [styles.sidebar];
    const defaultCardClasses = [styles.card];
    if (isOpen) {
        sidebarClasses.push(styles.sidebarOpen);
        defaultCardClasses.push(styles.clickable);
    } else {
        sidebarClasses.push(styles.sidebarClosed);
        defaultCardClasses.push(styles.clickable);
    }

    const itemsHtml = Object.entries(items).map(([name, icon]) => {
        const cardClasses = Array.from(defaultCardClasses);
        if (name === activeCard) {
            cardClasses.push(styles.activeCard);
        }

        return (
            <div key={name} className={cardClasses.join(' ')}>
                <a href={`#${name}`} onClick={() => setTimeout(() => setActiveCard(name))}>
                    <div className={styles.label}>
                        {icon}
                        <span className={isOpen ? styles.show : styles.hide}>
                            {name.charAt(0).toUpperCase() + name.slice(1, name.length)}
                        </span>
                    </div>
                </a>
            </div>
        );
    });

    return (
        <>
            <div className={sidebarClasses.join(' ')}>
                <button className={styles.hamburger} onClick={toggleHamburger}>
                    <img src="/hamburger.svg" alt="hamburger" />
                </button>
                {itemsHtml}
                {/* <button className={styles.firebutton} onClick={() => toggleHidePage()}>🔥</button> */}
            </div>
        </>
    );
};

export default Sidebar;
