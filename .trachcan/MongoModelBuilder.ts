import { NativeModel } from "@/types";

const userSchema = new Schema<IUserDoc, IUserModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
    validate: {
      validator: (value: string) => /^[a-zA-Z ]+$/.test(value),
      message: "Invalid name format",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: (value: string) => /^\S+@\S+\.\S+$/.test(value),
      message: "Invalid email format",
    },
  },
});

const user = new UserModel({
  name: true,
  email: "ss",
  ss: "ss",
});

export { IUser, IUserDoc, IUserModel, UserModel };
// 1. Create an interface representing a document in MongoDB.

// 3. Create a Model.cost
// const User = model<IUser>("User", userSchema);

// const user: HydratedDocument<IUser> = new User(
//   {
//     email: "bill@initech.com",
//     avatar: "https://i.imgur.com/dM7Thhn.png",
//     // name: true,
//   },
//   undefined,
//   { timestamps: true }
// );

// user.name;

run().catch((err) => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect("mongodb://127.0.0.1:27017/test");

  const user = new User({
    name: "Bill",
    email: "bill@initech.com",
    avatar: "https://i.imgur.com/dM7Thhn.png",
  });
  await user.save();

  console.log(user.email); // 'bill@initech.com'
}

class MongoModelBuilder {
  model: NativeModel;
  mongoModel: Schema;

  private updateProperty(modelKey, mongoModelKey) {
    this.setValue(modelKey, mongoModelKey);
    this.setMessage(modelKey, mongoModelKey);
  }
  private updatePropertyWithoutMessage(modelKey, mongoModelKey) {
    this.setValue(modelKey, mongoModelKey);
  }
  private setValue(modelKey, mongoModelKey) {
    this.mongoModel[mongoModelKey || modelKey].push(this.model[modelKey].value);
  }
  private setMessage(modelKey, mongoModelKey) {
    this.mongoModel[mongoModelKey || modelKey].push(
      this.model[modelKey].error?.reason
    );
  }

  setModel(model) {
    this.model = model;
    return this;
  }

  defaultValue() {
    this.updatePropertyWithoutMessage("defaultValue", "default");
    return this;
  }
  empty() {
    this.updatePropertyWithoutMessage("empty");
    return this;
  }
  // lowercase() {
  //   this.#updateProperty("lowercase");
  //   return this;
  // }
  maxlength() {
    this.updateProperty("maxlength");
    return this;
  }
  minlength() {
    this.updateProperty("minlength");
    return this;
  }
  required() {
    this.updateProperty("required");
    return this;
  }
  trim() {
    this.updatePropertyWithoutMessage("trim");
    return this;
  }
  type() {
    this.updatePropertyWithoutMessage("type");
    return this;
  }
  unique() {
    this.updateProperty("unique");
    return this;
  }
  items(items) {
    this.mongoModel.items.push(items);
    return this;
  }

  build() {
    return Object.entries(this.mongoModel).reduce((prevValue, [key, value]) => {
      if (value.length) prevValue[key] = value.length > 1 ? value : value[0];
      return prevValue;
    }, {});
  }
}

const mongoModelBuilder = { create: () => new MongoModelBuilder() };

export { mongoModelBuilder, MongoModelBuilder };
