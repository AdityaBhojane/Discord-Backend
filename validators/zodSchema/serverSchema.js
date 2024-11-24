import { z } from 'zod';

export const createServerSchema = z.object({
  name: z.string().min(3).max(50)
});

export const addMemberToServerSchema = z.object({
  memberId: z.string()
});
export const addCategoryToServerSchema = z.object({
  category: z.string()
});
export const addChannelToServerSchema = z.object({
  channels: z.string()
});