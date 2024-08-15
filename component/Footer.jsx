import { useState, useRef, useEffect } from "react";
const Footer=()=>{
    const [inputValue, setInputValue] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setValidationMessage(''); 
    };

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleClick = () => {
        if (isValidEmail(inputValue)) {
            alert('Email submitted successfully!');
        } else {
            setValidationMessage('Please enter a valid email address.');
        }
    };

    const myRef = useRef(null)

    useEffect(()=>{
        myRef.current.focus()
    },[])
    return(
        <>
           <footer className="mainFooter">
           <footer className="footer1">
                <h2>Get the fresh weather forecast daily</h2>
                <p>Subscribe to our newsletter to receive regular updates on the latest weather insights, news, and tips to help you avoid any unwanted risks and surprises during your day.</p>

                <div className="countIn">
                    <input type="text" name="text" className="input" placeholder="Enter your email"  value={inputValue}
                    onChange={handleInputChange} ref={myRef}/>
                      <button onClick={handleClick}>COUNT ME IN</button>
                {validationMessage && <p className="validation-message">{validationMessage}</p>}
                </div>
            </footer>

            <footer className="footer2">
                <div className="div1">
                    <h2>WeatherWhirl</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, reprehenderit tempore. Illum cumque animi dolore reprehenderit sit dolorum necessitatibus! Eos cum laboriosam, veniam error accusamus molestias fugiat quisquam soluta expedita.</p>
                </div>

                <div className="div2">
                    <div className="find">
                        <h6>FIND US</h6>
                        <p>Niger State</p>
                    </div>

                    <div className="contact">
                        <h5>General</h5>
                        <div className="general">
                            <p><a className="links"href="tel:+1234567890">+1234567890</a></p>
                            <p><a className="links" href="mailto:example@example.com">example@example.com</a></p>
                        </div>

                        <div className="general">
                            <h5>Private</h5>
                            <p><a className="links" href="tel:+1234567890">+1234567890</a></p>
                            <p><a className="links" href="mailto:example@example.com">example@example.com</a></p>
                        </div>
                    </div>
                </div>
            </footer>
           </footer>
        </>
    )
}
export default Footer