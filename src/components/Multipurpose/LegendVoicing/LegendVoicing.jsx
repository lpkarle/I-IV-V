import React from 'react';
import styles from './LegendVoicing.module.css';
import cx from 'classnames';

export default function LegendVoicing() {
    return (
        <div className={cx(/* "card", */ "card-wrapper", styles.legend)}>
            <div className={styles.major}>Major</div>
            <div className={styles.minor}>Minor</div>
            <div className={styles.dim}>Diminished</div>
        </div>
    )
}
