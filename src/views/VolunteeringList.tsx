import VolunteeringCard from "@/components/VolunteeringCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchVolunteeringByRefugeeId } from "@/redux/actions/volunteeringActions";
import { useParams } from "react-router-dom";
import { IVolunteeringByRefugeeId } from "@/interfaces/IVolunteeringByRefugee";
import { useState } from "react";
import VolunteeringCreator from "@/components/VolunteeringCreator";

const VolunteeringList: React.FC = () => {
const dispatch = useDispatch<AppDispatch>();
const {id} = useParams<{ id: string }>();
const {volunteering_id, loading} = useSelector((state: RootState) => state.volunteering);
// const auth = useSelector((state: RootState) => state.auth);
const [isCreating, setIsCreating] = useState<boolean>(false);
const { isAuthenticated, user } = useSelector(
  (state: RootState) => state.auth
);

useEffect(() => {
  if (id) {
    dispatch(fetchVolunteeringByRefugeeId(id));
  }
  }, [id,dispatch]);
 
  if (loading) {
    return <div>Cargando voluntariados disponibles para su adopción...</div>;
  }

const handleCreateVolunteering = () => {
  setIsCreating(true)
}

const onClose = () => {
  setIsCreating(false)
}
return (
        <>
         {isAuthenticated && user?.role === "refugee" && (
        <div className="mb-4">
          <button
            className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600"
            onClick={handleCreateVolunteering}
          >
            Crear Voluntariado
          </button>
        </div>
      )}
      {isCreating ? (
  <VolunteeringCreator isOpen={isCreating} onClose={onClose} refugee_id={id}/>
) : (
  <div className="p-2 grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {(Array.isArray(volunteering_id) ? volunteering_id : [volunteering_id]).map(
      (volunteering: IVolunteeringByRefugeeId) => (
        <VolunteeringCard
          key={volunteering._id}
          _id={volunteering._id}
          description={volunteering.description}
          requirements={volunteering.requirements}
          availability={volunteering.availability}
        />
      )
    )}
  </div>
)}

          
        </>
    )
}

export default VolunteeringList;

