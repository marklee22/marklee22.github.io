// Generated by CoffeeScript 1.6.2
(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      _ref = AppView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AppView.prototype.template = _.template('\
    <% if(!isDealerTurn && !isGameOver) { %>\
      <button class="hit-button btn btn-danger">Hit</button> <button class="stand-button btn btn-success">Stand</button>\
    <% } %>\
    <% if(isGameOver) { %>\
      <button class="new-round-button btn btn-info">New Round</button>\
      <div class="status status-<%= status %> animated fadeIn">You <%= status %>!</div>\
    <% } %>\
    <div class="player-hand-container"></div>\
    <div class="dealer-hand-container"></div>\
  ');

    AppView.prototype.events = {
      "click .hit-button": function() {
        return this.model.get('playerHand').hit();
      },
      "click .stand-button": function() {
        return this.model.get('playerHand').stand();
      },
      "click .new-round-button": function() {
        return this.model.newRound();
      }
    };

    AppView.prototype.initialize = function() {
      this.render();
      this.model.on('change:isDealerTurn', function() {
        return this.render();
      }, this);
      this.model.on('change:isGameOver', function() {
        return this.render();
      }, this);
      return this.model.on('change:status', function() {
        return this.render();
      }, this);
    };

    AppView.prototype.render = function() {
      this.$el.children().detach();
      this.$el.html(this.template(this.model.attributes));
      this.$('.player-hand-container').html(new HandView({
        collection: this.model.get('playerHand')
      }).el);
      return this.$('.dealer-hand-container').html(new HandView({
        collection: this.model.get('dealerHand')
      }).el);
    };

    return AppView;

  })(Backbone.View);

}).call(this);

/*
//@ sourceMappingURL=AppView.map
*/
