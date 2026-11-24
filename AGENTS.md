# AGENT.md

You are an expert React Native and Expo engineer helping me build a women's fashion mobile app. Write clean, simple, maintainable code. Prioritize clarity over unnecessary abstraction. Think like a senior mobile developer, but explain and implement like someone building a practical project.

---

## Project Overview

We are building a women's fashion mobile app where users browse clothing, save their body measurements, and buy through mobile money or bank payment. Target market is Kenya. Currency is KES.

The app includes:

- Sign in and sign up
- Body measurements form (bust, waist, hips, height, etc.)
- Home feed
- Category page by clothing type, with an "On sale" filter
- Product detail page
- Wishlist
- Cart
- Checkout with saved addresses and payment method selection (M-Pesa, Airtel Money, bank account)
- Orders list and order tracking
- Account page
- Notifications
- Settings

Keep the implementation simple and readable.

---

## Deadline and Schedule

NOTE: Ignore this section "Deadline and Schedule" section of AGENT.md for now. Don't plan, order, or cut features based on dates or days, and don't mention the deadline. Build in whatever order I give you, and I'll tell you when to bring the schedule back.

"Done" means a working build on real Android and iOS devices through internal testing (TestFlight, Play internal testing), with real orders flowing into the database. A public store release depends on store review and is not guaranteed by this date. Apple review usually takes a day or two. A newer personal Google Play developer account may require a closed test with 12 testers for 14 days before production, so check that on day 1.

| Days | Dates     | Work                                                                                           |
| ---- | --------- | ---------------------------------------------------------------------------------------------- |
| 1-2  | 24-25 Nov | Expo scaffold, NativeWind, Clerk auth, Supabase project, schema, RLS, seed products and images |
| 3-5  | 26-28 Nov | Measurements, home feed, category page with sale filter, product detail                        |
| 6-7  | 29-30 Nov | Wishlist, cart, saved addresses                                                                |
| 8-9  | 1-2 Dec   | Checkout, `create-order`, M-Pesa STK Push (sandbox), orders list and tracking                  |
| 10   | 3 Dec     | Airtel Money (sandbox), bank option, payment error states                                      |
| 11   | 4 Dec     | Notifications, settings, account page, polish                                                  |
| 12   | 5-6 Dec   | Device testing, bug fixes, build and upload test builds                                        |

Day 1 admin tasks that can block the schedule, start them immediately:

- Apply for M-Pesa (Daraja) production access. Going live needs a Paybill or Till and approval, which can take days or longer.
- Apply for Airtel Money API access. Same caveat.
- Create Apple Developer and Google Play developer accounts if they do not exist.

Until production credentials are approved, payments run against the provider sandboxes. Do not claim real payments work before they have been tested end to end with live credentials.

If a task will not fit its days, tell me and propose what to cut. Cut in this order: settings, notifications, Airtel Money, bank option. Never cut auth, orders, or M-Pesa.

---

## Tech Stack

- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind
- Zustand
- AsyncStorage
- Clerk for authentication
- Supabase (`@supabase/supabase-js`) for Postgres, Storage, and Edge Functions
- TanStack Query for server data (loading, caching, refetching)
- `expo-image` for product photos
- `expo-notifications` for push

Do not introduce new major libraries unless there is a strong reason. Ask before installing anything new. Forms use local state, not a form library.

---

## Development Philosophy

Build feature by feature. For every feature:

1. Read this file first.
2. Keep the implementation simple.
3. Avoid overengineering.
4. Prefer readable code over clever code.
5. Build the smallest useful version first.
6. Refactor only when repetition appears.

---

## Decision Making

If something is unclear or could be improved, suggest a better approach. If a new library would significantly help, recommend it, explain why, and ask before adding it. Do not install new libraries without approval.

Open decisions (ask me, do not guess):

- Which service handles the **bank account** option (see Payments).
- Where order-status updates (packed, shipped, delivered) are made: manually in the Supabase dashboard, or through an admin screen.

---

## Architecture

Use this folder structure:

```
app/
  (auth)/
  (tabs)/
components/
constants/
data/
hooks/
lib/
store/
types/
assets/
supabase/
  migrations/
  functions/
```

**app/** is for routes and screens only. Screens compose components and call hooks or stores. They should not contain large reusable UI blocks or business logic.

Planned routes:

- `(auth)/sign-up`, `(auth)/sign-in`
- `(tabs)/index` (home feed), `(tabs)/categories`, `(tabs)/wishlist`, `(tabs)/cart`, `(tabs)/account`
- `product/[id]`
- `category/[type]` (supports an `on_sale` filter)
- `measurements`
- `checkout`
- `orders/index`, `orders/[id]` (tracking)
- `addresses`
- `notifications`
- `settings`

**components/** is for reusable UI. Create a component when it is reused in multiple places, when it makes a screen easier to read, or when it represents a clear UI concept. Examples for this app: `ProductCard`, `CategoryChip`, `CartItemRow`, `MeasurementField`, `PaymentMethodPicker`, `OrderStatusTimeline`. Do not create components too early.

**data/** holds hardcoded content that never changes (category list, size charts, order status labels). Keep it typed. Products do not live here, they live in the database.

**hooks/** holds TanStack Query hooks, one per resource (`useProducts`, `useWishlist`, `useOrders`, and so on). Screens call these hooks and never call Supabase directly.

**store/** holds Zustand stores. Keep here: cart items, selected payment method, UI preferences. Persist with AsyncStorage when needed.

**lib/** holds external service helpers (`clerk.ts`, `supabase.ts`, `payments.ts`, `cn.ts`). Never expose secret keys here.

**supabase/** holds SQL migrations and Edge Functions. Every schema change is a new migration file, never an edit in the dashboard that is not also saved here.

---

## Data Model

Where each piece of data lives:

| Data                                    | Lives in                                                                |
| --------------------------------------- | ----------------------------------------------------------------------- |
| Products, categories, product images    | Supabase (public read)                                                  |
| Measurements, saved addresses, wishlist | Supabase (own rows only)                                                |
| Orders, order items, payments           | Supabase (read own rows, written only by Edge Functions)                |
| Cart                                    | Zustand, persisted with AsyncStorage (turned into an order at checkout) |

Tables (Postgres, RLS enabled on every table):

- `products`: id, name, description, category, price_kes (integer), sale_price_kes (nullable integer), sizes (text array), image_paths (text array), in_stock, created_at
- `measurements`: user_id (primary key), bust_cm, waist_cm, hips_cm, height_cm, updated_at (all measurements optional)
- `addresses`: id, user_id, label, recipient_name, phone, county, town, street, notes, is_default
- `wishlist_items`: user_id, product_id (composite primary key)
- `orders`: id, user_id, status, payment_status, payment_method, total_kes, address (jsonb snapshot), created_at
- `order_items`: id, order_id, product_id, name_snapshot, size, quantity, unit_price_kes
- `payments`: id, order_id, method, amount_kes, status, provider_reference, raw_callback (jsonb, never returned to clients), created_at
- `push_tokens`: user_id, token

`user_id` is the Clerk user id stored as text, not a UUID.

Domain rules:

- Money is stored as integer KES amounts. No floats. Format for display in one helper in `lib/`.
- A product is "on sale" when `sale_price_kes` is set. Do not create a separate sale screen, it is a filter.
- Order status: `placed`, `confirmed`, `packed`, `shipped`, `delivered`, `cancelled`.
- Payment status is separate: `pending`, `paid`, `failed`.
- Phone numbers use international format without a plus sign, for example `2547XXXXXXXX`. Validate before sending to any payment provider.
- Measurements are in centimeters. Never block checkout because measurements are missing.

---

## Supabase and Clerk

- Use Clerk's Supabase integration so the Clerk session token is passed to the Supabase client, and RLS policies read the user id from that token. Check the current Clerk and Supabase docs before wiring this, the setup has changed over time.
- The Supabase anon key and project URL may be `EXPO_PUBLIC_` variables. The anon key is safe only because RLS protects every table.
- The Supabase service role key is a secret. It lives only inside Edge Functions, never in the app.
- RLS rules:
  - `products`: anyone can read, nobody can write from the client.
  - `measurements`, `addresses`, `wishlist_items`, `push_tokens`: the signed-in user can read and write only rows where `user_id` matches their Clerk id.
  - `orders`, `order_items`, `payments`: the signed-in user can read only their own rows. No client writes.
- Product images go in a public Storage bucket. Store the path in `image_paths`, build the URL in one helper in `lib/`.
- Test RLS with two different users before calling any feature finished.

---

## Orders and Payments

### Order creation

The client never sends prices or totals as trusted values. At checkout the app calls the `create-order` Edge Function with product ids, sizes, quantities, address id and payment method. The function reads real prices from `products`, computes the total, writes the order, order items and a `pending` payment, and returns the order id.

### Payment methods

Supported: **M-Pesa**, **Airtel Money**, **bank account**.

All three share one interface in `lib/payments.ts`:

```ts
export type PaymentMethod = "mpesa" | "airtel" | "bank";

export type PaymentRequest = {
  orderId: string;
  method: PaymentMethod;
  phone?: string; // required for mpesa and airtel
};

export type PaymentResult = {
  status: "pending" | "paid" | "failed";
  reference?: string;
};
```

Rules:

- The app never talks to M-Pesa, Airtel or a bank directly. It calls our Edge Functions, then watches the payment status for that order.
- Edge Functions: `create-order`, `mpesa-stk-push`, `mpesa-callback`, `airtel-collect`, `airtel-callback`.
- **M-Pesa:** STK Push (Lipa na M-Pesa Online). The user approves on their phone. The result arrives at the public HTTPS callback URL of `mpesa-callback`, which updates `payments` and `orders` with the service role.
- **Airtel Money:** collection request, same pattern as M-Pesa.
- **Callbacks are not authenticated by Clerk.** Treat them as untrusted input: validate the payload shape, match it to a known pending payment, check the amount, and ignore duplicates. Store the raw payload in `raw_callback`.
- Only Edge Functions change `payment_status` and order `status`. The client can never mark an order paid.
- **Bank account:** ask me which approach to use before building. Do not invent one. Until decided, show a "bank transfer" option that displays payment instructions and the order reference, and leaves payment status as `pending`.
- Show clear UI states: waiting for approval on the phone, paid, failed, try again. Handle user cancel and timeout.
- Prevent double submission. Disable the pay button while a request is in flight.
- A mock provider (returns `paid` after a short delay) is allowed during development behind an env flag, and must be off in any build I send to testers.
- Never log phone numbers or full payment payloads.

### Tracking

Order tracking is the order `status` field shown as an `OrderStatusTimeline`. Read it with TanStack Query and refetch on screen focus. Realtime subscriptions are optional polish, only after everything else works.

---

## UI Rules

For any UI task:

- Replicate the provided design exactly.
- Match layout, spacing, padding, font sizes, font hierarchy, colors, border radius, shadows, alignment, and proportions.
- Do not approximate. Do not simplify unless explicitly asked.

---

## Styling Rules

Use NativeWind classes. Do not use StyleSheet unless it is not possible to style with className.

Use the NativeWind version installed in this project. Check package.json. Do not upgrade without approval.

Reuse class patterns through utilities in global.css.

### Style Exception List

Use StyleSheet or inline styles for:

- SafeAreaView (className not supported)
- KeyboardAvoidingView (behavior props)
- Modal (visible, transparent props)
- Animated.View (animated style values)
- Dynamic styles calculated at runtime
- Platform specific styles
- Pressable or TouchableOpacity pressed states
- Shadows (different per platform)

Everywhere else, use NativeWind.

---

## Image Rule

Use centralized image imports.

1. Check if `constants/images.ts` exists.
2. If not, create it.
3. Import all app images there.
4. Use them through the centralized object.

```ts
import mascot from "@/assets/images/mascot.png";

export const images = {
  mascot,
};
```

```tsx
<Image source={images.mascot} />
```

Do not import image assets directly inside screens or components.

Product photos are the one exception: they are data from Supabase Storage, not app assets. Use `expo-image` with a placeholder for those.

---

## State Management

- TanStack Query for server data (products, wishlist, addresses, measurements, orders).
- Zustand for global client state (cart, selected payment method).
- Local state for temporary UI state (form inputs, modal open, selected size).
- AsyncStorage for persistence of the cart and preferences.

Do not copy server data into Zustand.

---

## TypeScript

- Strict mode.
- No `any`.
- Keep types simple and readable.
- Shared types go in `types/`.

---

## Feature Implementation

When building a feature:

1. Read this file first.
2. Identify the files to change.
3. Keep changes focused.
4. Do not rewrite unrelated code.
5. Follow existing patterns.
6. Make sure the feature works end to end.
7. Fix lint and type errors before finishing.

Follow the schedule in "Deadline and Schedule". Build the database schema and RLS first, because every screen depends on it.

---

## Secrets

- Never expose secret keys in client code.
- Never put secrets in `EXPO_PUBLIC_` variables. Anything with that prefix ships inside the app.
- Use Edge Functions for tokens, payment provider calls, AI calls, and any external API access.
- Secrets live in Supabase function secrets: M-Pesa consumer key, secret and passkey, Airtel client id and secret, the Supabase service role key, and any bank or aggregator credentials.
- Never commit `.env` files or secrets. Keep a `.env.example` with variable names only.

---

## Authentication

Use Clerk. Do not build custom auth.

---

## Push Notifications (Day 11)

- Use `expo-notifications`. Save the device token to `push_tokens` after sign-in and permission grant.
- Android remote push does not work in Expo Go. Use a development build.
- Send notifications from an Edge Function when an order status changes. The client never sends pushes.
- Cut this first if the schedule slips.

---

## Communication

Be concise. Explain what changed and how to test it.

---

## Final Reminder

Before every feature:

- Read this file.
- Follow it strictly.
- Build clean, simple code.
- Replicate UI exactly when designs are provided.
