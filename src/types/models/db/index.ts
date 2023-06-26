import { ProjectionType, QueryOptions } from "mongoose";

export type ServiceFunction<T, U, V> = (
  data: T,
  projection?: ProjectionType<U>,
  options?: QueryOptions
) => V;

export type * from "./privateChat";
export type * from "./user";
