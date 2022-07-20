import { useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

import {BsInfoCircle} from 'react-icons/bs';

const swipeConfig = {
    delta: 12,                             // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false,           // prevents scroll during swipe (*See Details*)
    trackTouch: true,                      // track touch input
    trackMouse: true,                      // track mouse input
    rotationAngle: 0,                      // set a rotation angle
    swipeDuration: 3000,                   // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
  }



function Lightbox ({src,alt='',isSingle=false,desc}) {

    const hasDesc = !!desc;

    const scrollToRef = useRef(null);
    
    const [showDesc, setShowDesc] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const handleOnClick = (e) => {
        e.stopPropagation();
        setIsLightboxOpen(isLightboxOpen => !isLightboxOpen);
        if (isSingle) {
            scrollToRef.current?.scrollIntoView({
                behavior: 'smooth', 
                block: "start", 
                inline: "center"
            })
        }
    }

    const handleCloseAction = () => {
        setIsLightboxOpen(false);
    }


    const handlers = useSwipeable({
        onSwiped: () => handleCloseAction(),
        ...swipeConfig,
    })

    return (
        <div 
            onClick={handleCloseAction}
            className={`${
                isLightboxOpen 
                ? 'w-full h-screen fixed top-0 left-0 bg-black flex flex-col flew-wrap items-center justify-center overflow-hidden z-50 p-2' 
                : 'max-w-100 max-h-screen mx-auto relative z-40'
                }`
        }>
            <img
                className={`transition-transform ease-bezier duration-300 cursor-pointer mx-auto max-w-full ${isLightboxOpen? 'max-h-full border-2 border-white/50' : `shadow-lg shadow-black/40 hover:scale-110 max-h-[600px]`}`} 
                src={src} 
                alt={alt}
                onClick={handleOnClick}
                {...handlers}
                ref={scrollToRef}
            />
            {
                hasDesc && <div className={`fixed top-0 left-0 w-full h-full ${isLightboxOpen? 'block' : 'hidden'}`}>
                    <BsInfoCircle 
                        onMouseOver={()=>setShowDesc(true)}
                        onMouseLeave={() => setShowDesc(false)}
                        onClick={(e) => {e.stopPropagation(); setShowDesc(showDesc=>!showDesc)} }
                        className="fill-white cursor-help w-8 h-8 absolute right-5 bottom-5 block transition-all duration-75 focus:fill-cyan-400 hover:fill-cyan-500 active:fill-cyan-600" 
                        aria-label="Informazioni aggiuntive"/>
                    <p 
                        style={{opacity: showDesc? '1' : '0'}}
                        className="absolute bottom-20 right-5 p-4 max-w-prose rounded border-2 border-white bg-black/70 bezier transition-all">{desc}</p>
                </div>
            }
        </div>
    )

}

export default Lightbox;




