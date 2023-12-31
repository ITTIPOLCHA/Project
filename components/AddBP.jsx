import React from "react";
import { useRouter } from "next/router";
import {
  Text,
  Box,
  Input,
  Button,
  Stack,
  useToast,
  Link,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addBP } from "../api/bp";

const AddBP = () => {
  const [sys, setSYS] = React.useState("");
  const [dia, setDIA] = React.useState("");
  const [pul, setPUL] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();
  const router = useRouter();

  const { isLoggedIn, user } = useAuth();

  const handleInputChange = (e, setValue) => {
    const value = e.target.value;
    const numericValue = parseInt(value.replace(/\D/g, ""));
    setValue(numericValue);
  };

  const handleICSYS = (e) => {
    handleInputChange(e, setSYS);
  };

  const handleICDIA = (e) => {
    handleInputChange(e, setDIA);
  };

  const handleICPUL = (e) => {
    handleInputChange(e, setPUL);
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

    if (!sys || !dia || !pul) {
      toast({
        title: "กรุณาใส่ค่า SYS, DIA, และ PUL",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
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
      title: "BP ถูกสร้างเเล้ว",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    router.push("/bp");
  };

  const handleBack = async () => {
    router.push("/bp");
  };

  return (
    <Box w="90%" margin={"0 auto"} display="block" pt={5}>
      <Stack direction="column">
        <Text fontSize="2xl" fontWeight="bold" color="write">
          ADD BP
        </Text>
        <Input
          placeholder="SYS: 90-140 mmHg"
          value={sys}
          onChange={(e) => handleInputChange(e, setSYS)}
          mb={2}
        />

        <Input
          placeholder="DIA: 60-90 mmHg"
          value={dia}
          onChange={(e) => handleInputChange(e, setDIA)}
          mb={2}
        />

        <Input
          placeholder="PUL: 60-100 per minute"
          value={pul}
          onChange={(e) => handleInputChange(e, setPUL)}
          mb={2}
        />

        <Button
          colorScheme="green"
          onClick={handleBPCreate}
          disabled={!sys || !dia || !pul || isLoading}
          variantColor="teal"
          variant="solid"
          mb={2}
        >
          Submit
        </Button>
        <Button
          colorScheme="red"
          onClick={handleBack}
          variantColor="teal"
          variant="solid"
        >
          Back
        </Button>
      </Stack>
    </Box>
  );
};

export default AddBP;
