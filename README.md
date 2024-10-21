This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started Instructions 

### Clone the project on your local device
- First go to terminal and write this command:

git clone https://github.com/mashami/bouletteproof_test_project.git

- Second go to the project path:

cd bouletteproof_test_project 

### Installing packages
- After getting in the project path install yarn by write this command :
  yarn install
     or
    yarn

## Run the Project
- It must run on 3000 port if you make change, just remember to change also in .env " APP_URL "

  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Landing Page 
- on the landing page there is no authentication needed.

### detail page
- for the details page you need to be authenticate to have access to visit the page

### Signin and Signup

Mockaroo is a data generation tool, not a database, and it does not store user input like emails and passwords. Its primary purpose is to generate random datasets, but it lacks the functionality to save or manage authentication processes, such as handling user sign-ups or logins.

For the sign-up process, I am using an API from Mockaroo that generates a new customer record. However, since Mockaroo only generates random datasets, it doesn’t actually store or process the specific data I send, like user input (e.g., email, password). This means I cannot add new user-provided information to existing data, as Mockaroo doesn’t support this kind of persistent storage or updating.

For the sign-in process, I cannot verify user credentials against previously saved data because Mockaroo does not store the information created during sign-up. Since Mockaroo cannot retain or authenticate the data, there’s no way to validate if the login details match the information used during sign-up.

Given these limitations, the solution I implemented randomly selects a customer from the dataset when a user attempts to sign in. While this is a temporary workaround, it does not involve real authentication based on the user’s input, as Mockaroo isn’t designed for such functionality.


So you can generate any information you want in order to sign in or sign upSo, you can generate any information you want for sign-in or sign-up, but it won’t be saved or verified. Mockaroo simply creates random data, and it doesn’t handle storing or authenticating user information.
