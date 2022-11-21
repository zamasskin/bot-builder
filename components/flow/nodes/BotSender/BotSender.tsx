import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Button,
  Text,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Box,
  Divider,
  VStack,
  Flex,
  IconButton,
  Badge,
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { memo, useState } from "react";
import { CSS } from "@dnd-kit/utilities";

// Icons
import {
  FaPlus,
  FaRegComment,
  FaRegFileImage,
  FaVideo,
  FaRegFileAudio,
  FaRegFile,
  FaRegFileWord,
} from "react-icons/fa";

function AddItemBtn({
  icon,
  children,
}: {
  icon: React.ReactElement;
  children: React.ReactElement | string;
}) {
  return (
    <WrapItem>
      <Button size="sm" colorScheme="blue" leftIcon={icon}>
        {children}
      </Button>
    </WrapItem>
  );
}

function AddItemBtnWrap({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <Wrap spacing="2" mt="2">
      {children}
    </Wrap>
  );
}

function HandleItem(props: HandleItemProps) {
  const { id, caption, color = "black", bg } = props;
  return (
    <Box w="full" position="relative">
      <Handle type="source" position={Position.Right} id={id} />
      <Box mx="2" padding="2" boxShadow="xs" borderRadius="md" bg={bg}>
        <Text color={color}>{caption}</Text>
      </Box>
    </Box>
  );
}

function BotSender() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Handle type="target" position={Position.Top} />
      <Card bg="white" borderTopRadius="xl" onClick={onOpen}>
        <CardHeader
          bg="gray.100"
          borderTopRadius="xl"
          className="custom-drag-handle"
        >
          <Heading size="sm">Цепочка сообщений</Heading>
        </CardHeader>
        <VStack spacing="2" my="2">
          <HandleItem
            caption="Меню 1"
            color="white"
            bg="teal.400"
            id="menu-source-0"
          />
          <HandleItem
            caption="Меню 2"
            color="white"
            bg="teal.400"
            id="menu-source-1"
          />
        </VStack>
        <Divider />
        <VStack spacing="2" my="2">
          <HandleItem
            caption="Любая фраза"
            color="white"
            bg="gray.500"
            id="source-handle-0"
          />

          <HandleItem caption="Продолжить" bg="white" id="source-handle-1" />
        </VStack>
      </Card>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <VStack spacing="2">
              <Box w="full">
                <Heading as="div" size="sm">
                  Цепочка сообщений
                </Heading>
                <Flex align="center">
                  <Divider />
                  <Badge padding="2" borderRadius="full">
                    <FaPlus />
                  </Badge>
                  <Divider />
                </Flex>
                <AddItemBtnWrap>
                  <AddItemBtn icon={<FaRegComment />}>Текст</AddItemBtn>
                  <AddItemBtn icon={<FaRegFileImage />}>Фото</AddItemBtn>
                  <AddItemBtn icon={<FaVideo />}>Видео</AddItemBtn>
                  <AddItemBtn icon={<FaVideo />}>Видеосообщение</AddItemBtn>
                  <AddItemBtn icon={<FaRegFileAudio />}>Аудио</AddItemBtn>
                  <AddItemBtn icon={<FaRegFile />}>Файл</AddItemBtn>
                  <AddItemBtn icon={<FaRegFileWord />}>
                    Документ из CRM
                  </AddItemBtn>
                </AddItemBtnWrap>
              </Box>
              <Divider />
              <Box w="full">
                <Text>Some contents...</Text>
                <Text>Some contents...</Text>
              </Box>
            </VStack>

            <Text>Some contents...</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

interface HandleItemProps {
  caption: string;
  color?: string;
  bg: string;
  id: string;
}

export default memo(BotSender);
