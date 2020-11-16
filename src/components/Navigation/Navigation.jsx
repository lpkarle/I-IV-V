import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import cx from 'classnames';


export default function Navigation({ logo, topNavElements, sideNavElements, currNavEl, onClick }) {

    const [selectedSideNavEl, setSelectedSideNavEl] = useState(currNavEl);

    useEffect(() => {
        setSelectedSideNavEl(currNavEl);
    }, [currNavEl])

    const handleSideNavEl = (element) => {
        setSelectedSideNavEl(element);
        onClick(element);
    }

    return (
        <div className={styles.navbar}>

            <div className={styles.logoWrapper}>
                <div className={styles.logo}><Link to={sideNavElements[0].address}>{logo}</Link></div>
                <div className={styles.logoText}>{selectedSideNavEl}</div>
            </div>

            <div className={styles.topNavbar}>
                <TopNavElements>
                    {topNavElements.map((item, index) => (
                        <TopNavElement
                            key={index}
                            icon={item.icon}
                            onClick={item.onClick}
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

Navigation.defaultProps = {
    logo: 'svg',
    topNavElements: [{icon: 'svg', onClick: () => console.log('Top')}],
    sideNavElements: [{ label: 'Side', icon: 'svg', address: '/' }],
    currNavEl: 'Side',
    onClick: () => console.log('Side')
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
