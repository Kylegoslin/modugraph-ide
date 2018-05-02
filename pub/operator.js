
//
// CSV Reader operator
//
function makeCSVop(id){
    
    var title = "CSV Reader";
    var div = document.createElement("div");
    div.innerHTML = title+"<br> ID:"+id;
    div.id = id;
    
    div = operatorMakeCommon(div, id, title);
    return div;    
}


//
// Draw a line between two different operators
// on the workspace
///
function drawLinkLine(id1, id2){
    
     console.log("id1: "+id1);
     console.log("id2: "+id2);
    
     
     
     var id1offSet = 0;
     // id 1 offset
     if(id1.indexOf("l") >= 0){
        // id1offSet = 0;
         id1= id1.replace("l","");
     }
     else if(id1.indexOf("r")  >= 0){
         //id1offSet = 60;
         id1= id1.replace("r","");
     }
     
     
     var id2offSet = 0;
     // id 1 offset
     if(id2.indexOf("l") >= 0){
        // id2offSet = 0;
         id2= id2.indexOf("l","");
     }
     else if(id2.indexOf("r")  >= 0){
        // id2offSet = 60;
         id2 = id2.indexOf("r","");
     }
     
     
     
    // operator 1 
    var el = $('#'+id1);
    var lposition = el.position();
 
    var x1 = Math.ceil(lposition.left+id1offSet);
    var y1 = Math.ceil(lposition.top);
 
 
    // operator 2
    var el2 = $('#'+id2);
    var rposition = el2.position();
   
    var x2 = Math.ceil(rposition.left+id2offSet);
    var y2 = Math.ceil(rposition.top);
     
    // console.log( "x1: " + x1 + ", y1: " + y1 );
     
    // console.log( "x2: " + x2 + ", y2: " + y2 );
    // var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    //    newLine.setAttribute('id','line2');
    //    newLine.setAttribute('x1',x1);
    //    newLine.setAttribute('y1',y1);
    //    newLine.setAttribute('x2',x2);
    //    newLine.setAttribute('y2',y2);
    //    newLine.setAttribute("stroke", "black")
    //    $("svg").append(newLine);    
}

function updateOperatorLinks(id1, id2){
    

    var op1_id = "";
   

    // operator 1
    var op1_instance = $('#'+id1.replace("l", "").replace("r", ""));
   
     
    // operator 2
    var op2_instance = $('#'+id2.replace("l", "").replace("r", ""));
    
    op2_instance.attr("left_link", id1);
    op1_instance.attr("right_link", id2);   
       
       
     

    
}
// check to see if a link was previously clicked
// if it was then try connect the operators
function attemptLinkCreation(currentLink){
    
    if(currentSelectedLink  != ''){
        
        var previousLink = currentSelectedLink;
        var current = currentLink;
        
        console.log("linking "+ previousLink+ " to " + current);
        
        updateOperatorLinks(previousLink, currentLink);
        
        
        // draw a line between the two different operators
        //drawLinkLine(previousLink, current);
        // get rid of the temp link
        currentSelectedLink = ''
    } else {
        currentSelectedLink = currentLink
    }
    
}


//
// Make the output sink  operator.
// This is an endpoint for the process chain.
function makeSink(id){
    
    var div = document.createElement("div");
    div.style.width = "130px";
    div.style.height = "50px";
    div.style.background = "red";
    div.style.color = "white";
    div.innerHTML = "Sink<br> ID:"+id;
    div.id = id;
    div.style.left = 500;
    div.style.top = 500;
    div.setAttribute('reg', 'true');
    div.setAttribute('id', id);
    div.setAttribute('left_link', 'none');
    div.setAttribute('right_link', 'none');
    
    
    // Add the the link button
    var leftLink = document.createElement("div");
    leftLink.innerHTML = "Left";
    leftLink.style.cssFloat = "left";
    leftLink.style.background = "black";
    leftLink.id = ''+id+'l';
    leftLink.setAttribute('id', ''+id+'l');
    div.appendChild(leftLink);
   

    // add the new div onto the workspace
    document.getElementById("workspace").appendChild(div);
    $( "#"+id ).draggable();

    

    
    $( "#"+id+'l').on( "click", function() {
               console.log(id+"left clicked"); 
               
               attemptLinkCreation(id+'l');               
    });
    
    $( "#"+id+'r').on( "click", function() {
               console.log(id+"right clicked");
            attemptLinkCreation(id+'r');
                    
    });
  

     
    
    
    // when the div gets clicked, update
    // the properties on the left hand side of the workspace
    $( "#"+id ).on( "click", function() {
     var div = document.getElementById(id);
     
        // static never change
        $( "#op_type").val("Sink"); 
        $( "#op_id").val(id);
        
        // can be changed
        $( "#op_left").val(div.getAttribute('left_link'));
        $( "#op_right").val(div.getAttribute('right_link'));
        

});
    return div;
}

//
// Common operator builder.
//
function operatorMakeCommon(div, id, title){
    
    
    
    div.style.width = "130px";
    div.style.height = "50px";
    div.style.background = "red";
    div.style.color = "white";
    div.style.left = 500;
    div.style.top = 500;
    div.setAttribute('reg', 'true');
    div.setAttribute('id', id);
    div.setAttribute('left_link', 'none');
    div.setAttribute('right_link', 'none');


    // Add the the link button
    var leftLink = document.createElement("div");
    leftLink.innerHTML = "Left";
    leftLink.style.cssFloat = "left";
    leftLink.style.background = "black";
    leftLink.id = ''+id+'l';
    leftLink.setAttribute('id', ''+id+'l');
    div.appendChild(leftLink);


   
    // Add right link button
    var linkRight = document.createElement("div");
    linkRight.innerHTML = "Right";
    linkRight.style.background = "black";
    //linkRight.style.height = "50px";
    linkRight.id = ''+id+'r';
    linkRight.setAttribute('id', ''+id+'r');
    linkRight.style.cssFloat = "right";
   
   
   
   
    div.appendChild(linkRight);
   
    // add the new div onto the workspace
    document.getElementById("workspace").appendChild(div);
    $( "#"+id ).draggable();

    

    
    $( "#"+id+'l').on( "click", function() {
               console.log(id+"left clicked"); 
               
               attemptLinkCreation(id+'l');               
    });
    
    $( "#"+id+'r').on( "click", function() {
               console.log(id+"right clicked");
            attemptLinkCreation(id+'r');
                    
    });
  

     
    
    
    // when the div gets clicked, update
    // the properties on the left hand side of the workspace
    $( "#"+id ).on( "click", function() {
     var div = document.getElementById(id);
     
        // static never change
        $( "#op_type").val(title); 
        $( "#op_id").val(id);
        
        // can be changed
        $( "#op_left").val(div.getAttribute('left_link'));
        $( "#op_right").val(div.getAttribute('right_link'));
        
        // Get operator specifc settings
        getOperatorProperties();
        
        
    });
    
    return div;
}

//
// TXT Read Operator
//
function makeTXTop(id){
    
    var div = document.createElement("div");
    var title = "TXT Reader";
    div.innerHTML = title+"<br> ID:"+id;
    div.id = id;
    
    div = operatorMakeCommon(div, id,title);
    return div;
}


//
// HTML Reader Operator
//
function makeHTMLop(id){
    
    var div = document.createElement("div");
    var title="HTML Reader";
    div.innerHTML = title+"<br> ID:"+id;
    div.id = id;
   
    div = operatorMakeCommon(div, id, title);
    

    return div;
}






//
// Get settings for a specific operator
//
function getOperatorProperties(){
    
    console.log("Getting operator properties");
    
    
    
    var content = "content here";
    
    var btn = document.createElement("BUTTON");
    btn.id = "uploadfile";
    var t = document.createTextNode("Upload File");
    btn.appendChild(t);
    var op_prop = $('#op_specific');
    
    op_prop.append(btn);
    
     $( "#uploadfile" ).click(function() {
        $( "#dialog" ).dialog( "open" );
       // return false;
    });

    // Generate a list of files to choose from
    // and have a radio button  to select the file to use.
    $("#op_specific").append($("<div>").load("/getfiles"));
   $("#contentholder").load('/file');
}