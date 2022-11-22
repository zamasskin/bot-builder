import {
  Heading,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Box,
  Divider,
  VStack,
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
import OutputsControl from "./OutputsControl";

import type { ControlProps } from "./interfaces";

// Icons
import { FaPlus } from "react-icons/fa";

export default function Control({ id, data, isOpen, onClose }: ControlProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          Настойка цепочки сообщений
        </DrawerHeader>
        <DrawerBody>
          <VStack spacing="5">
            <OutputsControl id={id} data={data} />
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
  );
}
