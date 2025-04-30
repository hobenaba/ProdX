import { Container, HStack, Text, Flex, useColorMode } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { MoonIcon, PlusSquareIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"container.xl"} px={8}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Link to="/">
          <Text
            bgGradient="linear(to-r, cyan.400, blue.600)"
            bgClip="text"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="extrabold"
          >
            ProdX
          </Text>
        </Link>
        <HStack spacing={4}>
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
          <Link to="/create">
            <IconButton icon={<PlusSquareIcon />} />
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
