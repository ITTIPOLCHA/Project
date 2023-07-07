import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Text, Box, Input, Button, Stack, useToast } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { editBP } from "../api/bp";
import Link from "next/link";

const EditBP = () => {
  const [sys, setSYS] = useState("");
  const [dia, setDIA] = useState("");
  const [pul, setPUL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();
  const { docId } = router.query;

  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    const fetchBPData = async () => {
      try {
        const bpData = await getBPData(docId);
        setSYS(bpData.sys);
        setDIA(bpData.dia);
        setPUL(bpData.pul);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBPData();
  }, [docId]);

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

  const handleBPEdit = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to edit a BP",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    if (!sys || !dia || !pul) {
      toast({
        title: "Please enter SYS, DIA, and PUL values",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      await editBP({ docId, sys, dia, pulse: pul });
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);

    setSYS("");
    setDIA("");
    setPUL("");

    toast({
      title: "BP has been updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    router.push("/bp");
  };

  return (
    <Box w="90%" margin={"0 auto"} display="block" pt={5}>
      <Stack direction="column">
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Edit BP
        </Text>
        <Input
          placeholder="SYS: 90-140 mmHg"
          value={sys}
          onChange={handleICSYS}
          mb={2}
        />

        <Input
          placeholder="DIA: 60-90 mmHg"
          value={dia}
          onChange={handleICDIA}
          mb={2}
        />

        <Input
          placeholder="PUL: 60-100 per minute"
          value={pul}
          onChange={handleICPUL}
          mb={2}
        />

        <Button
          colorScheme="green"
          onClick={handleBPEdit}
          disabled={!sys || !dia || !pul || isLoading}
          variantColor="teal"
          variant="solid"
          mb={2}
        >
          Submit
        </Button>
        <Button colorScheme="red">
          <Link href="/bp">Back</Link>
        </Button>
      </Stack>
    </Box>
  );
};

export default EditBP;
