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
        console.log(i);
        setSelectedItem(i);
    }

    return (
        <div className={styles.navbar}>

            <div className={styles.topNavbar}>
                <div className={styles.logoWrapper}>
                    <div className={styles.logo}>
                        <LogoSVG />
                    </div>
                    <div className={styles.logoText}>IV V</div>
                </div>
                <TopNavElements>
                    
                    {topNavElements.map((item, index) => (
                        <NavElement key={index} 
                                    icon={item.icon}
                                    address={item.address}/>
                    ))}
                </TopNavElements>
            </div>


            <div className={styles.sideNavbar} >
                <SideNavElements>
                    {sideNavElements.map((item, index) => (
                        
                        <NavElement key={index} 
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

function NavElement({ icon, label, style, address, onClick, index, selectedItem }) {

    const handleClick = () => {
        onClick(index);
    }
    
    let classItem = null;

    if (selectedItem === index) {
        console.log(selectedItem, index);
       
        classItem = cx(styles.navItem, styles.active);
    } else  {
        classItem = styles.navItem;
    }

    return (
        <Link to={address}>
            <li className={classItem} onClick={handleClick}>
                <span className={styles.icon}>{icon}</span>
                {label 
                    ? <span className={styles.title}>{label}</span>
                    : null
                }
            </li>
        </Link>
    );
}
