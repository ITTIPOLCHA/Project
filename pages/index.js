import { Container } from "@chakra-ui/react";
import AddBP from "../components/AddBP";
import Auth from "../components/Auth";
import BPList from "../components/BPList";
import Chart from "../components/chart";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <Container maxW="7xl">
      <Nav />
      <Auth />
      <BPList />
    </Container>
  );
}
