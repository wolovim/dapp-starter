pragma solidity ^0.4.24;

contract SimpleContract {
  event Update(string text);

  string public text;

  constructor(string _text) public {
    text = _text;
  }

  function updateText(string _text) public {
    text = _text;
    emit Update(_text);
  }
}
