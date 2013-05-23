---
layout: post
title: "Meteor.js and Yelp OAuth Search"
date: 2013-05-22 18:07
comments: true
categories: [Programming, Hack Reactor, Meteor.js]
---

Revisiting my MeetMeet web app, I thought I'd share the code snippet for configuring Meteor.js to work with Yelp's search API. Meteor is still new and the smart packages are still being churned out every day, but one does not exist for Yelp search.

#### The Pre-Reqs

First things first, you'll need a Yelp developer account first, which can be found [here][yelp]. Once you sign up and get API keys, make sure you take down the following:

- Consumer Key
- Consumer Secret
- Token
- Token Secret

Then login to your mongo database with `meteor mongo` and run the following statement:

```
Accounts.loginServiceConfiguration.remove({service: "yelp"});
Accounts.loginServiceConfiguration.insert({
  service: "yelp",
  consumerKey: "YOUR_KEY_HERE",
  consumerSecret: "YOUR_SECRET_HERE",
  accessToken: "YOUR_TOKEN_HERE",
  accessTokenSecret: "YOUR_TOKEN_SECRET"
});
```

This inserts the yelp service into the same collection as the other Meteor OAuth helpers.  Nothing gets stored on the user account for Yelp, but it's not good practice to have your credentials in source code.

#### The Code

I had to utilize Meteor's built in OAuth1 helpers and a little trial and error, but the finished code is below:

```javascript
yelpQuery: function(search, isCategory, longitude, latitude) {
  console.log('Yelp search for userId: ' + this.userId + '(search, isCategory, lng, lat) with vals (', search, isCategory, longitude, latitude, ')');

  // Query OAUTH credentials (these are set manually)
  var auth = Accounts.loginServiceConfiguration.findOne({service: 'yelp'});

  // Add auth signature manually
  auth['serviceProvider'] = { signatureMethod: "HMAC-SHA1" };

  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  },
  parameters = {};

  // Search term or categories query
  if(isCategory)
    parameters.category_filter = search;
  else
    parameters.term = search;

  // Set lat, lon location, if available (SF is default location)
  if(longitude && latitude)
    parameters.ll = latitude + ',' + longitude;
  else
    parameters.location = 'San+Francisco';

  // Results limited to 5
  parameters.limit = 5;

  // Configure OAUTH parameters for REST call
  parameters.oauth_consumer_key = auth.consumerKey;
  parameters.oauth_consumer_secret = auth.consumerSecret;
  parameters.oauth_token = auth.accessToken;
  parameters.oauth_signature_method = auth.serviceProvider.signatureMethod;

  // Create OAUTH1 headers to make request to Yelp API
  var oauthBinding = new OAuth1Binding(auth.consumerKey, auth.consumerSecret, 'http://api.yelp.com/v2/search');
  oauthBinding.accessTokenSecret = auth.accessTokenSecret;
  var headers = oauthBinding._buildHeader();

  // Return data results only
  return oauthBinding._call('GET', 'http://api.yelp.com/v2/search', headers, parameters).data;
}
```

#### Input Parameters
- search: Search term or category names
- isCategory: Boolean stating whether 'search' parameter is a category
- longitude and latitude: Latitude and Longitude of user's location (optional)
  - Default location is statically set to San Francisco

You can use Yelp's provided sample program to test your API credentials work, but if everything works, you'll get back 5 yelp businesses as a javascript object.

*SOON TO COME*: An mrt package!


[yelp]: http://www.yelp.com/developers/documentation