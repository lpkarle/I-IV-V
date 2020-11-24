import React from 'react';
import styles from './LegendVoicing.module.css';
import cx from 'classnames';

export default function LegendVoicing({ lang }) {
    return (
        <div className={cx("card-wrapper", styles.legend)}>
            <div className={styles.major}>{lang.str.maj}</div>
            <div className={styles.minor}>{lang.str.min}</div>
            <div className={styles.dim}>{lang.str.dim}</div>
        </div>
    )
}
