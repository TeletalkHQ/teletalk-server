const { errorGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,
  extractVersions,
  extractFromInfo,
} = require("@/functions/utilities/utilsNoDeps");

const CHAT_EXIST = errorGenerator(
  4000,
  400,
  "chat is already initialized",
  "CHAT_EXIST",
  "1.0.0"
);

const CHAT_ID_EXIST = errorGenerator(4001, 400, "", "CHAT_ID_EXIST", "1.0.0");

const CHAT_ID_INVALID_TYPE = errorGenerator(
  4002,
  400,
  "",
  "CHAT_ID_INVALID_TYPE",
  "1.0.0"
);

const CHAT_ID_MAX_LENGTH_REACH = errorGenerator(
  4003,
  400,
  "",
  "CHAT_ID_MAX_LENGTH_REACH",
  "1.0.0"
);

const CHAT_ID_MIN_LENGTH_REACH = errorGenerator(
  4004,
  400,
  "",
  "CHAT_ID_MIN_LENGTH_REACH",
  "1.0.0"
);

const CHAT_ID_REQUIRED = errorGenerator(
  4005,
  400,
  "",
  "CHAT_ID_REQUIRED",
  "1.0.0"
);

const CHAT_NOT_EXIST = errorGenerator(
  4006,
  400,
  "chat not exist, maybe deleted or something",
  "CHAT_NOT_EXIST",
  "1.0.0"
);

const CREATED_AT_INVALID_TYPE = errorGenerator(
  4007,
  400,
  "",
  "CREATED_AT_INVALID_TYPE",
  "1.0.0"
);

const MESSAGE_ID_EXIST = errorGenerator(
  4008,
  400,
  "",
  "MESSAGE_ID_EXIST",
  "1.0.0"
);

const MESSAGE_ID_INVALID_TYPE = errorGenerator(
  4009,
  400,
  "",
  "MESSAGE_ID_INVALID_TYPE",
  "1.0.0"
);

const MESSAGE_ID_MAX_LENGTH_REACH = errorGenerator(
  4010,
  400,
  "",
  "MESSAGE_ID_MAX_LENGTH_REACH",
  "1.0.0"
);

const MESSAGE_ID_MIN_LENGTH_REACH = errorGenerator(
  4011,
  400,
  "",
  "MESSAGE_ID_MIN_LENGTH_REACH",
  "1.0.0"
);

const MESSAGE_ID_REQUIRED = errorGenerator(
  4012,
  400,
  "",
  "MESSAGE_ID_REQUIRED",
  "1.0.0"
);

const MESSAGE_TEXT_INVALID_TYPE = errorGenerator(
  4013,
  400,
  "",
  "MESSAGE_TEXT_INVALID_TYPE",
  "1.0.0"
);

const MESSAGE_TEXT_MAX_LENGTH_REACH = errorGenerator(
  4014,
  400,
  "",
  "MESSAGE_TEXT_MAX_LENGTH_REACH",
  "1.0.0"
);

const MESSAGE_TEXT_MIN_LENGTH_REACH = errorGenerator(
  4015,
  400,
  "",
  "MESSAGE_TEXT_MIN_LENGTH_REACH",
  "1.0.0"
);

const MESSAGE_TEXT_REQUIRED = errorGenerator(
  4000,
  400,
  "message text is required",
  "MESSAGE_TEXT_REQUIRED",
  "1.0.0"
);

const PARTICIPANT_ID_EXIST = errorGenerator(
  4016,
  400,
  "",
  "PARTICIPANT_ID_EXIST",
  "1.0.0"
);

const PARTICIPANT_ID_INVALID_TYPE = errorGenerator(
  4017,
  400,
  "",
  "PARTICIPANT_ID_INVALID_TYPE",
  "1.0.0"
);

const PARTICIPANT_ID_MAX_LENGTH_REACH = errorGenerator(
  4018,
  400,
  "",
  "PARTICIPANT_ID_MAX_LENGTH_REACH",
  "1.0.0"
);

const PARTICIPANT_ID_MIN_LENGTH_REACH = errorGenerator(
  4019,
  400,
  "",
  "PARTICIPANT_ID_MIN_LENGTH_REACH",
  "1.0.0"
);

const PARTICIPANT_ID_REQUIRED = errorGenerator(
  4020,
  400,
  "",
  "PARTICIPANT_ID_REQUIRED",
  "1.0.0"
);

const PARTICIPANT_NOT_EXIST = errorGenerator(
  4021,
  400,
  "",
  "PARTICIPANT_NOT_EXIST",
  "1.0.0"
);

const USER_NO_LONGER_PARTICIPANT = errorGenerator(
  4022,
  400,
  "",
  "USER_NO_LONGER_PARTICIPANT",
  "1.0.0"
);

const errors = {
  CHAT_EXIST,
  CHAT_ID_EXIST,
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
  MESSAGE_TEXT_INVALID_TYPE,
  MESSAGE_TEXT_MAX_LENGTH_REACH,
  MESSAGE_TEXT_MIN_LENGTH_REACH,
  PARTICIPANT_ID_EXIST,
  PARTICIPANT_ID_INVALID_TYPE,
  PARTICIPANT_ID_MAX_LENGTH_REACH,
  PARTICIPANT_ID_MIN_LENGTH_REACH,
  PARTICIPANT_ID_REQUIRED,
  PARTICIPANT_NOT_EXIST,
  USER_NO_LONGER_PARTICIPANT,
  MESSAGE_TEXT_REQUIRED,
};

const chatErrors = {
  info: {
    version: versionCalculator(extractVersions(extractFromInfo(errors))),
  },
  properties: errors,
};

module.exports = {
  chatErrors,
};
