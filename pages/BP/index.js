import React from "react";
import BPList from "../../components/BPList";
import { Container } from "@chakra-ui/react";
import Nav from "../../components/Nav";
import App from "../App";

export default function bp() {
  return (
    <Container maxW="7xl">
      <Nav />
      <BPList />
    </Container>
  );
}
