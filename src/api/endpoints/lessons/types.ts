export interface ILessonProgress {
  theoryCompleted: boolean;
  voiceTaskCompleted: boolean;
  testTaskCompleted: boolean;
  testResult?: number;
}

export enum LessonStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  BLOCKED = 'BLOCKED',
}

export interface ILesson {
  id: number;
  title: string;
  description: string;
  sequenceOrder: number;
  testQuestions: number;
  moduleSequenceOrder: number;
  status: LessonStatus;
  progress: ILessonProgress;
  content: string;
  contentBlocks: Block[];
}

export enum BlockType {
  HEADING = 'HEADING',
  TEXT = 'TEXT',
  LINK = 'LINK',
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  UL = 'UNORDERED_LIST',
  LI = 'LIST_ITEM',
  ADVICE = 'ADVICE',
  WARNING = 'WARNING',
  BOXED_TEXT = 'BOXED_TEXT',
}

export interface ICommonProperties {
  color?: string;
  inline?: boolean;
  mb?: number;
}

export interface IHeadingProperties extends ICommonProperties {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export const headingVariants: Record<number, 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'> = {
  1: '6xl',
  2: '5xl',
  3: '4xl',
  4: '3xl',
  5: '2xl',
  6: 'xl',
};
export const headingTags: Record<number, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

type TextVariantType =
  | 's'
  | 'm'
  | 'l'
  | 's-bold'
  | 'm-bold'
  | 'l-bold'
  | 's-italic'
  | 'm-italic'
  | 'l-italic'
  | 's-bold-italic'
  | 'm-bold-italic'
  | 'l-bold-italic';
export const getTextVariant = (
  size: 's' | 'm' | 'l',
  style?: 'bold' | 'italic' | 'underline' | 'bold italic',
): TextVariantType => {
  switch (style) {
    case 'bold':
      return `${size}-bold` as TextVariantType;
    case 'italic':
      return `${size}-italic` as TextVariantType;
    case 'bold italic':
      return `${size}-bold-italic` as TextVariantType;
    default:
      return size as TextVariantType;
  }
};

export interface ITextProperties extends ICommonProperties {
  style?: 'bold' | 'italic' | 'underline' | 'bold italic';
  size?: 's' | 'm' | 'l';
}

export interface ILinkProperties extends ICommonProperties {
  url: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export interface ICodeProperties extends ICommonProperties {
  language: string;
  lineNumbers?: boolean;
}

export interface ImageProperties extends ICommonProperties {
  width: number;
  height: number;
  alt?: string;
  caption?: string;
}

interface IBaseBlock {
  id: number;
  blockType: BlockType;
  content: string;
  properties: ICommonProperties;
  children?: Block[];
}

interface IHeadingBlock extends IBaseBlock {
  blockType: BlockType.HEADING;
  properties: IHeadingProperties;
}

interface ITextBlock extends IBaseBlock {
  blockType: BlockType.TEXT;
  properties: ITextProperties;
}

interface ILinkBlock extends IBaseBlock {
  blockType: BlockType.LINK;
  properties: ILinkProperties;
}

interface IUlBlock extends IBaseBlock {
  blockType: BlockType.UL;
}

interface ILiBlock extends IBaseBlock {
  blockType: BlockType.LI;
}

interface ICodeBlock extends IBaseBlock {
  blockType: BlockType.CODE;
  properties: ICodeProperties;
}

interface IImageBlock extends IBaseBlock {
  blockType: BlockType.IMAGE;
  properties: ImageProperties;
}

interface IAdviceBlock extends IBaseBlock {
  blockType: BlockType.ADVICE | BlockType.WARNING | BlockType.BOXED_TEXT;
  properties: ICommonProperties;
}

export type Block =
  | IHeadingBlock
  | ITextBlock
  | ILinkBlock
  | ICodeBlock
  | IImageBlock
  | IAdviceBlock
  | IUlBlock
  | ILiBlock;
