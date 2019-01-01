const symbolSize = 20;
let matrix;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  textSize(symbolSize);
  stroke(0);

  matrix = new Matrix();
}

function draw() {
  background(0, 150);
  matrix.render();
}

class Matrix {
  constructor() {
    this._columns = [];
    this._numberOfColumns = round(width / symbolSize);

    this._initMatrix();
  }

  _initMatrix() {
    for (let i = 0; i < this._numberOfColumns; i++) {
      this._columns.push(new SymbolColumn(
        i * symbolSize, round(random(-1000, 0))
      ));
    }
  }

  render() {
    this._columns.forEach(function(column) {
      column.render();
    });
  }
}

class SymbolColumn {
  constructor(x, y) {
    this._symbols = [];
    this._numberOfSymbols = round(random(10, 30));

    this._x = x;
    this._y = y;
    this._speed = round(random(4, 15));

    this._generateSymbols();
  }

  _generateSymbols() {
    let isFirst = true;

    for (let i = 0; i < this._numberOfSymbols; i++) {
      this._symbols.push(new Symbol(
        this._x, this._y - i*symbolSize,
        this._speed, 255 - i*round(255 / this._numberOfSymbols),
        isFirst
      ));
      isFirst = false;
    }
  }

  render() {
    this._symbols.forEach(function(symbol) {
      symbol.render();
    });
  }
}

class Symbol {
  constructor(x, y, speed, opacity, isFirst) {
    this._x = x;
    this._y = y;
    this._speed = speed;
    this._switchInterval = round(random(5, 30));

    this._opacity = opacity;
    this._isFirst = isFirst;

    this._value;

    this._setToRandomSymbol();
  }

  _setToRandomSymbol() {
    this._value = String.fromCharCode(
      0x30a0 + round(random(0, 96))
    );
  }

  render() {
    this._isFirst ? fill(118, 216, 159) : fill(57, 192, 70, this._opacity);
    text(this._value, this._x, this._y);

    this._fallDown();
    if (frameCount % this._switchInterval === 0) {
      this._setToRandomSymbol();
    }
  }

  _fallDown() {
    this._y += this._speed;

    if (this._y >= height) {
      this._y -= height;
    }
  }
}
