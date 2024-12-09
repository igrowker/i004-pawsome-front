import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="flex flex-col items-bottom justify-center bg-gray-100 min-h-screen">
            <div className="text-center">
                <h1 className="text-5xl font-extrabold text-black">Pawsome</h1>
                <h4 className="text-black-500">Un lugar, todos los refugios</h4>
                <button className="bg-primaryLight text-light text-4xl p-2 my-2 font-semibold rounded-full shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75">
                    <Link to={"/home"}><FaArrowRight /></Link>
                </button>
            </div>
        </div>
    );
}

export default LandingPage;