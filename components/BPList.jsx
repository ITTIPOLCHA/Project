import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { FaTrash } from "react-icons/fa";
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
    if (confirm("Are you sure you wanna delete this BP?")) {
      deleteBP(id);
      toast({ title: "BP deleted successfully", status: "success" });
    }
  };

  const handleBPEdit = async (id, sys, dia, pul) => {
    await editBP({ docId: id, sys: sys, dia: dia, pulse: pul });
    toast({
      title: `BP updated successfully`,
      status: "success",
    });
  };

  return (
    <Box mt={4}>
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
              <Heading as="h3" fontSize={"xl"}>
                <Badge
                  color="red.500"
                  bg="inherit"
                  transition={"0.2s"}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.2)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleBPDelete(bp.id)}
                  colorScheme="red"
                >
                  <FaTrash />
                </Badge>
                <Text>SYS : {bp.sys}</Text>
                <Text>DIA : {bp.dia}</Text>
                <Text>PUL : {bp.pul}</Text>
                <Text>
                  Created At : {bp.createdAt.toDate().toLocaleString()}
                </Text>
              </Heading>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default BPList;
