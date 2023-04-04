const stripe = require('stripe')('sk_test_51MjPQFA3yriwGQXjnaDH5xLdfYZcLJBnhEOpxLkXnZnTCxn8aEqWFvNipZqbK7QK7upruJyhiGDXzsD8qThhawqy00pfLTMis8');
// const endpointSecret = 'whsec_zEFwzuPP81dqYOvx15FN6uD0EgxcEsEY';

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
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return h.response().code(200);
};

module.exports = {
  postEvent
};