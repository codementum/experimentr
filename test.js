var svgTest = '<?xml version="1.0" encoding="utf-8"?>'
  + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
  + '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100">'
  + '<rect x="25" y="25" width="50" height="50" fill="green" stroke="black" stroke-width="1" />'
  + '</svg>'

saveSVG(['svg', 'asdfasdf', '2', 'user'].join('-')+'.svg', svgTest)
