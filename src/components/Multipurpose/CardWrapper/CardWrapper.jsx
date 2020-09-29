import React from 'react';
import styles from './CardWrapper.module.css';
import cx from 'classnames';

export default function CardWrapper({ children, label, style }) {

    const styleLabel = () => {
        return {
            textAlign: 'left',
            margin: '1rem 0 .5rem 0'
        }
    }

    return (
        <div>
            {label ? <h4 style={styleLabel()}>{label}</h4> : null}
            <div className={cx("card", "card-padding", styles.cardWrapper)} style={style}>
                {children}    
            </div>
        </div>
    );
}