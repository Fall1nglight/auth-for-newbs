# Auth for Newbs

Add JWT-based authentication to a Node/Express/Mongo app.

## Todo

- [ ] Refactor client-side

  - [x] Use axios instead of fetch
  - [x] Use Vuex
    - [x] Create different stores
      - [x] Auth & User
      - [x] Notes
  - [ ] Proper way to display error messages
  - [ ] Divide dashboard features into components
    - [ ] Insert note form
  - [ ] Use mutation types (vuex)

- [ ] Users can mark their notes as public

  - [ ] Public notes are shown on the homepage
    - [ ] Filter by different options (date, username)

- [x] Admin Dashboard Functionality
  - [x] View statistics
  - [x] User editor

## Authentication

- [] If logged in:

  - [x] Show logout button in header
  - [ ] Show user icon and username in header
  - [ ] User can upload profile picture

## STRETCH

- [ ] Sort notes by date created.

- [ ] Users can mark notes as public
  - [ ] Notes show up on profile

## Admin Page

- [ ] Admin page that lists all users

  - [ ] de-activate users

- [ ] Admin can see any page on site
- [x] Rate limiting

  - [x] Prevent brute force logins

- [x] Password strength meter!
