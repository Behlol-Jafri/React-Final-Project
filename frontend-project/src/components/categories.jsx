import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import './about.css'
import { Link, useParams } from "react-router-dom";
export default function Categories() {
    const [advertisements, setAdvertisements] = useState([])
    const { categoryName } = useParams()
    useEffect(
        () => {
            getAdvertisements();
            return () => { }
        },
        []
    );
    const categoryAdds = advertisements.filter((item) => item?.Category?.Name === categoryName)
    async function getAdvertisements() {
        const response = await fetch('http://localhost:1214/advertisement')
        const data = await response.json();
        if (data) {
            setAdvertisements(data);
        }
    }
    return (
        <>
            <div className="bg-about">
                <h1 className="heading">Advertisement Categories</h1>
            </div>
                <h2 className="text-success text-center fw-bold m-3">{categoryName}</h2>
            <div className="p-0 m-0">
                {(categoryAdds && categoryAdds.length > 0) ?
                    categoryAdds.map((item) => {
                        return (
                            <>
                                <Card className="m-3 flex-row">
                                    <card-header className="w-25 p-2">
                                        <img src={`http://localhost:1214/uploads/${item.Image}`} alt="image" className="w-100" />
                                    </card-header>
                                    <Card.Body className="w-75">
                                        <Card.Title className="text-success fw-bold fs-4">{item.Name}</Card.Title>
                                        <Card.Text>
                                            <p>{item?.Description}</p>
                                            <Button className="btn btn-success" as={Link} to={`/carDetails/${item._id}`}>More Details</Button>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </>
                        )
                    })
                    :
                    <h3 className="text-center text-danger fw-bold m-3 mb-4">Result not found</h3>
                }
            </div>
        </>
    )
}