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

export interface TextOutputControlProps {
  output: OutputDefault;
  id: string;
  onChange?(props: OutputProps): void;
}

export type OutputControlAll = TextOutputControlProps;

export type OutputConf = { [key: string]: OutputItemConf };
export interface OutputItemConf {
  caption: string;
  icon: React.ReactElement;
  control(props: OutputControlAll): JSX.Element;
}
