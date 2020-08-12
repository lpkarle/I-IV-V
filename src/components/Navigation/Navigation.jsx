import React, { useState } from 'react';
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
export default function Navigation({ topNavElements, sideNavElements, currNavEl, onClick, toggleTheme }) {

    const [selectedSideNavEl, setSelectedSideNavEl] = useState(currNavEl);

    const handleSideNavEl = (element) => {
        setSelectedSideNavEl(element);
        onClick(element);
    }

    return (
        <div className={styles.navbar}>

            <div className={styles.logoWrapper}>
                <div className={styles.logo}><LogoSVG /></div>
                <div className={styles.logoText}>{selectedSideNavEl}</div>
            </div>

            <div className={styles.topNavbar}>
                <TopNavElements>
                    {topNavElements.map((item, index) => (
                        <TopNavElement
                            key={index}
                            icon={item.icon}
                            onClick={toggleTheme}
                        />
                    ))}
                </TopNavElements>
            </div>

            <div className={styles.sideNavbar} >
                <SideNavElements>
                    {sideNavElements.map((item, index) => (
                        <SideNavElement
                            key={index}
                            index={index}
                            icon={item.icon}
                            selectedEl={selectedSideNavEl}
                            label={item.label}
                            address={item.address}
                            onClick={handleSideNavEl}
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

function TopNavElement({ icon, onClick }) {
    return (
        <li className={styles.navItem} onClick={onClick}>
            <span className={styles.icon}>{icon}</span>
        </li>
    );
}

function SideNavElements({ children }) {
    return (
        <ul>
            {children}
        </ul>
    );
}

function SideNavElement({ icon, label, address, onClick, selectedEl }) {

    const handleClick = () => {
        onClick(label);
    }

    let classItem = selectedEl === label
        ? cx(styles.navItem, styles.active)
        : styles.navItem;

    return (
        <Link to={address}>
            <li className={classItem} onClick={handleClick}>
                <span className={styles.icon}>{icon}</span>
                <span className={styles.title}>{label}</span>
            </li>
        </Link>
    );
}
