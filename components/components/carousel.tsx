import { useEffect, useState } from "react";
import styles from "./carousel.module.sass";

type Item = {
    heading: string,
    link: string,
    body: string
    tags?: string[]
    imgPath?: string,
}

const GAP = 30
const WIDTH = 250
const MARGIN = 5

export default function Carousel() {
    const items: Item[] = [
        {   
            heading: 'Wordle Online',
            link: 'https://github.com/hassayag/WordleOnline',
            body: 'Wordle... But with online competetive multiplayer for up to 5 players to compete in real-time',
            tags: ['typescript', 'react', 'postgres']
        },
        {   
            heading: 'Deadlock Wiki Bot',
            link: 'https://github.com/deadlock-wiki/deadbot',
            body: `My open-source project that automates the scraping and uploading of data from Valve's "Deadlock" to a community-run wiki`,
            tags: ['python']
        }
    ]
    const itemIndices = items.map((val, index) => 0.5+ index - items.length/2)
    const [pos, setPos] = useState(0)

    const moveLeft = () => {
        if (pos === 0) {
            setPos(items.length)
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
        <button onClick={moveLeft}>left</button>
        <div className={styles.container}>
            <div className={styles.itemsContainer} style={itemsContainerStyle}>
                {items.map((item, index) => {
                    return <CarouselItem 
                        item={item}
                        width={WIDTH}
                    />
                })}
            </div>
        </div>
        <button onClick={moveRight}>right</button>
    </div>)
}

function CarouselItem({item, width}: {item: Item, width: number}) {
    const style = {
        width: `${width-2*MARGIN}px`,
        margin: `${MARGIN}px`
    }
    return (<div className={styles.item} style={style}>
        <h3>{item.heading}</h3>
        <a href={item.link}>{item.link.slice(8)}</a>
        <span>{item.body}</span>
        <div className={styles.tags}>{item.tags?.map(tag => <Tag label={tag}/>)}</div>
    </div>)
}

function Tag({label}: {label: string}) {
    return (<span className={styles.tag}>{label}</span>)
}


