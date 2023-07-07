import React from "react";
import MenuL from "./MenuL";
import { Button, useColorMode, Flex, Box } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

function Nav() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box pt={3}>
      <Flex
        justifyContent="flex-end"
        alignItems="flex-end"
        px={1}
        mx="auto"
        maxW="container.lg"
      >
        <Button onClick={() => toggleColorMode()} px={2} mr={2}>
          {colorMode === "dark" ? <FaSun /> : <FaMoon />}
        </Button>
        <MenuL />
      </Flex>
    </Box>
  );
}

export default Nav;
