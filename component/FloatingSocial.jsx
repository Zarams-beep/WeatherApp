import { useMediaQuery } from "react-responsive";
import { SlSocialFacebook, SlSocialInstagram, SlSocialTwitter, SlSocialYoutube} from "react-icons/sl";
import { Link } from "react-router-dom";
const FloatingSocial=()=>{
    const is600 = useMediaQuery({query:'(max-width:600px)'})

    return(
        <>
              <div className={`socialMedia invisible ${is600?'stickIt':''}`}>
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
        </>
    )
}
export default FloatingSocial