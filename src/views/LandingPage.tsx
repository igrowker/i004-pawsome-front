import { FaArrowRight } from "react-icons/fa6";


const LandingPage = () => {
    return (
        <div className="container text-center">
            <h1>Pawsome</h1>
            <h4>Un lugar, todos los refugios</h4>
            <button className="bg-primaryLight text-light  font-semibold rounded-full shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75">
                <FaArrowRight/>
            </button>
        </div>
    );
}

export default LandingPage;