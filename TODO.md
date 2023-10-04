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
- [x] Should be able to get information from a specific charge
- [ ] Should be able to cancel a specific charge
- [ ] Should be able to access a charge history
- [x] Should be able to get information of a specific product/service
- [x] Should be able to create products/services
- [x] Should be able to update products/services
- [x] Should be able to delete products/services
- [ ] Should be able to generate a checkout(generate a link containing information to from the charge)
- [ ] Should be able to send information from charge and product based on the checkout slug
- [ ] Should be able to retrieve user balance information
- [ ] Should be able update user balance information
- [ ]

Business rules

- [x] A user can't register if the email is already in use
- [x] Each user will be able to have multiple clients registered
- [ ] A user doesn't need to fill it's address information
- [ ] A user will posibly be restricted if address information is not filled
- [ ] The bill history will not be deleted if the user client or the product is deleted
- [ ] The user will have access to multiple plans that it can pay for more funcionalities.
- [ ] Every user will have a money balance information (money available to withdraw and money on hold)
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
- [x] Code list clients/products handlers(controllers);


Payment process break down
1. user clicks on button to charge client after filling information (client info, product/service, description, value)
2. request is sent to backend with information
3. backend receives request information
4. backend creates a new charge
4.5. backend generates a checkout slug that can point to charge information
4.5. backend will shoot notifications towards client --> later
5. client can access checkout through its slug and proceed to pay
6. if client chose billet, request will be sent to backend -> backend will call wepayements, generate a billet and send it back to client
6. if client chose pix, request will be sent to backend -> backend will call wepayements, generate a pix and send it back to client
6. if client chose credit card, => TODO: get info
7. depending on which payment method, the backend will receive a webhook request when charge is paid
8. backend will update the charge status

- when charge is paid, money will be available in wepayments after taxes
- we will transfer the money to nubank and update the user balance based on our split (how much money he has available to withdraw and so on)
- user will be able to withdraw the money available to its own account
- the withdraw process will start by transfering the money back from nubank to wepayments and shooting a payment to users account

refund
if client requests refund within certain amount of days, we are obligated to accept
user will leave losing money if refund is requested
money will be taken from user balance after our split plus taxes from wepayments and our split taxes, equalizing to the amount
and will be transferred to the client