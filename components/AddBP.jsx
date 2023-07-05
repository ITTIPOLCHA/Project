import React from "react";
import {
  Box,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addBP } from "../api/bp";

const AddBP = () => {
  const [sys, setSYS] = React.useState("");
  const [dia, setDIA] = React.useState("");
  const [pul, setPUL] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  const { isLoggedIn, user } = useAuth();

  const handleICSYS = (e) => {
    const value = e.target.value;
    const numericValue = parseInt(value.replace(/\D/g, ""));
    setSYS(numericValue);
  };
  const handleICDIA = (e) => {
    const value = e.target.value;
    const numericValue = parseInt(value.replace(/\D/g, ""));
    setDIA(numericValue);
  };
  const handleICPUL = (e) => {
    const value = e.target.value;
    const numericValue = parseInt(value.replace(/\D/g, ""));
    setPUL(numericValue);
  };

  const handleBPCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create a BP",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    if (!sys) {
      toast({
        title: "You must be write a sys",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    } else if (!dia) {
      toast({
        title: "You must be write a dia",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    } else if (!pul) {
      toast({
        title: "You must be write a pul",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const bp = {
      sys,
      dia,
      pul,
      userId: user.uid,
    };
    try {
      await addBP(bp);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);

    setSYS("");
    setDIA("");
    setPUL("");

    toast({
      title: "BP created successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box w="40%" margin={"0 auto"} display="block" mt={5}>
      <Stack direction="column">
        <Input
          placeholder="SYS: 90-140 mmHg"
          value={sys}
          onChange={handleICSYS}
        />

        <Input
          placeholder="DIA: 60-90 mmHg"
          value={dia}
          onChange={handleICDIA}
        />

        <Input
          placeholder="PUL: 60-100 per minute"
          value={pul}
          onChange={handleICPUL}
        />

        <Button
          onClick={() => handleBPCreate()}
          disabled={!sys || !dia || !pul || isLoading}
          variantColor="teal"
          variant="solid"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddBP;
