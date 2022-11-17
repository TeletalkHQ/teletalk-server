require("module-alias/register");

const https = require("https");
const { envManager } = require("~/src/classes/EnvironmentManager");

const { SMS_PROVIDER_SENDER, SMS_PROVIDER_TOKEN, SMS_PROVIDER_URL } =
  envManager.getAllLocalEnvironments();

const data = JSON.stringify({
  from: SMS_PROVIDER_SENDER,
  to: "09012700470",
  text: "test sms",
});

const options = {
  headers: {
    "Content-Length": data.length,
    "Content-Type": "application/json",
  },
  hostname: SMS_PROVIDER_URL,
  method: "POST",
  path: `/api/send/simple/${SMS_PROVIDER_TOKEN}`,
  port: 443,
};

const req = https.request(options, (res) => {
  console.log("statusCode: " + res.statusCode);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.write(data);
req.end();
