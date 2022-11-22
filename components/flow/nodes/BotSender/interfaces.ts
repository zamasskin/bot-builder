export interface HandleItemProps {
  caption: string;
  color?: string;
  bg: string;
  id: string;
}

export interface BotSenderProps {
  id: string;
  data: BotSenderPropsData;
}

export interface BotSenderPropsData {
  label: string;
  outputs: OutputProps[];
}

export type OutputProps = OutputDefault;

export interface OutputDefault {
  id: string;
  type: string;
  value: string;
}

export interface ControlProps extends BotSenderProps {
  onClose(): void;
  isOpen: boolean;
}
