import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { FormEvent, useRef } from "react";
import { PhoneIcon } from "@chakra-ui/icons";
import { useQuery, gql, useMutation } from "@apollo/client";
import { User } from "@prisma/client";
import router from "next/router";
import { SignupInput } from "../graphql/graphqltypes";

const users = gql`
  query Query {
    users {
      avatar
    }
  }
`;
const signup = gql`
  mutation Mutation($input: signupInput!) {
    signup(input: $input) {
      token
      user {
        avatar
        email
        firstname
        lastname
        phonenumber
        role
      }
    }
  }
`;

export default function JoinOurTeam() {
  const size = useBreakpointValue({ base: "md", md: "lg" });
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const phonenumber = useRef<HTMLInputElement>(null);
  const avatar = useRef<HTMLInputElement>(null);
  const passwordCofirmation = useRef<HTMLInputElement>(null);

  const { data, loading, error } = useQuery<{ users: User[] }>(users);
  const toast = useToast();
  const [
    signupMutation,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(signup);
  return (
    <Box
      position={"relative"}
      bg={"purple.900"}
      height={"100vh"}
      alignItems={"center"}
      display={"flex"}
    >
      <Container
        as={SimpleGrid}
        maxW={"100vw"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 2, sm: 5, lg: 10 }}
      >
        <Stack
          spacing={{ base: 10, md: 20 }}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Stack
            direction={"row"}
            spacing={4}
            align={"center"}
            justifyContent={"center"}
            marginTop={"5"}
          >
            <AvatarGroup>
              {data?.users.map((user, i) => (
                <Avatar
                  key={i}
                  name={user?.firstname}
                  src={user?.avatar || ""}
                  size={size}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, yellow.400,pink.700)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text
              color={"pink.500"}
              fontFamily={"heading"}
              fontSize={{ base: "4xl", md: "6xl" }}
            >
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"purple.600"}
              color={"white"}
              rounded={"full"}
              width={useBreakpointValue({ base: "44px", md: "60px" })}
              height={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          height={"80vh"}
          overflowY={"scroll"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#b4547c6a",
              borderRadius: "24px",
            },
          }}
          color={"purple.300"}
          boxShadow={"dark-lg"}
          bg={"#fffffff"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"pink.500"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Join our team
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.100"} fontSize={{ base: "sm", sm: "md" }}>
              We’re looking for amazing engineers just like you! Become a part
              of our rockstar engineering team and skyrocket your career!
            </Text>
          </Stack>
          <Box
            as={"form"}
            mt={10}
            onSubmit={(e: FormEvent) => {
              e.preventDefault();

              const input = {
                firstname: firstname.current!.value,
                lastname: lastname.current!.value,
                email: email.current!.value,
                password: password.current!.value,
                phonenumber: phonenumber.current!.value,
                avatar: avatar.current?.value,
              };

              if (input.password != passwordCofirmation.current!.value) {
                toast({
                  title: "Error",
                  description: "Passwords Mismatch",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              } else {
                signupMutation({
                  variables: {
                    input: {
                      ...input,
                    },
                  },
                  onCompleted() {
                    toast({
                      title: "Account created.",
                      description: "We've created your account for you.",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                    router.push("/");
                  },
                });
              }
            }}
          >
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel id="firstnamelabel" htmlFor="first-name">
                  First name
                </FormLabel>
                <Input
                  id="first-name"
                  isRequired
                  ref={firstname}
                  placeholder="Travis"
                  bg={"#e9d8fd0a"}
                  border={0}
                  color={"purple.100"}
                  _placeholder={{
                    color: "pink.500",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel id="lastnamelabel" htmlFor="last-name">
                  Last name
                </FormLabel>

                <Input
                  id="last-name"
                  ref={lastname}
                  placeholder="lastname"
                  bg={"#e9d8fd0a"}
                  border={0}
                  color={"purple.100"}
                  _placeholder={{
                    color: "pink.500",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel id="emaillabel" htmlFor="email">
                  email
                </FormLabel>

                <Input
                  id="email"
                  ref={email}
                  type={"email"}
                  placeholder="firstname@lastname.io"
                  bg={"#e9d8fd0a"}
                  border={0}
                  color={"purple.100"}
                  _placeholder={{
                    color: "pink.500",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel id="passwordlabel" htmlFor="password">
                  password
                </FormLabel>

                <Input
                  id="password"
                  ref={password}
                  type={"password"}
                  placeholder="choose a password"
                  bg={"#e9d8fd0a"}
                  border={0}
                  color={"purple.100"}
                  _placeholder={{
                    color: "pink.500",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel id="Confirmpasswordlabel" htmlFor="Confirm-password">
                  Confirm
                </FormLabel>
                <Input
                  id="Confirm-password"
                  ref={passwordCofirmation}
                  type={"password"}
                  placeholder="re-enter your password"
                  bg={"#e9d8fd0a"}
                  border={0}
                  color={"purple.100"}
                  _placeholder={{
                    color: "pink.500",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel id="phonenumberlabel" htmlFor="phonenumber">
                  Phone Number
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <PhoneIcon color="pink.500" />
                  </InputLeftElement>
                  <Input
                    type={"tel"}
                    id="phonenumber"
                    ref={phonenumber}
                    placeholder="+1 (___) __-___-___"
                    bg={"#e9d8fd0a"}
                    border={0}
                    color={"purple.100"}
                    _placeholder={{
                      color: "pink.500",
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="avarat label" htmlFor="avatar">
                  Avatar
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CgProfile color="pink" />
                  </InputLeftElement>
                  <Input
                    type={"url"}
                    id="avatar"
                    ref={avatar}
                    placeholder={"http://youravatar.png"}
                    bg={"#e9d8fd0a"}
                    border={0}
                    color={"purple.100"}
                    _placeholder={{
                      color: "pink.500",
                    }}
                  />
                </InputGroup>
              </FormControl>
              <Button
                fontFamily={"heading"}
                bg={"#e9d8fd0a"}
                color={"pink.400"}
              >
                Upload CV
              </Button>
            </Stack>
            <Button
              type="submit"
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              Submit
            </Button>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* <circle cx="71" cy="61" r="111" fill="#dd65f5" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#3391c7" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#5b4bec" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#487abb" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#0c304d" /> */}
    </Icon>
  );
};
