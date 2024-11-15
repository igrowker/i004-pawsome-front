const RegisterForm = () => {


    return (<>
    <div className="">
        <img src="../../public/register.png" alt="" className="w-full"/>
    </div>
        <form className = "max-w-md md:max-w-2xl lg:max-w-3xl mt-10 ml-[52px] flex flex-col justify-center" >
            <div className="email text-">
                <input type="email" placeholder="Email" placeholder-gray-500 className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2" required></input>
            </div>
            <div className="password">
                <input type="password" placeholder="Contraseña" className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2" required></input> 
            </div>
            <div className="password">
                <input type="password" placeholder="Confirmar Contraseña" className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2" required></input> 
            </div>
            <div className="name">
                <input type="text" placeholder="Nombre" className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2" required></input>
            </div>
            <div className="lastName">
            <input type="text" placeholder="Apellidos" className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2" required></input>
            </div>
            <div className="registerOptions inline-grid">
            <label>
                <input type="radio" name="option" value="refugio" className="mb-[15px]" /> Refugio
            </label>
            <label>
                <input type="radio" name="option" value="voluntario" className="mb-[15px]"/> Voluntario
            </label>
            <label>
                <input type="radio" name="option" value="adoptante" className="mb-[40px]"/> Adoptante
            </label>
            </div>
        </form>
        </>
)}

export default RegisterForm;