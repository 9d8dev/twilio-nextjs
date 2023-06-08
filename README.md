# README for twilio-next-template

<img width="922" alt="Screenshot 2023-06-07 at 11 17 46 AM" src="https://github.com/by9d8/twilio-next-template/assets/95453018/6285a1b4-6c94-4326-a286-2fe2d48b6685">
<img width="867" alt="Screenshot 2023-06-07 at 11 17 53 AM" src="https://github.com/by9d8/twilio-next-template/assets/95453018/d405d25c-865f-4b12-ab07-12cc94f0f935">
<img width="798" alt="Screenshot 2023-06-07 at 11 18 09 AM" src="https://github.com/by9d8/twilio-next-template/assets/95453018/0a88afcc-3fab-4355-b259-6c8bccbd578d">

## Overview

The `twilio-next-template` is a simple and efficient way to get started with Twilio's two-step text verification using the NextJS App Router and Twilio's API. It is primarily built with JavaScript (96.3%) and CSS (3.7%). This application was created to verify phone numbers for user sign-ups to mitigate spam. This project uses [DaisyUI](https://daisyui.com/) and [Sonner](https://sonner.emilkowal.ski/) (for toasts) for UI elements. It is developed and maintained by 9d8, a development studio by Cameron Youngblood and Bridger Tower.

## Getting Started

To get started with the `twilio-next-template`:

1. Clone the repository to your local machine
2. Run the following commands:

   ```bash
   npm i
   ```
3. Add a `.env` file with your own API keys from Twilio. To find Twilio API keys, navigate to the [Twilio Console](https://twilio.com/console). You’ll be able to find your Account SID and Auth Token on the main dashboard of the console. Copy these values and paste them into your `.env` file as the values for TWILIO_SID and TWILIO_AUTH_TOKEN respectively. You will also need to create a "[verify service](https://www.twilio.com/console/verify/services)" in the Twilio console. Find the service ID of your Twilio service to paste into VERIFICATION_SID. Example names of the ` env` variables are located in the `.env.example` file in the root directory of this repository.
4. Next, run the following command:
   ```bash
   npm run dev
   ```
Then open `http://localhost:3000` with your browser to see the result.

## Structure

The `twilio-next-template` application consists of the following primary directories:

- `app`: Contains the main application code including:
  - `api/twilio/route.js`: The API route for managing text code verification. Includes two route handlers for `GET` and `POST` requests.
  - `globals.css`: Contains the global CSS styles for the application.
  - `layout.js`: Contains the layout components for the application.
  - `page.js`: Contains the main page components for the application.
- `public`: Contains static files used across the application, such as SVG files for visual elements.

## Contributions

This project is open for contributions. We look forward to seeing your ideas and improvements.

## License

This project is licensed under the MIT License. See the LICENSE file in the repository root for more information.

## Contact

For more information, check out the creators at [9d8.dev](https://9d8.dev).
Made by 9d8, a development studio by [Cameron Youngblood](https://github.com/youngbloodcyb) and [Bridger Tower](https://github.com/brijr).
