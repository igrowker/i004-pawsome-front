import RegisterForm from "../components/RegisterForm";
import RegisterButton from "./../components/RegisterButton";



const RegisterPage = () => {


    return (
       <>
       <RegisterForm />
       <div className="flex flex-col justify-items-center">
       <RegisterButton/>
       <span className="">
        Ya tienes cuenta ? Inicia sesión
       </span>
       </div>
       
       
       </>
)}

export default RegisterPage;