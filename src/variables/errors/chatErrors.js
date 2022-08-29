const { errorBuilder } = require("@/classes/ErrorBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utils");

const { errorUniqueIds } = require("@/variables/errors/errorUniqueIds");
const { errorKeys } = require("@/variables/errors/errorKeys");

const {
  CHAT_ID_VALIDATION,
  CHAT_VALIDATION,
  CREATED_AT_VALIDATION,
  MESSAGE_ID_VALIDATION,
  MESSAGE_TEXT_VALIDATION,
  PARTICIPANT_ID_VALIDATION,
  SENDER_ID_VALIDATION,
  USER_VALIDATION,
} = errorKeys;

const CHAT_EXIST = errorBuilder
  .create()
  .errorCode(4000)
  .statusCode(400)
  .errorReason(errorUniqueIds.CHAT_EXIST)
  .version("1.0.0")
  .errorKey(CHAT_VALIDATION)
  .build();

const CHAT_NOT_EXIST = errorBuilder
  .create()
  .errorCode(4006)
  .statusCode(400)
  .errorReason(errorUniqueIds.CHAT_NOT_EXIST)
  .version("1.0.0")
  .errorKey(CHAT_VALIDATION)
  .build();

const CHAT_ID_EMPTY = errorBuilder
  .create()
  .errorCode(4001)
  .statusCode(400)
  .errorReason(errorUniqueIds.CHAT_ID_EMPTY)
  .version("1.0.0")
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_EXIST = errorBuilder
  .create()
  .errorCode(4001)
  .statusCode(400)
  .errorReason(errorUniqueIds.CHAT_ID_EXIST)
  .version("1.0.0")
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_INVALID = errorBuilder
  .create()
  .errorCode(4002)
  .statusCode(400)
  .errorReason(errorUniqueIds.CHAT_ID_INVALID)
  .version("1.0.0")
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4002)
  .statusCode(400)
  .errorReason(errorUniqueIds.CHAT_ID_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .errorCode(4003)
  .statusCode(400)
  .errorReason(errorUniqueIds.CHAT_ID_MAX_LENGTH_REACH)
  .version("1.0.0")
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .errorCode(4004)
  .statusCode(400)
  .errorReason(errorUniqueIds.CHAT_ID_MIN_LENGTH_REACH)
  .version("1.0.0")
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_REQUIRED = errorBuilder
  .create()
  .errorCode(4005)
  .statusCode(400)
  .errorReason(errorUniqueIds.CHAT_ID_REQUIRED)
  .version("1.0.0")
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CREATED_AT_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4007)
  .statusCode(400)
  .errorReason(errorUniqueIds.CREATED_AT_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(CREATED_AT_VALIDATION)
  .build();

const MESSAGE_ID_EXIST = errorBuilder
  .create()
  .errorCode(4008)
  .statusCode(400)
  .errorReason(errorUniqueIds.MESSAGE_ID_EXIST)
  .version("1.0.0")
  .errorKey(MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4009)
  .statusCode(400)
  .errorReason(errorUniqueIds.MESSAGE_ID_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .errorCode(4010)
  .statusCode(400)
  .errorReason(errorUniqueIds.MESSAGE_ID_MAX_LENGTH_REACH)
  .version("1.0.0")
  .errorKey(MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .errorCode(4011)
  .statusCode(400)
  .errorReason(errorUniqueIds.MESSAGE_ID_MIN_LENGTH_REACH)
  .version("1.0.0")
  .errorKey(MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_REQUIRED = errorBuilder
  .create()
  .errorCode(4012)
  .statusCode(400)
  .errorReason(errorUniqueIds.MESSAGE_ID_REQUIRED)
  .version("1.0.0")
  .errorKey(MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_TEXT_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4013)
  .statusCode(400)
  .errorReason(errorUniqueIds.MESSAGE_TEXT_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_EMPTY = errorBuilder
  .create()
  .errorCode(4013)
  .statusCode(400)
  .errorReason(errorUniqueIds.MESSAGE_TEXT_EMPTY)
  .version("1.0.0")
  .errorKey(MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_INVALID = errorBuilder
  .create()
  .errorCode(4013)
  .statusCode(400)
  .errorReason(errorUniqueIds.MESSAGE_TEXT_INVALID)
  .version("1.0.0")
  .errorKey(MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_MAX_LENGTH_REACH = errorBuilder
  .create()
  .errorCode(4014)
  .statusCode(400)
  .errorReason(errorUniqueIds.MESSAGE_TEXT_MAX_LENGTH_REACH)
  .version("1.0.0")
  .errorKey(MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_MIN_LENGTH_REACH = errorBuilder
  .create()
  .errorCode(4015)
  .statusCode(400)
  .errorReason(errorUniqueIds.MESSAGE_TEXT_MIN_LENGTH_REACH)
  .version("1.0.0")
  .errorKey(MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_REQUIRED = errorBuilder
  .create()
  .errorCode(4000)
  .statusCode(400)
  .errorReason(errorUniqueIds.MESSAGE_TEXT_REQUIRED)
  .version("1.0.0")
  .errorKey(MESSAGE_TEXT_VALIDATION)
  .build();

const PARTICIPANT_ID_EXIST = errorBuilder
  .create()
  .errorCode(4016)
  .statusCode(400)
  .errorReason(errorUniqueIds.PARTICIPANT_ID_EXIST)
  .version("1.0.0")
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_INVALID = errorBuilder
  .create()
  .errorCode(4017)
  .statusCode(400)
  .errorReason(errorUniqueIds.PARTICIPANT_ID_INVALID)
  .version("1.0.0")
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_EMPTY = errorBuilder
  .create()
  .errorCode(4076)
  .statusCode(400)
  .errorReason(errorUniqueIds.PARTICIPANT_EMPTY)
  .version("1.0.0")
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4017)
  .statusCode(400)
  .errorReason(errorUniqueIds.PARTICIPANT_ID_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .errorCode(4018)
  .statusCode(400)
  .errorReason(errorUniqueIds.PARTICIPANT_ID_MAX_LENGTH_REACH)
  .version("1.0.0")
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .errorCode(4019)
  .statusCode(400)
  .errorReason(errorUniqueIds.PARTICIPANT_ID_MIN_LENGTH_REACH)
  .version("1.0.0")
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_REQUIRED = errorBuilder
  .create()
  .errorCode(4020)
  .statusCode(400)
  .errorReason(errorUniqueIds.PARTICIPANT_ID_REQUIRED)
  .version("1.0.0")
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_NOT_EXIST = errorBuilder
  .create()
  .errorCode(4021)
  .statusCode(400)
  .errorReason(errorUniqueIds.PARTICIPANT_NOT_EXIST)
  .version("1.0.0")
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const SENDER_EMPTY = errorBuilder
  .create()
  .errorCode(4021)
  .statusCode(400)
  .errorReason(errorUniqueIds.SENDER_EMPTY)
  .version("1.0.0")
  .errorKey(SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_EXIST = errorBuilder
  .create()
  .errorCode(4021)
  .statusCode(400)
  .errorReason(errorUniqueIds.SENDER_ID_EXIST)
  .version("1.0.0")
  .errorKey(SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4021)
  .statusCode(400)
  .errorReason(errorUniqueIds.SENDER_ID_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .errorCode(4021)
  .statusCode(400)
  .errorReason(errorUniqueIds.SENDER_ID_MAX_LENGTH_REACH)
  .version("1.0.0")
  .errorKey(SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .errorCode(4021)
  .statusCode(400)
  .errorReason(errorUniqueIds.SENDER_ID_MIN_LENGTH_REACH)
  .version("1.0.0")
  .errorKey(SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_REQUIRED = errorBuilder
  .create()
  .errorCode(4021)
  .statusCode(400)
  .errorReason(errorUniqueIds.SENDER_ID_REQUIRED)
  .version("1.0.0")
  .errorKey(SENDER_ID_VALIDATION)
  .build();

const USER_NO_LONGER_PARTICIPANT = errorBuilder
  .create()
  .errorCode(4022)
  .statusCode(400)
  .errorReason(errorUniqueIds.USER_NO_LONGER_PARTICIPANT)
  .version("1.0.0")
  .errorKey(USER_VALIDATION)
  .build();

const errors = {
  CHAT_EXIST,
  CHAT_ID_EMPTY,
  CHAT_ID_EXIST,
  CHAT_ID_INVALID,
  CHAT_ID_INVALID_TYPE,
  CHAT_ID_MAX_LENGTH_REACH,
  CHAT_ID_MIN_LENGTH_REACH,
  CHAT_ID_REQUIRED,
  CHAT_NOT_EXIST,
  CREATED_AT_INVALID_TYPE,
  MESSAGE_ID_EXIST,
  MESSAGE_ID_INVALID_TYPE,
  MESSAGE_ID_MAX_LENGTH_REACH,
  MESSAGE_ID_MIN_LENGTH_REACH,
  MESSAGE_ID_REQUIRED,
  MESSAGE_TEXT_EMPTY,
  MESSAGE_TEXT_INVALID,
  MESSAGE_TEXT_INVALID_TYPE,
  MESSAGE_TEXT_MAX_LENGTH_REACH,
  MESSAGE_TEXT_MIN_LENGTH_REACH,
  MESSAGE_TEXT_REQUIRED,
  PARTICIPANT_EMPTY,
  PARTICIPANT_ID_EXIST,
  PARTICIPANT_ID_INVALID,
  PARTICIPANT_ID_INVALID_TYPE,
  PARTICIPANT_ID_MAX_LENGTH_REACH,
  PARTICIPANT_ID_MIN_LENGTH_REACH,
  PARTICIPANT_ID_REQUIRED,
  PARTICIPANT_NOT_EXIST,
  SENDER_EMPTY,
  SENDER_ID_EXIST,
  SENDER_ID_INVALID_TYPE,
  SENDER_ID_MAX_LENGTH_REACH,
  SENDER_ID_MIN_LENGTH_REACH,
  SENDER_ID_REQUIRED,
  USER_NO_LONGER_PARTICIPANT,
};

const chatErrors = {
  version: versionCalculator(extractVersions(errors)),
  ...errors,
};

module.exports = {
  chatErrors,
};
