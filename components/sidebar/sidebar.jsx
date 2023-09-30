import React, { useState } from "react";
import styles from "./sidebar.module.sass";

const Sidebar = () => {
    const items = ['home', 'about', 'portfolio', 'gear', 'contact']
    
    const [isOpen, setIsOpen] = useState(false);
    const toggleHamburger = () => {
      setIsOpen(!isOpen);
    };

    const sidebarClasses = [styles.sidebar]
    const cardClasses = [styles.card]
    if (isOpen) {
        sidebarClasses.push(styles.transformActive)
        cardClasses.push(styles.clickable)
    }
    else {
        sidebarClasses.push(styles.transform)
    }

    const itemsHtml = items.map(item => (
        <div className={cardClasses.join(' ')}>
            <a href={`#${item}`}>
                <div>
                    {item.charAt(0).toUpperCase() + item.slice(1, item.length)}
                </div>
            </a>
        </div>
    ))

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