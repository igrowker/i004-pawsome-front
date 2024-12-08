import { Routes, Route } from "react-router-dom";
import PostPets from "./pages/PostPets";
import PetList from "./pages/PetList";
import PetListUserRefugee from "./pages/PetListUserRefugee";

function RefugeeRoutes() {
  return (
    <Routes>
      {/* <Route path="/:id" element={<RefugeProfile />} /> */}
      <Route path="/postpets" element={<PostPets />} />
      <Route path="/petslist" element={<PetListUserRefugee />} />
    </Routes>
  );
}

export default RefugeeRoutes;
