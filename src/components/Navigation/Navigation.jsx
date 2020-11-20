import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import cx from 'classnames';


export default function Navigation({ logo, topNavElements, sideNavElements, currNavEl, onClick }) {

    const [selectedSideNavEl, setSelectedSideNavEl] = useState(currNavEl);
    const [toggleOpen, setToggleOpen] = useState(false);

    useEffect(() => {
        setSelectedSideNavEl(currNavEl);
    }, [currNavEl])

    const handleSideNavEl = (element) => {
        setSelectedSideNavEl(element);
        onClick(element);
    }

    const handleTopNavClick = (item, dd) => {
        if (dd) setToggleOpen(!toggleOpen)
        item();
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
                            onClick={() => handleTopNavClick(item.onClick, item.dd)}>
                            {item.dd ? <DropdownMenu open={toggleOpen} items={item.dd} /> : null}
                        </TopNavElement>
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

function TopNavElement({ icon, onClick, children }) {
    return (
        <li className={styles.navItem} onClick={onClick}>
            <span className={styles.icon}>{icon}</span>
            { children }
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

function DropdownMenu({ open, items }) {

    const styleMenu = () => {
        return {
            display: open ? 'flex' : 'none'
        }
    }

    function DropdownItem({ children, icon, address }) {
        return (
            <Link className={styles.menuItem} to={address}>
                <span className={styles.iconButton}>{icon}</span>
                {children}
            </Link>
        );
    }

    return (
        <div className={styles.dropdown} style={styleMenu()}>
            {items.map((item, index) => 
                <DropdownItem key={index} icon={item.icon} address={item.address}>
                    <h6>{item.label}</h6>
                </DropdownItem>
            )}
        </div>
    );
}