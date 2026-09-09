import FooterComponent from "../components/footer";
import NavbarComponent from "../components/navbar";
import { Outlet } from "react-router-dom";
import UserComponent from "../components/user";

export default function MainLayout(){
    return(
        <>
        <div className="outer-most">
            <UserComponent/>
            <NavbarComponent/>
            <main>
                    <Outlet/>
            </main>
            <FooterComponent/>
        </div>
        </>
    )
}