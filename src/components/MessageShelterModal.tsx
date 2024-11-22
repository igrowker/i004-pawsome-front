
import Modal from "./ui/modal";

interface Shelter {
  id: number;
  name: string;
  location: string;
  timeAgo: string;
  imageUrl: string;
  profileUrl: string;
  tags: string[];
}

interface MessageToShelterModalProps {
  isOpen: boolean;
  onClose: () => void;
  shelter: Shelter;

}

const MessageShelterModal = ({
  isOpen,
  onClose,
shelter, 
}: MessageToShelterModalProps) => {
    return (<>
     <Modal isOpen={isOpen} onClose={onClose}>
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4 h-screen px-[20px] wrapper">
      <div className="flex flex-row items-center mt-14 ">
        <img src={shelter.profileUrl} alt="profilepic" className="w-16 h-16 rounded-full" />
        <div className="ml-[20px]">
            <h2 className="text-lg font-semibold">
           {shelter.name}
            </h2>
            <div className="flex space-x-2 mt-1">
            {shelter.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-600">
                {tag}
              </span>
            ))}
             <p className="text-sm text-gray-500 pl-10">  {shelter.timeAgo}</p>
            </div>
        </div>
      </div>
      <div className="flex w-full pt-2">
      <img src={shelter.imageUrl} alt="perroprofile" className="my-4 h-[125px] w-full md:w-[155px] rounded-lg shadow-md" />
      <p className="text-gray-700 ml-[25px] h-fit mt-[10px] text-sm md:text-base ">
      Ayuda para rescate de perro en {shelter.location}, está solo en la calle, no tiene comida y está
      lloviendo. Si otro voluntario puede acogerlo hasta que llegue, por favor que me envíe un mensaje urgente.
      </p>
      </div>
      <div className="flex flex-col">
      <label className="text-black font-bold mt-6">Escribe un mensaje al refugio</label>
      <textarea placeholder="¿Cómo puedes ayudar al refugio?" className="w-full h-[35vh] mt-4 p-2 border border-gray-800 rounded-3xl"></textarea>
      <button className="mt-8 px-4 py-2 bg-primaryLight text-white rounded-3xl">
          Enviar
        </button>
      </div>
      
    </div>
  </Modal>;
    </>)
 
};

export default MessageShelterModal;
