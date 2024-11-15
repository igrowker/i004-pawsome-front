import { useState } from "react";
import { useForm } from "react-form-ease"; //Hook de React para los formularios

const AdoptForm = () => {

    // Hook 
    const { formData, updateForm } = useForm({
        data: {
            fullName: "",
            phone: "",
            city: "",
            country: "",
            compatibility: "",
            housingSituation: "",
            experienceWithPets: false,
            termsAccepted: false,
        },
    })

    const [errors, setErrors] = useState<{ termsAccepted?: string }>({});

    // Función para manejar el submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar que se hayan aceptado los términos y condiciones
        if (!formData.termsAccepted) {
            setErrors({ termsAccepted: "Debes aceptar los términos y condiciones." });
            return;
        }

        // Aquí puedes manejar el envío del formulario
        console.log("Formulario enviado:", formData);
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-700 pt-5">Formulario De Adopción</h1>
            <div className="bg-white rounded-3xl shadow-lg p-5 max-h-full w-full max-w-lg">
                <form noValidate className="space-y-4 mb-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">Nombre Completo:</label>
                        {/* El hook ya actualiza el valor que hayas puesto en el input, actualiza todo el Hook */}
                        <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500" value={formData.fullName} onChange={(e) => updateForm({ fullName: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Telefono de Contacto:</label>
                        <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500" value={formData.phone} placeholder="+34 666 666 666" onChange={(e) => updateForm({ phone: e.target.value })} />
                    </div>
                    <div className="flex flex-row gap-3">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-600">Ciudad:</label>
                            <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500" value={formData.city} placeholder="Tu ciudad" onChange={(e) => updateForm({ city: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="cityAndCountry" className="block text-sm font-medium text-gray-600">País:</label>
                            <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500" value={formData.country} placeholder="Tu País" onChange={(e) => updateForm({ country: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="compatibility" className="block text-sm font-medium text-gray-600">Compatibilidad:</label>
                        <input type="text" className="align-text-top mt-1 block w-full px-3 py-10 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-teal-500" value={formData.compatibility} placeholder="¿Por qué quieres adoptar?" onChange={(e) => updateForm({ compatibility: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="homeSituation" className="block text-sm font-medium text-gray-700 pt-2">Situación Habitacional</label>
                        <div className="flex items-center space-x-4 py-2">
                            <label className="flex items-center text-gray-800 text-sm">
                                <input
                                    type="radio"
                                    name="housingSituation"
                                    value="Casa"
                                    checked={formData.housingSituation === "Casa"}
                                    onChange={() => updateForm({ housingSituation: "Casa" })}
                                // className="form-radio text-gray-600"
                                />
                                <span className="ml-2">Casa</span>
                            </label>
                            <label className="flex items-center text-gray-800 text-sm">
                                <input
                                    type="radio"
                                    name="housingSituation"
                                    value="Departamento"
                                    checked={formData.housingSituation === "Departamento"}
                                    onChange={() => updateForm({ housingSituation: "Departamento" })}
                                    className="form-radio text-sm font-medium text-grey-400"
                                />
                                <span className="ml-2">Departamento</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.experienceWithPets}
                                    onChange={(e) => updateForm({ experienceWithPets: e.target.checked })}
                                    className="form-checkbox text-teal-500"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">Experiencia con mascotas</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.termsAccepted}
                                    onChange={(e) => updateForm({ termsAccepted: e.target.checked })}
                                    className="form-checkbox text-teal-500"
                                    required
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">Acepto los términos y condiciones</span>
                            </label>
                            {errors.termsAccepted && (
                                <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
                            )}
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <button
                            type="submit"
                            className="w-full py-3 bg-primaryLight text-white font-semibold rounded-full shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75">
                            Enviar Formulario
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default AdoptForm;
