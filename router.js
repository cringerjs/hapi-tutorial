const { postEvent } = require("./controllers/events.controller");

const router = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    }
  },
	{
		method: "POST",
		path: "/stripe_webhooks",
		handler: postEvent
	}
];

module.exports = router;