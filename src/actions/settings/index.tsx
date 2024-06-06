import { currentUser } from '@clerk/nextjs';
import { client } from '@/lib/prisma';

export const onIntegrateDomain = async (domain: string, icon: string) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const subscription = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    const domainExist = await client.user.findFirst({
      where: {
        clerkId: user.id,
        domains: {
          some: {
            name: domain,
          },
        },
      },
    });
    if (!domainExist) {
      if (
        (subscription?.subscription?.plan === 'STANDARD' &&
          subscription._count.domains < 1) ||
        (subscription?.subscription?.plan === 'PLUS' &&
          subscription._count.domains < 5) ||
        (subscription?.subscription?.plan === 'ULTIMATE' &&
          subscription._count.domains < 10)
      ) {
        const newDomain = await client.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            domains: {
              create: {
                name: domain,
                icon,
                chatBot: {
                  create: {
                    welcomeMessage: 'Hey, there, have a question? Ask me!',
                  },
                },
              },
            },
          },
        });
        if (newDomain) {
          return {
            status: 200,
            message: 'Domain added successfully',
          };
        }
      }
      return {
        status: 400,
        message: 'You have reached the maximum limit of domains',
      };
    }
    return {
      status: 400,
      message: 'Domain already exist',
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetSubscriptionPlan = async () => {
  try {
    const user = await currentUser();
    if (!user) return;
    const plan = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (plan) {
      return plan.subscription?.plan;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllAccountDomains = async () => {
  const user = await currentUser();
  if (!user) return;

  try {
    const domains = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return { ...domains };
  } catch (error) {
    console.log(error);
  }
};
