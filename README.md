# Auth for Newbs

Add JWT-based authentication to a Node/Express/Mongo app.

## Todo

- [x] Refactor client-side

  - [x] Use axios instead of fetch
  - [x] Use Vuex
    - [x] Create different stores
      - [x] Auth & User
      - [x] Notes
      - [x] Admin
      - [x] Statistics
      - [x] Public
  - [x] Proper way to display error messages
  - [x] Divide dashboard features into components
    - [x] Insert note form
  - [x] Use mutation types (vuex)

- [x] Users can mark their notes as public

  - [x] Public notes are shown on the homepage

## Authentication

- [x] If logged in:

  - [x] Show logout button in navbar
  - [x] Show username in navbar

## Admin Page

- [x] Admin page that lists all users

  - [x] de-activate users
  - [x] view statistics
  - [x] can edit profile (username, password, role, etc...)

- [x] Admin can see any page on site
- [x] Rate limiting

  - [x] Prevent brute force logins

- [x] Password strength meter
