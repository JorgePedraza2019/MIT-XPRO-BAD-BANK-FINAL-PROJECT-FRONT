# Project title: Bad Bank Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Description/Motivation of Project:
This project allows you to enter a site simulating as if it's a banking portal to create an account, log in and also perform certain actions such as a deposit or withdrawal to the account, in addition to being able to see the balance and see all the information.
The reasons why this project exists are because it's important to show the capabilities for using a full stack development to a real use case, helping users to control their financial information and building this project to achieve the objectives of being an easy to use application, also solving the problem of the lack of a system that integrates all banking functionalities in an intuitive way.
The motivation of the project is to be able to use the development tools seen in the Mit XPro course to have a project with a login/signup method, queries to APIs and a database in MongoDB.

## How to Run - Installation Guidelines:
To run the Front-end project locally, follow the next steps:
1. Download the project using git clone syntax.
2. Open the project with your IDE, for example: Visual Studio Code.
3. Install all the libraries using the following command in your IDE terminal (npm install).
4. To build the project use the following command (npm run build)
4. To run the project use the following command (npm run start)
5. To open the project open the following URL with an explorer: localhost:3000.

## How to Stop project:
To stop the project you should type the following command in your IDE terminal: CNTRL + C on Windows or CMD + C on a Mac.

## Technology used:
The technology used for this project is the following:
- React with Next.js: Next.js is a React framework for building server-side rendered and statically generated web applications.
- Bootstrap: Used for styling and layout of the application, providing a responsive and consistent design.
- Font Optimization: Utilizes next/font to automatically optimize and load Inter, a custom Google Font, for improved text rendering.
- FontAwesome: Provides a library of icons for use in the application's interface, enhancing its visual appeal and usability.

## Features:
The features for this project are the following:
- Signup
- Login
- Deposit
- Withdraw
- Balance
- See all data

Some features to add in the future would be to put withdraw limits per day and an option to deposit to an external bank account with a fee.

## Improvements made:
- The project has been restructured to separate the front-end from the back-end into different workspaces.
- The front-end has been implemented with Next.js from scratch.
- The back-end has been set up on a different port to connect to a MongoDB connection.
- Various UX/UI style improvements have been made.

## Roadmap of future improvements:
The future improvements to apply in this project is to build more API endpoints.

## Notes:
- The project was created with node 21.5.0

## License information:
MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
