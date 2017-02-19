# Cookiesnackjs
## About
- This library is to make cookies easy to manipulate.
- You can manipulate cookie string, or you can parse them into object types and manipulate them.

## Features
 - Simple cookie manipulation
 - No-Dependencies (simple, lightweight)

## Usage
- Install package via NPM
-       npm i -save cookiesnack
- Declare variable
-       const cookisnack =  require('cookiesnack');

#### How to use cookiesnack
#### as object
    const exampleCookieStr = 'a=11;b=22'; // 'a=11;b=22'
    const cookie = cookiesnack.parseCookie(exampleCookieStr); // Map { 'a' => '11', 'b' => '22'}
    const findKey = cookiesnack.findKeysByValue(cookie, '11'); // [ 'a' ]
    cookie.set('a','123'); // Map { 'a' => '123', 'b' => '22' }
    cookiesnack.editKey(cookie, 'a', 'x'); // Map { 'b' => '22', 'x' => '123' }
#### as string
    const exampleCookieStr = 'a=11;b=22'; // 'a=11;b=22'
    const findKey = cookiesnack.findKeysByValue(exampleCookieStr, '22'); // [ 'b' ]
    const editKey = cookiesnack.editKey(exampleCookieStr, 'a', 'z'); // z=11;b=22
#### Callback and Promise are also supported.
#### Callback :
    cookiesnack.parseCookie(cookieStr, function(cookieObj) {
        //do something...
    });
#### Promise:
    const cookiesnack = require('cookiesnack').withPromise();
    cookiesnack.parseCookie(cookieStr).then(cookieObj => {
        //do something...
    });


## Functions
    parseCookie(cookieStr, cb)
    // Convert the cookie string into Map object

    obj2str(cookie, cb)
    // Convert Parsed Cookie-Object into plain String.

    containsKey(cookieStr, key, cb)
    // Will return true if the key is in cookie object
    // Parsed Object does not need this function. just write cookie.has(key)

    findKeysByValue(cookie, value, cb)
    // This function will be returned the key if given value is in cookie string.

    findValueByKey(cookieStr, key, cb)
    // Will return the array of vlues if given key is in cookie string.
    // For Object, you can just find the value by simply typing cookie.key

    editKey(cookie, Okey, Nkey, cb)
    // Changes the key value in the cookie. The value of the original key will disappear.

    editValue(cookieStr, key, Nval, cb)
    // edits the value referenced by key to a new value
    // Parsed Object does not need this function. just write -> cookie.set('key', value)
