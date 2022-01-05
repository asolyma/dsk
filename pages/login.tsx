import type { NextPage } from "next";
import { Box, Heading, Image } from "@chakra-ui/react";
import NextImage from "next/image";
import SignIn from "../components/SignIn";
const login: NextPage = () => {
  return (
    <Box display={["flex"]} flexDir={["column", "row"]}>
      <Box
        w={["100vw", "50vw"]}
        h={["25vh", "100vh"]}
        display={"flex"}
        flexDir={"column-reverse"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image src="/logo.png" alt="Logo" />
        {/* <Box
          width={["200px"]}
          height={"200px"}
          position={["absolute", "inherit"]}
          top={0}
        >
          <NextImage
            src={"/fido.png"}
            layout={"responsive"}
            alt=""
            width={500}
            height={500}
          />
        </Box> */}
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

export default login;
