# DevConnect Api List

## auth router

- POST/singup
- POST/login
- POST/logout

## profile router

- GET/profile/view
- GET/profile/edit
- POST/profile/password
- DELETE/profile

## connection request router

- POST/request/send/interested/:userId
- POST/request/send/ignored/:userId
- POST/request/review/accepted/:requestId
- POST/request/review/regected/:requestId

## user router

- GET/user/connections
- GET/user/requests
- GET/user/feeds
