export const commonModels = {
  createdAt: {
    empty: false,
    required: true,
    type: "number",
  },
  get id() {
    return {
      type: "string",
      required: true,
      empty: false,
      minLength: 30,
      maxLength: 35,
      trim: true,
      unique: true,
    } as const;
  },
  get userId() {
    return this.id;
  },
} as const;
