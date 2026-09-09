import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";
import { Toast, ToastContainer } from "react-bootstrap";
export default function FooterComponent() {
    const { currentUser } = useSelector((state) => state.login)
    const [showSignup, setShowSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState(null)
    const [messageName, setMessageName] = useState("")
    const [messageEmail, setMessageEmail] = useState("")
    const [messageDateOfBirth, setMessageDateOfBirth] = useState("")
    const [messageContact, setMessageContact] = useState("")
    const [messageImage, setMessageImage] = useState("")
    const [messagePassword, setMessagePassword] = useState("")
    const [nameValidation, setNameValidation] = useState(false)
    const [emailValidation, setEmailValidation] = useState(false)
    const [dateOfBirthValidation, setDateOfBirthValidation] = useState(false)
    const [contactValidation, setContactValidation] = useState(false)
    const [imageValidation, setImageValidation] = useState(false)
    const [passwordValidation, setPasswordValidation] = useState(false)
    const [toastData, setToastData] = useState({ Visible: false, Icon: null, Message: null, ClassName: null });
    
    function handleEmailChange(e) {
        const temp = e.target.value;
        setEmail(temp);
        const splitEmail = temp.split('');
        if (!splitEmail.includes("@")) {
            setMessageEmail("Please follow this pattern: example@gmail.com");
            setEmailValidation(false);
        }
        else {
            setMessageEmail("");
            setEmailValidation(true);
        }
    }
    function handlePasswordChange(e) {
        const temp = e.target.value;
        setPassword(temp);
        if (temp.length >= 4) {
            setMessagePassword("");
            setPasswordValidation(true);
        }
        else {
            setMessagePassword("Password must have 4 characters");
            setPasswordValidation(false);
        }
    }
    function handleNameChange(e) {
        const temp = e.target.value;
        setName(temp);
        if (temp.length >= 3 && temp.length <= 15) {
            setMessageName("");
            setNameValidation(true);
        }
        else {
            setMessageName("Name must have 3 to 15 characters");
            setNameValidation(false);
        }
    }
    function handleContactChange(e) {
        const temp = e.target.value;
        setContact(temp);
        if (temp.length >= 8) {
            setMessageContact("");
            setContactValidation(true);
        }
        else {
            setMessageContact("Contact number must have more than 8 characters");
            setContactValidation(false);
        }
    }
    function handleImageChange(e) {
        const temp = e.target.files[0];
        setImage(temp);
        if (temp) {
            setMessageImage("");
            setImageValidation(true);
        }
        else {
            setMessageImage("Select image path");
            setImageValidation(false);
        }
    }
    function handleDateOfBirthChange(e) {
        const temp = e.target.value;
        setDateOfBirth(temp);
        if (temp) {
            setMessageDateOfBirth("");
            setDateOfBirthValidation(true);
        }
        else {
            setMessageDateOfBirth("Date of birth is required");
            setDateOfBirthValidation(false);
        }
    }
    function handleClose() {
        setShowSignup(false)
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setDateOfBirth("");
        setImage(null);
    }
    function handleShow() {
        setShowSignup(true)
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (!nameValidation) setMessageName("Name is required");
            if (!emailValidation) setMessageEmail("Email is required");
            if (!passwordValidation) setMessagePassword("Password is required");
            if (!dateOfBirthValidation) setMessageDateOfBirth("Date of birth is required");
            if (!contactValidation) setMessageContact("Contact Number is required");
            if (!imageValidation) setMessageImage("Image is required");
            if (nameValidation && emailValidation && passwordValidation && dateOfBirthValidation && contactValidation && imageValidation) {
                const formData = new FormData();
                formData.append('Name', name);
                formData.append('Email', email);
                formData.append('Password', password);
                formData.append('DateOfBirth', dateOfBirth.split("T")[0]);
                formData.append('Contact', contact);
                formData.append('Image', image);
                const response = await fetch(`http://localhost:1214/user/signup`, {
                    method: "POST",
                    body: formData
                })
                const data = await response.json();
                if (data) {
                    handleClose();
                    setToastData({ Visible: true, Icon: "fas fa-check-circle", Message: " User signup successfully", ClassName: "bg-success text-white" });
                }
                else {
                    setToastData({ Visible: true, Icon: "fas fa-times-circle", Message: " User signup failed", ClassName: "bg-danger text-white" });
                }
            }
            else {
                setToastData({ Visible: true, Icon: "fas fa-times-circle", Message: " User signup failed", ClassName: "bg-danger text-white" });
            }
        } catch (error) {
            setToastData({ Visible: true, Icon: "fas fa-times-circle", Message: " User signup failed", ClassName: "bg-danger text-white" });
        }
    }
    function handleHideToast() {
        setToastData(prev => {
            return { ...prev, Visible: false };
        });
    }
    return (
        <>
            <ToastContainer position="top-center" >
                <Toast onClose={handleHideToast} show={toastData.Visible} className={toastData.ClassName} delay={2000} autohide >
                    <Toast.Body>
                        <FontAwesomeIcon icon={toastData.Icon} /> {toastData.Message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <Modal show={showSignup} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='my-2'>
                        <label>Name</label>
                        <input
                            type="text"
                            className='form-control mt-2'
                            placeholder='Enter Name'
                            value={name}
                            onChange={handleNameChange}
                        />
                        <p className="form-text text-danger text-small"> {messageName} </p>
                    </div>
                    <div className='my-2'>
                        <label>Email</label>
                        <input
                            type="text"
                            className='form-control mt-2'
                            placeholder='Enter Email'
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <p className="form-text text-danger text-small"> {messageEmail} </p>
                    </div>
                    <div className='my-2'>
                        <label>Password</label>
                        <input
                            type="Password"
                            className='form-control mt-2'
                            placeholder='Enter Password'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <p className="form-text text-danger text-small"> {messagePassword} </p>
                    </div>
                    <div className='my-2'>
                        <label>Date Of Birth</label>
                        <input
                            type="date"
                            className='form-control mt-2'
                            placeholder=''
                            value={dateOfBirth}
                            onChange={handleDateOfBirthChange}
                        />
                         <p className="form-text text-danger text-small"> {messageDateOfBirth} </p>
                    </div>
                    <div className='my-2'>
                        <label>Contact Number</label>
                        <input
                            type="number"
                            className='form-control mt-2'
                            placeholder='Enter Contact Number'
                            value={contact}
                            onChange={handleContactChange}
                        />
                        <p className="form-text text-danger text-small"> {messageContact} </p>
                    </div>
                    <div className='my-2'>
                        <label>Image</label>
                        <input
                            type="file"
                            id='Image'
                            name='Image'
                            className='form-control mt-2'
                            onChange={handleImageChange}
                        />
                        <p className="form-text text-danger text-small"> {messageImage} </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        SignUp
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="bg-dark pb-2 text-white p-3">
                <div className="d-flex justify-content-between pt-5 pb-2">
                    <div className="w-25">
                        <h4>Company</h4>
                        <p className="footer-text-color ali">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur libero nostrum aliquam recusandae, eius voluptatum id rerum corporis doloribus? Dolor odio dolores exercitationem provident aliquid.</p>
                    </div>
                    <div className="w-25">
                        <h4>Quick Links</h4>
                        <p className="footer-text-color"><FontAwesomeIcon icon="fa-solid fa-angle-right" /> About Us</p>
                        <p className="footer-text-color"><FontAwesomeIcon icon="fa-solid fa-angle-right" /> Contact Us</p>
                        <p className="footer-text-color"><FontAwesomeIcon icon="fa-solid fa-angle-right" /> Privacy Policy</p>
                        <p className="footer-text-color"><FontAwesomeIcon icon="fa-solid fa-angle-right" /> Terms & Conditions</p>
                    </div>
                    <div className="w-25">
                        <h4>Contact</h4>
                        <p className="footer-text-color"><FontAwesomeIcon icon="fa-solid fa-location-dot" /> Ferozepur Road, Gulberg III, Lahore</p>
                        <p className="footer-text-color"><FontAwesomeIcon icon="fa-solid fa-phone" /> 0300 1 387 387</p>
                        <p className="footer-text-color"><FontAwesomeIcon icon="fa-solid fa-envelope" /> evs@gmail.com</p>
                        <button className="btn btn-dark border-white m-1 footer-text-color"><FontAwesomeIcon icon="fa-brands fa-twitter" /></button>
                        <button className="btn btn-dark border-white m-1 footer-text-color"><FontAwesomeIcon icon="fa-brands fa-facebook-f" /></button>
                        <button className="btn btn-dark border-white m-1 footer-text-color"><FontAwesomeIcon icon="fa-brands fa-youtube" /></button>
                        <button className="btn btn-dark border-white m-1 footer-text-color"><FontAwesomeIcon icon="fa-brands fa-linkedin-in" /></button>
                    </div>
                    <div className="w-25">
                        <h4>Newsletter</h4>
                        <p className="footer-text-color">Subscribe to our newsletter for the latest updates and news.</p>
                        <div className=" p-2 d-flex">
                            <div>
                                <input type="text" className="form-control" placeholder="Your email" />
                            </div>
                            <div>
                                {(currentUser) ?
                                    <button className="btn btn-success fw-bold px-3">Send</button>
                                    :
                                    <button className="btn btn-success" onClick={handleShow}>SignUp</button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <div>
                        <p className="footer-text-color">© <ins className="text-white">PakClassified</ins>, All Right Reserved. Designed By <ins className="text-white">Team EVS</ins></p>
                    </div>
                    <div>
                        <a href="#" className="text-decoration-none footer-text-color px-2">Home</a>
                        <a href="#" className="text-decoration-none footer-text-color px-2">Cookies</a>
                        <a href="#" className="text-decoration-none footer-text-color px-2">Help</a>
                        <a href="#" className="text-decoration-none footer-text-color px-2">FAQs</a>
                    </div>
                </div>
            </div>
        </>
    )
}