export type FieldType =
  | "array"
  | "boolean"
  | "date"
  | "number"
  | "object"
  | "string";

export interface NativeModel {
  defaultValue: any;
  empty: boolean;
  items: any[];
  length: number;
  maxLength: number;
  minLength: number;
  numeric: boolean;
  required: boolean;
  trim: boolean;
  type: FieldType;
  unique: boolean;
}

export type NativeModelKey = keyof NativeModel;

export type ModelPicker<T extends NativeModelKey> = Pick<
  NativeModel,
  Extract<NativeModelKey, T>
>;

export interface Bio extends NativeModel {
  type: "string";
  maxLength: 255;
  minLength: 0;
  required: true;
  defaultValue: "";
  trim: true;
  empty: true;
}

export interface Blacklist extends NativeModel {
  type: "array";
  required: true;
  empty: true;
}

export interface Contacts extends NativeModel {
  type: "array";
  required: true;
  empty: true;
}

export interface CountryCode extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 1;
  maxLength: 4;
  numeric: true;
  trim: true;
}

export interface CountryName extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 2;
  maxLength: 50;
  trim: true;
}

export interface FirstName extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 2;
  maxLength: 18;
  trim: true;
}

export interface IsActive extends NativeModel {
  type: "boolean";
  required: true;
  defaultValue: false;
}

export interface LastName extends NativeModel {
  type: "string";
  required: true;
  empty: true;
  minLength: 2;
  maxLength: 18;
  trim: true;
}

export interface MacAddress extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 12;
  maxLength: 16;
  trim: true;
  unique: true;
}

export interface PhoneNumber extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 10;
  maxLength: 14;
  numeric: true;
  unique: true;
}

export interface Clients extends NativeModel {
  type: "array";
  required: true;
  empty: true;
}

export interface Status extends NativeModel {
  type: "object";
  required: true;
  defaultValue: object;
}

export interface Username extends NativeModel {
  type: "string";
  required: true;
  empty: true;
  minLength: 0;
  maxLength: 12;
  unique: false;
  trim: true;
}

export interface VerificationCode extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  length: 6;
  numeric: true;
  trim: true;
}

export interface ChatId {
  type: "string";
  required: true;
  empty: false;
  minLength: 30;
  maxLength: 35;
  trim: true;
  unique: true;
}

export interface ClientId {
  type: "string";
  empty: false;
  required: true;
  minLength: 100;
  maxLength: 500;
  unique: true;
  trim: true;
}

export interface CreatedAt {
  type: "number";
  required: true;
  empty: false;
}

export interface MessageId {
  type: "string";
  required: true;
  empty: false;
  maxLength: 45;
  minLength: 40;
  trim: true;
  unique: true;
}

export interface Id {
  type: "string";
  required: true;
  empty: false;
  minLength: 30;
  maxLength: 35;
  trim: true;
  unique: true;
}

export type UserId = Id;

export interface Messages {
  type: "array";
  required: true;
  empty: true;
}

export interface MessageText {
  type: "string";
  required: true;
  empty: false;
  minLength: 1;
  maxLength: 1000;
  trim: true;
}

export interface Participants {
  type: "array";
  required: true;
  length: 2;
  empty: false;
}

export interface PrivateChats {
  type: "array";
  required: true;
}

export interface NativeModelCollection {
  bio: Bio;
  blacklist: Blacklist;
  chatId: ChatId;
  clientId: ClientId;
  clients: Clients;
  contacts: Contacts;
  countryCode: CountryCode;
  countryName: CountryName;
  createdAt: CreatedAt;
  firstName: FirstName;
  id: Id;
  isActive: IsActive;
  lastName: LastName;
  macAddress: MacAddress;
  messageId: MessageId;
  messages: Messages;
  messageText: MessageText;
  participantId: UserId;
  participants: Participants;
  phoneNumber: PhoneNumber;
  privateChats: PrivateChats;
  senderId: UserId;
  status: Status;
  userId: UserId;
  username: Username;
  verificationCode: VerificationCode;
}
