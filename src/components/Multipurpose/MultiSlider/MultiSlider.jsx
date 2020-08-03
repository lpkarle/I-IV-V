import React, { useState, useEffect, useRef, createRef, useMemo } from 'react';
/* import cx from 'classnames';
 */
import SliderHandle from '../MultiSlider/SliderHandle/SliderHandle';
import styles from './MultiSlider.module.css';

export default function MultiSlider(props) {//{ range, handles, width, displayVal }) {

/*     const [hover, setHover] = useState(false);
 */
    const {index, range, handles, width, displayVal} = props.sliderVal;

  
    
    const ppu = width / (range.max - range.min);
    let minLimit = 0;
    let maxLimit = width; 
    
    const handleRefs= useMemo(
        () => Array.from({ length: handles.length }).map(() => createRef()),
        []
    );
        
    // The current index of the handleRefs -> current Ref/Handle
    const [currentHandle, setCurrentHandle] = useState(0);
    
    const [handlePositions, setHandlePositions] = useState( handles );
        
    useEffect(() => {
    
        positioningHandles();
        

    }, []);

    function positioningHandles() {

        for (let i = 0; i < handleRefs.length; i++) {
            let pos = (handles[i] - range.min) * ppu;  
            handleRefs[i].current.style.left = pos + "px";
        }

    }

    /* function handlePosChange() {

    } */




    function handleOnMouseDown(e) {


        e.preventDefault();

        document.onmousemove = (e) => handleOnMouseMove(e);
        document.onmouseup = (e) => handleOnMouseUp(e);


        // check if this is the only handle and prevent snapping over the other
        if (currentHandle > 0) {   // if true get the left sided handle
            minLimit = parseInt(handleRefs[currentHandle - 1].current.style.left); //! Missing Ref!
            console.log("min ", minLimit);
        } else {
            minLimit = 0;
        }

        if (currentHandle < handleRefs.length - 1) {
            maxLimit = parseInt(handleRefs[currentHandle + 1].current.style.left);
            console.log("max ", maxLimit);
        } else {
            maxLimit = width;
        }
    }

    function handleOnMouseMove(e) {

        e.preventDefault();

        moveHandle(e);
    }

    function handleOnMouseUp(e) {

        moveHandle(e);

        document.onmousemove = null;
        document.onmouseup = (e) => handleOnMouseUp(e);

    }

    
    function handleOnTouchStart(e) {
        e.preventDefault();

        document.ontouchstart = (e) => handleOnTouchStart(e);
        document.ontouchend = (e) => handleOnTouchEnd(e);

        moveHandle(e);
    }

    function handleOnTouchMove(e) {
        e.preventDefault();

        moveHandle(e);
    }

    function handleOnTouchEnd(e) {

        moveHandle(e);

        document.ontouchmove = null;
        document.ontouchend = (e) => handleOnTouchEnd(e);
    }



    

    
    function moveHandle(e) {
        //console.log("current handle ", currentHandle);
        let currentPos = parseInt(handleRefs[currentHandle].current.style.left);


        if (currentPos < minLimit) {
            handleRefs[currentHandle].current.style.left = minLimit + "px";
        } else if (currentPos > maxLimit) {
            handleRefs[currentHandle].current.style.left = maxLimit + "px";
        } else {
            handleRefs[currentHandle].current.style.left = e.movementX + currentPos + "px";
        }

        //handleRefs[currentHandle].current.style.left = e.movementX + currentPos + "px";

        let value = parseInt(parseInt(handleRefs[currentHandle].current.style.left) / ppu);
        
        // there has to be another way
        let tmpPosChanged = handlePositions;
        tmpPosChanged[currentHandle] = value;
        console.log(tmpPosChanged);

        setHandlePositions(tmpPosChanged);
        
        console.log(value);
    }











    /* ---- Styles ---- */
    const slideBarStyle = {
        width: width
    }
    

   /*  function hoverHandle() {
        if (hover) {
            return { backgroundColor: "red" }
        } else {
            return { backgroundColor: "blue" }
        }            
    } */


    return (
        <div className={styles.container}>
            <h1>MultiSlider</h1>
            
            <div className={styles.wrapperSlider}>

                <div className={styles.slideBar} style={slideBarStyle}>
                    
                
                    {handles.map((position, index) => (
                        <SliderHandle ref={handleRefs[index]}
                                      key={index}
                                      /* styles={hoverHandle()} */
                                      position={handlePositions[index]}
                                      onMouseOver={() => {setCurrentHandle(index)}}
                                      onMouseLeave={() => {setCurrentHandle(null)}}
                                      /* onClick={() => setCurHandlePos(index) } */
                                      onMouseDown={handleOnMouseDown}
                                      onTouchStart={handleOnTouchStart} />
                    ))}
    
                </div>
         
            </div>
        </div>
    );
}

MultiSlider.defaultProps = {
    
    range: { min: 0, max: 100 },
    handles: [10],
    width: 300,
    displayVal: false
}


