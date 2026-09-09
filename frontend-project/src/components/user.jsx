import { useState } from "react";
import { Button, Dropdown, Modal, Toast, ToastContainer } from "react-bootstrap";
import SignUpComponent from "./signup";
import { loginUser, logout } from "../redux/loginslice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

export default function UserComponent() {
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [messageEmail, setMessageEmail] = useState("")
    const [messagePassword, setMessagePassword] = useState("")
    const [emailValidation, setEmailValidation] = useState(false)
    const [passwordValidation, setPasswordValidation] = useState(false)
    const { currentUser } = useSelector((state) => state.login)
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
    const userData = {
        Email: email,
        Password: password,
    }
    const dispatch = useDispatch();
    const navigat = useNavigate();
    function handleClose() {
        setShowLogin(false)
        setEmail("");
        setPassword("");
    }
    function handleShow() {
        setShowLogin(true)
    }
    function handleSubmit(e) {
        e.preventDefault();
        try {
            if (!emailValidation) setMessageEmail("Email is required");
        if (!passwordValidation) setMessagePassword("Password is required");
        if (emailValidation && passwordValidation) {
            dispatch(loginUser(userData))
            .then(() => {
                handleClose();
                setToastData({ Visible: true, Icon: "fas fa-check-circle", Message: " User login successfully", ClassName: "bg-success text-white" });
            })
            .catch((error)=>{
                setToastData({ Visible: true, Icon: "fas fa-times-circle", Message: "User login failed", ClassName: "bg-danger text-white" });
            })

        }
        else {
            setToastData({ Visible: true, Icon: "fas fa-times-circle", Message: " Invalid email and password", ClassName: "bg-danger text-white" });
        }
        } catch (error) {
            setToastData({ Visible: true, Icon: "fas fa-times-circle", Message: "User login failed", ClassName: "bg-danger text-white" });
        }

    }
    function handleLogout() {
        dispatch(logout())
        navigat("/")
        setToastData({ Visible: true, Icon: "fas fa-check-circle", Message: " User logout successfully", ClassName: "bg-success text-white" });
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
            {(currentUser) ?
                <div className="d-flex justify-content-between bg-signup px-3 py-2">
                    <div className="align-self-center pt-2">
                        <p>Welcome to {currentUser?.Name}</p>
                    </div>
                    <div>
                        {/* <button className="btn btn-primary" onClick={handleLogout}>Logout</button> */}
                        <Dropdown>
                            <Dropdown.Toggle as="div" bsPrefix="toggle" style={{ width: "60px", hieght: "60px" }} className="bg-transparent border-0 p-0 m-0" id="dropdown-basic">
                                <img src={`http://localhost:1214/uploads/${currentUser?.Image}`} alt="img" className="w-100 h-100 rounded-circle" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >{currentUser?.Name}</Dropdown.Item>
                                <Dropdown.Item as={Link} to={'/userDashboard'}>View profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}><FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" /> Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                </div>
                :
                <div className="d-flex justify-content-between bg-signup px-3 py-2">
                    <div>
                        <p>Welcome to PakClassified</p>
                    </div>
                    <div>
                        <Button className="btn btn-success me-3" onClick={handleShow}>Login</Button>
                        <Modal show={showLogin} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Login</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='my-2'>
                                    <label>Email</label>
                                    <input
                                        type="input"
                                        className='form-control mt-2'
                                        placeholder=''
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
                                        placeholder=''
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <p className="form-text text-danger text-small"> {messagePassword} </p>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Login
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <SignUpComponent />
                    </div>
                </div>
            }
        </>
    )
}