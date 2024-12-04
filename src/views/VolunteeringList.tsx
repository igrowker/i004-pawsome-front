import VolunteeringCard from "@/components/VolunteeringCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchVolunteeringData } from "@/redux/actions/volunteeringActions";
import { Volunteering } from "@/interfaces/Volunteering";

const VolunteeringList: React.FC = () => {
const dispatch = useDispatch<AppDispatch>();

const { volunteering, loading } = useSelector((state: RootState) => state.volunteering.volunteering);

useEffect(() => {
    console.log(dispatch(fetchVolunteeringData()));
    console.log(volunteering)
  }, [dispatch]);

  if (loading) {
    return <div>Cargando voluntariados disponibles para su adopción...</div>;
  }
  if (!volunteering || volunteering.length === 0) {
    return <div>No hay voluntariados disponibles en este momento.</div>;
  }
return (
        <>
           <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {volunteering.map((volunteering: Volunteering) => (
        <VolunteeringCard
        _id ={volunteering._id}
        refugee_name= {volunteering.refugee_name}
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

