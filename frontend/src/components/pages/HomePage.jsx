import {
  Button,
  Container,
  Input,
  useColorModeValue,
  useToast,
  VStack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

import { useProductStore } from "../../store/product.store";
import { useEffect } from "react";
// ! font sizes are not responsive.
const HomePage = () => {
  const { products, fetchProducts, isLoading } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) console.log("products : ", products);
  return (
    <Container>
      <VStack>
        <Text
          bgGradient="linear(to-r, cyan.400, blue.600)"
          bgClip="text"
          fontSize={30}
          fontWeight="extrabold"
          textAlign={"center"}
          mt={8}
        >
          Current Product
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}></SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;
