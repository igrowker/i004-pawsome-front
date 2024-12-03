import { useDonationForm } from "@/hooks/useDonationForm"

const DonationForm = () =>{

    const { donation, setDonation, handleInKindChange, handleMoneyChange, handleSubmit, monetary} = useDonationForm()

    return(
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700 pt-5">Formulario De Donación</h1>
        <div className="bg-white rounded-3xl shadow-lg p-5 max-h-full w-full max-w-lg">
            <form noValidate className="space-y-4 mb-5" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Title" className="block text-sm font-medium text-gray-600">Titulo</label>
                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500" value={donation.title}
                    onChange={(e) => setDonation({ ...donation, title: e.target.value })} required />
                </div>
                <div>
                    <label htmlFor="donationDescription" className="block text-sm font-medium text-gray-600">Descripción de la donación</label>
                    <textarea
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-teal-500 resize-none" 
                        value={donation.description}
                        onChange={(e) => setDonation({ ...donation, description: e.target.value })}
                        required 
                    />
                </div>
                <div className="image mb-[25px]">
                    <label htmlFor="file" className="border-2 rounded-3xl h-14 w-[85%] flex items-center justify-between px-4 bg-white cursor-pointer">
                        <span className="placeholder-black">Imagen (opcional)</span><span className="text-primaryLight font-semibold">Examinar</span></label>
                        <input id="file" type="file" className="hidden"/>
                </div>
                <label htmlFor="donationkind" className="block text-sm font-medium text-gray-600 pt-2">Tipo de donación </label>
                <div className="flex items-center space-x-4">
                        <label className="flex items-center text-gray-800 text-sm">
                            <input
                                type="radio"
                                name="donationkind"
                                value="money"
                                onClick={handleMoneyChange}
                            />
                            <span className="ml-2">Dinero</span>
                        </label>
                        <label className="flex items-center text-gray-800 text-sm">
                            <input
                                type="radio"
                                name="donationkind"
                                value="kind"
                                onClick={handleInKindChange}
                                className="form-radio text-sm font-medium text-grey-400"
                            />
                            <span className="ml-2">Especies</span>
                        </label>
                    </div>
                    {
                        monetary == undefined ? 
                        ''
                        :
                <div>
                    { monetary ? 
                <div className="mb-3">
                    <label htmlFor="donationAmount" className="block text-sm font-medium text-gray-600">¿Cuanto dinero necesitas recuardar?</label>
                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500"
                     value={donation.cuantityDonation}
                     onChange={(e) => setDonation({ ...donation, cuantityDonation: +e.target.value })} />
                </div>    
                    :
                <div className="mb-3">
                    <label htmlFor="donationCuantity" className="block text-sm font-medium text-gray-600">¿Cuantas unidades necesitas recuardar?</label>
                    <input type="number" id="number-input" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500"
                    value={donation.donationNumber}
                    onChange={(e) => setDonation({ ...donation, donationNumber: +e.target.value })} />
                </div>   
                    }

                </div>
                    }
                <button className="mt-4 w-full bg-secondaryLight text-white font-bold py-2 px-4 rounded-2xl hover:bg-primaryLight transition-colors">
                  Cargar Donación
                </button>
            </form>
        </div >
    </div >
    )
}


export default DonationForm