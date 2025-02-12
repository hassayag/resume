import React, { useState } from "react";
import styles from "./carousel.module.sass";
import sideBarStyles from "../sidebar/sidebar.module.sass";

type Item = {
    heading: string,
    link: string,
    body: string
    tags?: string[]
    img?: string,
}

const GAP = 30
const WIDTH = 285
const MARGIN = 5

export default function Carousel({items}: {items: Item[]}) {
    const itemIndices = items.map((val, index) => 0.5+ index - items.length/2)
    const [pos, setPos] = useState(0)

    const moveLeft = () => {
        if (pos === 0) {
            setPos(items.length-1)
        }
        else {
            setPos(pos-1)
        }
    }

    const moveRight = () => {
        if (pos === items.length-1) {
            setPos(0)
        }
        else {
            setPos(pos+1)
        }
    }

    const itemsContainerStyle = {
        left: `${-itemIndices[pos]*(WIDTH + GAP)}px`,
        gap: GAP,
        marginRight: WIDTH,
        marginLeft: WIDTH
    }

    return (
        <div className={styles.carousel}>
        <button className={[styles.button, sideBarStyles.clickable].join(' ')} onClick={moveLeft}>&#x3c;</button>
        <div className={styles.container}>
            <div className={styles.itemsContainer} style={itemsContainerStyle}>
                {items.map((item, index) => {
                    return <CarouselItem 
                        key={index}
                        item={item}
                        width={WIDTH}
                        active={pos===index}
                    />
                })}
            </div>
        </div>
        <button className={[styles.button, sideBarStyles.clickable].join(' ')} onClick={moveRight}>&#62;</button>
    </div>)
}

function CarouselItem({item, width, active}: {item: Item, width: number, active: boolean}) {
    const style = {
        width: `${width-2*MARGIN}px`,
        margin: `${MARGIN}px`
    }

    const itemStyles = [styles.item]
    if (active) {
        itemStyles.push(styles.active)
    }

    return (<div className={itemStyles.join(' ')} style={style}>
        <h3>{item.heading}</h3>
        <a className={styles.link} href={item.link}>{item.link.slice(8)}</a>
        <p dangerouslySetInnerHTML={{ __html: item.body }} />
        <div className={styles.tags}>{item.tags?.map((tag, index) => <Tag key={index} label={tag}/>)}</div>
    </div>)
}

function Tag({label}: {label: string}) {
    return (<span className={styles.tag}>{label}</span>)
}


