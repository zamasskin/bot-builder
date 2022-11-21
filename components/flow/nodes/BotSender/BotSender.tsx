import {
  Card,
  CardHeader,
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
  Badge,
  HStack,
  Wrap,
  WrapItem,
  DrawerCloseButton,
  Select,
  Textarea,
  FormLabel,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Input,
  Center,
} from "@chakra-ui/react";
import { Handle, Position, useReactFlow, useStoreApi } from "reactflow";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { ChangeEventHandler, memo, useState } from "react";
import { CSS } from "@dnd-kit/utilities";

import EmojiPicker from "emoji-picker-react";

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

function BotSender({ id, data }: BotSenderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onRemoveItem = ({ outputId }: { outputId: string }) => {
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
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Настойка цепочки сообщений
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing="5">
              <VStack spacing="2" w="full" align="left">
                <Heading as="div" size="sm">
                  Цепочка сообщений
                </Heading>
                {data.outputs &&
                  data.outputs.map((output) => (
                    <Box
                      key={output.id}
                      mx="2"
                      padding="2"
                      boxShadow="xs"
                      borderRadius="md"
                    >
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
                  <AddItemBtn icon={<FaRegComment />}>Текст</AddItemBtn>
                  <AddItemBtn icon={<FaRegFileImage />}>Фото</AddItemBtn>
                  <AddItemBtn icon={<FaVideo />}>Видео</AddItemBtn>
                  <AddItemBtn icon={<FaVideo />}>Видеосообщение</AddItemBtn>
                  <AddItemBtn icon={<FaRegFileAudio />}>Аудио</AddItemBtn>
                  <AddItemBtn icon={<FaRegFile />}>Файл</AddItemBtn>
                  <AddItemBtn icon={<FaRegFileWord />}>
                    Документ из CRM
                  </AddItemBtn>
                  <AddItemBtn icon={<FaHourglassHalf />}>Таймаут</AddItemBtn>
                </AddItemBtnWrap>
              </VStack>
              <Divider />
              <VStack spacing="4" w="full" align="left">
                <Heading as="div" size="sm">
                  Валидация
                </Heading>
                <Select>
                  <option value="">Нет</option>
                  <option value="text">Текст</option>
                  <option value="number">Цифры</option>
                  <option value="symbol">Буквы</option>
                  <option value="symbolAndNumber">Буквы и цифры</option>
                  <option value="range">Диапазон чисел</option>
                  <option value="date">Дата и время</option>
                  <option value="phone">Номер телефона</option>
                  <option value="email">Email</option>
                  <option value="url">URL</option>
                  <option value="image">Картинка</option>
                  <option value="audio">Аудио</option>
                  <option value="video">Видео</option>
                  <option value="file">Файл</option>
                  <option value="regex">Регулярное выражение</option>
                </Select>
                <FormControl>
                  <FormLabel>Сообщение об ошибке валидации</FormLabel>
                  <Textarea placeholder="Оставьте пустым для отправки системного сообщения об ошибке"></Textarea>
                </FormControl>
              </VStack>
              <Divider />
              <VStack spacing="4" w="full" align="left">
                <Heading as="div" size="sm">
                  Меню
                </Heading>
                <Box>
                  <InputGroup>
                    <InputLeftAddon>...</InputLeftAddon>
                    <Input type="tel" isDisabled value="Любая фраза" />
                  </InputGroup>
                </Box>
                <Center>
                  <Button size="sm" colorScheme="blue" leftIcon={<FaPlus />}>
                    Добавить еще
                  </Button>
                </Center>
              </VStack>
            </VStack>
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

interface BotSenderProps {
  id: string;
  data: BotSenderPropsData;
}

interface BotSenderPropsData {
  label: string;
  outputs: OutputProps[];
}

type OutputProps = OutputDefault;

interface OutputDefault {
  id: string;
  type: string;
  value: string;
}

export default memo(BotSender);
