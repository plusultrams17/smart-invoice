import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  // If webhook secret is not configured, just acknowledge
  if (!process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET === "whsec_placeholder") {
    console.log("[Stripe Webhook] No secret configured, skipping verification");
    return NextResponse.json({ received: true });
  }

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;
      console.log(`[Stripe] Checkout completed: user=${userId}, plan=${plan}`);
      // TODO: Update user plan in database
      // await supabase.from('users').update({ plan }).eq('id', userId);
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;
      const status = subscription.status;
      console.log(`[Stripe] Subscription updated: user=${userId}, status=${status}`);
      // TODO: Update subscription status in database
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;
      console.log(`[Stripe] Subscription cancelled: user=${userId}`);
      // TODO: Downgrade user to free plan
      // await supabase.from('users').update({ plan: 'free' }).eq('id', userId);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`[Stripe] Payment failed: customer=${invoice.customer}`);
      // TODO: Send payment failure notification
      break;
    }

    default:
      console.log(`[Stripe] Unhandled event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
