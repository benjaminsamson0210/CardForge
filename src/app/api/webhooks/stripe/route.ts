import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({ received: true });
  }

  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing webhook signature or secret' }, { status: 400 });
  }

  try {
    const rawBody = await req.text();
    const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Payment completed for session:', session.id);
      // Here you can write purchase row to Supabase or send license email via Resend
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
