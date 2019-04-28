const replaceOnDocument = (pattern, orignalTxt, string, {target = document.body} = {}) => {
  [
    target,
    ...target.querySelectorAll("*:not(script):not(noscript):not(style)")
  ].forEach(({childNodes: [...nodes]}) => nodes
    .filter(({nodeType}) => nodeType === document.TEXT_NODE)
    .forEach((textNode) => {

      if (textNode.textContent.match(pattern)) {
        var parentEl = textNode.parentElement
        
        var surroundingTxtArr = textNode.textContent.split(pattern);
        textNode.textContent = surroundingTxtArr[0]
        if (surroundingTxtArr.length > 1) {
          for (var i=1; i < surroundingTxtArr.length; i++) {
            var newSpan = document.createElement('span')
            newSpan.innerHTML = "" //string;
            newSpan.style = "position: relative"
            
            var gapSpan = document.createElement('span')
            gapSpan.innerHTML = string;
            gapSpan.style = "opacity: 0";
            newSpan.appendChild(gapSpan)

            var replaceSpan = document.createElement('span')
            replaceSpan.innerHTML = string;
            replaceSpan.style = "position: absolute; top: 0; left: 0; transform: rotate(-8deg);";
            newSpan.appendChild(replaceSpan)
            
            parentEl.appendChild(newSpan);
            parentEl.append(surroundingTxtArr[i]);
          }
        }
        
        //textNode.textContent = textNode.textContent.replace(pattern, string)
      }
    }));
};



replaceOnDocument(/wonky/g, "wonky", "womky");


