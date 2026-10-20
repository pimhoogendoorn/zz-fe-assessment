# Zorg & Zekerheid Registration form

This is a multi-step registration form for health insurance.

## Tools used

- Opencode with Qwen 3.6 27B for the Openspec exploration.

## Architecture choices

### General

I wanted to keep things as simple as possible with as little dependencies as possible while still maintaining a good developer experience.

The choices I have made while planning the project were:

- React & Typescript as requirements
- Typescript config
  - Just go for a basic config now. But always with `strict` mode enabled and jsx support.
  - We can always tweak later when we need it.

### Form

- Basic form
  - No framework like Nextjs for now to keep it simple. Can be integrated later.
- Zod schemas for type safety and form validation
- React Context API for state management. Should be sufficient for the usecase.
  - Zustand could be nice but would add unnecessary complexity.
- React-hook-form
  - It prevents manually writing my own field states, blur handlers, error displays etc.
  - Popular and widely used
- No headless component library or anything
  - Some basic HTML inputs should be fine
  - We can always replace the basic fields with components from a component library like Shadcn or Radix or so.
- Form navigation
  - User has to make a selection before they can continue is in the requirements. So next links are disabled until form step is completed and valid. That enables the link to continue to the next step.
  - When user filled in all fields in Step 1, link to next step enabled, user clears a field, next button is disabled again
- Form validation messaging
  - A combination of inline (close to the field that is faulty) and an additional banner above when necessary.

### Styling

- Tailwind only
  - The styling is going to be basic

### API data

- Serving the test data.json via Vite's dev server
  - Easy to implement
  - Would be close to using a real world API endpoint
- Loading state
  - I prefer skeleton loaders over spinners blocking the page.
  - Skeleton loaders make the perceived performance better for the user.
  - But what when we cannot load the data?
    - The user can retry via a retry button but when it keeps failing that would not help
    - Therefor I would show an e-mailaddress the user can send an email for help.

### State management

- Where to store persisted data
  - Thought of `localStorage` at first but then thought about `searchParams` in the url.
    - But with searchParams in the url, you might get in trouble with the PII data users fill in and that might be shared within the system. In browser history, server logs, referer headers etc.
    - `sessionStorage` is not preferred because we lose the data when the user would close the tab. You could discuss in a refinement whether this is preferred or not.
    - So back to `localStorage` which is stored on the users device so a good choice I think.
  - Updating this data
    - We could do it on every keystroke but that would be overkill I think and result in a lot of writes. Not ideal.
    - We could do it on blur of each field but what if the user accidentally closed their tab or does a refresh or so. We would lose data. Not ideal either.
    - So I would go for an update of the data on value change with a debounce. This way we do not do too many writes in a short timespan or have a high risk of losing data. This hybrid solution sounds ok for me.
- Would be nice to be able to deeplink into steps
  - Since we do not have a router we can use hashes, searchParams or pushstate.
  - Going for searchParams because they result in normal history entry
  - Not going for hashes because the url is less clean and needs string parsing rather than `URL.searchParams`

### Order calculation (Receipt)

- The receipt with order details
  - Where do we show it? We always show it because it is a summary of what we ordered and what it will cost. As a user I find that important and I should be able to see it at all times. Therefore we put it at the top on small screens above the form and on larger screens it would be a panel on the side.
- Price rounding
  - Just something we need to keep in mind
  - We can use the native `Intl.NumberFormat` API for this. Dots in prices in the API response would be formatted with comma's as thats what we use in the Netherlands.
  - Ideally this would be done by the API so that we do not risk having rounding bugs in the frontend. But this would require submits between steps, maybe also not ideal.

## Improvements

- Use plain CSS. The possibilities with the new CSS api's are endless. However, development speed with TailwindCSS is fast. As a purist I like plain CSS a lot and I was a bit against TailwindCSS. But when I tried I saw the benefits of it with theming, onboarding new devs and small footprint of the CSS itself.
- Lookup address based on postal code
