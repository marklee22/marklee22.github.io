---
layout: post
title: "Backbone.js Tips"
date: 2013-04-15 16:45
comments: true
categories: [Programming, Backbone.js]
---

I've spent a lot of time the past couple of weeks learning a lot of new languages, technologies, and concepts.  One that I have  particularly been focusing on is [Backbone.js](), which is a fairly complicated library for such a small amount of code.  I just want to make it clear that this is not a post about how Backbone works, but instead is meant more as tips or "gotchas" for what I found difficult learning Backbone from scratch.

###Break out your code
Backbone forces you to provide structure around your javascript code.  You might as well go the extra step and create a standard folder structure to separate each Class because it's a good habit to have.  I set up a simple folder structure before I start every project for models, collections, and views to make includes easier.

<div class="aligncenter">
  {% img /images/posts/backbone-tips/backbone-files.png %}
  {% img /images/posts/backbone-tips/backbone-files2.png %}
</div>

###You should know Underscore.js
Backbone is written by the same developer who wrote [Underscore.js]() and the majority of the Underscore functionality has been rolled into Backbone for models and collections.  It's worth the hour or so to study Underscore to help utilize these helpers instead of writing your own for loops and callbacks.

###Collections cannot hold attributes/properties
I learned this the hard way, but you cannot call `this.set('attribute') = 'blah'` on a collection.  Collections are meant only to hold models and you'll get various errors if you try and call set/get methods on collections.

###Use triggers when children models need to communicate with the parent/grandparent
I spent the good first few hours asking myself "how can I get that model to do something based on another model?".  With several layers of models and collections, it's hard to picture how a lower tiered model communicates up the event chain.  Well, Backbone uses events and triggers to accomplish this.

Say I have an app model that holds a collection of card models.  In order for card to communicate with app, my collection would have a function that evaluates the state of a card or cards, and trigger an event if that condition is met.  Then in the app model, I would listen for that specific event to fire, and specify a callback to perform some action on my app.

Using my Blackjack App as an example, the app (model) listens for a player hand (collection), which checks each card (model) to determine if a player has blackjack or loses.  See the example below:

Hand Collection function to evaluate a player's total score
``` javascript
check: ->
  if @length is 2 and @scores()[1] is 21
    @trigger('blackjack', @)
  else if(@scores().every (score) -> score > 21)
    @trigger('lose', @)
```

The App Model that listens for the 'lose' and 'blackjack' events with associated callbacks
``` javascript
  @get('playerHand').on 'lose', @gameOver, this
  @get('playerHand').on 'blackjack', @blackJack, this
```
###jQuery event handlers are only initiated once
When your view is initialized, any event handlers declared in your events hash or initialize function will only be initialized once and inserted into the DOM.  If you end up deleting or replacing your html in your render function (For example: calling `this.$el.html([some rendered html]))`), your jQuery event handlers will be blown away.  In order to preserve these handlers, you would have to re-create them when you re-render your page.  A simple alternative to solve this however is to call `this.$el.children().detach()` to safely detach and reattach your jQuery children event handlers.

###Collection.fetch() resets your collection
Backbone has implemented code that uses jQuery.ajax.  If you're switching over to Backbone models and have previous ajax calls defined, you'll have to utilize the url property on your Collection/Models and call fetch() to pull the data down from the server.  The one thing I discovered is everytime you fetch your data from the server, the default action is to reset the collection.  I believe you can get around this by setting some flags in your options hash and/or defining your own Collection.parse function.  In general though, it's best to fetch once and sync data thereafter rather than fetching multiple times from your server.

###Conclusion
That's all from me (for now).  Hopefully someone will find this useful because Backbone is a tough concept to learn.  By no means am I an expert with Backbone, but I'm going to continue to practice more with it.


  [Backbone.js]: http://backbonejs.org "Backbone.js"
  [Underscore.js]: http://underscorejs.org "Underscore.js"
