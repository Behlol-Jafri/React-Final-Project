import { Button, Card, Modal } from 'react-bootstrap'
import './about.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/loginslice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default function UserDashboard() {
    const [showSignup, setShowSignup] = useState(false);
    const [advertisements, setAdvertisements] = useState([]);
    const [showAdvertisement, setShowAdvertisement] = useState(false);
    const { currentUser } = useSelector((state) => state.login)
    const [user, setUser] = useState();
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [id, setId] = useState("")
    const [nameAdd, setNameAdd] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [feature, setFeature] = useState("")
    const [startsOn, setStartsOn] = useState("")
    const [endsOn, setEndsOn] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedCityArea, setselectedCityArea] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [image, setImage] = useState(null)
    const userAdds =
        (advertisements && currentUser) ?
            advertisements.filter((add) => add?.PostedBy === currentUser?._id)
            : [];
    useEffect(
        () => {
            getUser();
            getAdvertisements();
            getCategory();
            getCityArea();
            getType();
            return () => { }
        },
        []
    );
    const [categorys, setCategorys] = useState([])
    const [cityAreas, setCityAreas] = useState([])
    const [types, setTypes] = useState([])
    async function getCategory() {
        const response = await fetch('http://localhost:1214/category')
        const data = await response.json();
        if (data) {
            setCategorys(data);
        }
    }
    async function getCityArea() {
        const response = await fetch('http://localhost:1214/cityArea')
        const data = await response.json();
        if (data) {
            setCityAreas(data);
        }
    }
    async function getType() {
        const response = await fetch('http://localhost:1214/type')
        const data = await response.json();
        if (data) {
            setTypes(data);
        }
    }
    const dispatch = useDispatch();
    const navigat = useNavigate();
    function handleLogout() {
        dispatch(logout())
        navigat("/")
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    async function handleDeleteAdvertisement(e) {
        const Id = e.currentTarget.dataset.did
        const response = await fetch(`http://localhost:1214/advertisement/${Id}`, {
            method: "DELETE"
        })
        const data = await response.json();
        getAdvertisements()
    }
    async function getAdvertisements() {
        const response = await fetch(`http://localhost:1214/advertisement`)
        const data = await response.json();
        if (data) {
            setAdvertisements(data)
        }
    }
    async function getAdvertisementForEdit(e) {
        const Id = e.currentTarget.dataset.uid
        const response = await fetch(`http://localhost:1214/advertisement/${Id}`)
        const data = await response.json();
        if (data) {
            setId(data._id)
            setNameAdd(data.Name)
            setPrice(data.Price)
            setDescription(data.Description)
            setFeature(data.Features)
            setStartsOn(data.StartsOn.split("T")[0])
            setEndsOn(data.EndsOn.split("T")[0])
            setSelectedCategory(data.Category)
            setselectedCityArea(data.CityArea)
            setSelectedType(data.Type)
            setImage(data.Image)
        }
    }
    async function getUser() {
        const response = await fetch(`http://localhost:1214/user/${currentUser?._id}`)
        const data = await response.json();
        if (data) {
            setUser(data)
            setUserId(data._id)
            setName(data.Name)
            setEmail(data.Email)
            setContact(data.Contact)
            setDateOfBirth(data.DateOfBirth.split("T")[0])
        }
    }
    function handleCloseSignup() {
        setShowSignup(false)
    }
    function handleCloseAdvertisement() {
        setShowAdvertisement(false)
    }
    function handleShowSignup() {
        setShowSignup(true);
    }
    function handleShowAdvertisement(e) {
        setShowAdvertisement(true)
        getAdvertisementForEdit(e)
    }
    async function handleSubmitSignup(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Email', email);
        formData.append('Contact', contact);
        formData.append('DateOfBirth', dateOfBirth);
        const response = await fetch(`http://localhost:1214/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Name: name, Email: email, Contact: contact, DateOfBirth: dateOfBirth })
        })
        const data = await response.json();
        handleCloseSignup()
        getUser();
    }
    async function handleSubmitAdvertisement(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Name', nameAdd);
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
        const response = await fetch(`http://localhost:1214/advertisement/${id}`, {
            method: "PUT",
            body: formData
        })
        const data = await response.json();
        handleCloseAdvertisement();
        getAdvertisements();
    }
    return (
        <>
            <Modal show={showSignup} onHide={handleCloseSignup}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='my-2'>
                        <label>Name</label>
                        <input
                            type="text"
                            className='form-control mt-2'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>
                    <div className='my-2'>
                        <label>Email</label>
                        <input
                            type="text"
                            className='form-control mt-2'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className='my-2'>
                        <label>Contact Number</label>
                        <input
                            type="number"
                            className='form-control mt-2'
                            placeholder='Enter Contact Number'
                            value={contact}
                            onChange={(e) => { setContact(e.target.value) }}
                        />
                    </div>
                    <div className='my-2'>
                        <label>Date Of Birth</label>
                        <input
                            type="date"
                            className='form-control mt-2'
                            placeholder=''
                            value={dateOfBirth}
                            onChange={(e) => { setDateOfBirth(e.target.value) }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleSubmitSignup}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showAdvertisement} onHide={handleCloseAdvertisement}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-success'>Edit Advertisement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='my-2'>
                        <label>Name</label>
                        <input
                            type="text"
                            className='form-control mt-2'
                            placeholder=''
                            value={nameAdd}
                            onChange={(e) => { setNameAdd(e.target.value) }}
                        />
                    </div>
                    <div className='my-2'>
                        <label>Price</label>
                        <input
                            type="number"
                            className='form-control mt-2'
                            placeholder=''
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                        />
                    </div>
                    <div className='my-2'>
                        <label>Description</label>
                        <textarea
                            type="text"
                            rows={2}
                            className='form-control mt-2'
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                        ></textarea>
                    </div>
                    <div className='my-2'>
                        <label>Features</label>
                        <textarea
                            type="text"
                            rows={2}
                            className='form-control mt-2'
                            value={feature}
                            onChange={(e) => { setFeature(e.target.value) }}
                        ></textarea>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='my-2 w-50 pe-3'>
                            <label>Starts On</label>
                            <input
                                type="date"
                                className='form-control mt-2'
                                placeholder=''
                                value={startsOn}
                                onChange={(e) => { setStartsOn(e.target.value) }}
                            />
                        </div>
                        <div className='my-2 w-50 ps-3'>
                            <label>Ends On</label>
                            <input
                                type="date"
                                className='form-control mt-2'
                                placeholder=''
                                value={endsOn}
                                onChange={(e) => { setEndsOn(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='my-2'>
                            <label>Category</label>
                            <select
                                className='form-select mt-2 bg-success text-white'
                                onChange={(e) => { setSelectedCategory(e.target.value) }}
                            >
                                <option value="">Select Category</option>
                                {categorys.map((item) => {
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
                        </div>
                        <div className='my-2'>
                            <label>City Area</label>
                            <select
                                className='form-select mt-2 bg-success text-white'
                                onChange={(e) => { setselectedCityArea(e.target.value) }}
                            >
                                <option value="">Select City Area</option>
                                {cityAreas.map((item) => {
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
                        </div>
                        <div className='my-2'>
                            <label>Type</label>
                            <select
                                className='form-select mt-2 bg-success text-white'
                                onChange={(e) => { setSelectedType(e.target.value) }}
                            >
                                <option value="">Select Type</option>
                                {types.map((item) => {
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
                        </div>
                    </div>
                    <div className='my-2'>
                        <label>Image</label>
                        <input
                            type="file"
                            id='Image'
                            name='Image'
                            className='form-control mt-2'
                            onChange={(e) => { setImage(e.target.files[0]) }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmitAdvertisement}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="bg-about">
                <h1 className="heading">User Dashboard</h1>
            </div>
            <div className="d-flex justify-content-between">
                <div className="col-3">
                    <Card className="p-0 m-2">
                        <card-header className="w-75 align-self-center">
                            <img src={`http://localhost:1214/uploads/${user?.Image}`} alt="image" className="w-100 rounded-circle p-3" />
                        </card-header>
                        <Card.Body>
                            <Card.Title className='fs-3 text-success'>{user?.Name}</Card.Title>
                            <hr />
                            <Card.Text>
                                <p><span className="fw-bold">Email</span> : {user?.Email}</p>
                                <p><span className="fw-bold">Contact Number</span> : {user?.Contact}</p>
                                <p><span className="fw-bold">Date Of Birth</span> : {user?.DateOfBirth.split("T")[0]}</p>
                                <button className="btn btn-success me-3" onClick={handleShowSignup}>Edit Info</button>
                                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-9">
                    <div className="p-0 m-2">
                        <h2 className="text-success">Posted Advertisments</h2>
                        {userAdds.map((item) => {
                            return (
                                <>
                                    <Card className="flex-row p-0 m-2">
                                        <card-header className="w-25 h-100 m-3">
                                            <img src={`http://localhost:1214/uploads/${item.Image}`} alt="image" className="w-100 h-100 rounded-2" />
                                        </card-header>
                                        <Card.Body className='w-75'>
                                            <Card.Title className='fw-bold'>{item.Name}</Card.Title>
                                            <Card.Text>
                                                <p>{item.Description}</p>
                                                <p><span className="fw-bold">Price: </span>{item.Price}</p>
                                                <p><span className="fw-bold">City Area: </span>{item.CityArea.Name}</p>
                                                <Button className="btn btn-danger" data-did={item._id} onClick={handleDeleteAdvertisement}>Delete</Button>
                                                <Button className="btn btn-success mx-3" data-uid={item._id} onClick={handleShowAdvertisement}>Edit</Button>
                                                <Button className="btn btn-success" as={Link} to={`/carDetails/${item._id}`}>More Details</Button>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}