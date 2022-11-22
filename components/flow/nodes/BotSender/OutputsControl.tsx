import { v4 as uuidV4 } from "uuid";
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

import type {
  BotSenderProps,
  OutputControlAll,
  OutputDefault,
  OutputProps,
  TextOutputControlProps,
  OutputConf,
  OutputItemConf,
} from "./interfaces";

const outputs: { [key: string]: OutputItemConf } = {
  text: {
    caption: "Текстовое сообщение",
    icon: <FaRegComment />,
    control: (props: TextOutputControlProps) => <TextOutput {...props} />,
  },
  photo: {
    caption: "Фото",
    icon: <FaRegFileImage />,
    control: (props: any) => <div>Фото</div>,
  },
  video: {
    caption: "Видео",
    icon: <FaVideo />,
    control: (props: any) => <div>Видео</div>,
  },
  videoMessage: {
    caption: "Видео-сообщение",
    icon: <FaVideo />,
    control: (props: any) => <div>Видео-сообщение</div>,
  },
  audio: {
    caption: "Аудио",
    icon: <FaRegFileAudio />,
    control: (props: any) => <div>Аудио</div>,
  },
  file: {
    caption: "Файл",
    icon: <FaRegFile />,
    control: (props: any) => <div>Файл</div>,
  },
  document: {
    caption: "Документ из CRM",
    icon: <FaRegFileWord />,
    control: (props: any) => <div>Документ из CRM</div>,
  },
  timeout: {
    caption: "Таймаут",
    icon: <FaHourglassHalf />,
    control: (props: any) => <div>Таймаут</div>,
  },
};

function TextOutput({ onChange, output }: TextOutputControlProps) {
  return (
    <Textarea
      value={output.value}
      onChange={(ev) =>
        onChange && onChange({ ...output, value: ev.target.value })
      }
    />
  );
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

  const onChange = (props: OutputProps) => {
    const { nodeInternals } = store.getState();
    const oldNode = Array.from(nodeInternals.values()).find(
      (val) => val.id === id
    );

    let outputs: OutputProps[] = oldNode?.data?.outputs || [];
    outputs = outputs.map((output) =>
      output.id === props.id ? props : output
    );

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
                {outputs[output.type].control({ output, id, onChange })}
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
      <Wrap spacing="2" mt="2">
        {Object.keys(outputs).map((type) => (
          <WrapItem key={type}>
            <Button
              size="sm"
              colorScheme="blue"
              leftIcon={outputs[type].icon}
              onClick={() => addOutput(type)}
            >
              {outputs[type].caption}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  );
}
