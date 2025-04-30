import {
  Container,
  useColorModeValue,
  useToast,
  VStack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

import { useProductStore } from "../../store/product.store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
// ! font sizes are not responsive.
const HomePage = () => {
  const { products, fetchProducts, isLoading } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products : ", products);
  return (
    <Container maxW={"container.xl"}>
      <VStack>
        <Text
          bgGradient="linear(to-r, cyan.400, blue.600)"
          bgClip="text"
          fontSize={{ base: 24, sm: 28, md: 32 }}
          fontWeight="extrabold"
          textAlign={"center"}
          mt={8}
        >
          Current Products
        </Text>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          width={"full"}
          spacing={10}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {!isLoading && products.length === 0 && (
          <Text fontWeight={"semibold"} fontSize={{ base: 14, sm: 16, md: 20 }}>
            No Products Found ☹️{" "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.600"}
                fontWeight={"semibold"}
                _hover={{ textDecoration: "underline" }}
              >
                create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
