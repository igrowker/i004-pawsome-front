import { FaArrowRight } from "react-icons/fa6";


const LandingPage = () => {
    return (
        <div className="flex flex-col items-bottom justify-center bg-gray-100 min-h-screen mt-12 pt-12">
            <div className="text-center mt-12 pt-12">
                <h1 className="text-5xl font-extrabold text-black mt-12 pt-12">Pawsome</h1>
                <h4 className="text-black-500">Un lugar, todos los refugios</h4>
                <button className="bg-primaryLight text-light text-4xl p-2 my-2 font-semibold rounded-full shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75">
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}

export default LandingPage;