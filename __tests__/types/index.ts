import { Requester } from "$/classes/Requester";
import { testVariablesManager } from "$/classes/TestVariablesManager";

type FailTestExecutor = (configuredRequester: Requester, data: object) => void;

type SuccessTestExecutorOptions =
  typeof testVariablesManager.successTestDefaultOptions;
interface SuccessTestExecuterArgs {
  equalValue?: any;
  testValue: any;
}
type SuccessTestExecutor = (
  data: SuccessTestExecuterArgs,
  options?: SuccessTestExecutorOptions
) => void;

interface RequesterOptions {
  shouldFilterRequestData: boolean;
}

export {
  type FailTestExecutor,
  type SuccessTestExecutor,
  type RequesterOptions,
  type SuccessTestExecutorOptions,
  type SuccessTestExecuterArgs,
};
