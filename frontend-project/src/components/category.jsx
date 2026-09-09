import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CategoryComponent() {
    const [category, setCategory] = useState([]);
    const [advertisements, setAdvertisements] = useState([]);
    useEffect(
        () => {
            getAdvertisements();
            getCategory();
            return () => { }
        },
        []
    );
    async function getAdvertisements() {
        const response = await fetch(`http://localhost:1214/advertisement`)
        const data = await response.json();
        if (data) {
            setAdvertisements(data);
        }
    }
    async function getCategory() {
        const response = await fetch(`http://localhost:1214/category`)
        const data = await response.json();
        if (data) {
            setCategory(data)
        }
    }
    return (
        <>
            <h1 className="text-center text-success fw-bold m-3">Explore By Categories</h1>
            <div className="d-flex justify-content-center row gap-5 p-0 m-0">
                {category.map((item,) => {
                     const adsForCategory = advertisements.filter(ad => ad.Category?._id === item._id);
                    return (
                        <>
                            <Card className="col-2 m-3 p-0 m-0 text-decoration-none" as={Link} to={`/category/${item?.Name}`}>
                                <card-header>
                                    <img src={`http://localhost:1214/uploads/${item?.Image}`} alt="image" className="w-100" />
                                </card-header>
                                <Card.Body>
                                    <Card.Title>{item.Name}</Card.Title>
                                    <p className="text-success">{adsForCategory.length} Cars</p>
                                </Card.Body>
                            </Card>
                        </>
                    )
                })}
            </div>
        </>
    )
}