import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './about.css'

export default function CarDetailsComponent() {
    const { Id } = useParams();
    const [advertisement, setAdvertisement] = useState([])
    const [cityArea, setCityArea] = useState([])
    const [users, setUsers] = useState([])
    const city = cityArea.find((item) => item._id === advertisement?.CityArea)
    const user = users.find((item) => item._id === advertisement?.PostedBy)
    useEffect(
        () => {
            getAdvertisements();
            return () => { }
        },
        []
    );
    async function getAdvertisements() {
        const response = await fetch(`http://localhost:1214/advertisement/${Id}`)
        const data = await response.json();
        if (data) {
            setAdvertisement(data);
            getCityArea();
            getUsers();
        }
    }
    async function getCityArea() {
        const response = await fetch(`http://localhost:1214/cityArea`)
        const data = await response.json();
        if (data) {
            setCityArea(data);
        }
    }
    async function getUsers() {
        const response = await fetch(`http://localhost:1214/user`)
        const data = await response.json();
        if (data) {
            setUsers(data);
        }
    }
    return (
        <>
            <div className="bg-about">
                <h1 className="heading">Car Details</h1>
            </div>
            <div className="mx-4 my-5 row d-flex justify-content-between">
                <div className="col-8">
                    <div className="d-flex justify-content-start mb-3">
                        <div className="" style={{ width: "15%", heigth: "15%" }}>
                            <img src={`http://localhost:1214/uploads/${advertisement?.Image}`} alt="img" className="w-100 h-100" />
                        </div>
                        <div className="w-75 mx-3">
                            <h3>{advertisement.Name}</h3>
                            <span className="pe-3"><FontAwesomeIcon icon="fa-solid fa-location-dot" className="text-success pe-1" /> {city?.Name}</span>
                            <span><FontAwesomeIcon icon="fa-solid fa-money-bill" className="text-success pe-1" /> {advertisement.Price}</span>
                        </div>
                    </div>
                    <h3>Car Description</h3>
                    <p>{advertisement.Description}</p>
                    <h3>Features</h3>
                    <p>{advertisement.Features}</p>
                </div>
                <div className="col-4">
                    <div className="card p-3 bg-green">
                        <div className="card-body">
                            <h5 className="mb-4">Advertisement Summary</h5>
                            <p><FontAwesomeIcon icon="fa-solid fa-angle-right" className="text-success" /> {user?.Name}</p>
                            <p><FontAwesomeIcon icon="fa-solid fa-angle-right" className="text-success" /> {advertisement?.StartsOn?.split("T")[0]}</p>
                            <p><FontAwesomeIcon icon="fa-solid fa-angle-right" className="text-success" /> {city?.Name}</p>
                            <p><FontAwesomeIcon icon="fa-solid fa-angle-right" className="text-success" /> Price: {advertisement?.Price}</p>
                            <p><FontAwesomeIcon icon="fa-solid fa-angle-right" className="text-success" /> Contact: {user?.Contact}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}