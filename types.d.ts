import { Link as PrismaLink } from '@prisma/client';

export type PrismaLinkWithEngagements = {
  _count: {
    Engagement: number;
  };
} & PrismaLink;

export type { PrismaLink };