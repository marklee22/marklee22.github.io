// Generated by CoffeeScript 1.6.2
(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Card = (function(_super) {
    __extends(Card, _super);

    function Card() {
      _ref = Card.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Card.prototype.initialize = function(params) {
      this.set({
        revealed: true,
        value: !params.rank || 10 < params.rank ? 10 : params.rank,
        suitName: ['Diamonds', 'Clubs', 'Hearts', 'Spades'][params.suit],
        rankName: (function() {
          switch (params.rank) {
            case 0:
              return 'King';
            case 1:
              return 'Ace';
            case 11:
              return 'Jack';
            case 12:
              return 'Queen';
            default:
              return params.rank;
          }
        })()
      });
      return this.makeBackground(params.suit, params.rank);
    };

    Card.prototype.flip = function() {
      this.set('revealed', !this.get('revealed'));
      return this;
    };

    Card.prototype.makeBackground = function(suit, rank) {
      var cardid, gapHor, gapVer, height, length, offsetLeft, offsetTop;

      offsetTop = 47;
      offsetLeft = 79;
      gapHor = 8.4;
      gapVer = 10.75;
      length = 124;
      height = 175;
      cardid = (function() {
        switch (false) {
          case rank !== 0:
            return 11;
          case rank !== 1:
            return 12;
          default:
            return rank - 2;
        }
      })();
      this.set('top', offsetTop + (suit * gapVer) + (suit * height));
      return this.set('left', offsetLeft + (cardid * gapHor) + (cardid * length));
    };

    return Card;

  })(Backbone.Model);

}).call(this);

/*
//@ sourceMappingURL=Card.map
*/
