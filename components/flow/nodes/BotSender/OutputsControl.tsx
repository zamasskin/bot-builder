import { v4 as uuidV4 } from "uuid";
import { MouseEventHandler } from "react";
import { useReactFlow, useStoreApi } from "reactflow";
import EmojiPicker from "emoji-picker-react";
import {
  Box,
  Button,
  CloseButton,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
  Heading,
  HStack,
  Divider,
  Badge,
} from "@chakra-ui/react";

// Icons
import {
  FaPlus,
  FaRegComment,
  FaRegFileImage,
  FaVideo,
  FaRegFileAudio,
  FaRegFile,
  FaRegFileWord,
  FaHourglassHalf,
} from "react-icons/fa";

import type { BotSenderProps, OutputProps } from "./interfaces";

function AddItemBtn({
  icon,
  children,
  onClick,
}: {
  icon: React.ReactElement;
  children: React.ReactElement | string;
  onClick?: MouseEventHandler | undefined;
}) {
  return (
    <WrapItem>
      <Button size="sm" colorScheme="blue" leftIcon={icon} onClick={onClick}>
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

function Output(props: OutputProps & { nodeId: string }) {
  const { nodeId, ...nodeProps } = props;
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = (props: OutputProps) => {
    const { nodeInternals } = store.getState();
    const oldNode = Array.from(nodeInternals.values()).find(
      (val) => val.id === nodeId
    );

    let outputs: OutputProps[] = oldNode?.data?.outputs || [];
    outputs = outputs.map((output) =>
      output.id === props.id ? props : output
    );

    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, outputs };
        }
        return node;
      })
    );
  };

  if (props.type === "text") {
    return (
      <Textarea
        onChange={(ev) => onChange({ ...nodeProps, value: ev.target.value })}
        value={props.value}
      />
    );
  }

  return <div>test</div>;
}

export default function OutputsControl({ id, data }: BotSenderProps) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const removeOutput = (outputId: string) => {
    const { nodeInternals } = store.getState();
    const oldNode = Array.from(nodeInternals.values()).find(
      (val) => val.id === id
    );

    let outputs: OutputProps[] = Array.from(oldNode?.data?.outputs || []);
    outputs = outputs.filter((output: OutputProps) => output.id !== outputId);

    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === id) {
          node.data = { ...node.data, outputs };
        }
        return node;
      })
    );
  };

  const addOutput = (type: string) => {
    const { nodeInternals } = store.getState();
    const oldNode = Array.from(nodeInternals.values()).find(
      (val) => val.id === id
    );

    let outputs: OutputProps[] = Array.from(oldNode?.data?.outputs || []);

    let output: OutputProps = { id: uuidV4(), type } as OutputProps;
    if (type === "text") {
      output = { ...output, value: "" };
    }

    outputs.push(output);

    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === id) {
          node.data = { ...node.data, outputs };
        }
        return node;
      })
    );
  };

  return (
    <VStack spacing="2" w="full" align="left">
      <Heading as="div" size="sm">
        Цепочка сообщений
      </Heading>
      {data.outputs &&
        data.outputs.map((output) => (
          <Box
            key={output.id}
            mx="2"
            // boxShadow="xs"
            borderRadius="md"
          >
            <CloseButton
              bg="red.300"
              color="white"
              size="sm"
              onClick={() => removeOutput(output.id)}
            />
            <Output nodeId={id} {...output} />
          </Box>
        ))}
      <HStack spacing="2">
        <Divider />
        <Badge padding="2" borderRadius="full">
          <FaPlus />
        </Badge>
        <Divider />
      </HStack>
      <AddItemBtnWrap>
        <AddItemBtn icon={<FaRegComment />} onClick={() => addOutput("text")}>
          Текст
        </AddItemBtn>
        <AddItemBtn icon={<FaRegFileImage />}>Фото</AddItemBtn>
        <AddItemBtn icon={<FaVideo />}>Видео</AddItemBtn>
        <AddItemBtn icon={<FaVideo />}>Видео-сообщение</AddItemBtn>
        <AddItemBtn icon={<FaRegFileAudio />}>Аудио</AddItemBtn>
        <AddItemBtn icon={<FaRegFile />}>Файл</AddItemBtn>
        <AddItemBtn icon={<FaRegFileWord />}>Документ из CRM</AddItemBtn>
        <AddItemBtn icon={<FaHourglassHalf />}>Таймаут</AddItemBtn>
      </AddItemBtnWrap>
    </VStack>
  );
}
