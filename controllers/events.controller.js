const stripe = require('stripe')(process.env.STRIPE_SK_LIVE);
// const endpointSecret = 'whsec_zEFwzuPP81dqYOvx15FN6uD0EgxcEsEY';

const getEvent = (request, h) => {
  return 'Stripe Webhook';
}

const postEvent = (request, h) => {
  let event = request.payload;

  // if (endpointSecret) {
  //   // Get the signature sent by Stripe
  //   const signature = request.headers['stripe-signature'];
  //   try {
  //     event = stripe.webhooks.constructEvent(
  //       request.payload,
  //       signature,
  //       endpointSecret
  //     );
  //   } catch (err) {
  //     console.log(`⚠️  Webhook signature verification failed.`, err.message);
  //     return h.response().code(400);
  //   }
  // }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
      const customerSubscriptionCreated = event.data.object;
      // Then define and call a function to handle the event customer.subscription.created
      break;
    case 'customer.subscription.updated':
      const customerSubscriptionUpdated = event.data.object;
      // Then define and call a function to handle the event customer.subscription.updated
      break;
    case 'invoice.payment_failed':
      const invoicePaymentFailed = event.data.object;
      // Then define and call a function to handle the event invoice.payment_failed
      const mailObj = {
        "api_key": "api-B5CCEAB2D30E11ED8E4FF23C91BBF4A0",
        "to": ["Jeremy Schaffer <jschaffer@7thdi.com>"],
        "sender": "HA Stripe Webhook <jschaffer@7thdi.com>",
        "template_id": "1813490",
        "template_data": {
          "invoice": invoicePaymentFailed.id,
          "customer": invoicePaymentFailed.customer,
          "customer_name": invoicePaymentFailed.customer_name,
          "customer_email": invoicePaymentFailed.customer_email
        }
      }

      fetch('https://api.smtp2go.com/v3/email/send', {
        method: 'POST',
        body: JSON.stringify(mailObj),
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        },
      });

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return h.response().code(200);
};

module.exports = {
  postEvent, getEvent
};