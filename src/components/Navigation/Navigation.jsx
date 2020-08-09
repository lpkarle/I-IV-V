import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import styles from './Navigation.module.css';
import cx from 'classnames';

import { ReactComponent as LogoSVG } from '../../images/svgs/Navigation/logo_v0_small.svg'; 

/**
 * Reusable Navigation
 * It takes the following parameter:
 * {label: ..., icon: ..., selected: ...} 
 *   
 * @param {*} param0 
 */
export default function Navigation({ logo, topNavElements, sideNavElements }) {

    const [selectedItem, setSelectedItem] = useState(0);

    const handleSelection = (i) => {
        setSelectedItem(i);
    }

    return (
        <div className={styles.navbar}>

            <div className={styles.logoWrapper}>
                <div className={styles.logo}><LogoSVG /></div>
                <div className={styles.logoText}>IV V</div>
            </div>

            <div className={styles.topNavbar}>
                <TopNavElements>
                    {topNavElements.map((item, index) => (
                        <NavElement 
                            key={index} 
                            icon={item.icon}
                            address={item.address}
                            onClick={() => console.log("Top Nav")}
                        />
                    ))}
                </TopNavElements>
            </div>

            <div className={styles.sideNavbar} >
                <SideNavElements>
                    {sideNavElements.map((item, index) => (
                        <NavElement 
                            key={index} 
                            index={index}
                            icon={item.icon} 
                            selectedItem={selectedItem}
                            label={item.label}
                            address={item.address}
                            onClick={handleSelection}
                        />
                    ))}
                </SideNavElements>
            </div>
        </div>
    );
}

function TopNavElements({ children }) {
    return (
        <ul>
            {children}
        </ul>
    );
}

function SideNavElements({ children }) {
    return (
        <ul>
            {children}
        </ul>
    );
}

function NavElement({ icon, label, address, onClick, index, selectedItem }) {

    const handleClick = () => {
        onClick(index);
    }
    
    let classItem = selectedItem === index 
        ? cx(styles.navItem, styles.active) 
        : styles.navItem;

    // Position last element at the botton (Search maby a floating butten with info from current page)
    const styleLastEl = () => {
        return {
            /* position:  index===3 ? "absolute": null,
            bottom: index===3 ? "0" : null,  */
        }
    }

    return (
        <Link to={address}>
            <li className={classItem} onClick={handleClick} style={styleLastEl()}>
                <span className={styles.icon}>{icon}</span>
                {label 
                    ? <span className={styles.title}>{label}</span>
                    : null
                }
            </li>
        </Link>
    );
}
