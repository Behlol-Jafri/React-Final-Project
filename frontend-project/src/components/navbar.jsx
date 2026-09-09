import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function NavbarComponent() {
  const [category, setCategory] = useState([])
  const [cityArea, setCityArea] = useState([])
  const [type, setType] = useState([])
  const { currentUser } = useSelector((state) => state.login)
  const [show, setShow] = useState(false);
  const [toastData, setToastData] = useState({ Visible: false, Icon: null, Message: null, ClassName: null });
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [feature, setFeature] = useState("")
  const [startsOn, setStartsOn] = useState("")
  const [endsOn, setEndsOn] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCityArea, setselectedCityArea] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [image, setImage] = useState(null)
  const [messageName, setMessageName] = useState("")
  const [messagePrice, setMessagePrice] = useState("")
  const [messageStartsOn, setMessageStartsOn] = useState("")
  const [messageEndsOn, setMessageEndsOn] = useState("")
  const [messageImage, setMessageImage] = useState("")
  const [messageDescription, setMessageDescription] = useState("")
  const [messageFeatures, setMessageFeatures] = useState("")
  const [messageCategory, setMessageCategory] = useState("")
  const [messageCityArea, setMessageCityArea] = useState("")
  const [messageType, setMessageType] = useState("")
  const [nameValidation, setNameValidation] = useState(false)
  const [startsOnValidation, setStartsOnValidation] = useState(false)
  const [endsOnValidation, setEndsOnValidation] = useState(false)
  const [priceValidation, setPriceValidation] = useState(false)
  const [imageValidation, setImageValidation] = useState(false)
  const [descriptionValidation, setDescriptionValidation] = useState(false)
  const [cityAreaValidation, setCityAreaValidation] = useState(false)
  const [featuresValidation, setFeaturesValidation] = useState(false)
  const [categoryValidation, setCategoryValidation] = useState(false)
  const [typeValidation, setTypeValidation] = useState(false)


  useEffect(
    () => {
      getCategory();
      getCityArea();
      getType();
      return () => { }
    },
    []
  );
  function handlePriceChange(e) {
    const temp = e.target.value;
    setPrice(temp);
    if (temp) {
      setMessagePrice("");
      setPriceValidation(true);
    }
    else {
      setMessagePrice("Price is required");
      setPriceValidation(false);
    }
  }
  function handleDescriptionChange(e) {
    const temp = e.target.value;
    setDescription(temp);
    if (temp.length >= 15) {
      setMessageDescription("");
      setDescriptionValidation(true);
    }
    else {
      setMessageDescription("Description must have 15 characters");
      setDescriptionValidation(false);
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
  function handleFeaturesChange(e) {
    const temp = e.target.value;
    setFeature(temp);
    if (temp.length >= 15) {
      setMessageFeatures("");
      setFeaturesValidation(true);
    }
    else {
      setMessageFeatures("Features must have 15 characters");
      setFeaturesValidation(false);
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
  function handleStartsOnChange(e) {
    const temp = e.target.value;
    setStartsOn(temp);
    if (temp) {
      setMessageStartsOn("");
      setStartsOnValidation(true);
    }
    else {
      setMessageStartsOn("Starts on is required");
      setStartsOnValidation(false);
    }
  }
  function handleEndsOnChange(e) {
    const temp = e.target.value;
    setEndsOn(temp);
    if (temp) {
      setMessageEndsOn("");
      setEndsOnValidation(true);
    }
    else {
      setMessageEndsOn("Ends on is required");
      setEndsOnValidation(false);
    }
  }
  function handleCategoryChange(e) {
    const temp = e.target.value;
    setSelectedCategory(temp);
    if (temp) {
      setMessageCategory("");
      setCategoryValidation(true);
    }
    else {
      setMessageCategory("Category is required");
      setCategoryValidation(false);
    }
  }
  function handleCityAreaChange(e) {
    const temp = e.target.value;
    setselectedCityArea(temp);
    if (temp) {
      setMessageCityArea("");
      setCityAreaValidation(true);
    }
    else {
      setMessageCityArea("City Area is required");
      setCityAreaValidation(false);
    }
  }
  function handleTypeChange(e) {
    const temp = e.target.value;
    setSelectedType(temp);
    if (temp) {
      setMessageType("");
      setTypeValidation(true);
    }
    else {
      setMessageType("Type is required");
      setTypeValidation(false);
    }
  }
  async function getCategory() {
    const response = await fetch(`http://localhost:1214/category`)
    const data = await response.json();
    if (data) {
      setCategory(data)
    }
  }
  async function getCityArea() {
    const response = await fetch(`http://localhost:1214/cityArea`)
    const data = await response.json();
    if (data) {
      setCityArea(data)
    }
  }
  async function getType() {
    const response = await fetch(`http://localhost:1214/type`)
    const data = await response.json();
    if (data) {
      setType(data)
    }
  }
  function handleClose() {
    setShow(false)
    setName("");
    setPrice("");
    setDescription("");
    setFeature("");
    setStartsOn("");
    setEndsOn("");
    setSelectedCategory("");
    setselectedCityArea("");
    setSelectedType("");
    setImage(null);
  }
  function handleShow() {
    setShow(true)
  }
  function handleHideToast() {
    setToastData(prev => {
      return { ...prev, Visible: false };
    });
  }
  function handleShowToast() {
    setToastData({ Visible: true, Icon: "fas fa-times-circle", Message: " You have not login. Please login.", ClassName: "bg-danger text-white" });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!nameValidation) setMessageName("Name is required");
      if (!priceValidation) setMessagePrice("Price is required");
      if (!descriptionValidation) setMessageDescription("Description is required");
      if (!featuresValidation) setMessageFeatures("Features is required");
      if (!startsOnValidation) setMessageStartsOn("Starts on is required");
      if (!endsOnValidation) setMessageEndsOn("Ends on is required");
      if (!categoryValidation) setMessageCategory("Category is required");
      if (!cityAreaValidation) setMessageCityArea("City Area is required");
      if (!typeValidation) setMessageType("Type is required");
      if (!imageValidation) setMessageImage("Image is required");
      if (nameValidation && priceValidation && descriptionValidation && featuresValidation && startsOnValidation && endsOnValidation && categoryValidation && cityAreaValidation && typeValidation && imageValidation) {
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Price', price);
        formData.append('Description', description);
        formData.append('Features', feature);
        formData.append('StartsOn', startsOn);
        formData.append('EndsOn', endsOn);
        formData.append('Category', selectedCategory);
        formData.append('CityArea', selectedCityArea);
        formData.append('Type', selectedType);
        formData.append('PostedBy', currentUser?._id);
        formData.append('Image', image);
        const response = await fetch(`http://localhost:1214/advertisement`, {
          method: "POST",
          body: formData
        })
        const data = await response.json();
        if (data) {
          handleClose()
          setToastData({ Visible: true, Icon: "fas fa-check-circle", Message: " Advertisement post successfully", ClassName: "bg-success text-white" });
        }
        else {
          setToastData({ Visible: true, Icon: "fas fa-times-circle", Message: " Advertisement post failed", ClassName: "bg-danger text-white" });
        }
      }
      else {
        setToastData({ Visible: true, Icon: "fas fa-times-circle", Message: " Advertisement post failed", ClassName: "bg-danger text-white" });
      }
    } catch (error) {
      setToastData({ Visible: true, Icon: "fas fa-times-circle", Message: " Advertisement post failed", ClassName: "bg-danger text-white" });
    }

  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Post Advertisement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='my-2'>
            <label>Name</label>
            <input
              type="text"
              className='form-control mt-2'
              placeholder=''
              value={name}
              onChange={handleNameChange}
            />
            <p className="form-text text-danger text-small"> {messageName} </p>
          </div>
          <div className='my-2'>
            <label>Price</label>
            <input
              type="number"
              className='form-control mt-2'
              placeholder=''
              value={price}
              onChange={handlePriceChange}
            />
            <p className="form-text text-danger text-small"> {messagePrice} </p>
          </div>
          <div className='my-2'>
            <label>Description</label>
            <textarea
              type="text"
              rows={2}
              className='form-control mt-2'
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            <p className="form-text text-danger text-small"> {messageDescription} </p>
          </div>
          <div className='my-2'>
            <label>Features</label>
            <textarea
              type="text"
              rows={2}
              className='form-control mt-2'
              value={feature}
              onChange={handleFeaturesChange}
            ></textarea>
            <p className="form-text text-danger text-small"> {messageFeatures} </p>
          </div>
          <div className='d-flex justify-content-between'>
            <div className='my-2 w-50 pe-3'>
              <label>Starts On</label>
              <input
                type="date"
                className='form-control mt-2'
                placeholder=''
                value={startsOn}
                onChange={handleStartsOnChange}
              />
              <p className="form-text text-danger text-small"> {messageStartsOn} </p>
            </div>
            <div className='my-2 w-50 ps-3'>
              <label>Ends On</label>
              <input
                type="date"
                className='form-control mt-2'
                placeholder=''
                value={endsOn}
                onChange={handleEndsOnChange}
              />
              <p className="form-text text-danger text-small"> {messageEndsOn} </p>
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            <div className='my-2'>
              <label>Category</label>
              <select
                className='form-select mt-2 bg-success text-white'
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {category.map((item) => {
                  return (
                    <>
                      <option
                        value={item._id}
                        key={item._id}
                      >
                        {item.Name}
                      </option>
                    </>
                  )
                })}
              </select>
              <p className="form-text text-danger text-small"> {messageCategory} </p>
            </div>
            <div className='my-2'>
              <label>City Area</label>
              <select
                className='form-select mt-2 bg-success text-white'
                onChange={handleCityAreaChange}
              >
                <option value="">Select City Area</option>
                {cityArea.map((item) => {
                  return (
                    <>
                      <option
                        value={item._id}
                        key={item._id}
                      >
                        {item.Name}
                      </option>
                    </>
                  )
                })}
              </select>
              <p className="form-text text-danger text-small"> {messageCityArea} </p>
            </div>
            <div className='my-2'>
              <label>Type</label>
              <select
                className='form-select mt-2 bg-success text-white'
                onChange={handleTypeChange}
              >
                <option value="">Select Type</option>
                {type.map((item) => {
                  return (
                    <>
                      <option
                        value={item._id}
                        key={item._id}
                      >
                        {item.Name}
                      </option>
                    </>
                  )
                })}
              </select>
              <p className="form-text text-danger text-small"> {messageType} </p>
            </div>
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
          <Button variant="primary" onClick={handleSubmit}>
            Post Advertisement
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" >
        <Toast onClose={handleHideToast} show={toastData.Visible} className={toastData.ClassName} delay={2000} autohide >
          <Toast.Body>
            <FontAwesomeIcon icon={toastData.Icon} /> {toastData.Message}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand className='text-success fw-bold' href="#">PakClassified</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/" className='text-black'>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className='text-black'>About</Nav.Link>
              <NavDropdown title="Categories" id="navbarScrollingDropdown">
                {category.map((item) => {
                  return (
                    <>
                      <NavDropdown.Item as={Link} to={`/category/${item?.Name}`} className='text-black'>{item.Name}</NavDropdown.Item>
                    </>
                  )
                })}
              </NavDropdown>
              <Nav.Link as={Link} to="/contact" className='text-black'>Contact</Nav.Link>
            </Nav>
            {(currentUser) ?
              <Button variant="success" onClick={handleShow}>Post Advertisement <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></Button>
              :
              <Button variant="success" onClick={handleShowToast}>Post Advertisement <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></Button>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
