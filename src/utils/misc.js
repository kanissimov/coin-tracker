export const round = (number, precision) => {
  var shift = function (number, exponent) {
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + exponent) : exponent));
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}
