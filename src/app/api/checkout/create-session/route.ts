import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const plan = body.plan || 'monthly'; // 'monthly' | 'annual' | 'lifetime'

    if (!stripe) {
      // In local development / demo mode when STRIPE_SECRET_KEY is not yet configured
      return NextResponse.json({
        demo: true,
        message: 'Stripe keys not set in environment. Activated in demo mode.',
      });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cardforge-app.vercel.app';

    let unitAmount = 900;
    let isRecurring = true;
    let interval: 'month' | 'year' = 'month';
    let productName = 'CardForge Pro (Monthly)';

    if (plan === 'annual') {
      unitAmount = 8400; // $84/yr ($7/mo)
      isRecurring = true;
      interval = 'year';
      productName = 'CardForge Pro (Annual)';
    } else if (plan === 'lifetime') {
      unitAmount = 4900; // $49 one-time
      isRecurring = false;
      productName = 'CardForge Pro (Lifetime License)';
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description:
                'Remove all watermarks, unlock custom brand HEX colors, all 4 layout themes, and get unlimited dynamic edge generation.',
              tax_code: 'txcd_10000000',
            },
            unit_amount: unitAmount,
            ...(isRecurring ? { recurring: { interval } } : {}),
          },
          quantity: 1,
        },
      ],
      mode: isRecurring ? 'subscription' : 'payment',
      managed_payments: {
        enabled: false,
      },
      success_url: `${appUrl}/customize?session_id={CHECKOUT_SESSION_ID}&pro_activated=true`,
      cancel_url: `${appUrl}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create checkout session';
    console.error('Stripe session error:', message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
