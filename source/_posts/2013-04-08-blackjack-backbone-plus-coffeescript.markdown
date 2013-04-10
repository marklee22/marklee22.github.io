---
layout: post
title: "Blackjack: Backbone + CoffeeScript"
date: 2013-04-08 16:09
comments: true
categories: [Hack Reactor, Programming, Projects]
---

{% img float-right /images/posts/blackjack/specs.png 400 360 %}
With today's post, I bring to you my first interactive game written entirely in javascript.  As always if you're non-technical, feel free to jump straight to the bottom of this post to see the app.  I really enjoyed this project because I was able to accomplish three things I've been meaning to spend more time on:

  - Get more practice with [Backbone.js][]
  - Play around with [CoffeeScript][]
  - Develop code using a [test driven strategy][] (TDD)

### TDD

Testing is a newfound concept for me when it comes to programming, but I am constantly improving my ability to write good test coverage for all my projects here.  For this project specifically, I decided to use [Jasmine][] as my testing suite.  I found two things key to writing tests for Backbone:

  - Learn how spies work.  Seriously, it is the key to the puzzle
  - Build my tests from the bottom up, meaning I focus on the lowest level models first and proceed up the model chain

What I'm finding out here at Hack Reactor is that no one enjoys testing except me.  I think it's one part OCD and one part understanding that it's the agile way.  I feel like despite it doubled my implementation time, it made me think long and hard about how the application should work.  Once I figured out how spies work and where to initialize them, I was quickly moving through additional tests involving triggers and chained function calls.

### CoffeeScript vs Javascript

In case you've never heard of CoffeeScript, it is quintessentially what C is to Assembly.  It abstracts the javascript language and provides several helpers or "shortcuts" that eventually compiles into javascript code.  I think using CoffeeScript or Javascript is simply a matter of taste.  Although I enjoyed writing less lines of code and *not* having to use semi-colons.  The browser still runs on javascript, and when something breaks, I have to dig through the compiled JS files to backtrace what line of CoffeeScript is failing.  *Bottom line though*: You should probably be familiar with both.

I definitely see the advantages of writing CoffeeScript, and wouldn't be surprised if more and more companies use it in the future.  I'm just not a fan of optional parentheses and replacing 'this' with '@'.  It doesn't look right to me yet coming from years of coding in C++, Java, and PHP, but over time I could see myself changing my sentiment.

Let's look at a basic example here of the hit() method for a Hand.

##### CoffeeScript
{% codeblock lang:coffeescript %}
  hit: ->
    @add(@deck.pop()).last() unless (@scores().every (score) -> score > 21)
{% endcodeblock %}

##### Javascript Equivalent
{% codeblock lang:js %}
  Hand.prototype.hit = function() {
    if (!(this.scores().every(function(score) {
      return score > 21;
    }))) {
      return this.add(this.deck.pop()).last();
    }
  };
{% endcodeblock %}

As you can see CoffeeScript is concise, clean, and less characters overall.  I'm just not 'fluent' in the language yet, so in my brain I am converting the CoffeeScript to javascript anyways.

### Backbone Models/Collections/Views

Overall, there are three model classes in play here:

  1. App - Top level model that controls the game functionality with the player/dealer
  2. Deck - Collection of 52 unique Card models
  3. DiscardPile - Collection of Card models that is initially empty for holding all previously played cards
  4. Hand - Collection of Cards with helper methods like hit, stand, getScore, etc.
  5. Card - Base model representing a card (suit and value)

Since our app will only display the app, hand, and cards, I only needed View classes for those models.  I feel the hardest part about learning Backbone is to understand what code goes where, and once you engrain the idea that you should avoid logic in views, it becomes much easier to visualize the file structure.

I found testing to be a big help for this project specifically.  Normally, I'd make a code change, refresh the web browser, and simulate the user functionality I implemented manually.  With extensive tests, I simply changed that process to verify all my tests are still passing in case I broke something unexpectedly.  Of course at the end, I decided to spend a few hours cleaning up the UX/UI to polish it up.  It's amazing how 1-2 hours of CSS work + images + animations can make something look that much better.  I used to hate doing CSS, but I'm starting to grow fond of it as it is the final layer of polish to every application.  I also decided to use sprites for the card images instead of individual images.  It's an interesting concept that I learned reading a blog in [reddit programming][] which is a concept I'm sure will come in handy in the future!

### Now for the app itself!

This is a basic Blackjack application.  It does not support *betting* (unfortunately), *splits*, or *dealer insurance*.  I hope you enjoy this and eventually I will release the gist when the repo is public after my program at Hack Reactor is complete.  Check back soon!

<div id="blackjackApp">
  <script src="{{root_url}}/javascripts/posts/blackjack/models/Card.js"></script>
  <script src="{{root_url}}/javascripts/posts/blackjack/models/Hand.js"></script>
  <script src="{{root_url}}/javascripts/posts/blackjack/models/DiscardPile.js"></script>
  <script src="{{root_url}}/javascripts/posts/blackjack/models/Deck.js"></script>
  <script src="{{root_url}}/javascripts/posts/blackjack/models/App.js"></script>
  <script src="{{root_url}}/javascripts/posts/blackjack/views/CardView.js"></script>
  <script src="{{root_url}}/javascripts/posts/blackjack/views/HandView.js"></script>
  <script src="{{root_url}}/javascripts/posts/blackjack/views/AppView.js"></script>
  <script src="{{root_url}}/javascripts/posts/blackjack/main.js"></script>
</div>

  [Backbone.js]: http://backbonejs.org "Backbone.js"
  [test driven strategy]: http://en.wikipedia.org/wiki/Test-driven_development "TDD"
  [coffeescript]: http://coffeescript.org/ "CoffeeScript"
  [jasmine]: http://pivotal.github.io/jasmine/ "Jasmine"
  [reddit programming]: http://reddit.com/r/programming "Programming"
