function getDefaultParameters()
{
    var parameters = {};
    parameters["fontface"] = "Courier New";
    parameters["fontsize"] = 18;
    parameters["backgroundColor"] = { r:255, g:255, b:255, a:1.0 };
    parameters["textAlign"] = "left";
    parameters["fontStyle"] = "Normal";
    parameters["fontColor"] = "rgba(0, 0, 0, 1.0)";
    parameters["lineSpacing"] = 1.1;
    return parameters;
}

function getStyleParameters(token)
{
    var parameters = getDefaultParameters();

    

    switch(token.type)
    {
        case 5://identifier
            break;
        
        case 101:
        case 102:
        case 103:
        
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        
        case 243:
		
		case 214:
        
        case 117:
            parameters["fontStyle"] = "bold";
            parameters["fontColor"] = "rgba(120, 0, 80, 1.0)";
            break;
        
        case 32:
        case 33:
        case 34:
        
        case 38:
        
        case 225:
        case 226:
        case 227:
            parameters["fontStyle"] = "bold";
            parameters["fontColor"] = "rgba(0, 0, 255, 1.0)";
            break;

        case 1:
        case 2:
        case 35:
        case 66:
        case 67:
        case 36:
        case 14:
        case 11:
        case 12:
        case 168:
        case 169:
        case 170:
        case 171:
        case 172:
        case 173:
        case 174:
        case 175:
        case 176:
        case 177:
        case 178:
        case 80:
        case 79:
        case 3:
        case 4:
        case 71:
        case 9:
        case 63:
        case 62:
        case 8:
        case 70:
        case 72:
        case 10:
        case 68:
        case 69:
        case 7:
        case 86:
        case 110:
        case 95:
        case 15:
        case 166:
        case 64:
        case 81:
        case 154:
        case 90:
        case 6:
        case 167:
            parameters["fontStyle"] = "bold";
            parameters["fontColor"] = "rgba(0, 0, 120, 1.0)";
            break;
            
        case 45:
            parameters["fontColor"] = "rgba(120, 120, 120, 1.0)";
            break;
            
        case 1001:
        case 1002:
            parameters["fontColor"] = "rgba(0, 120, 0, 1.0)";
            break;
        case 1003:
            parameters["fontColor"] = "rgba(0, 120, 80, 1.0)";
            break;
        
    }
                        
    return parameters;
}

function makeCodeCanvas(tokens)
{
    var cc = makeConstCodeCanvas(tokens, 100, 100);
    var margin = {"left":cc.fontWidth, "right":cc.fontWidth};
    cc = makeConstCodeCanvas(tokens, cc.width, cc.height, margin);
    return cc;
}

function makeConstCodeCanvas(tokens, width, height, margin)
{
    var leftMargin = 0;
    var rightMargin = 0;
    if(margin !== undefined)
    {
        if(margin.left !== undefined)
            leftMargin = margin.left;
        if(margin.right !== undefined)
            rightMargin = margin.right;
    }
    var textPosX = leftMargin;
    var maxX = 0;
    var line = 0;
    
    var canvas = document.getElementById('canvas') || document.createElement('canvas');
    var context = canvas.getContext('2d');
    
    width += rightMargin + leftMargin;
    
    canvas.width = width;
    canvas.height = height;
    
    var backgroundColor = { r:255, g:255, b:255, a:1.0 };
    
    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                                  + backgroundColor.b + "," + backgroundColor.a + ")";
    
    rect(context, 0, 0, width, height);
    
    for (var tokenID in tokens)
    {
        var token = tokens[tokenID];
        var content = token.content.split('\\\/').join('/');
        content = content.split('\\\"').join('"');
        content = content.split('\\t').join('    ');
        var lines = [];
        
        var parameters = getStyleParameters(token);
    
        // text color
        context.fillStyle = parameters.fontColor;
        context.textAlign = "left";
        context.font = parameters.fontStyle + " " +
            parameters.fontsize + "px " +
            parameters.fontface;
        
        lines = content.split("\\n");
        
        var test = 0;
        
        for (var lineID=0; lineID<lines.length; lineID++)
        {
            var lineContent = lines[lineID];
            if(lineContent.substr(-2) == "\\r")
            {
                lineContent = lineContent.slice(0,-2);
            }
            
            test = context.measureText( lineContent ).width + textPosX;
        
            if(test > maxX)
            {
                maxX = test;
            }
            
            context.fillText( lineContent, textPosX, (line + 1) * parameters.fontsize * parameters.lineSpacing);
            
            if(lineID + 1 < lines.length)
            {
                line++;
                textPosX = leftMargin;
                continue;
            }
            
            textPosX = test;
            
        }
        
    }
    
    var dParameters = getDefaultParameters();
    var newHeight = line * dParameters.fontsize * dParameters.lineSpacing + 2 * dParameters.fontsize;
    var fontWidth = context.measureText(" ").width;
    
    return {"canvas":canvas, "width":maxX + rightMargin, "height":newHeight, "fontWidth":fontWidth};
}

function makeCanvas(text, width, height, parameters, leftMargin=0)
{
    
    var canvas = document.getElementById('canvas') || document.createElement('canvas');
    var context = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;
    
    var backgroundColor = parameters.backgroundColor;
    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                                  + backgroundColor.b + "," + backgroundColor.a + ")";
    rect(context, 0, 0, width, height);
    
    // text color
    context.fillStyle = parameters.fontColor;
    context.textAlign = parameters.textAlign;
    context.textBaseline = "middle"; 
    context.font = parameters.fontStyle + " " +
        parameters.fontsize + "px " +
        parameters.fontface;
    var posy = height * 0.5;
    context.fillText( text, leftMargin + width * 0.5, posy );
    
    return canvas;
}

function makeTexture(canvas, anisotropy)
{
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.anisotropy = anisotropy;
    return texture;
}

function rect(ctx, x, y, w, h) 
{
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+w, y);
    ctx.lineTo(x+w, y+h);
    ctx.lineTo(x, y+h);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();   
}