# UI Automation Framework

## Requirements
1.  NodeJS 14+
2.  Yarn -> npm install --global yarn

## Install
```
yarn
```

### Secrets
Create a .env file at the root with the following content.

```.env
MS_EMAIL=YOUR_TEK_EMAIL
MS_PASSWORD=YOUR_PASSWORD
```

The email/password is used by tests for authentication

## Run Tests

1.  All tests
```
npm run test
```

2.  Specify suite

```
npm run test -- --spec dashboard
```

Here 'dashboard' is pattern for the spec file name


## Reports
1.  Timeline Report - /reports
