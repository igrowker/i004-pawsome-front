const RegisterForm = () => {


    return (<>
    <div className="">
        <img src="../../public/register.png" alt="" />
    </div>
        <form className = "max-w-md md:max-w-2xl lg:max-w-3xl m-auto mt-10 p-6 flex-col justify-center" >
            <div className="email text-">
                <input type="email" placeholder="Email" className="border-2 rounded-lg h-10 w-4/5"></input>
            </div>
            <div className="password">
                <input type="password" placeholder="Contraseña" className="border-2 rounded-lg h-10 w-4/5"></input> 
            </div>
            <div className="password">
                <input type="password" placeholder="Confirmar Contraseña" className="border-2 rounded-lg h-10 w-4/5"></input> 
            </div>
            <div className="name">
                <input type="text" placeholder="Nombre" className="border-2 rounded-lg h-10 w-4/5"></input>
            </div>
            <div className="lastName">
            <input type="text" placeholder="Apellidos" className="border-2 rounded-lg h-10 w-4/5"></input>
            </div>
            <div className="registerOptions inline-grid">
            <label>
                <input type="radio" name="option" value="refugio" /> Refugio
            </label>
            <label>
                <input type="radio" name="option" value="voluntario"/> Voluntario
            </label>
            <label>
                <input type="radio" name="option" value="adoptante" /> Adoptante
            </label>
            </div>
        </form>
        </>
)}

export default RegisterForm;