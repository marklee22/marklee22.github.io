---
layout: post
title: "My First Hackathon"
date: 2013-05-05 14:43
comments: true
categories: [Programming, Hack Reactor]
---

This weekend, we took some time off from the regular day-to-day and all went to a Hackathon called [Angel Hack][angelHack]. I went in as a team of two with my classmate Philip, and our idea was to create a random recipe generator that integrated with Instagram. We felt that our idea was simple enough to finish in 24 hours, as well as, creative enough to distinguish our product from the other apps generated in the past.

{% img center /images/posts/angelhack/RecipeGram-mock.png 300 150 %}
<span class="caption text-center">Our whiteboard mocks the night before</span>

###Tech Stack
Due to time restraints, resource limitations, and it being our first Hackathon, we chose [Meteor.js][meteor]. Both Philip and I were familiar with Meteor and the single page app was necessary if we were going to build a mobile site.

###The Beginning
We showed up at 9am at Yammer's HQ on 9th and Market. The building is also Twitter's HQ and it's clear that Twitter isn't the only one balling in that building. The first thought that came to my mind upon entering was A) What does Yammer do? B) How the hell do they make this much money?

There's a mingle session where sponsors setup booths to encourage you to use their services. After briefly walking around and talking to the various sponsors about their APIs and listening to the prizes they had to offer, we decided to change our plan and use [Pearson's][pearson] API. However, shortly after going down that road, we scrapped it and switched back to [Yummly][yummly]. Philip was front-end and I was back-end, and we collaborated throughout the afternoon developing side-by-side.

###The Middle
Around 8pm, we ran into a brick wall with our original idea. We had all our integrations working and pretty much had a finished product without styling, but the Instagram search capabilities were lacking what we wanted to do. To give you an example, say you were randomly given the recipe "Amish Breakfast Casserole". NO ONE on Instagram tags their photo with "#AmishBreakfastCasserole" unfortunately, and there isn't a way to perform a Google-like image search using their API.

We quickly brainstormed for an alternative and thought we came up with our savior: *Search for each word and create an Instagram picture-like recipe*. For example, find the most popular picture for the terms "Amish", "Breakfast", and "Casserole" separately and display each one below the recipe. Once again Instagram's API search capabilities fucked us and is only capable of returning recent photos instead of most popular photos for a tag. Although some of the photos made sense (and were somewhat humorous), some 12 year old girl who tagged her photo with a million hashtags ruined our search algorithm.

###The End
The good news is we got to go home and sleep in our own beds. The bad news is we scrapped our idea and decided not to submit it for presentation. I will however, show you the screenshots of our stopping point below and the code can be found [here][recipeGram].

<div class="center inline-block">
{%img /images/posts/angelhack/RecipeGram-home.png 300 150 %}
{%img /images/posts/angelhack/RecipeGram-recipe.png 300 150 %}
{%img /images/posts/angelhack/RecipeGram-instagram.png 300 150 %}
<span class="caption text-center">Our actual screens</span>
</div>

As you can see, we didn't style the application, but would have made it look nicer if we decided to present instead.

[angelHack]: http://angelhack.com/
[meteor]: http://meteor.com/
[pearson]: http://www.pearson.com/
[yummly]: http://www.yummly.com/
[recipeGram]: http://github.com/marklee22/recipeGram