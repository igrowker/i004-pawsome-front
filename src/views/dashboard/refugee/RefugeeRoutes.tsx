import { Routes, Route } from "react-router-dom";
import PostPets from "./pages/PostPets";
import PetList from "./pages/PetList";

function RefugeeRoutes() {
  return (
    <Routes>
      {/* <Route path="/:id" element={<RefugeProfile />} /> */}
      <Route path="/postpets" element={<PostPets />} />
      <Route path="/petslist" element={<PetList />} />
    </Routes>
  );
}

export default RefugeeRoutes;
