import { Container } from "@chakra-ui/react";
import Nav from "../components/Nav";
import Signup from "../components/Signup";

export default function signup() {
  return (
    <Container maxW="7xl">
      <Nav />
      <Signup />
    </Container>
  );
}
