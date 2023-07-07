import React from "react";
import EditBP from "../../components/EditBP";
import { Container } from "@chakra-ui/react";
import Nav from "../../components/Nav";

export default function Add() {
  return (
    <Container maxW="7xl">
      <Nav />
      <EditBP />
    </Container>
  );
}
