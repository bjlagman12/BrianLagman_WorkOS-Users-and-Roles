# Frontend Take-Home Assignment Overview

Below is my take-home assignment. I’ve used the following frameworks throughout the project:

**react**: A UI library for efficient component-based development, using a virtual DOM for improved performance.

**react-boostrap**: Provides pre-styled, accessible components that integrate with React, reducing the need for custom CSS.

**react-router-dom**: Enables dynamic routing in a React application, allowing navigation between views or pages without a page reload.

**tanstack/react-query**: Simplifies data fetching, caching, and synchronization, improving API handling and performance.

**webpack**: Bundles JavaScript, CSS, and assets efficiently, optimizing performance and enabling modular development.

**eslint**: Enforces code consistency and best practices, helping catch errors early and maintain clean, readable code.

## Completed work

1. Setup the "Users" and "Roles" tab structure
2. Add the users table
3. Add support for filtering the users table via the "Search" input field
4. Add support for deleting a user via the "more" icon button dropdown menu
5. Add support for viewing all roles in the "Roles" tab
6. Add support for renaming a role in the "Roles" tab
7. Add pagination to the user table

## Future improvements

If I had more time, I would have completed the following improvements:

- **CRUD API**: Utilize all CRUD APIs provided by the `/users` and `/roles` endpoints, including adding, updating, and deleting users and roles.
- **Testing**: Implement testing using tools like React Testing Library, Jest, or Cypress.
- **CSS Improvements**: Improve the CSS to better match the Figma designs.
- **More Comments**: Add more explanatory comments in the codebase where necessary.
- **Pagination Cleanup**: Refactor pagination into a reusable component, instead of keeping it in `ManageUser.tsx`.

## Getting Started

1. **Clone the Repository:**: Clone the repo from github.

```
git clone <repo>
cd <repo>
```

2. **Install All Dependencies**: Install dependencies for both the server and client.

```
npm run install:all
```

3. **Start the Application**: Start both the server and client concurrently. A separate window should open in `localhost:3000`. You should be ready to test.

- Note: The default `SERVER_SPEED` is set to `"fast"`.

```
npm run start:all
```

4. **Adjust API Speed (Optional)**: You can adjust the API speed using the `SERVER_SPEED` environment variable. To run the client and server independently:

- To simulate a slower network:

```
SERVER_SPEED=slow npm run start:server
// open a new terminal tab
npm run start:client
```

- To remove latency and get instant responses:

```
SERVER_SPEED=instant npm run start:server
// open a new terminal tab
npm run start:client
```
