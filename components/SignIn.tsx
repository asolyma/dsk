import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

export default function SignIn() {
  const [show, setShow] = useState(false);
  return (
    <Stack spacing={[2, 4, 6, 8]} mx={"auto"} maxW={"lg"} py={[6, 12]} px={6}>
      <Stack align={"center"}>
        <Heading
          fontSize={["xl", "3xl", "4xl", "6xl"]}
          fontFamily={"Caveat"}
          textColor={"white"}
          cursor={"pointer"}
          onClick={() => {
            setShow((show) => !show);
          }}
        >
          Sign in to Dsk.
        </Heading>
      </Stack>
      {show && (
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel textColor={"purple.600"}>Email address</FormLabel>
              <Input type="email" bg={"purple.50"} />
            </FormControl>
            <FormControl id="password">
              <FormLabel textColor={"purple.600"}>Password</FormLabel>
              <Input type="password" bg={"purple.50"} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox textColor={"purple.600"}>Remember me</Checkbox>
                <Link color={"purple.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"purple.400"}
                color={"white"}
                _hover={{
                  bg: "purple.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
