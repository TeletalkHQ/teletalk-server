import { attachCurrentUserId } from "@/websocket/middlewares/attachCurrentUserId";
import { attachClientId } from "@/websocket/middlewares/attachClientId";
import { auth } from "@/websocket/middlewares/auth";
import { cellphoneValidator } from "@/websocket/middlewares/cellphoneValidator";
import { checkCurrentUserStatus } from "@/websocket/middlewares/checkCurrentUserStatus";
import { checkDataFields } from "@/websocket/middlewares/checkDataFields";
import { checkEventAvailability } from "@/websocket/middlewares/checkEventAvailability";
import { selfStuffCheck } from "@/websocket/middlewares/selfStuffCheck";
import { checkClientIdExistence } from "@/websocket/middlewares/checkClientIdExistence";
import { verificationCodeValidator } from "@/websocket/middlewares/verificationCodeValidator";
import { verifyVerificationCode } from "@/websocket/middlewares/verifyVerificationCode";

const middlewares = {
  attachCurrentUserId,
  attachClientId,
  auth,
  cellphoneValidator,
  checkClientIdExistence,
  checkCurrentUserStatus,
  checkDataFields,
  checkEventAvailability,
  selfStuffCheck,
  verificationCodeValidator,
  verifyVerificationCode,
};

export { middlewares };
