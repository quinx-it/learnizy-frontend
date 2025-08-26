export const constants = {
  breadcrumbs: (moduleSeqenceNumber: number, moduleId: string, lessonSequenceNumber: number) => [{ label: `Модуль ${moduleSeqenceNumber}`, href: `/learn/modules/${moduleId}` }, { label: `Урок ${lessonSequenceNumber + 1}`, href: '' }],
};

// import { Block, BlockType } from '@/api/endpoints/lessons/types';

// export const api: Block[] = [
//   {
//     id: 1,
//     blockType: BlockType.HEADING,
//     content: 'Главный заголовок',
//     properties: { level: 1, color: '#1F2937', mb: 16 },
//     children: [],
//   },
//   {
//     id: 3,
//     blockType: BlockType.TEXT,
//     content: 'Обычный параграф с разными стилями ',
//     properties: { size: 'l', mb: 12 },
//     children: [
//       {
//         id: 4,
//         blockType: BlockType.LINK,
//         content: 'Ссылка на Google',
//         properties: { url: 'https://google.com', color: '#2563EB', inline: true },
//       },
//     ],
//   },
//   {
//     id: 5,
//     blockType: BlockType.LINK,
//     content: 'Внешняя ссылка',
//     properties: { url: 'https://example.com', target: '_blank', color: '#D97706', mb: 12 },
//   },
//   {
//     id: 6,
//     blockType: BlockType.CODE,
//     content: 'console.log("Hello World");',
//     properties: { language: 'javascript', lineNumbers: true, mb: 12 },
//   },
//   {
//     id: 7,
//     blockType: BlockType.IMAGE,
//     content: '/images/astronaut4.webp',
//     properties: { width: 300, height: 200, caption: 'Подпись к изображению', mb: 12 },
//   },
//   {
//     id: 8,
//     blockType: BlockType.UL,
//     content: '',
//     properties: { mb: 12 },
//     children: [
//       { id: 9, blockType: BlockType.LI, content: 'Первый пункт списка', properties: { mb: 4 } },
//       {
//         id: 10,
//         blockType: BlockType.LI,
//         content: 'Второй пункт с вложенным текстом',
//         properties: { mb: 4 },
//         children: [
//           {
//             id: 11,
//             blockType: BlockType.TEXT,
//             content: 'Вложенный текст',
//             properties: { size: 's', color: '#9CA3AF' },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 12,
//     blockType: BlockType.ADVICE,
//     content: 'Совет:',
//     properties: { mb: 12 },
//     children: [
//       {
//         id: 13,
//         blockType: BlockType.TEXT,
//         content: 'Используйте семантические теги для структуры.',
//         properties: { size: 'm', mb: 12 },
//       },
//       {
//         id: 26,
//         blockType: BlockType.CODE,
//         content: 'console.log("Hello World");',
//         properties: { language: 'javascript', lineNumbers: true },
//       },
//     ],
//   },
//   {
//     id: 14,
//     blockType: BlockType.WARNING,
//     content: 'Внимание!',
//     properties: { mb: 12 },
//     children: [
//       {
//         id: 15,
//         blockType: BlockType.TEXT,
//         content: 'Не используйте var в современном JS.',
//         properties: { size: 'm', inline: true },
//       },
//       {
//         id: 16,
//         blockType: BlockType.TEXT,
//         content: ' let и const предпочтительнее.',
//         properties: { size: 'm', inline: true, color: '#B91C1C', style: 'italic' },
//       },
//     ],
//   },
//   {
//     id: 17,
//     blockType: BlockType.BOXED_TEXT,
//     content: 'Важно',
//     properties: { mb: 12 },
//     children: [
//       {
//         id: 18,
//         blockType: BlockType.TEXT,
//         content: 'Все блоки должны корректно отображаться.',
//         properties: { size: 'm' },
//       },
//       {
//         id: 19,
//         blockType: BlockType.LINK,
//         content: 'Документация React',
//         properties: { url: 'https://react.dev', target: '_blank', color: '#3B82F6' },
//       },
//     ],
//   },
//   {
//     id: 20,
//     blockType: BlockType.HEADING,
//     content: 'Список, вложенный в Heading',
//     properties: { level: 4, mb: 12 },
//     children: [
//       {
//         id: 21,
//         blockType: BlockType.UL,
//         content: '',
//         properties: { mb: 8 },
//         children: [
//           { id: 22, blockType: BlockType.LI, content: 'Пункт 1', properties: {} },
//           {
//             id: 23,
//             blockType: BlockType.LI,
//             content: 'Пункт 2 с вложенным списком',
//             properties: {},
//             children: [
//               {
//                 id: 24,
//                 blockType: BlockType.UL,
//                 content: '',
//                 properties: {},
//                 children: [
//                   { id: 25, blockType: BlockType.LI, content: 'Вложенный пункт', properties: {} },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];