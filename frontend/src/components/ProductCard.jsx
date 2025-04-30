import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product.store";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const bg = useColorModeValue("white", "gray.800");
  const colorText = useColorModeValue("gray.600", "gray.200");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDeleteProduct = async () => {
    const { success, message } = await deleteProduct(product._id);

    if (success)
      toast({
        title: "success",
        description: message,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    else
      toast({
        title: "error",
        description: message,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
  };
  // update num is not working
  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(
      product._id,
      updatedProduct
    );

    if (success) {
      toast({
        title: "success",
        description: message,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      onClose();
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
    <Box shadow={"md"} bg={bg} rounded={"xl"} overflow={"hidden"}>
      <Image
        src={product.image}
        objectFit={"cover"}
        h={{ base: 40, sm: 52 }}
        w={"full"}
      />
      <Box p={4}>
        <Heading as={"h3"} mb={4} fontSize={{ base: 20, sm: 24, md: 28 }}>
          {product.name}
        </Heading>
        <Text
          mb={4}
          color={colorText}
          fontSize={{ base: 16, sm: 20, md: 24 }}
          fontWeight={"semibold"}
        >
          ${product.price}
        </Text>
        <HStack>
          <IconButton onClick={onOpen} icon={<EditIcon />} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={handleDeleteProduct}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                name="name"
                value={updatedProduct.name}
                placeholder="product name"
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              ></Input>
              <Input
                name="price"
                value={updatedProduct.price}
                placeholder="product price"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              ></Input>
              <Input
                name="image"
                value={updatedProduct.image}
                placeholder="product image"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              ></Input>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={4}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleUpdateProduct}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
