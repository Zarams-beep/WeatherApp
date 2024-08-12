import { SlSocialFacebook, SlSocialInstagram, SlSocialTwitter, SlSocialYoutube} from "react-icons/sl";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import {useState,useEffect} from "react"
const Header=()=>{

        const [open,setOpen] = useState(false)
        const is600 = useMediaQuery({query:'(max-width:600px)'})
        const is480 = useMediaQuery({query:'(max-width:480px)'})

        const handleMenu=()=>{
            setOpen(prev=>!prev)
          }
    return(
        <>
            <header>
                <div className="FirstHeader">
                    <div className="divh2">
                        <h2>WeatherWhirl</h2>
                    </div>

                    <div className={`contactSection`}>
                        <div className={`notes ${is480?'invisible':''}`}>
                        <h4>About</h4>
                        <h4>News</h4>
                        <h4>Contacts</h4>
                        </div>

                    {is480? <div onClick={handleMenu} className="menuStyle">
                        {open?<RxCross2 className="icon"/>:<IoMdMenu className="icon"/>}
                    </div>:''}

                   {is480? <div className={`notesShow ${open?'visible':'moveRight'}`}>
                        <h4>About</h4>
                        <h4>News</h4>
                        <h4>Contacts</h4>
                        </div>:''}

                        <div className={`socialMedia ${is600?'invisible':''}`}>
                            <Link to ="/facebook" className="iconStyle">
                                <SlSocialFacebook/>
                            </Link>
                            <Link to ="/instagram" className="iconStyle">
                                <SlSocialInstagram/>
                            </Link>
                            <Link to ="/twitter" className="iconStyle">
                                <SlSocialTwitter/>
                            </Link>
                            <Link to ="/youtube" className="iconStyle">
                                <SlSocialYoutube/>
                            </Link>
                           
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header