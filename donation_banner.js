// Change the font size of text in element by ratio.
let scaleFontBy = function (element, ratio) {
  let style = window.getComputedStyle(element),
      originalFontSize = parseFloat(style.fontSize),
      targetFontSize = originalFontSize * ratio;
  element.style.fontSize = targetFontSize + "px";
};

// Shrink the font size if the text in the given element is overflowing.
let fitTextInElement = function(element) {
  element.style.fontSize = "60px";
  let style = window.getComputedStyle(element);
  if (style.whiteSpace === "nowrap") {
    // Look for horizontal overflow.
    let elementWidth = element.getBoundingClientRect().width,
        paddingWidth = parseFloat(style.paddingLeft) +
        parseFloat(style.paddingRight),
        targetWidth = elementWidth - paddingWidth,
        textWidth = element.scrollWidth;
    // Compute the appropriate font size to make the text fit.
    let ratio = targetWidth / textWidth;
    scaleFontBy(element, ratio);
  } else {
    // Look for vertical overflow.
    let elementHeight = element.clientHeight,// parentElement
        // .getBoundingClientRect().height,
        paddingHeight = parseFloat(style.paddingTop) +
        parseFloat(style.paddingBottom),
        targetHeight = elementHeight - paddingHeight;
    // Wrapping causes somewhat difficult-to-predict overflow.
    // So shrink slightly and repeat.
    let ratio = 0;
    for (let i = 0; i < 100 && ratio < 1; ++i) {
      let currentHeight = element.scrollHeight;
      //console.log(`currentHeight: ${currentHeight}, targetHeight: ${targetHeight}, fontSize: ${style.fontSize}`);
      ratio = targetHeight < currentHeight ? 0.99 : 1;
      if (ratio < 1) {
        scaleFontBy(element, ratio);
      }
    }
  }
};

let updateTextSizes = function () {
  let bannerText = document.getElementById("banner-text");
  fitTextInElement(bannerText);
  let donateButton = document.getElementById("banner-donate-button");
  fitTextInElement(donateButton);
}

addEventListener("resize", updateTextSizes);
updateTextSizes();
