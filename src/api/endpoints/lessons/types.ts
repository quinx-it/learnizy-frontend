
export interface LessonProgress {
    theoryCompleted: boolean;
    voiceTaskCompleted: boolean;
    testTaskCompleted: boolean;
    testResult?: number;
}

export interface Lesson {
    id: number;
    title: string;
    description: string;
    sequenceOrder: number;
    contentBlocks: Block[]
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

export interface CommonProperties {
    color?: string;
    inline?: boolean;
    mb?: number;
}

export interface HeadingProperties extends CommonProperties {
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

type TextVariant =
    | 's' | 'm' | 'l'
    | 's-bold' | 'm-bold' | 'l-bold'
    | 's-italic' | 'm-italic' | 'l-italic'
    | 's-bold-italic' | 'm-bold-italic' | 'l-bold-italic'
export const getTextVariant = (
    size: 's' | 'm' | 'l',
    style?: 'bold' | 'italic' | 'underline' | 'bold italic'
): TextVariant => {
    switch (style) {
        case 'bold':
            return `${size}-bold` as TextVariant
        case 'italic':
            return `${size}-italic` as TextVariant
        case 'bold italic':
            return `${size}-bold-italic` as TextVariant
        default:
            return size as TextVariant
    }
}

export interface TextProperties extends CommonProperties {
    style?: 'bold' | 'italic' | 'underline' | 'bold italic';
    size?: 's' | 'm' | 'l';
}

export interface LinkProperties extends CommonProperties {
    url: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
}

export interface CodeProperties extends CommonProperties {
    language: string;
    lineNumbers?: boolean;
}

export interface ImageProperties extends CommonProperties {
    width: number;
    height: number;
    alt?: string;
    caption?: string;
}

interface BaseBlock {
    id: number;
    blockType: BlockType;
    content: string;
    properties: CommonProperties;
    children?: Block[];
}

interface HeadingBlock extends BaseBlock {
    blockType: BlockType.HEADING;
    properties: HeadingProperties;
}

interface TextBlock extends BaseBlock {
    blockType: BlockType.TEXT;
    properties: TextProperties;
}

interface LinkBlock extends BaseBlock {
    blockType: BlockType.LINK;
    properties: LinkProperties;
}

interface UlBlock extends BaseBlock {
    blockType: BlockType.UL;
}

interface LiBlock extends BaseBlock {
    blockType: BlockType.LI;
}

interface CodeBlock extends BaseBlock {
    blockType: BlockType.CODE;
    properties: CodeProperties;
}

interface ImageBlock extends BaseBlock {
    blockType: BlockType.IMAGE;
    properties: ImageProperties;
}

interface AdviceBlock extends BaseBlock {
    blockType: BlockType.ADVICE | BlockType.WARNING | BlockType.BOXED_TEXT;
    properties: CommonProperties;
}

export type Block =
    | HeadingBlock
    | TextBlock
    | LinkBlock
    | CodeBlock
    | ImageBlock
    | AdviceBlock
    | UlBlock
    | LiBlock;
