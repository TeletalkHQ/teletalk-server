const { errorTemplateGenerator } = require("~/functions/utilities/generators");

const CHAT_EXIST = errorTemplateGenerator(
  4000,
  "chat is already initialized",
  "CHAT_EXIST",
  "1.0.0"
);

const CHAT_ID_EXIST = errorTemplateGenerator(
  4001,
  "",
  "CHAT_ID_EXIST",
  "1.0.0"
);

const CHAT_ID_INVALID_TYPE = errorTemplateGenerator(
  4002,
  "",
  "CHAT_ID_INVALID_TYPE",
  "1.0.0"
);

const CHAT_ID_MAX_LENGTH_REACH = errorTemplateGenerator(
  4003,
  "",
  "CHAT_ID_MAX_LENGTH_REACH",
  "1.0.0"
);

const CHAT_ID_MIN_LENGTH_REACH = errorTemplateGenerator(
  4004,
  "",
  "CHAT_ID_MIN_LENGTH_REACH",
  "1.0.0"
);

const CHAT_ID_REQUIRED = errorTemplateGenerator(
  4005,
  "",
  "CHAT_ID_REQUIRED",
  "1.0.0"
);

const CHAT_NOT_EXIST = errorTemplateGenerator(
  4006,
  "chat not exist, maybe deleted or something",
  "CHAT_NOT_EXIST",
  "1.0.0"
);

const CREATED_AT_INVALID_TYPE = errorTemplateGenerator(
  4007,
  "",
  "CREATED_AT_INVALID_TYPE",
  "1.0.0"
);

const MESSAGE_ID_EXIST = errorTemplateGenerator(
  4008,
  "",
  "MESSAGE_ID_EXIST",
  "1.0.0"
);

const MESSAGE_ID_INVALID_TYPE = errorTemplateGenerator(
  4009,
  "",
  "MESSAGE_ID_INVALID_TYPE",
  "1.0.0"
);

const MESSAGE_ID_MAX_LENGTH_REACH = errorTemplateGenerator(
  4010,
  "",
  "MESSAGE_ID_MAX_LENGTH_REACH",
  "1.0.0"
);

const MESSAGE_ID_MIN_LENGTH_REACH = errorTemplateGenerator(
  4011,
  "",
  "MESSAGE_ID_MIN_LENGTH_REACH",
  "1.0.0"
);

const MESSAGE_ID_REQUIRED = errorTemplateGenerator(
  4012,
  "",
  "MESSAGE_ID_REQUIRED",
  "1.0.0"
);

const MESSAGE_TEXT_INVALID_TYPE = errorTemplateGenerator(
  4013,
  "",
  "MESSAGE_TEXT_INVALID_TYPE",
  "1.0.0"
);

const MESSAGE_TEXT_MAX_LENGTH_REACH = errorTemplateGenerator(
  4014,
  "",
  "MESSAGE_TEXT_MAX_LENGTH_REACH",
  "1.0.0"
);

const MESSAGE_TEXT_MIN_LENGTH_REACH = errorTemplateGenerator(
  4015,
  "",
  "MESSAGE_TEXT_MIN_LENGTH_REACH",
  "1.0.0"
);

const PARTICIPANT_ID_EXIST = errorTemplateGenerator(
  4016,
  "",
  "PARTICIPANT_ID_EXIST",
  "1.0.0"
);

const PARTICIPANT_ID_INVALID_TYPE = errorTemplateGenerator(
  4017,
  "",
  "PARTICIPANT_ID_INVALID_TYPE",
  "1.0.0"
);

const PARTICIPANT_ID_MAX_LENGTH_REACH = errorTemplateGenerator(
  4018,
  "",
  "PARTICIPANT_ID_MAX_LENGTH_REACH",
  "1.0.0"
);

const PARTICIPANT_ID_MIN_LENGTH_REACH = errorTemplateGenerator(
  4019,
  "",
  "PARTICIPANT_ID_MIN_LENGTH_REACH",
  "1.0.0"
);

const PARTICIPANT_ID_REQUIRED = errorTemplateGenerator(
  4020,
  "",
  "PARTICIPANT_ID_REQUIRED",
  "1.0.0"
);

const PARTICIPANT_NOT_EXIST = errorTemplateGenerator(
  4021,
  "",
  "PARTICIPANT_NOT_EXIST",
  "1.0.0"
);

const USER_NO_LONGER_PARTICIPANT = errorTemplateGenerator(
  4022,
  "",
  "USER_NO_LONGER_PARTICIPANT",
  "1.0.0"
);

const chatErrorTemplate = {
  version: "1.0.0",

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
};

module.exports = {
  chatErrorTemplate,
};
