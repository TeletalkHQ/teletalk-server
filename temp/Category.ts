import { model, Schema } from "mongoose";

const categorySchema: Schema = new Schema<CategoryInterface>({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  groups: { type: [Object] },
  icon: { type: String, required: false },
});
categorySchema.set("toJSON", {
  virtuals: true,
});
categorySchema.virtual("iconURL").get(function (this: ICategory) {
  return `${process.env.APP_URL}/contents/${this.icon}`;
});
