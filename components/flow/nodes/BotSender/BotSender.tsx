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

function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>hello</div>
    </div>
  );
}

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

function BotSender() {
  const [items, setItems] = useState([1, 2, 3]);
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
          <Box w="full" position="relative">
            <Handle
              type="source"
              position={Position.Right}
              id="menu-source-0"
            />
            <Box
              mx="2"
              padding="2"
              boxShadow="xs"
              borderRadius="md"
              bg="teal.400"
            >
              <Text color="white">Меню 1</Text>
            </Box>
          </Box>

          <Box w="full" position="relative">
            <Handle
              type="source"
              position={Position.Right}
              id="menu-source-2"
            />
            <Box
              mx="2"
              padding="2"
              boxShadow="xs"
              borderRadius="md"
              bg="teal.400"
            >
              <Text color="white">Меню 2</Text>
            </Box>
          </Box>
        </VStack>
        <Divider />
        <VStack spacing="2" my="2">
          <Box w="full" pos="relative">
            <Handle
              type="source"
              position={Position.Right}
              id="source-handle-0"
            />
            <Box
              mx="2"
              padding="2"
              boxShadow="xs"
              borderRadius="md"
              bg="gray.500"
            >
              <Text color="white">Любая фраза</Text>
            </Box>
          </Box>
          <Box w="full" pos="relative">
            <Handle
              type="source"
              position={Position.Right}
              id="source-handle-1"
            />
            <Box mx="2" padding="2" boxShadow="xs" borderRadius="md">
              <Text>Продолжить</Text>
            </Box>
          </Box>
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

export default memo(BotSender);
