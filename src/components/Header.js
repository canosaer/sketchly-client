import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function Header() {
    const [menuOpen, setMenuOpen ] = useState(false)
    const [toggleBars, setToggleBars ] = useState([])
    const [infoOpen, setInfoOpen ] = useState(false)

    const sidebarStyles = menuOpen ? 'menu menu_open' : 'menu'
    const dimmerStyles = menuOpen || infoOpen ? 'dimmer dimmer_open' : 'dimmer'
    const infoStyles = infoOpen ? 'info__window info__window_open' : 'info__window'
    const infoButtonStyles = infoOpen ? 'info info_open' : 'info'

    let slides = ['','','','',]
    slides.fill('swiper-slide slide-')


    const lockScroll = () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop)
        }
    }

    const unlockScroll = () => {
        window.onscroll = function() {}
    }

    useEffect(() => {
        let toggleArray = ['','','']
        toggleArray.fill('toggle__bar')

        if(menuOpen || infoOpen){
            window.scrollTo(0,0)
            lockScroll()
            if(menuOpen){
                for(let i=0;i<3; i++){
                    toggleArray[i] = toggleArray[i] + ` toggle__bar_${i} toggle__bar_open`
                }
                setToggleBars(toggleArray)
            }
            if(infoOpen){
                for(let i=0;i<3; i++){
                    toggleArray[i] = toggleArray[i] + `hidden`
                }
                setToggleBars(toggleArray)
            }
        }
        else{
            unlockScroll()
            for(let i=0;i<3; i++){
                toggleArray[i] = toggleArray[i] + ` toggle__bar_${i}`
            }
            setToggleBars(toggleArray)
        } 

    }, [menuOpen, infoOpen])

    const renderSlide = (slide) => {
        switch(slide) {
            case 1:
                return (
                    <div className="help">
                        <h2 className="help__heading">Time To Draw</h2>
                        <p className="help__text">If you get a weird sentence, you have 80 seconds to draw it!</p>
                    </div>
                );
            case 2:
                return (
                    <div className="help">
                        <h2 className="help__heading">Time To Guess</h2>
                        <p className="help__text">If you get a weird drawing, you have 80 seconds to guess what it is!</p>
                    </div>
                );
            case 3:
                return (
                    <div className="help">
                        <h2 className="help__heading">See What Happened</h2>
                        <p className="help__text">After you draw or guess, you'll see what happened so far in the game!</p>
                    </div>
                );
            case 4:
                return(
                    <div className="help">
                        <h2 className="help__heading">Just One</h2>
                        <p className="help__text">You can only draw or guess once in each game. Find other games to join or check out completed games to see what weird stuff people did!</p>
                    </div>
                );
        }
    }

    return(
        <header className="header">

            <nav className={sidebarStyles}>
                <ul className="menu__list">
                    <li className="menu__item">
                        <Link to="/" className="menu__link">Home <div className="menu__bar"></div> </Link>
                        <Link to="/current-games" className="menu__link">Play <div className="menu__bar"></div> </Link>
                        <Link to="/archive" className="menu__link">Games <div className="menu__bar"></div> </Link>
                    </li>
                </ul>
            </nav>

            <div className={dimmerStyles}></div>
            <button className="toggle" onClick={infoOpen ? null : () => setMenuOpen(!menuOpen)}>
                {toggleBars.map((bar, i) => {
                    const key = `bar--${i}`

                    return(
                        <div key={key} className={bar}></div>
                    )
                })}
            </button>


            <Link to="/" className="header__heading">
               sketch.ly
            </Link>

            <button className={infoButtonStyles} onClick={menuOpen ? null : () => setInfoOpen(!infoOpen)}><p className="info__text">{infoOpen ? 'x' : 'i'}</p></button>
            <Swiper
                pagination={{
                    type: "progressbar",
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className={infoStyles}
                loop={true}
                autoplay={{
                    delay: 4000,
                }}
            >
                {slides.map((slide, i) => {
                    const key = `slide--${i}`

                    return(
                        <SwiperSlide key={key} tag="section" className={slide+(i+1)}>
                            {renderSlide(i+1)}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </header>
    )
}