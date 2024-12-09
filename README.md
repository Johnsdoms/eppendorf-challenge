## readme
This repository was created as part of the Eppendorf frontend engineer challenge.

### Setup
To check out the created solution, clone repository and run:

```bash
pnpm install # or use other package manager if you prefer
```

and then

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result and start navigating the two task soltuions from there.

[Next.js](https://nextjs.org) project was initially bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

### Summary

The project was setup as a [Next.js](https://nextjs.org) project with TypeScript. The project uses [shadcn](https://ui.shadcn.com/) as component library together with [Tailwind](https://tailwindcss.com/) which was used to quickly write styles and layouts for customly created components. To ensure code quality and consistent formatting and linting, I used  [@antfu/eslint-config](https://github.com/antfu/eslint-config) with the react config as an opiniated eslint setup based on the modern flat-config, configured to simply use [eslint-stylistic](https://eslint.style/) to handle basic formatting.

The routing was simply done by utilizing the file-based App Router from Next.js and the two parts of the challenge are each represented on their respective route (```/table``` and ```/register```) and can be accessed from the UI from the home route (```/```).

---

### Data table
- The table component is following the documentation of shadcn, which itself is built on top of the headless [TanStack Table](https://tanstack.com/table/latest) dependency.
- Sorting is visualized with a custom header component, while the sorting, except color column, relies on the auto-sorting integrated in the dependecy
- Color sorting is realized with a custom sorting function that is passed to the column definition. For the sorting itself, a color sorting dependency is used to compare the pairs of Hex values ([see here](https://github.com/projectwallace/color-sorter)). The pair-wise sorting based on hue and by saturation does not result in the best result imo, but was regarded as sufficient for the solution
- Sorting only happens on one column at a time, could be extend to allow for multi-sorting following dependency docs
- No pagination or lazy loading was added as the performance of the rendering with a locally provided file seems sufficient. However, as can be seen in warnings in the console (```[Violation] 'click' handler took X ms```), sorting performance is not ideal. In a real use case, especially with remotely fetched table data, data chunking would be preferable.

### Registration
- General idea is a card-style registration form, that is familiar from web apps
- Registration requirements were split in two seperate steps, mostly to show case the interaction between parent and child components and how to pass data in both directions in React. However "submitting" the name first, also allows to display the user name in the title in the second step as personalizing the UI a bit more :)
- Form creation is again done following shadcn docs
- Form validation is utilizing [zod](https://zod.dev/) for form schema definition and validation
- To allow users to correct e.g. typos in their input in the different steps, the credential input is stored in the parent component, however inputs are only stored when the validation is successfull (e.g. filling in an invalid email in the second step, going back to the first step and returning, will result in an empty email input. Whereas a correct email will get prefilled). "Submitting" the registration is also handled within the parent. Here, where in production e.g. and API endpoint would be called, a toast is displayed in the UI and the user gets auto-routed to the entry route.

#### Ideas for improvements:
- Better component splitting, e.g. make password requirements tooltip its own component
- Create PasswordInput form component with visibility toggle for better reusability and also have that component handle the visbility state internally, as it is not really relevant for the parent

---

### Testing

For running the tests in the Cypress UI, use:

```bash
pnpm cypress:open
```

Tests for the ```/register``` route were setup as E2E Cypress tests (see ```register.cy.ts```). Some of the tests could also have been written as component tests (e.g. toggle password visibility, or the form errors), however for simplicity, only one test type was setup.

#### Improvements:
- Test keyboard navigation in forms
- Use component tests for isolated tests
- Add testing for ```/table```:
    - E.g. test sorting of columns and their header states, unit test for the custom sort function, ...
---
### Known limitations
- Automated tests only for ```/register``` route functionality
- No special efforts for implementation of responsive UI, focus on desktop
- Data for table is simply served as static file instead of fetching from API route
