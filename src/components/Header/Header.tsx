import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className="bg-black text-white h-[90px] flex items-center px-[20px] py-[7px] text-[32px]">
                <nav className="flex">
                    <ul className="flex gap-x-10  text-[20px]">
                        <li className=" hover:text-[#00BFFF]">
                            <Link to="">Plants</Link>
                        </li>
                        <li className=" hover:text-[#00BFFF]">
                            <Link to="/animals">Animals</Link>
                        </li>
                    </ul>
                </nav>

            </header>
        </>
    );
};

export default Header;