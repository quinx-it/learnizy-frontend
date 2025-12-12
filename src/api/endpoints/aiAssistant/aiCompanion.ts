import { api } from '@/api';

import {
  type IChat,
  type IMessage,
  type ISendMessageRequest,
  type IGetChatsApiResponse,
  type ICreateChatApiResponse,
  type IGetChatMessagesApiResponse,
  type IGetChatMessagesTransformedResponse,
} from './typings';

const AI_CHAT_URL = '/ai-companion/chats';

export const aiAssistantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<IChat[], void>({
      query: () => AI_CHAT_URL,
      transformResponse: (response: IGetChatsApiResponse) => {
        return response.userChatDtos.map((chat) => ({
          id: chat.chatId,
          title: chat.title,
          updatedAt: chat.updatedAt,
        }));
      },
    }),

    getChatMessages: builder.query<IGetChatMessagesTransformedResponse, number>({
      query: (chatId) => `${AI_CHAT_URL}/${chatId}/messages`,
      transformResponse: (response: IGetChatMessagesApiResponse) => {
        return {
          title: response.title,
          messages: response.messages,
        };
      },
    }),

    createChat: builder.mutation<ICreateChatApiResponse, void>({
      query: () => ({
        url: AI_CHAT_URL,
        method: 'POST',
      }),
    }),

    sendMessage: builder.mutation<IMessage, { chatId: number; data: ISendMessageRequest }>({
      query: ({ chatId, data }) => ({
        url: `${AI_CHAT_URL}/${chatId}/messages`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatMessagesQuery,
  useCreateChatMutation,
  useSendMessageMutation,
} = aiAssistantApi;
