import './about.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Contact(){
    return(
        <>
        <div className="bg-about">
            <h1 className="heading">Contact</h1>
        </div>
        <div className="m-5 text-center">
            <h2 className="fw-bold">Contact For Any Query</h2>
        </div>
        <div className="d-flex justify-content-between p-3">
            <div className="bg-color p-2 me-2"><button className="btn bg-white text-success"><FontAwesomeIcon icon="fa-solid fa-location-dot" /></button> Gulberg III, Lahore</div>
            <div className="bg-color p-2 mx-2"><button className="btn bg-white text-success"><FontAwesomeIcon icon="fa-solid fa-envelope" /></button> evs@gmail.com</div>
            <div className="bg-color p-2 ms-2"><button className="btn bg-white text-success"><FontAwesomeIcon icon="fa-solid fa-phone" /></button> 0300 1 387 387</div>
        </div>
        <div className="d-flex justify-content-center m-3">
            <div className="w-50 pe-3 pb-3">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.163521088676!2d74.33457157463417!3d31.492188848535605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919043fb52276b5%3A0x2682e1fa63fcd065!2sEVS%20Training%20Institute%20Lahore!5e0!3m2!1sen!2s!4v1742466873033!5m2!1sen!2s"
             width="100%"
              height="100%"
                ></iframe>
            </div>
            <div className="w-50">
                <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis molestiae voluptas, provident dolorem necessitatibus nisi quos obcaecati, tenetur doloribus dicta repellat atque porro.</p>
                <div className="d-flex justify-content-between my-4">
                    <div className="w-50 me-3">
                        <input type="text" className="form-control" placeholder=" Your Name" />
                    </div>
                    <div className="w-50">
                        <input type="text" className="form-control" placeholder=" Your Email" />    
                    </div>
                </div>
                <div className="my-4">
                    <input type="text" className="form-control" placeholder="Subject" /> 
                </div>
                <div className="my-4">
                    <textarea rows="5" className="form-control" placeholder="Leave a message here"></textarea>
                </div>
                <div className="my-4">
                    <button className="btn btn-success w-100 text-center">Send Message</button>
                </div>
            </div>
        </div>
        </>
    )
}