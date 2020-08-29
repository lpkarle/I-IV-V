import React from 'react'
import styles from './CircleOfFifths.module.css';

import {ReactComponent as Circle} from '../../images/svgs/CircleOfFifths/circle_of_fifths.svg';

export default function CircleOfFifths() {

    /* const [selectedNote, setSelectedNote] = useState({type: 11}); */
    /* const [selectedKey, setSelectedKey] = useState({
        majorFields: document.getElementById('circleMajor'),
        minorFields: document.getElementById('circleMinor'),
        dimFields: document.getElementById('circleDim')
    }); */

    /* const setNotes = () => {
        
        const majorFields = document.getElementById('circleMajor');
        const minorFields = document.getElementById('circleMinor');
        const dimFields = document.getElementById('circleDim');

        majorFields.childNodes.forEach((element, i) => {
            element.addEventListener("click", (e) => handleClick(e, 'major', i));
            element.style.fill = "tomato";
            element.style.opacity = ".6";
        });
        minorFields.childNodes.forEach((element, i) => {
            element.addEventListener("click", (e) => handleClick(e, 'minor', i));
            element.style.fill = "royalblue";
            element.style.opacity = ".6";
        });
        dimFields.childNodes.forEach((element, i) => {
            element.style.fill = "green";
            element.style.opacity = ".6";
        });
    } */

    /* const handleClick = (e, voicing, index) => {
        
        setSelectedNote({
            voicing: index
        });
        console.log(selectedNote);
        console.log(e.target, voicing, index);
        

        e.target.style.opacity = "1";
    } */


    const fieldsStyle = () => {
        return {
            
        }
    }
    
    return (
        <div className={styles.circleOfFifths}>
            <h1>CircleOfFifths</h1>

            <Circle className={styles.circle} style={fieldsStyle()}/>

        </div>
    );
}