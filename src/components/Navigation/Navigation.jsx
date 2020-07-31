import React, {useState} from 'react';

import styles from './Navigation.module.css';

import { ReactComponent as LogoSVG } from '../../images/svgs/logo_v0_small.svg'; 

/**
 * Reusable Navigation
 * It takes the following parameter:
 * {label: ..., icon: ..., selected: ...} 
 *   
 * @param {*} param0 
 */
export default function Navigation({ logo, topNavItems, sideNavItems, onClick }) {

    const [open, setOpen] = useState(false);

    /* const handleClick = (label) => {
        onClick(label);
    } */

    function toggle() {
        setOpen(!open);
    }

    function styleOpen() {

        if (open) {
            return {
                width: '500px',
            }
        } 
        return {
            width: open ? '500px' : null
        }
    }

    function styleButton() {
        if (open) {
            return {
                content: '<',
                color: 'red',
            }
        }
    }

    function styleSelected() {

    }

    return (
        <div className={styles.navbar}>

            <button className={styles.openNav}
                    onClick={toggle}
                    style={styleButton()}>
                X
            </button>

            <div className={styles.topNavbar}>
                <div className={styles.logo}>
                    <LogoSVG />
                </div>
                <TopNavElements>
                    {topNavItems.map((item, index) => (
                        <NavElement key={index} 
                                    icon={item.icon}
                                    onClick={onClick} />
                    ))}
                </TopNavElements>
            </div>


            <div className={styles.sideNavbar} style={styleOpen()}>
                <SideNavElements>
                    {sideNavItems.map((item, index) => (
                        <NavElement key={index} 
                                    icon={item.icon} 
                                    label={item.label}
                                    onClick={onClick} 
                                    style={open ? {display: `inline-block`} : null }/>
                    ))}
                </SideNavElements>
            </div>
        </div>
    );
}

function TopNavElements({ children, onClick }) {
    
    /* const handleClick = (event) => {
        onClick(event.target.innerHTML);
    } */

    return (
        <div className={styles.topMenu}>
            <ul>
                {children}
            </ul>
        </div>
    );
}

function SideNavElements({ children }) {

    return (
        <ul>
            {children}
        </ul>
    );
}

function NavElement({ icon, label, style, onClick }) {

    const handleClick = () => {
        onClick(label);
    }

    return (
        <li className={styles.navItem} onClick={handleClick}>
            <span className={styles.icon}>{icon}</span>
            {label 
                ? <span className={styles.title} style={style}>{label}</span>
                : null
            }
        </li>
    );
}
