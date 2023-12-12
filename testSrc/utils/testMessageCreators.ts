import { EventName } from "teletalk-type-store";

import { errorStore } from "~/classes/ErrorStore";
import { ErrorReason } from "~/types";

import { MiddlewareName, ServiceName } from "@/types";

type Name = EventName | MiddlewareName | ServiceName | `fn${string}`;

type Block = "suite" | "test";
type Type = "e2e" | "unit";
type Status = "success" | "failure";
type Prefix = "event" | "middleware" | "service" | "function";

const createMessage = (
  block: Block,
  type: Type,
  status: Status,
  name: Name,
  prefix: Prefix,
  description = "not provided"
) => {
  return `${block}: [type:${type}] [status:${status}] [${prefix}:${name.replace(
    "fn",
    ""
  )}] [description:${description}]`;
};

const e2eSuccessDescribe = (name: Name, prefix: Prefix, description?: string) =>
  createMessage("suite", "e2e", "success", name, prefix, description);
const e2eFailDescribe = (name: Name, prefix: Prefix, description?: string) =>
  createMessage("suite", "e2e", "failure", name, prefix, description);

const unitSuccessDescribe = (
  name: Name,
  prefix: Prefix,
  description?: string
) => createMessage("suite", "unit", "success", name, prefix, description);
const unitFailDescribe = (name: Name, prefix: Prefix, description?: string) =>
  createMessage("suite", "unit", "failure", name, prefix, description);

const e2eSuccessTest = (name: Name, prefix: Prefix, description?: string) =>
  createMessage("test", "e2e", "success", name, prefix, description);
const e2eFailTest = (name: Name, prefix: Prefix, reason: ErrorReason) => {
  const e = errorStore.find(reason);
  return createMessage(
    "test",
    "e2e",
    "failure",
    name,
    prefix,
    `expected error reason is ${e.reason}`
  );
};

const unitSuccessTest = (name: Name, prefix: Prefix, description?: string) =>
  createMessage("test", "unit", "success", name, prefix, description);
const unitFailTest = (name: Name, prefix: Prefix, reason: ErrorReason) => {
  const e = errorStore.find(reason);
  return createMessage(
    "test",
    "unit",
    "failure",
    name,
    prefix,
    `expected error reason is ${e.reason}`
  );
};

export const createTestMessage = {
  e2eFailDescribe,
  e2eFailTest,
  e2eSuccessDescribe,
  e2eSuccessTest,
  unitFailDescribe,
  unitFailTest,
  unitSuccessDescribe,
  unitSuccessTest,
};
