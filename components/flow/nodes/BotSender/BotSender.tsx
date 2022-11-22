import { memo } from "react";
import {
  Card,
  CardHeader,
  Heading,
  Text,
  useDisclosure,
  Box,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import Control from "./Control";

import type { BotSenderProps, HandleItemProps } from "./interfaces";

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

function BotSender({ id, data }: BotSenderProps) {
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
          <Heading size="sm">{data.label}</Heading>
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
      <Control id={id} data={data} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default memo(BotSender);
