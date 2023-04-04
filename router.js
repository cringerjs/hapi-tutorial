require('dotenv').config();
const { postEvent, getEvent } = require("./controllers/events.controller");

const router = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    }
  },
	{
		method: "GET",
		path: "/stripe_webhooks",
		handler: getEvent
	},
	{
		method: "POST",
		path: "/stripe_webhooks",
		handler: postEvent
	}
];

module.exports = router;