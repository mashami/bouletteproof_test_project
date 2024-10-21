# Getting Started Instructions

## Clone the Project on Your Local Device

1. Open your terminal and run the following command to clone the project:
   ```bash
   git clone https://github.com/mashami/bouletteproof_test_project.git
   ```

2. Navigate to the project directory:
   ```bash
   cd bouletteproof_test_project
   ```

## Installing Packages

Once you are in the project directory, install the required packages by running the following command:

```bash
yarn install
```

or simply:

```bash
yarn
```

## Running the Project

- The project runs on port 3000 by default. If you make changes to the port, be sure to also update the APP_URL in your .env file accordingly.
- To run the project, open your browser and navigate to http://localhost:3000 to see the result.

## Landing Page

- No authentication is required to access the landing page.

## Details Page

- To access the details page, you need to be authenticated (logged in).

## Sign-in and Sign-up

Mockaroo is a data generation tool, not a database, and it does not store user input such as emails or passwords. Its main purpose is to generate random datasets, but it lacks the functionality to save or manage authentication processes like handling sign-ups or logins.

For the sign-up process, I am using a Mockaroo API that generates a new customer record. However, since Mockaroo only creates random datasets, it doesn't store or process specific user-provided data (e.g., email, password). This means that I cannot add user-provided information to existing data, as Mockaroo does not support persistent storage or data updating.

For the sign-in process, I cannot verify if the credentials provided during sign-up match any stored data, because Mockaroo does not save the data generated during sign-up. Since Mockaroo cannot authenticate or retain user information, there is no way to validate login details against previously generated records.

Given these limitations, the solution I have implemented randomly selects a customer from the dataset when a user attempts to sign in. This is a temporary workaround and does not involve real authentication based on the user's input, as Mockaroo is not designed to support such functionality.

**Note:** You can generate any information you want for sign-in or sign-up, but it won't be saved or verified. Mockaroo simply generates random data, and it does not handle the storing or authentication of user information.
