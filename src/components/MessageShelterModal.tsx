
import Modal from "./ui/modal";

type MessageToShelterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const MessageShelterModal = ({
  isOpen,
  onClose,

}: MessageToShelterModalProps) => {
    return (<>
     <Modal isOpen={isOpen} onClose={onClose}>
    <div className="flex flex-col items-center max-h-screen">
      <button onClick={onClose} className="self-end text-xl font bold">
        &times;
      </button>
      <div className="flex items-center space-x-">
        <img src="/public/Vector.png" alt="profilepic" className="w-16 h-16 rounded-full" />
        <div>
            <h2 className="text-lg font-semibold">
            VOLUNTARIO ROQUE
            </h2>
            <div className="flex space-x-2">
            <span>RESCATE</span>
            <span>PERRO</span>
            </div>
           <p className="text-sm text-gray-500">Hace 5 minutos</p>
        </div>
      </div>
      <div className="flex">
      <img src="/public/Group.png" alt="perroprofile" className="my-4 rounded-lg shadow-md" />
      <p className="text-center text-gray-700 pl-[45px]">
      Ayuda para rescate de perro en Madrid, está solo en la calle, no tiene comida y está
      lloviendo. Si otro voluntario puede acogerlo hasta que llegue, por favor que me envíe un mensaje urgente.
      </p>
      </div>
      
      <textarea placeholder="¿Cómo puedes ayudar al refugio?" className="w-full mt-4 p-2 bourder rounden-md"></textarea>
      <button className="mt-4 px-4 py-2 bg-primaryLight text-white rounded-md">
          Enviar
        </button>
    </div>
  </Modal>;
    </>)
 
};

export default MessageShelterModal;
