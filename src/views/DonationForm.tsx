
const DonationForm = () =>{

    return(
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700 pt-5">Formulario De Donación</h1>
        <div className="bg-white rounded-3xl shadow-lg p-5 max-h-full w-full max-w-lg">
            <form noValidate className="space-y-4 mb-5" >
                <div>
                    <label htmlFor="Title" className="block text-sm font-medium text-gray-600">Titulo</label>
                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500" />
                </div>
                <div>
                    <label htmlFor="donationDescription" className="block text-sm font-medium text-gray-600">Descripción de la donación</label>
                    <textarea
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-teal-500 resize-none"       
                    />
                </div>
                <div>
                <label className="block mb-2 text-sm font-medium text-gray-600 " htmlFor="small_size">Imagen</label>
                <input className="block w-full mb-5 text-sm text-gray-300 border border-gray-300 rounded-2xl cursor-pointer dark:text-gray-500 focus:outline-none  dark:border-gray-300 dark:placeholder-gray-400" id="small_size" type="file"/>
                </div>
                <label htmlFor="donationkind" className="block text-sm font-medium text-gray-600 pt-2">Tipo de donación </label>
                <div className="flex items-center space-x-4">
                        <label className="flex items-center text-gray-800 text-sm">
                            <input
                                type="radio"
                                name="donationkind"
                                value="money"
                            />
                            <span className="ml-2">Dinero</span>
                        </label>
                        <label className="flex items-center text-gray-800 text-sm">
                            <input
                                type="radio"
                                name="donationkind"
                                value="kind"
                                className="form-radio text-sm font-medium text-grey-400"
                            />
                            <span className="ml-2">Especies</span>
                        </label>
                    </div>
                <div>
                <div className="mb-3">
                    <label htmlFor="donationAmount" className="block text-sm font-medium text-gray-600">¿Cuanto dinero necesitas recuardar?</label>
                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500" />
                </div>
                <div className="mb-3">
                    <label htmlFor="donationCuantity" className="block text-sm font-medium text-gray-600">¿Cuantas unidades necesitas recuardar?</label>
                    <input type="number" id="number-input" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500" />
                </div>   
                </div>
                <label htmlFor="deadLine" className="block text-sm font-medium text-gray-600">Fecha de meta</label>
                <div id="date-range-picker" date-rangepicker className="flex items-center">
                        <div className="relative">
                            <input id="datepicker-range-end" name="end" type="date" className="border border-gray-300 text-gray-900 text-sm rounded-2xl  block w-full ps-10 p-2.5  dark:text-gray-600" placeholder="Select date end"/>
                        </div>
                        </div>
                <button className="mt-4 w-full bg-secondaryLight text-white font-bold py-2 px-4 rounded-2xl hover:bg-primaryLight transition-colors">
                  Cargar Donación
                </button>
            </form>
        </div >
    </div >
    )
}

export default DonationForm