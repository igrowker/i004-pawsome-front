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
import { Link } from "react-router-dom";
import { PiArrowLineLeftLight } from "react-icons/pi";

const VolunteeringList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { volunteering_id, loading } = useSelector((state: RootState) => state.volunteering);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchVolunteeringByRefugeeId(id));
    }
    if(refreshFlag) {
      dispatch(fetchVolunteeringByRefugeeId(id))
      setRefreshFlag(false)
    }

  }, [ dispatch, refreshFlag, id]);

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
      <button className="bg-primaryLight text-light text-2xl p-2 ml-[15px] mt-[20px] font-semibold rounded-full shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 absolute">
        <Link to={`/refugee/${id}`}>
          <PiArrowLineLeftLight className="" />
        </Link>
      </button>
      {isAuthenticated && user?.role === "refugee" && (
        <div className="mb-4 mt-[20px] ml-[190px] ">
          <button
            className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600"
            onClick={handleCreateVolunteering}
          >
            Crear Voluntariado
          </button>
        </div>
      )}
      {isCreating ? (
        <VolunteeringCreator isOpen={isCreating} onClose={onClose} refugee_id={id} setRefreshFlag={setRefreshFlag}/>
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
                setRefreshFlag={setRefreshFlag}
              />
            )
          )}
        </div>
      )}


    </>
  )
}

export default VolunteeringList;

