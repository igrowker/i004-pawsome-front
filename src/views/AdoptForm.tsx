import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitAdoptionRequest } from "../redux/actions/adoptRequestActions";
import { RootState } from "../redux/rootReducer";
import { useForm } from "react-form-ease";
// import { Spinner } from "../components/ui/spinner";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

const AdoptForm: React.FC = () => {

    // const { id } = useParams<{ id: string }>();
    const { animal_id } = useParams()
    // console.log(animal_id)
    // const animalIdString = id || "";

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(useParams().animal_id)

    const { formData, updateForm } = useForm({
        data: {
            fullName: "",
            phone: "",
            location: "",
            compatibility: "",
            housingSituation: "",
            experienceWithPets: false,
            termsAccepted: false,
        },
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { error, loading } = useSelector((state: RootState) => state.adopt);
    const [errorTerms, setErrorTerms] = useState<{ termsAccepted?: string }>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.termsAccepted) {
            setErrorTerms({ termsAccepted: "Debes aceptar los términos y condiciones." });

            if (!animal_id) {
                console.error("Animal ID no está disponible.");
                return;
            }
            return;
        }
        setErrorTerms({});

        try {
            await dispatch<any>(submitAdoptionRequest(
                {
                    animal_id: animal_id!, //Coger del store el animal.id
                    adopter_id: "673f695ab50b8e95dc88e085", //coger del store el user.id
                    name: formData.fullName,
                    details: formData.phone,
                    compatibility: formData.compatibility,
                    location: formData.location,
                    housingSituation: formData.housingSituation,
                    experience: formData.experienceWithPets,
                    request_date: new Date().toISOString(),
                    status: "en revisión",
                })
            );
            setIsSubmitted(true)
            setIsSuccess(true)
            // console.log(formData)
        } catch (error) {
            console.error("Error al procesar la solicitud", error);
            setIsSuccess(false);
        }
    };

    const handleCloseUp = () => {
        navigate("/home")
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4 mt-0">
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
                        <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500" value={formData.phone} placeholder="+34666666666" onChange={(e) => updateForm({ phone: e.target.value })} />
                    </div>
                    <div className="flex flex-row gap-3">
                        <div>
                            <label htmlFor="cityAndCountry" className="block text-sm font-medium text-gray-600">País:</label>
                            <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500" value={formData.location} placeholder="Ciudad, País" onChange={(e) => updateForm({ location: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="compatibility" className="block text-sm font-medium text-gray-600">Compatibilidad:</label>
                        <textarea
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-teal-500 resize-none"
                            rows={4} // Número de líneas de texto que se verán.
                            value={formData.compatibility}
                            placeholder="¿Por qué quieres adoptar?"
                            onChange={(e) => updateForm({ compatibility: e.target.value })}
                        />
                    </div>
                    <div>
                        {/* Solo se puede seleccionar o Habitación o Departamento */}
                        <label htmlFor="homeSituation" className="block text-sm font-medium text-gray-700 pt-2">Situación Habitacional</label>
                        <div className="flex items-center space-x-4 py-2">
                            <label className="flex items-center text-gray-800 text-sm">
                                <input
                                    type="radio"
                                    name="housingSituation"
                                    value="Casa"
                                    checked={formData.housingSituation === "Casa"}
                                    onChange={() => updateForm({ housingSituation: "Casa" })}
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
                            {errorTerms.termsAccepted && (
                                <p className="text-red-500 text-sm mt-1">{errorTerms.termsAccepted}</p>
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
                {loading && (<Spinner />)}
                {isSubmitted && isSuccess && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h2 className="text-2xl font-semibold mb-4">¡Hemos procesado tu solicitud de adopción!</h2>
                            <h3 className="text-lg mb-6">Te hemos enviado un mail confirmando que hemos recibido tu solicitud</h3>
                            <p className="text-lg mb-6">En breve nos pondremos en contacto contigo.</p>
                            <button
                                className="bg-primaryLight text-white px-4 py-2 rounded-md"
                                onClick={handleCloseUp}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </div >
        </div >
    );
}

export default AdoptForm;