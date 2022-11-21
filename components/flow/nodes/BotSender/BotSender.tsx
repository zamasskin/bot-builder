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
} from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { memo, useState } from "react";
import { CSS } from "@dnd-kit/utilities";

// Icons
import { BsChat } from "react-icons/bs";

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
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <Text>Some contents...</Text>
            <Text>Some contents...</Text>
            <Text>Some contents...</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default memo(BotSender);
