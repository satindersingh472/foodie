# Foodie

## Introduction

Welcome to your second large project! This is going to be a fun one that will extend your knowledge of all things front-end.  
Here are you will find the documentation for each available API endpoint for you to work with.

## Important

To properly identify you the user, I have assigned to you your own API key.  
Make sure you have this at the ready as **you need it to make request**

### Sending your API key

Sending your API key with the foodie API is done using **headers**.  
Don't worry, it is fairly simple. Let's see an example:

```
// Making a GET request

axios.request({
    url: `https://innotechfoodie.ml/api/client`,
    headers: {
        `x-api-key`: `your_api_key_here`
    }
}).then((response) => {
    // Success code here
}).catch((error) => {
    // Failure code here
});
```

Notice within the request object I have passed a new key **headers** as an object.  
In the foodie API, you pass a header named `x-api-key` which will be used to identify you.  
**You must pass this header on every API request to the foodie API**

# Endpoints

## Client

**URL: https://innotechfoodie.ml/api/client**  
Supported HTTP Methods: **GET, POST, PATCH, DELETE**

### GET

Returns information about a single client, will error if the client_id does not exist.

**Required Params:**

```
{
    client_id: (number)
}
```

**Data Returned**

```
{
    created_at: (string),
    email: (string),
    first_name: (string),
    last_name: (string),
    id: (number),
    image_url: (string),
    username: (string)
}
```

### POST

Creates a new client that can now use the system. Also returns a valid login token meaning the user is now logged in after sign up.  
Will error if there is a duplicate username or password (the user already exists)

**Required Data:**

```
{
    email: (string),
    first_name: (string),
    last_name: (string),
    image_url: (string),
    username: (string),
    password: (string)
}
```

**Data Returned**

```
{
    client_id: (number),
    token: (string)
}
```

### PATCH

Modify an existing user if you have a valid token. Note that the token is sent as a header.

**Required Headers:**

```
{
    token: (string)
}
```

**Optional Data:** Send 1 or more of these to update the client that owns the given token

```
{
    email: (string),
    first_name: (string),
    last_name: (string),
    image_url: (string),
    username: (string),
    password: (string)
}
```

**No Data Returned**

### DELETE

Delete an existing user if you have a valid token and password. Note that the token is sent as a header.

**Required Headers:**

```
{
    token: (string)
}
```

**Required Data:**

```
{
    password: (string)
}
```

**No Data Returned**

## Client-Login

**URL: https://innotechfoodie.ml/api/client-login**  
Supported HTTP Methods: **POST, DELETE**

### POST

Log a client in. Will error if the email / password don't exist in the system.

**Required Data:**

```
{
    email: (string),
    password: (string)
}
```

**Data Returned**

```
{
    client_id: (number),
    token: (string)
}
```

### DELETE

Delete an existing token. Will error if the token sent does not exist.

**Required Headers:**

```
{
    token: (string)
}
```

**No Data Returned**
