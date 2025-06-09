# Nutrigym

## Archive Notice

I've decided to pause development work on this project for the time being. This app was mostly meant to be an exercise that looked into consolidating the features of a nutrition tracking app and an exercise training app so that users would have an all in one place to track their health. The nutrition portion is completed, but the exercise tracking portion is not fully finished. The original idea was that you'd be able to log the sets, exercises, reps, etc. as you worked out with the app, but this level of interactivity would be much better suited for a mobile app built with something like react native. Mobile apps have a much more extensive toolset for real time activity and doing this with a traditional web app would add a lot more complexity / limitations.

## Development

1. Create a clerk account and setup an project in the UI

1. Create a `.env` file with the following format:

    ```text
    IP_ADDR="127.0.0.1"

    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL="http://${IP_ADDR}:3000/api/auth/callback"
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL="http://${IP_ADDR}:3000/api/auth/callback"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
    NEXT_PUBLIC_API_URL="http://${IP_ADDR}:3000/api/graphql"

    CLERK_PUBLISHABLE_KEY="${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}"
    CLERK_SECRET_KEY="..."
    CLERK_JWT_KEY="-----BEGIN PUBLIC KEY-----
    ...
    -----END PUBLIC KEY-----"

    CLERK_USER_ID="user_..."
    DATABASE_URL="http://${IP_ADDR}:8080"
    NODE_ENV="development"
    ```

1. Enter a nix shell:

    ```sh
    nix develop
    ```

1. Install dependencies, generate GQL client code, setup the DB:

    ```sh
    pnpm run init
    ```

1. Run the app:

    ```sh
    pnpm run dev
    ```

1. To add some dummy data to the app, run:

    ```sh
    pnpm run db:seed
    ```

1. Start the app again:

    ```sh
    pnpm run dev
    ```

1. Navigate to `/api/auth/callback`
