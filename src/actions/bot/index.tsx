'use server';

import { client } from '@/lib/prisma';
import { extractEmailsFromString } from '@/lib/utils';
import { onRealTimeChat } from '../conversation';
import { clerkClient } from '@clerk/nextjs';
import { onMailer } from './mailer';
import OpenAi from 'openai';

const openai = new OpenAi(process.env.OPENAI_API_KEY);

export const onStoreConversations = async (
  id: string,
  role: 'assistant' | 'user',
  message: string,
) => {
  console.log(id, ': ', message);
  await client.chatRoom.update({
    where: {
      id,
    },
    data: {
      message: {
        create: {
          message,
          role,
        },
      },
    },
  });
};

export const onGetCurrentChatBot = async (id: string) => {
  try {
    const chatbot = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        helpdesk: true,
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
            icon: true,
            textColor: true,
            background: true,
            helpdesk: true,
          },
        },
      },
    });
    if (chatbot) {
      return chatbot;
    }
  } catch (error) {
    console.log(error);
  }
};

let customerEmail: string | undefined;

export const onAiChatBotAssistant = async (
  id: string,
  chat: { role: 'assistant' | 'user'; content: string }[],
  author: 'user',
  message: string,
) => {
  try {
    const chatBotDomain = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        filterQuestions: {
          where: {
            answered: null,
          },
          select: {
            question: true,
          },
        },
      },
    });
    if (chatBotDomain) {
      const extractedEmail = extractEmailsFromString(message);

      if (extractedEmail) {
        customerEmail = extractedEmail[0];
      }

      if (customerEmail) {
        const checkCustomer = await client.domain.findUnique({
          where: {
            id,
          },
          select: {
            User: {
              select: {
                clerkId: true,
              },
            },
            name: true,
            customer: {
              where: {
                email: {
                  startsWith: customerEmail,
                },
              },
              select: {
                id: true,
                email: true,
                questions: true,
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                    mailed: true,
                  },
                },
              },
            },
          },
        });
        if (checkCustomer && !checkCustomer.customer.length) {
          const newCustomer = await client.domain.update({
            where: {
              id,
            },
            data: {
              customer: {
                create: {
                  email: customerEmail,
                  questions: {
                    create: chatBotDomain.filterQuestions,
                  },
                  chatRoom: {
                    create: {},
                  },
                },
              },
            },
          });
          if (newCustomer) {
            console.log('New Customer Created');
            const response = {
              role: 'assistant',
              content: `Welcome aboard ${
                customerEmail.split('@')[0]
              }! I'm glad to connect with you. 
                Is there anything I can help you with?`,
            };
            return { response };
          }
        }
        if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id,
            author,
            message,
          );
        }
        //WIP: Setup realetime mode
        // onRealTimeChat(
        //   checkCustomer?.customer[0].chatRoom[0].id,
        //   message,
        //   'user',
        //   author,
        // );

        if (!checkCustomer?.customer[0].chatRoom[0].mailed) {
          const user = await clerkClient.users.getUser(
            checkCustomer?.User?.clerkId!,
          );

          onMailer(user.emailAddresses[0].emailAddress);

          const mailed = await client.chatRoom.update({
            where: {
              id: checkCustomer?.customer[0].chatRoom[0].id,
            },
            data: {
              mailed: true,
            },
          });

          if (mailed) {
            return {
              live: true,
              chatRoom: checkCustomer?.customer[0].chatRoom[0].id,
            };
          }
        }
        return {
          live: true,
          chatRoom: checkCustomer?.customer[0].chatRoom[0].id,
        };
      }
      await onStoreConversations(
        checkCustomer?.customer[0].chatRoom[0].id,
        author,
        message,
      );

      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: 'assistant',
            content: `
              You will get an array of questions that you must ask the customer. 
              
              Progress the conversation using those questions. 
              
              Whenever you ask a question from the array i need you to add a keyword at the end of the question (complete) this keyword is extremely important. 
              
              Do not forget it.

              only add this keyword when your asking a question from the array of questions. No other question satisfies this condition

              Always maintain character and stay respectfull.

              The array of questions : [${chatBotDomain.filterQuestions
                .map((questions) => questions.question)
                .join(', ')}]

              if the customer says something out of context or inapporpriate. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime) at the end.

              if the customer agrees to book an appointment send them this link http://localhost:3000/portal/${id}/appointment/${
              checkCustomer?.customer[0].id
            }

              if the customer wants to buy a product redirect them to the payment page http://localhost:3000/portal/${id}/payment/${
              checkCustomer?.customer[0].id
            }
          `,
          },
          ...chat,
          {
            role: 'user',
            content: message,
          },
        ],
        model: 'gpt-4o-mini-2024-07-18',
      });
    }
  } catch (error) {}
};
