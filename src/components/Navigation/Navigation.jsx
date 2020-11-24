import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import cx from 'classnames';
import { LogoIcon, HomeIcon, MusicNoteIcon, MenuIcon, InvertColorIcon, 
         MoreIcon, HelpIcon, LanguageIcon } from '../../images/index';

export default function Navigation({ currNavEl, invertColor, changeSelNavIcon, changeLang, lang }) {
    
    const [selectedSideNavEl, setSelectedSideNavEl] = useState(currNavEl);
    const [toggleOpen, setToggleOpen] = useState(false);

    const topNavElements = [
        { icon: <MoreIcon />, onClick: () => setToggleOpen(!toggleOpen),
            dd: [
                { label: lang.str.about, address: '/about', icon: <HelpIcon/> },
                { label: lang.str.theme, address: '#', icon: <InvertColorIcon/>, onClick: invertColor },
                { label: lang.str.language, address: '#', icon: <LanguageIcon/>, onClick: changeLang }]
        },
    ];

    const sideNavElements = [
        { label: lang.str.home, icon: <HomeIcon />,
          address: '/', onClick: (el) => { changeSelNavIcon(el) }},
        { label: lang.str.music_theory, icon: <MusicNoteIcon />,
          address: '/music-theory', onClick: (el) => { changeSelNavIcon(el) }},
        { label: lang.str.fretboard, icon: <MenuIcon />,
          address: '/fretboard', onClick: (el) => { changeSelNavIcon(el) }}
    ];

    useEffect(() => {
        setSelectedSideNavEl(currNavEl);
    }, [currNavEl])

    const handleSideNavEl = (element) => {
        setSelectedSideNavEl(element);
        changeSelNavIcon(element); 
    }

    return (
        <div className={styles.navbar}>

            <div className={styles.logoWrapper}>
                <div className={styles.logo}>
                    <Link to={sideNavElements[0].address}><LogoIcon/></Link>
                </div>
                <div className={styles.logoText}>{selectedSideNavEl}</div>
            </div>

            <div className={styles.topNavbar}>
                <TopNavElements>
                    {topNavElements.map((item, index) => (
                        <TopNavElement
                            key={index}
                            icon={item.icon}
                            onClick={item.onClick}>
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
            { children}
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

    function DropdownItem({ children, icon, address, onClick }) {
        return (
            <Link className={styles.menuItem} to={address} onClick={onClick}>
                <span className={styles.iconButton}>{icon}</span>
                {children}
            </Link>
        );
    }

    return (
        <div className={styles.dropdown} style={styleMenu()}>
            {items.map((item, index) =>
                <DropdownItem key={index} icon={item.icon} address={item.address} onClick={item.onClick}>
                    <h6>{item.label}</h6>
                </DropdownItem>
            )}
        </div>
    );
}