import { Box, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

const home: NextPage = () => {
  return (
    <Box
      bg="purple.800"
      w="100vw"
      h="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        experimental_spaceY={"20"}
        role={"group"}
      >
        <Heading
          fontSize={["xl", "3xl", "4xl", "100px"]}
          fontFamily={"Caveat"}
          textColor={"purple.300"}
          // onClick={() => {
          //   setShow((show) => !show);
          // }}
        >
          Welcom to Dsk.
        </Heading>
        <NextLink href="/dashboard" passHref>
          <Link
            style={{ textDecoration: "none" }}
            textDecoration={"none"}
            boxShadow={"none"}
            fontFamily={"Caveat"}
            fontSize={"2xl"}
            textColor={"purple.200"}
          >
            Dashboard🚀🚀🚀🚀🚀
          </Link>
        </NextLink>
      </Box>
    </Box>
  );
};
export default home;
