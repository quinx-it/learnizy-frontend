import { LightbulbIcon, NotificationIcon } from '@/shared/ui/icons';
import { Heading, Text } from '@/shared/ui/typography';
import React from 'react';

interface LessonItemPageProps {
  id: string;
}

const enum BlockType {
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  TEXT = 'TEXT',
  SMALL_TEXT = 'SMALL_TEXT',
  ITALIC_TEXT = 'ITALIC_TEXT',
  BOXED_TEXT = 'BOXED_TEXT',
  ADVICE = 'ADVICE',
  WARNING = 'WARNING',
  CODE = 'CODE',
}

interface ContentBlock {
  id: number;
  blockType: BlockType;
  content?: string;
  contentBlocks?: ContentBlock[];
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  sequanceOrder: number;
  contentBlocks: ContentBlock[];
}

const RenderBlock: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.blockType) {
    case BlockType.H1:
      return (
        <Heading variant="6xl" tag="h1" className='mb-2'>
          {block.content}
        </Heading>
      );
    case BlockType.H2:
      return (
        <Heading variant="4xl" tag="h2" className='mb-2'>
          {block.content}
        </Heading>
      );
    case BlockType.H3:
      return (
        <Heading variant="2xl" tag="h3" className='mb-2'>
          {block.content}
        </Heading>
      );
    case BlockType.TEXT:
      return <Text variant="l" className='mb-8'>{block.content}</Text>;
    case BlockType.SMALL_TEXT:
      return <Text variant="m">{block.content}</Text>;
    case BlockType.ITALIC_TEXT:
      return (
        <Text variant="l">
          <i>{block.content}</i>
        </Text>
      );
    case BlockType.BOXED_TEXT:
      return <div className="border-gray rounded-2xl border p-4">{block.content}</div>;
    case BlockType.ADVICE:
      return (
        <div className="bg-soft p-4 rounded-2xl mb-8">
          {block.content && (
            <Heading variant="2xl" tag="h3" className="text-medium flex items-center gap-2">
              <LightbulbIcon />
              {block.content}
            </Heading>
          )}
          {block.contentBlocks?.map((child) => (
            <RenderBlock key={child.id} block={child} />
          ))}
        </div>
      );
    case BlockType.WARNING:
      return (
        <div className="bg-[#E644444D] p-4 rounded-2xl mb-8">
          {block.content && (
            <Heading variant="2xl" tag="h3" className="text-error flex items-center gap-2">
              <NotificationIcon status="warning" />
              {block.content}
            </Heading>
          )}
          {block.contentBlocks?.map((child) => (
            <RenderBlock key={child.id} block={child} />
          ))}
        </div>
      );
    case BlockType.CODE:
      return (
        <pre className="bg-light border-gray border p-4 rounded-2xl mb-8">
          <code>{block.content}</code>
        </pre>
      );
    default:
      return null;
  }
};

const api: Lesson = {
  id: 0,
  title: 'Основы Java: Переменные и типы данных',
  description:
    'В Java переменные используются для хранения данных, которые могут изменяться в процессе выполнения программы...',
  sequanceOrder: 1,
  contentBlocks: [
    {
      id: 1,
      blockType: BlockType.H1,
      content: 'Основы Java: Переменные и типы данных',
    },
    {
      id: 2,
      blockType: BlockType.TEXT,
      content:
        'В Java переменные используются для хранения данных, которые могут изменяться в процессе выполнения программы. Каждая переменная имеет тип данных...',
    },
    {
      id: 3,
      blockType: BlockType.H2,
      content: 'Объявление переменных',
    },
    {
      id: 4,
      blockType: BlockType.TEXT,
      content:
        'Чтобы объявить переменную в Java, необходимо указать её тип, имя и при желании — начальное значение.',
    },
    {
      id: 5,
      blockType: BlockType.CODE,
      content: 'int age = 25;\nString name = "Иван";',
    },
    {
      id: 6,
      blockType: BlockType.TEXT,
      content: 'В Java каждое объявление переменной должно заканчиваться точкой с запятой ;.',
    },
    {
      id: 7,
      blockType: BlockType.ADVICE,
      content: 'Совет',
      contentBlocks: [
        {
          id: 8,
          blockType: BlockType.TEXT,
          content: 'Если переменная не должна изменяться, используй ключевое слово final:',
        },
        {
          id: 9,
          blockType: BlockType.CODE,
          content: 'final double PI = 3.14159;',
        },
      ],
    },
    {
      id: 10,
      blockType: BlockType.H2,
      content: 'Примитивные типы данных',
    },
    {
      id: 11,
      blockType: BlockType.TEXT,
      content:
        'В Java существует 8 примитивных типов данных:\n• byte (8 бит) — маленькие целые числа\n• short (16 бит) — целые числа средней величины\n• int (32 бита) — стандартный целочисленный тип\n• long (64 бита) — большие целые числа\n• float (32 бита) — числа с плавающей точкой\n• double (64 бита) — более точные числа с плавающей точкой\n• char (16 бит) — символы Unicode\n• boolean — логические значения (true / false)',
    },
    {
      id: 12,
      blockType: BlockType.WARNING,
      content: 'Внимание',
      contentBlocks: [
        {
          id: 13,
          blockType: BlockType.TEXT,
          content:
            'Значения типов float и double могут быть неточными при вычислениях из-за особенностей хранения чисел с плавающей точкой.',
        },
      ],
    },
    {
      id: 14,
      blockType: BlockType.H3,
      content: 'Пример программы',
    },
    {
      id: 15,
      blockType: BlockType.TEXT,
      content: 'Ниже приведён пример программы, которая выводит имя и возраст пользователя.',
    },
    {
      id: 16,
      blockType: BlockType.CODE,
      content: `public class Main {
    public static void main(String[] args) {
        String name = "Иван";
        int age = 25;

        System.out.println("Имя: " + name);
        System.out.println("Возраст: " + age);
    }
}`,
    },
    {
      id: 17,
      blockType: BlockType.BOXED_TEXT,
      content:
        'Переменная — это именованная область памяти, в которой хранится значение, допустимое для изменения в ходе программы.',
    },
  ],
};

export const LessonItemPage: React.FC<LessonItemPageProps> = ({ id }) => {
  return (
    <div className='flex flex-col'>
      <h1>{id}</h1>
      {api.contentBlocks.map((block) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </div>
  );
};
