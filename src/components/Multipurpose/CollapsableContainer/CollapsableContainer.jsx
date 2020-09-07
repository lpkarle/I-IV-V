import React, { useState } from 'react';
import styles from './CollapsableContainer.module.css';
import cx from 'classnames';
import { ArrowIcon } from '../../../images';

export default function CollapsableContainer({ label, open, children }) {

    const [toggleOpen, setToggleOpen] = useState(open);

    const styleContent = () => {
        return {
            height: toggleOpen ? '100%' : '0',
            padding: toggleOpen ? '1rem' : '0',
        }
    }

    const styleIcon = () => {
        return {
            transform: toggleOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }
    }

    return (
        <div className={styles.collapsableContainer}>
            <div className={styles.label}>
                <div><h4 onClick={() => setToggleOpen(!toggleOpen)}>{label}</h4></div>
                <div><ArrowIcon style={styleIcon()} onClick={() => setToggleOpen(!toggleOpen)}/></div>
            </div>

            <div className={cx("card", styles.content)} style={styleContent()}>
                {children}
            </div>
        </div>
    );
}

CollapsableContainer.defaultProps = {
    label: 'Container', 
    open: true, 
    children: null
}