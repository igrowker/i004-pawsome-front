
const InKindDonation = () =>{

    return(
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700 pt-5">Donación</h1>
        <div className="bg-white rounded-3xl shadow-lg p-5 max-h-full w-full max-w-lg">
            <form noValidate className="space-y-4 mb-5" >
                <div>
                    <label htmlFor="Title" className="block text-sm font-medium text-gray-600">Titulo</label>
                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500" />
                </div>
                <div>
                    <label htmlFor="donationComment" className="block text-sm font-medium text-gray-600">Comentarios de la donación</label>
                    <textarea
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-teal-500 resize-none"       
                    />
                </div>
                <div>
                <div className="mb-3">
                    <label htmlFor="donationCuantity" className="block text-sm font-medium text-gray-600">Unidades a donar</label>
                    <input type="number" id="number-input" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500" />
                </div>   
                </div>
                <label htmlFor="deadLine" className="block text-sm font-medium text-gray-600">Fecha de donación</label>
                <div id="date-range-picker" date-rangepicker className="flex items-center">
                        <div className="relative">
                            <input id="datepicker-range-end" name="end" type="date" className="border border-gray-300 text-gray-900 text-sm rounded-2xl  block w-full ps-10 p-2.5  dark:text-gray-600" placeholder="Select date end"/>
                        </div>
                        </div>
                <button className="mt-4 w-full bg-secondaryLight text-white font-bold py-2 px-4 rounded-2xl hover:bg-primaryLight transition-colors">
                  Enviar Donación
                </button>
            </form>
        </div >
    </div >
    )
}

export default InKindDonation;