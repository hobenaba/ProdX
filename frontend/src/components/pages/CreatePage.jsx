import {
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../../store/product.store";

// ! check if responsive on other version.
const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();
  const toast = useToast();
  const handleCreateProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (success) {
      toast({
        title: "success",
        description: message,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      setNewProduct({ name: "", price: "", image: "" });
    } else
      toast({
        title: "error",
        description: message,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={4}>
        <Heading as={"h2"} fontSize={{ base: 24, sm: 28, md: 32 }}>
          Create New Product
        </Heading>
        <Box
          p={8}
          bg={useColorModeValue("white", "gray.800")}
          rounded={"lg"}
          shadow={"md"}
          w={"full"}
        >
          <VStack spacing={4}>
            <Input
              name="name"
              value={newProduct.name}
              placeholder="product name"
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            ></Input>
            <Input
              name="price"
              value={newProduct.price}
              placeholder="product price"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            ></Input>
            <Input
              name="image"
              value={newProduct.image}
              placeholder="product image"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            ></Input>
            <Button colorScheme="blue" w={"full"} onClick={handleCreateProduct}>
              add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
