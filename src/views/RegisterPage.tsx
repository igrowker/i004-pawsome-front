import RegisterForm from "../components/RegisterForm";
import RegisterButton from "./../components/RegisterButton";



const RegisterPage = () => {


    return (
       <>
       <RegisterForm />
       <div className="flex flex-col justify-items-center ml-[52px]">
       <RegisterButton/>
       <span className="ml-[37px] mt-[20px] text-primaryLight">
        Ya tienes cuenta ? Inicia sesión
       </span>
       </div>
       
       
       </>
)}

export default RegisterPage;