An app related to finance and stuff

Functional Logic

- [x] Should be able to register
- [x] Should be able to authenticate
- [x] Should be able to update some of it's personal information
- [x] Should be able to fill it's personal address
- [ ]
- [x] Should be able to get information of a specific client
- [x] Should be able to create clients
- [x] Should be able to update a client
- [ ] Should be able to delete a client
- [x] Should be able to create a charge
- [ ] Should be able to get information from a specific charge
- [ ] Should be able to cancel a specific charge
- [ ] Should be able to access a charge history
- [x] Should be able to get information of a specific product/service
- [x] Should be able to create products/services
- [x] Should be able to update products/services
- [x] Should be able to delete products/services
- [ ]
- [ ]
- [ ]

Business rules

- [x] A user can't register if the email is already in use
- [x] Each user will be able to have multiple clients registered
- [ ] A user doesn't need to fill it's address information
- [ ] A user will posibly be restricted if address information is not filled
- [ ] The bill history will not be deleted if the user client or the product is deleted
- [ ] The user will have access to multiple plans that it can pay for more funcionalities.
- [ ]
- [ ]

Non Functional Logic

- [x] The user password should be encrypted
- [x] All records will be stored in a PostgreSQL database
- [x] User will be identified by JWT on requests
- [ ]
- [ ]
- [ ]

Questions

- [ ] Can a user bill it self?
- [ ] Does the user clients need to have addresses? Can it be optional?
- [ ]
- [ ]
- [ ]

Fixes

- [ ] Need to fix prisma schema file: adding cascade actions
- [ ]
- [ ]
- [ ]

Temporary todos

- [x] Add email column to user clients
- [ ]
