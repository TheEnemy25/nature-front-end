import { Link } from "react-router-dom";
import Logo from "../../assets/image/Logo.jpg";

const Header = () => {
    return (
        <>
            <header className="bg-black text-white h-[90px] flex items-center px-[20px] py-[7px] text-[32px]">
                <Link to="/">
                    <img src={Logo} className="w-[50px] mr-[20px]" />
                </Link>
                <nav className="flex">
                    <ul className="flex gap-x-10  text-[20px]">
                        <li className=" hover:text-[#00BFFF]">
                            <Link to="/plants">Plants</Link>
                        </li>
                        <li className=" hover:text-[#00BFFF]">
                            <Link to="/animals">Animals</Link>
                        </li>
                        <li className="hover:text-[#00BFFF]">
                            <Link to="/animals">Lakes and Rivers</Link>
                        </li>
                        <li className="hover:text-[#00BFFF]">
                            <Link to="/weather">Weather</Link>
                        </li>
                    </ul>
                </nav>

            </header>
        </>
    );
};

export default Header;