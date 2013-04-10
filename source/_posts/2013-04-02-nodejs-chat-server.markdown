---
layout: post
title: "Node.js Chat Server"
date: 2013-04-02 12:43
comments: true
categories: [Programming, Hack Reactor]
---

<p>Today I bring to you my first web interactive project that I call "ChatBot".  This is an application that I built from the ground up using Javascript/jQuery/ajax on the front-end, and <a href="http://nodejs.org/">Node.js</a> on the backend.  Using the free and easy-to-use hosting platform <a href="heroku.com">Heroku</a>, you can browse to my web app right now <a class="big" href="http://infinite-caverns-3250.herokuapp.com/">here!</a></p>

{% img center /images/posts/chatbot-1.png 500 500 %}

<h3>So How Does it Work (from a technical standpoint)?</h3>
<ol>
  <li>A user browses to the website and subsequently submits an HTTP request</li>
  <li>Node server processes request and serves up HTML/JS/CSS pages</li>
  <li>jQuery/Javascript binds event handlers and callbacks to various DOM nodes and actions</li>
  <li>Using AJAX, Javascript periodically polls the server for new messages</li>
</ol>
<h3>Alright Mark, but what about for all us non-programmers?</h3>
<p>Right.  The features of what I implemented.  Basically, this is the next GoogleTalk in the making...  Well, not really, but it was a great project for learning more about ajax, Node.js, and the client-server programming paradigm.  A couple features that I implemented:</p>
<ul>
  <li>Room and Friend list updates dynamically with who has submitted chats</li>
  <li>Multiple chat rooms are supported, however, it has to be run manually (for now) by browsing to a url like http://infinite-caverns-3250.herokuapp.com/classes/&lt;roomName&gt;</li>
  <li>Chat room filtering of messages</li>
  <li>"Friend list" highlighting</li>
  <li>And of course, the ability to chat with others over the web</li>
</ul>
<p>Here is a small snippet of the client side send message function:</p>
{% codeblock lang:js %}
var sendMessage = function(username, message, roomname) {
  // Construct the message option to send to the server
  var message = {
    'username': document.username,
    'text': message,
    'roomname': roomname
  };

  // Send the message to the server via ajax
  $.ajax('http://' + window.location.host + '/classes/messages', {
    type: 'POST',
    contentType: 'json',
    data: JSON.stringify(message),
    error: function(xhr, status, msg) {
      console.log('POST ERROR!');
    },
    success: function(msg) {
      console.log('POST SUCCESS!');
    }
  });
};

{% endcodeblock lang:js %}
<p>Then on the server-side, I have a request handler function that handles JSON POST requests:</p>
{% codeblock lang:js %}
var handleRequest = function(request, response, headers) {
  var statusCode, fileName, retData = '';
  var urlPath = require('url').parse(request.url).path;

  if(urlPath === '/') {
    statusCode = 200;
    headers['Content-Type'] = 'text/html';
    retData = ejs.render(indexTemplate);
  } else if(request.method === 'POST') {
      statusCode = 200;
      retData = "\n";
      var data = '';

      // Buffer the post request's data
      request.on('data', function(chunk) {
        data += chunk;
      });

      // Process request now that the request has been completed
      request.on('end', function() {
        var message = JSON.parse(data);
        // console.log('New Message: ',message);
        // Only maintain 20 messages
        if(messages.length > 20) {
          messages.shift();
        }
        message['createdAt'] = new Date();
        message['updatedAt'] = new Date();
        messages.push(message);
        // console.log(messages);
      });
    }
  }
}
{% endcodeblock %}
