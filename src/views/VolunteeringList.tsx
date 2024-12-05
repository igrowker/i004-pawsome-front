import VolunteeringCard from "@/components/VolunteeringCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchVolunteeringByRefugeeId } from "@/redux/actions/volunteeringActions";
import { useParams } from "react-router-dom";
import { IVolunteeringByRefugeeId } from "@/interfaces/IVolunteeringByRefugee";

const VolunteeringList: React.FC = () => {
const dispatch = useDispatch<AppDispatch>();
const {id} = useParams<{ id: string }>();
const {volunteering_id, loading} = useSelector((state: RootState) => state.volunteering);
console.log(volunteering_id)

useEffect(() => {
  if (id) {
    console.log("Despachando acción para ID de refugio:", id);
    dispatch(fetchVolunteeringByRefugeeId(id));
  }
    
  }, [id,dispatch]);
 
  if (loading) {
    return <div>Cargando voluntariados disponibles para su adopción...</div>;
  }
  // if (!volunteering_id || volunteering_id.length === 0) {
  //   return <div>No hay voluntariados disponibles en este momento.</div>;
  // }


return (
        <>
           <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {volunteering_id.map((volunteering: IVolunteeringByRefugeeId) => (
        <VolunteeringCard
        _id ={volunteering._id}
        description = {volunteering.description}
        requirements = {volunteering.requirements}
        availability = {volunteering.availability}
        />
      ))}
    </div>
        </>
    )
}

export default VolunteeringList;

