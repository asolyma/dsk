import type { NextPage } from "next";
import { Box, Heading, Image } from "@chakra-ui/react";
import SignIn from "../components/SignIn";
const Home: NextPage = () => {
  return (
    <Box display={["flex"]} flexDir={["column", "row"]}>
      <Box
        w={["100vw", "50vw"]}
        h={["25vh", "100vh"]}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image src="/logo.png" alt="Logo" />
      </Box>
      <Box
        w={["100vw", "50vw"]}
        h={["75vh", "100vh"]}
        bg={"purple.900"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={["flex-start", "center"]}
      >
        <SignIn />
      </Box>
    </Box>
  );
};

export default Home;
