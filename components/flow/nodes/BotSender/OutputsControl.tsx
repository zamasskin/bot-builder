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
  Card,
  CardHeader,
  CardBody,
  Flex,
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
  caption,
  onClick,
}: {
  icon: React.ReactElement;
  caption: string;
  onClick?: MouseEventHandler | undefined;
}) {
  return (
    <WrapItem>
      <Button size="sm" colorScheme="blue" leftIcon={icon} onClick={onClick}>
        {caption}
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

  const caption: { [key: string]: string } = {
    text: "Текстовое сообщение",
    photo: "Фото",
    video: "Видео",
    videoMessage: "Видео-сообщение",
    audio: "Аудио",
    file: "Файл",
    document: "Документ из CRM",
    timeout: "Таймаут",
  };

  return (
    <VStack spacing="2" w="full" align="left">
      <Heading as="div" size="sm">
        Цепочка сообщений
      </Heading>
      {data.outputs &&
        data.outputs.map((output) => (
          <Box key={output.id}>
            <Card>
              <CardHeader padding="3">
                <Flex>
                  <Flex flex="1">
                    <Heading as="h3" size="xs">
                      {caption[output.type]}
                    </Heading>
                  </Flex>
                  <CloseButton
                    bg="red.300"
                    color="white"
                    size="sm"
                    onClick={() => removeOutput(output.id)}
                  />
                </Flex>
              </CardHeader>
              <CardBody padding="2">
                <Output nodeId={id} {...output} />
              </CardBody>
            </Card>
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
        <AddItemBtn
          icon={<FaRegComment />}
          onClick={() => addOutput("text")}
          caption={caption["text"]}
        />

        <AddItemBtn
          icon={<FaRegFileImage />}
          onClick={() => addOutput("photo")}
          caption={caption["photo"]}
        />

        <AddItemBtn
          icon={<FaVideo />}
          onClick={() => addOutput("video")}
          caption={caption["video"]}
        />

        <AddItemBtn
          icon={<FaVideo />}
          onClick={() => addOutput("videoMessage")}
          caption={caption["videoMessage"]}
        />
        <AddItemBtn
          icon={<FaRegFileAudio />}
          onClick={() => addOutput("audio")}
          caption={caption["audio"]}
        />

        <AddItemBtn
          icon={<FaRegFile />}
          onClick={() => addOutput("file")}
          caption={caption["file"]}
        />

        <AddItemBtn
          icon={<FaRegFileWord />}
          onClick={() => addOutput("document")}
          caption={caption["document"]}
        />

        <AddItemBtn
          icon={<FaHourglassHalf />}
          onClick={() => addOutput("timeout")}
          caption={caption["timeout"]}
        />
      </AddItemBtnWrap>
    </VStack>
  );
}
