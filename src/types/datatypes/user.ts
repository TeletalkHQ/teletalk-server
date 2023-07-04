import { Cellphone, FullName } from "utility-store/lib/types";

import { Id } from ".";

export type Bio = string;

export type ClientId = string;

export type FirstName = string;

export type LastName = string;

export type UserId = Id;

export type PhoneNumber = string;

export type IsActive = boolean;

export type VerificationCode = string;

export type NewUser = boolean;

export type Username = string;

export type ContactItemWithCellphone = Cellphone & FullName;
