import React from "react";
import navbarStyle from "@/components/NavBar.module.css"


import { Bangers } from 'next/font/google';

const bangers = Bangers({
  subsets: ['latin'],
  weight: '400',
});

function NavBar({count}) {
    return(
        <div className={navbarStyle.navbar}>

            <div>
                {/* <h3>POKEMON TEST</h3> */}
                <h1 className={bangers.className}>Pokémon World</h1>
                <h5>Get points by clicking on an image but don't click on any more than once!</h5>
            </div>
           
           <div>
            <h4>score: {count}</h4>
            <h4>score: {1}</h4>
           </div>

        </div>
    )
}

export default NavBar;