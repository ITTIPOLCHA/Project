import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
  IconButton,
  Link,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { EditIcon, FaTrash, FaPlus } from "react-icons/fa";
import { getBPs, deleteBP, editBP } from "../api/bp";

const BPList = () => {
  const [bps, setBPs] = React.useState([]);

  const { user } = useAuth();
  const toast = useToast();

  const refreshData = () => {
    getBPs(user, setBPs);
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleBPDelete = async (id) => {
    if (confirm("Are you sure you want to delete this BP?")) {
      deleteBP(id);
      toast({ title: "BP deleted successfully", status: "success" });
    }
  };

  const handleBPEdit = async (bp) => {
    await editBP({
      docId: bp.id,
      sys: bp.sys,
      dia: bp.dia,
      pulse: bp.pul,
    });
    toast({
      title: "BP updated successfully",
      status: "success",
    });
  };

  return (
    <Box mt={3}>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={5}>
        {bps &&
          bps.map((bp) => (
            <Box
              key={bp.id}
              p={4}
              boxShadow="xl"
              shadow={"dark-lg"}
              transition="0.2s"
              _hover={{ boxShadow: "sm" }}
            >
              <Heading as="h2" fontSize={"xl"}>
                <Badge bg="inherit" transition="0.2s" float="right">
                  <IconButton
                    aria-label="Delete"
                    icon={<FaTrash style={{ transform: "scale(1.3)" }} />}
                    variant="ghost"
                    onClick={() => handleBPDelete(bp.id)}
                    size="xs"
                    colorScheme="red"
                  />
                </Badge>
                <Text>SYS: {bp.sys}</Text>
                <Text>DIA: {bp.dia}</Text>
                <Text>PUL: {bp.pul}</Text>
                <Text>
                  Created At: {bp.createdAt.toDate().toLocaleString()}
                </Text>
              </Heading>
            </Box>
          ))}
        <Box position="fixed" bottom={5} right={5}>
          <Link
            href="/bp/add"
            passHref
            display="flex"
            alignItems="center"
            p={4}
            borderRadius="full"
            bg="green.500"
            color="white"
            _hover={{ bg: "green.600" }}
          >
            <FaPlus />
          </Link>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default BPList;
