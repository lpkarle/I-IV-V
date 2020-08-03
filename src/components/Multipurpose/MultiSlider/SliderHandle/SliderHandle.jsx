import React, {useState} from 'react';
import styles from './SliderHandle.module.css';

function SliderHandle({position, onMouseDown, onTouchStart, 
    style, onMouseOver, onMouseLeave, onClick, onChange }, ref) {

    //const {index, range, handles, width, displayVal, ppu} = props;
    
    const [hover, setHover] = useState(false);
    function hoverHandle() {
        if (hover) {
            return { backgroundColor: "red" }
        } else {
            return { backgroundColor: "blue" }
        }            
    }

 


    console.log(position);

    return (
        <div style={hoverHandle()}
             ref={ref} 
             key="1"
             onChange={onChange}
             className={styles.handle}
             onMouseOver={onMouseOver}
             onMouseLeave={onMouseLeave}
             onClick={onClick}
             onMouseDown={onMouseDown}
             onTouchStart={onTouchStart}
        >
            {position}
        </div>
    );
}

const forwardedRef = React.forwardRef(SliderHandle);
export default forwardedRef;
