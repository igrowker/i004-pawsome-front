import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";



const RegisterPage = () => {


    return (

       <>
       <RegisterForm />
       <div className="flex flex-col justify-items-center ml-[52px]">
       <span className="ml-[37px] mt-[20px] text-primaryLight mb-[30px] hover:underline">
       <Link to="/login">Ya tienes cuenta ? Inicia sesión</Link> 
       </span>
       </div>
       
       
       </>
)}


export default RegisterPage;