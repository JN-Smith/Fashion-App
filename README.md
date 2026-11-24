# Sifa (Decent Mavazi)

A women's fashion mobile app for Android and iOS. Users browse clothing, save their body measurements for size guidance, and buy with M-Pesa, Airtel Money, or bank payment. Built for the Kenyan market, priced in KES.

> Status: in development. Features below are the planned scope, not a list of what is finished.

## Features

- Sign in and sign up
- Body measurements form, used for size guidance
- Home feed
- Browse by clothing type, with an "On sale" filter
- Product detail page
- Wishlist
- Cart
- Checkout with saved addresses and a choice of payment method
- Orders list and order tracking
- Account page
- Notifications
- Settings

## Tech Stack

| Area         | Choice                                               |
| ------------ | ---------------------------------------------------- |
| App          | Expo, React Native, TypeScript                       |
| Navigation   | Expo Router                                          |
| Styling      | NativeWind                                           |
| Client state | Zustand, AsyncStorage                                |
| Server data  | TanStack Query                                       |
| Auth         | Clerk                                                |
| Backend      | Supabase (Postgres, Storage, Edge Functions)         |
| Images       | `expo-image`                                         |
| Push         | `expo-notifications`                                 |
| Payments     | M-Pesa (Daraja STK Push), Airtel Money, bank account |

## Getting Started

### Prerequisites

- Node.js (current LTS)
- A Clerk account and application
- A Supabase project and the [Supabase CLI](https://supabase.com/docs/guides/cli)
- A phone with Expo Go, or an Android emulator or iOS simulator

### Install

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

### Environment variables

Copy `.env.example` to `.env` and fill in the values.

```bash
cp .env.example .env
```

| Variable                            | Description                                                          |
| ----------------------------------- | -------------------------------------------------------------------- |
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key                                                |
| `EXPO_PUBLIC_SUPABASE_URL`          | Supabase project URL                                                 |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY`     | Supabase anon key (safe in the app because RLS protects every table) |

Only values prefixed with `EXPO_PUBLIC_` end up inside the app. Never put secrets in them.

### Run the app

```bash
npx expo start
```

Scan the QR code with Expo Go, or press `a` for Android or `i` for iOS. Push notifications on Android need a development build, because remote push does not work in Expo Go.

## Backend Setup

### Database

Schema changes live in `supabase/migrations/`. Apply them with:

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

Row-level security is enabled on every table. Products are readable by everyone. Measurements, addresses, wishlist items and push tokens are readable and writable only by their owner. Orders and payments are readable by their owner and written only by Edge Functions.

### Edge Functions

Functions live in `supabase/functions/`:

| Function          | Purpose                                                              |
| ----------------- | -------------------------------------------------------------------- |
| `create-order`    | Builds an order from the cart, reading real prices from the database |
| `mpesa-stk-push`  | Starts an M-Pesa STK Push payment                                    |
| `mpesa-callback`  | Receives the M-Pesa result and updates the payment and order         |
| `airtel-collect`  | Starts an Airtel Money collection request                            |
| `airtel-callback` | Receives the Airtel Money result and updates the payment and order   |

Deploy and set secrets:

```bash
supabase functions deploy create-order
supabase functions deploy mpesa-stk-push
supabase functions deploy mpesa-callback
supabase functions deploy airtel-collect
supabase functions deploy airtel-callback

supabase secrets set --env-file ./supabase/.env.secrets
```

Secrets are stored as Supabase function secrets and are never shipped in the app:

- M-Pesa consumer key, consumer secret, passkey and shortcode
- Airtel client id and client secret
- Supabase service role key
- Any bank or aggregator credentials

Keep `supabase/.env.secrets` out of git.

### Clerk and Supabase

Auth uses Clerk, and the Clerk session token is passed to Supabase so row-level security can identify the user. Follow the current Clerk and Supabase guides for connecting the two, since the setup has changed over time.

## Payments

| Method       | How it works                                                                                         |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| M-Pesa       | STK Push. The customer approves on their phone and the result arrives at a public HTTPS callback     |
| Airtel Money | Collection request, approved on the customer's phone, result arrives at a callback                   |
| Bank account | Approach still to be decided. Until then the app shows transfer instructions and the order reference |

Rules the code follows:

- The app never talks to a payment provider directly. It calls our Edge Functions.
- Only Edge Functions can mark an order paid.
- Callbacks are treated as untrusted input and checked against a known pending payment and its amount.
- Providers run against their sandboxes until production credentials are approved.

## Project Structure

```
app/            Routes and screens only
  (auth)/       Sign in, sign up
  (tabs)/       Main tab screens
components/     Reusable UI
constants/      Constants and centralized image imports
data/           Typed static content (categories, size charts)
hooks/          TanStack Query hooks, one per resource
lib/            Service helpers (Clerk, Supabase, payments)
store/          Zustand stores (cart, payment method)
types/          Shared TypeScript types
assets/         Images and fonts
supabase/
  migrations/   SQL schema and RLS policies
  functions/    Edge Functions
```

## Working With an AI Coding Agent

`AGENT.md` in the project root holds the architecture, styling rules, payment rules and conventions the agent must follow. Point your agent at it before starting any feature.

## Roadmap

- [ ] Auth and measurements
- [ ] Home feed, categories, sale filter, product detail
- [ ] Wishlist, cart, saved addresses
- [ ] Checkout, orders, M-Pesa
- [ ] Airtel Money and bank option
- [ ] Notifications and settings
- [ ] Test builds on real devices

## License

To be decided.
