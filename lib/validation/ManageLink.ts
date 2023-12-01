import { z } from "zod";

const linkValidator = (
  value: z.infer<typeof BaseSchema>,
  ctx: z.RefinementCtx,
) => {
  if (value.hasExpiry && !value.expires) {
    ctx.addIssue({
      path: ["expires"],
      code: "custom",
      message: "Expires is required when hasExpiry is true",
    });
  }

  if (value.hasPassword && !value.password) {
    ctx.addIssue({
      path: ["password"],
      code: "custom",
      message: "Password is required when hasPassword is true",
    });
  }
};

const BaseSchema = z.object({
  dest: z.string().url().nonempty(),
  backHalf: z.string().nullable().default(null),
  title: z.string().nullish(),
  hasPassword: z.boolean().default(false),
  hasExpiry: z.boolean().default(false),
  password: z.string().nullish(),
  expires: z.string().nullish(),
  hasQRCode: z.boolean().default(false),
  QRCode: z.object({
    fgColor: z.string().min(4).max(9).regex(/^#/).nullish(),
    bgColor: z.string().min(4).max(9).regex(/^#/).nullish(),
    logo: z.string().nullish(),
  }).optional(),
});

const CreateLinkSchema = BaseSchema.superRefine(linkValidator);

const EditLinkBaseSchema = BaseSchema.extend({
  backHalf: z.string().nonempty(),
});

const EditLinkWithIdSchema = EditLinkBaseSchema.extend({
  id: z.string().nonempty(),
});

const EditLinkSchema = EditLinkBaseSchema.superRefine(linkValidator);

export { CreateLinkSchema, EditLinkSchema, EditLinkWithIdSchema };
export type CreateLinkSchemaType = z.infer<typeof CreateLinkSchema>;
export type EditLinkSchemaType = z.infer<typeof EditLinkSchema>;
export type BaseManageLinkSchemaType = z.infer<typeof BaseSchema>;
