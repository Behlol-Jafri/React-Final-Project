import './about.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function About() {
    return (
        <>
            <div className="bg-about">
                <h1 className="heading">About Us</h1>
            </div>
            <div className="d-flex justify-content-center my-5">
                <div className="w-50 d-flex justify-content-center mx-3">
                    <div className="w-50 ">
                        <img src="bmw.jpg" alt="car" className="w-100" />
                        <img src="ferrari.jpg" alt="car" className="w-100" />
                    </div>
                    <div className="w-50 pt-5">
                        <img src="honda.jpg" alt="car" className="w-100" />
                        <img src="kia.jpg" alt="car" className="w-100" />
                    </div>
                </div>
                <div className=" w-50 mx-3">
                    <h2>PakClassified is a <br />comprehensive online platform <br />where users can browse, buy, <br />sell, and compare cars</h2>
                    <p className="text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum facere quae eius nihil neque officia veniam provident reiciendis suscipit officiis cupiditate fugit commodi, inventore distinctio impedit! Amet sunt quam sed commodi veritatis inventore eveniet, soluta laudantium, et iusto in aliquam minima voluptatem, doloremque quae vitae! Laudantium, quaerat quos. Itaque, alias?</p>
                    <p><FontAwesomeIcon icon="fa-solid fa-check" className='text-success pe-1' /> Customer Support</p>
                    <p><FontAwesomeIcon icon="fa-solid fa-check" className='text-success pe-1' /> Technical Assistance</p>
                    <p><FontAwesomeIcon icon="fa-solid fa-check" className='text-success pe-1' /> Feedback and suggestion</p>
                </div>
            </div>
        </>
    )
}