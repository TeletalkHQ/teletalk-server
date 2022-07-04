const {
  chatModels: { participantIdModel },
} = require("@/models/chatModels/chatModels");
const {
  chatErrors: {
    PARTICIPANT_ID_REQUIRED,
    PARTICIPANT_ID_INVALID_TYPE,
    PARTICIPANT_ID_MAX_LENGTH_REACH,
    PARTICIPANT_ID_MIN_LENGTH_REACH,
  },
} = require("@/variables/errors/chatErrors");
const { randomMaker } = require("@/classes/RandomMaker");

const participantIdMaxLength = participantIdModel.maxlength.value;
const participantIdMinLength = participantIdModel.minlength.value;

// const participantIdSuccessTests = (
//   { participantIdMain, participantIdTest } = {},
//   { stringEquality = true, modelCheck = true } = {
//     stringEquality: true,
//     modelCheck: true,
//   }
// ) => {
//   testBuilder
//     .setVariables(participantIdModel, participantIdMain, participantIdTest)
//     .setOptions({ modelCheck, stringEquality })
//     .buildCommonTest();
// };

const participantIdFailureTests = (customRequest, data = {}) => {
  const fn = (participantId) => ({
    ...data,
    participantId,
  });

  it("Should get error, PARTICIPANT_ID_REQUIRED", async () => {
    await customRequest.sendRequest(fn(""), PARTICIPANT_ID_REQUIRED);
  });

  it("Should get error, PARTICIPANT_ID_INVALID_TYPE", async () => {
    await customRequest.sendRequest(
      fn(1234567891234586),
      PARTICIPANT_ID_INVALID_TYPE
    );
  });
  it("Should get error, PARTICIPANT_ID_MIN_LENGTH_REACH", async () => {
    await customRequest.sendRequest(
      fn(randomMaker.randomString(participantIdMinLength - 1)),
      PARTICIPANT_ID_MIN_LENGTH_REACH
    );
  });
  it("Should get error, PARTICIPANT_ID_MAX_LENGTH_REACH", async () => {
    await customRequest.sendRequest(
      fn(randomMaker.randomString(participantIdMaxLength + 1)),
      PARTICIPANT_ID_MAX_LENGTH_REACH
    );
  });
};

module.exports = {
  participantIdFailureTests, // participantIdSuccessTests,
};
