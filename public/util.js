// This jQuery function makes a JSON object with {"name": <value>} instead of 
//  {"name": <name>, "value": <value>}
// Taken from http://stackoverflow.com/a/1186309

/*
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

setClick = function()
{
    clickX = d3.event.pageX;
    clickY = d3.event.pageY;
};

setPos = function()
{
    if(draggedPrim!==null)
    {
        draggedPrim.setPos();
    }
    else if(draggingVisuals)
    {
        visuals
        .attr("transform", "translate("+(visX+d3.event.pageX-clickX)+", "+(visY+d3.event.pageY-clickY)+")")
    }
    else if(activeScaling!==null)
    {
        activeScaling.adjustScale();
    }
};

stopDrag = function()
{
    if(activeScaling!==null)
    {
        activeScaling.stopScaling();
    }
    if(draggedPrim!==null)
    {
        draggedPrim.stopDrag();
    }
    if(draggingVisuals)
    {
        draggingVisuals=false;
        visX = visX + d3.event.pageX - clickX;
        visY = visY + d3.event.pageY - clickY;
    }
};

setInactive = function()
{
    if(activePrim!==null)
    {
        activePrim.setInactive();
    }
    activePrim = null;
};

keyPress = function()
{
    if(activePrim!==null)
    {
    }
    activePrim = null;  
};
*/

//returns SVG portion of the DOM as a string for passing back to server
grabSVG = function()
{
    SVGFile = "<?xml version='1.0' encoding='utf-8'?>"
  + "<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>"
  + (new XMLSerializer()).serializeToString(vis.node());
    return SVGFile;
};

//builds an object containing SVG to post to server.
buildSVGOBJ = function(userCall)
{
    countSVG++;
    var source = 'auto';
    if(userCall)
        source = 'user';
    var postObject =
    {
        type:'svg',
        visPrimUserID:visPrimUserID,
        count:countSVG,
        svgSource:source,
        svg:grabSVG()
    }
    return postObject;
};
