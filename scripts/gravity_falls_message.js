var A1Z26, Atbash, BinaryString, Caesar, Cipher, Vigenere,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Array.prototype.rotate = (function() {
  var splice, unshift;
  unshift = Array.prototype.unshift;
  splice = Array.prototype.splice;
  return function(count) {
    var len;
    len = this.length >>> 0;
    count = count >> 0;
    unshift.apply(this, splice.call(this, count % len, len));
    return this;
  };
})();

Cipher = (function() {
  var alpha, letter, rAlpha;

  function Cipher(message) {
    this.message = message;
  }

  alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  rAlpha = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';

  Cipher.prototype.alphabet = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = alpha.length; _i < _len; _i++) {
      letter = alpha[_i];
      _results.push(letter);
    }
    return _results;
  })();

  Cipher.prototype.rAlphabet = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = rAlpha.length; _i < _len; _i++) {
      letter = rAlpha[_i];
      _results.push(letter);
    }
    return _results;
  })();

  return Cipher;

})();

A1Z26 = (function(_super) {
  __extends(A1Z26, _super);

  function A1Z26() {
    return A1Z26.__super__.constructor.apply(this, arguments);
  }

  A1Z26.prototype.encode = function() {
    var answer, letter;
    answer = (function() {
      var _i, _len, _ref, _results;
      _ref = this.message;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        letter = _ref[_i];
        _results.push((function(letter, alphabet) {
          this.alphabet = alphabet;
          if (/-/.test(letter)) {
            return '';
          }
          if (/\W/.test(letter)) {
            return letter;
          }
          return alphabet.indexOf(letter) + 1;
        })(letter, this.alphabet));
      }
      return _results;
    }).call(this);
    return answer.join('-').replace(/-?(\s|\W)-?/g, "$1");
  };

  A1Z26.prototype.decode = function() {
    var answer, letter, msg;
    msg = this.message.split(/( |\W)/);
    answer = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = msg.length; _i < _len; _i++) {
        letter = msg[_i];
        _results.push((function(letter, alphabet) {
          this.alphabet = alphabet;
          if (/-/.test(letter)) {
            return '';
          }
          if (/\W/.test(letter)) {
            return letter;
          }
          return alphabet[parseInt(letter) - 1];
        })(letter, this.alphabet));
      }
      return _results;
    }).call(this);
    return answer.join('');
  };

  return A1Z26;

})(Cipher);

Atbash = (function(_super) {
  __extends(Atbash, _super);

  function Atbash() {
    return Atbash.__super__.constructor.apply(this, arguments);
  }

  Atbash.prototype.encode = function() {
    var answer, letter;
    answer = (function() {
      var _i, _len, _ref, _results;
      _ref = this.message;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        letter = _ref[_i];
        _results.push((function(letter, alphabet, rAlphabet) {
          this.alphabet = alphabet;
          this.rAlphabet = rAlphabet;
          if (/[^A-Z]/.test(letter)) {
            return letter;
          } else {
            return this.alphabet[this.rAlphabet.indexOf(letter)];
          }
        })(letter, this.alphabet, this.rAlphabet));
      }
      return _results;
    }).call(this);
    return answer.join('');
  };

  Atbash.prototype.decode = function() {
    return this.encode();
  };

  return Atbash;

})(Cipher);

Caesar = (function(_super) {
  __extends(Caesar, _super);

  function Caesar(message, shift, key) {
    this.message = message;
    this.shift = shift;
    this.key = key;
    this.shift || (this.shift = 3);
    if (this.key) {
      key = this.key.replace(/[^A-Z]/ig, '').toUpperCase();
    }
    if (key) {
      this.key = (function() {
        var letter, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = key.length; _i < _len; _i++) {
          letter = key[_i];
          _results.push(letter);
        }
        return _results;
      })();
    }
  }

  Caesar.prototype.encode = function() {
    var answer, letter;
    answer = (function() {
      var _i, _len, _ref, _results;
      _ref = this.message;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        letter = _ref[_i];
        _results.push((function(letter, message, shift, key, alphabet) {
          var ind, shift_value;
          this.message = message;
          this.shift = shift;
          this.key = key;
          this.alphabet = alphabet;
          shift_value = key ? alphabet.indexOf(key[0]) : shift;
          if (/\W/.test(letter)) {
            return letter;
          } else {
            ind = alphabet.indexOf(letter) + shift_value;
            ind = ind >= 26 ? ind - 26 : ind;
            if (key) {
              key.rotate(1);
            }
            return alphabet[ind];
          }
        })(letter, this.message, this.shift, this.key, this.alphabet));
      }
      return _results;
    }).call(this);
    return answer.join('');
  };

  Caesar.prototype.decode = function() {
    var answer, letter;
    answer = (function() {
      var _i, _len, _ref, _results;
      _ref = this.message;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        letter = _ref[_i];
        _results.push((function(letter, message, shift, key, alphabet) {
          var ind, shift_value;
          this.message = message;
          this.shift = shift;
          this.key = key;
          this.alphabet = alphabet;
          shift_value = (key ? alphabet.indexOf(key[0]) : shift) * -1;
          if (/\W/.test(letter)) {
            return letter;
          } else {
            ind = alphabet.indexOf(letter) + shift_value;
            ind = ind >= 26 ? ind - 26 : ind;
            if (ind < 0) {
              ind = 26 + ind;
            }
            if (key) {
              key.rotate(1);
            }
            return alphabet[ind];
          }
        })(letter, this.message, this.shift, this.key, this.alphabet));
      }
      return _results;
    }).call(this);
    return answer.join('');
  };

  return Caesar;

})(Cipher);

BinaryString = (function(_super) {
  __extends(BinaryString, _super);

  function BinaryString() {
    return BinaryString.__super__.constructor.apply(this, arguments);
  }

  BinaryString.prototype.encode = function() {
    return this.message.replace(/.{1}/g, function(match) {
      var str;
      str = match.charCodeAt(0).toString(2);
      return '00000000'.substring(0, 8 - str.length) + str;
    });
  };

  BinaryString.prototype.decode = function() {
    return this.message.replace(/[01]{8}/g, function(match) {
      return String.fromCharCode(parseInt(match, 2));
    });
  };

  return BinaryString;

})(Cipher);

Vigenere = (function(_super) {
  __extends(Vigenere, _super);

  function Vigenere(message, key) {
    this.message = message;
    this.key = key;
  }

  Vigenere.prototype.encode = function() {
    return new Caesar(this.message, null, this.key).encode();
  };

  Vigenere.prototype.decode = function() {
    return new Caesar(this.message, null, this.key).decode();
  };

  return Vigenere;

})(Cipher);