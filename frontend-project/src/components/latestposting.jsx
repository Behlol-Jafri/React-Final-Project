import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LatestPostingComponent() {
     const [advertisements,setAdvertisement] = useState([]);
     useEffect(
        () => {
            getAdvertisement();
            return () => { }
        },
        []
    );
    async function getAdvertisement() {
        const response = await fetch(`http://localhost:1214/advertisement`)
        const data = await response.json();
        if (data) {
            setAdvertisement(data)
        }
    }
    const latestAdd = advertisements.slice(-4);
    const latestAddreverse = latestAdd.reverse();
    return (
        <>
            <h1 className="text-center text-success fw-bold m-3 mb-4">Latest Posting</h1>
            <div className="d-flex justify-content-center row gap-5 p-0 m-0">
                {latestAddreverse.map((item) => {
                    return (
                        <>
                            <Card className="col-5 p-0 m-3">
                                <Card-header>
                                    <img src={`http://localhost:1214/uploads/${item.Image}`} alt="image" className="w-100" />
                                </Card-header>
                                <Card.Body>
                                    <Card.Title className="fw-bold">{item.Name}</Card.Title>
                                    <Card.Text>
                                        <p>{item.Description}</p>
                                        <Button className="btn btn-success" as={Link} to={`/carDetails/${item._id}`} >More Details</Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </>
                    )
                })}
            </div>
        </>
    )
}