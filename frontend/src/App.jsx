import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import CreatePage from "./components/pages/CreatePage";

function App() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} h={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
