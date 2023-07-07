import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import {
  RepeatIcon,
  EditIcon,
  NotAllowedIcon,
  EmailIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { Link, Button, Text } from "@chakra-ui/react";
import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const MenuL = () => {
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        {isLoggedIn && (
          <>
            <MenuItem icon={<EmailIcon />}>
              <Text color="green.500">{user.email}</Text>
            </MenuItem>
            <MenuItem
              icon={<NotAllowedIcon />}
              colorScheme="teal"
              variant="outline"
              color="red.500"
              onClick={() => auth.signOut()}
              command="⌘L"
            >
              Logout
            </MenuItem>
          </>
        )}
        {!isLoggedIn && (
          <MenuItem
            icon={<FaGoogle />}
            onClick={() => handleAuth()}
            color="green.500"
          >
            Login with Google
          </MenuItem>
        )}
        <Link href="/bp">
          <MenuItem>Home</MenuItem>
        </Link>
        <Link href="/bp/add">
          <MenuItem>BP</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default MenuL;
