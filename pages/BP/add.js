import React from "react";
import AddBP from "../../components/AddBP";
import Auth from "../../components/Auth";
import { Container } from "@chakra-ui/react";
import Nav from "../../components/Nav";

export default function Add() {
  return (
    <Container maxW="7xl">
      <Nav />
      <AddBP />
    </Container>
  );
}
