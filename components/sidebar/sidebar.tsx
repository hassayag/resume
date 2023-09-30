import React, { useState, useEffect, useRef } from "react";
import styles from "./sidebar.module.sass";

const Sidebar = () => {
    const items = ['home', 'about', 'portfolio', 'gear', 'contact']
    
    const [scrollPos, setScrollPos] = useState(0);
    const [activeCard, setActiveCard] = useState('');
  
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPos(position);
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    useEffect(() => {
      updateClosestAnchor();
    });
    // Create a ref for the DOM element you want to start from
    const elementRef = useRef(null);
  
    // Function to find the closest anchor tag
    const updateClosestAnchor = () => {
        const anchors = document.getElementsByClassName('anchor')
        let closestAnchor = 'home'
        let minDistance = null
        for (let i=0; i<anchors.length; i++) {
            const distance = (anchors[i].offsetTop - scrollPos)**2
            if (minDistance === null || distance < minDistance) {
                closestAnchor = anchors[i].id
                minDistance = distance
            }
        }
        setActiveCard(closestAnchor)
      }

    const [isOpen, setIsOpen] = useState(false);
    const toggleHamburger = () => {
      setIsOpen(!isOpen);
    };

    const sidebarClasses = [styles.sidebar]
    const defaultCardClasses = [styles.card]
    if (isOpen) {
        sidebarClasses.push(styles.sidebarOpen)
        defaultCardClasses.push(styles.clickable)
    }
    else {
        sidebarClasses.push(styles.sidebarClosed)
    }

    const itemsHtml = items.map(item => {
        const cardClasses = Array.from(defaultCardClasses)
        if (item === activeCard) {
            cardClasses.push(styles.activeCard)
        }
        console.log(cardClasses)
        return (
            <div className={cardClasses.join(' ')}>
                <a href={`#${item}`}>
                    <div>
                        {item.charAt(0).toUpperCase() + item.slice(1, item.length)}
                    </div>
                </a>
            </div>
        )
    })

    return (<>
        <div className={sidebarClasses.join(' ')}>
            <button className={styles.hamburger} onClick={toggleHamburger}>
                <img
                  src="/hamburger.svg"
                  alt="hamburger"
                />
            </button>
            {itemsHtml}
        </div>
    </>)
}

export default Sidebar