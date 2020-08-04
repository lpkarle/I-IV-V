import React, {useState} from 'react';
import styles from './SliderHandle.module.css';

function SliderHandle({position, onMouseDown, onMouseUp, onMouseMove, onTouchStart, 
    style, onMouseOver, onMouseLeave, onClick, onChange }, ref) {

    //const {index, range, handles, width, displayVal, ppu} = props;
    
    const [hover, setHover] = useState(false);
    
    function hoverHandle() {
        if (hover) {
            return { 
                backgroundColor: "red",
                zIndex: 1
             }
        } else {
            return { 
                backgroundColor: "blue",
                zIndex: 0
            }
        }            
    }

 
    const handleChange = (val) => {
        console.log("VAL: ", val);
        onChange(val);
    }

    //console.log("pos: ", position);

    return (
        <div 
            onChange={onChange}
            style={hoverHandle()}
            className={styles.handle}
            ref={ref}
            onMouseOver={onMouseOver}
            /* onMouseEnter={setHover(!hover)} */
            /* onMouseOut={setHover(!hover)} */
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
           {position} 
        </div>
    );
}

const forwardedRef = React.forwardRef(SliderHandle);
export default forwardedRef;
