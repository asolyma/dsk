import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useRef } from "react";
import Jwt from "jsonwebtoken";

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
  useToast,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import router from "next/router";
import { getUserFromToken } from "../lib/auth";

const signin = gql`
  mutation signin($input: signinInput!) {
    signin(input: $input) {
      token
      user {
        id
        firstname
        lastname
        phonenumber
        email
        avatar
        role
      }
    }
  }
`;
export default function SignIn() {
  const toast = useToast();
  const [show, setShow] = useState(true);
  const [showError, SetShowError] = useState(false);
  const [signinMutation, { data, loading, error }] = useMutation(signin, {
    onError(error) {
      toast({
        title: error.name,
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
    onCompleted() {
      router.push("/");
    },
    update: (cache, { data: { signin } }) => {
      const j = cache.readQuery({
        query: gql`
          query query {
            me {
              id
              firstname
              lastname
              phonenumber
              email
              avatar
              role
            }
          }
        `,
      });
      cache.writeQuery({
        query: gql`
          query query {
            me {
              id
              firstname
              lastname
              phonenumber
              email
              avatar
              role
            }
          }
        `,
        data: { me: { ...signin.user } },
      });
    },
  });
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    signinMutation({
      variables: {
        input: {
          email: email.current?.value,
          password: password.current?.value,
        },
      },
    });
  };

  return (
    <Stack spacing={[2, 4, 6, 8]} mx={"auto"} maxW={"lg"} py={[6, 12]} px={6}>
      <Stack align={"center"}>
        <Heading
          fontSize={["xl", "3xl", "4xl", "6xl"]}
          fontFamily={"Caveat"}
          textColor={"white"}
          cursor={"pointer"}
        >
          Sign in to Dsk.
        </Heading>
      </Stack>
      (
      <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel textColor={"purple.600"}>Email address</FormLabel>
            <Input type="email" bg={"purple.50"} ref={email} />
          </FormControl>
          <FormControl id="password">
            <FormLabel textColor={"purple.600"}>Password</FormLabel>
            <Input type="password" bg={"purple.50"} ref={password} />
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
              onClick={handleSubmit}
              isLoading={loading}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
      )
    </Stack>
  );
}
