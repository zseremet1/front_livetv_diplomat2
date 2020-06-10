//odd converter

export function FormatOdd(data) {
  const type = 0;
  switch (type) {
    case 1: // SAD
      return DecToAmer(data);
    case 2: // Malaysia
      return DecToMale(data);
    case 3: // Indoensia
      return DecToIndo(data);
    case 4: // Hong Kong
      return DecToHongKong(data);
    case 5: // England (Fraction)
      return DecToFrac(data);
    default:
      // if (data > 9 && (data * 10) % 10 == 0) {
      //     tmpDec = 0;
      //     return parseFloat(data).format(tmpDec, 3, '.', ',')
      // }
      return parseFloat(data).toFixed(2).replace(".", ",");
  }
}

function DecToFrac(decimal) {
  decimal = parseFloat(decimal).toFixed(2);
  var num = (decimal - 1) * 10000;
  var dom = 10000;

  num = Math.round(num);
  dom = Math.round(dom);

  var a = reduce(num, dom);
  num = a[0];
  dom = a[1];

  return num + "/" + dom;
}
function reduce(a, b) {
  var n = new Array(2);
  var f = GCD(a, b);
  n[0] = a / f;
  n[1] = b / f;
  return n;
}
function GCD(num1, num2) {
  var a;
  var b;
  if (num1 < num2) {
    a = num2;
    b = num1;
  } else if (num1 > num2) {
    a = num1;
    b = num2;
  } else if (num1 === num2) {
    return num1;
  }
  while (1) {
    if (b === 0) {
      return a;
    } else {
      var temp = b;
      b = a % b;
      a = temp;
    }
  }
}

//

function DecToAmer(data) {
  // SAD
  var result = "";
  if (data >= 2) {
    result = "+" + ((data - 1) * 100).toFixed(0);
    return result;
  } else {
    result = "-" + Math.abs(-100 / (data - 1)).toFixed(0);
    return result;
  }
}

function DecToIndo(data) {
  // Indonesia
  data = DecToAmer(data);
  var tmp = data.toString().charAt(0);
  data = parseFloat(data.replace(tmp, ""));
  return tmp + (data / 100).toString();
}

function DecToMale(data) {
  // Malaysia
  var decPlace = 3;
  if (data > 999) {
    decPlace = getSumOfDecimalPlaces(data);
  }
  var tmp = "+";
  if (data > 2) {
    tmp = "-";
  }
  data = DecToIndo(data);

  return tmp + (1 / Math.abs(data)).toFixed(decPlace);
}
function DecToHongKong(data) {
  // Hong Kong
  return (data - 1).toFixed(2);
}

function getSumOfDecimalPlaces(x) {
  x = parseInt(x);
  var counter = 0;
  while (x) {
    x = parseInt(x / 10);
    counter++;
  }
  return counter;
}

// odd converter END
