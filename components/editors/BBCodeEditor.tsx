import {
  Box,
  ButtonGroup,
  IconButton,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import type { TextareaProps } from "@chakra-ui/react";

// Icons
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { useRef } from "react";

export default function BBCodeEditor({
  onChange,
  ...props
}: BBCodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onBtnBBClick = (tag: string) => {
    if (textareaRef.current) {
      const selectionStart = textareaRef.current.selectionStart;
      const selectionEnd = textareaRef.current?.selectionEnd;
      const value = textareaRef.current?.value || "";

      const arText = [];
      arText.push(value.substring(0, selectionStart));
      arText.push("[", tag, "]");
      arText.push(value.substring(selectionStart, selectionEnd));
      arText.push("[/", tag, "]");
      arText.push(value.substring(selectionEnd));

      textareaRef.current.value = arText.join("");
      if (onChange) {
        onChange(arText.join(""));
      }
    }
  };

  return (
    <Box>
      <VStack spacing="1" align="start">
        <Textarea
          onChange={(ev) => onChange && onChange(ev.target.value)}
          ref={textareaRef}
          {...props}
        ></Textarea>
        <ButtonGroup size="sm" isAttached variant="outline">
          <IconButton
            aria-label="Жирный"
            icon={<FaBold />}
            onClick={() => onBtnBBClick("b")}
          />
          <IconButton
            aria-label="Курсив"
            icon={<FaItalic />}
            onClick={() => onBtnBBClick("i")}
          />
          <IconButton
            aria-label="Подчеркнутый"
            icon={<FaUnderline />}
            onClick={() => onBtnBBClick("u")}
          />
        </ButtonGroup>
      </VStack>
    </Box>
  );
}

export type BBCodeEditorProps = Omit<TextareaProps, "onChange"> & {
  onChange?: (value: string) => void;
};
