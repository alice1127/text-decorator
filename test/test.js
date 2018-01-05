
var assert = require('assert');
var textDecorator = require('../src/index');

var decorateBold = function( text ) {
  return `**${text}**`;
};

describe('textDecorator', function(){
  describe('#decorate(html, keywords, replace)', function(){

    it('should return true when value is matched', function(){
      var result = textDecorator.decorate('This is a dog.', ['dog'], decorateBold);

      assert.equal(true, result.text === 'This is a **dog**.');
      assert.equal(true, result.matches.indexOf('dog') > -1);
    });

    it('should return true when value is matched by words', function(){
      var result = textDecorator.decorate('The Airwaves is cool.The ice is also cool.', ['airwaves', 'cool'], decorateBold);

      assert.equal(true, result.text === 'The **Airwaves** is **cool**.The ice is also **cool**.');
      assert.equal(true, result.matches.length === 2);
    });

    it('should return true when value is matched by max length word', function(){
      var result = textDecorator.decorate('This is a [decorator].', ['decorator', '[decorator]'], decorateBold);

      assert.equal(true, result.text === 'This is a **[decorator]**.');
      assert.equal(true, result.matches.length === 1);
    });

    it('should return true when value is matched by inner content', function(){
      var result = textDecorator.decorate('這是一個裝飾者。', ['裝飾者'], decorateBold);

      assert.equal(true, result.text === '這是一個**裝飾者**。');
      assert.equal(true, result.matches.length === 1);
    });

    it('should return true when opts use a `ignoreTexts` parameter', function(){
      var result = textDecorator.decorate('這是一個裝飾者，不是飾者。', ['飾者'], decorateBold, {ignoreTexts:['裝飾者']});

      assert.equal(true, result.text === '這是一個裝飾者，不是**飾者**。');
      assert.equal(true, result.matches.length === 1);
    });

    it('should return true when an word of english is beside tag', function() {
      var result = textDecorator.decorate('<p>This is a dog</p>', ['this', 'dog'], decorateBold);
      assert.equal(true, result.text === '<p>**This** is a **dog**</p>');
    });

  });
});

