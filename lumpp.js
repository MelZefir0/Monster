var doFirst = function() {
  
   function Draggable(element, dragStart, dragDrop){
     this.element = element;
     this.dragStart = dragStart;
     this.dragDrop = dragDrop;
     var self = this;
     
     this.element.classList.add('draggable');
     
     // Variables global to all events
     var originalLeft, originalTop, mouseDownX, mouseDownY;
     
     // What should happen on mouseDown
     function onMouseDown(event){
     console.log(event.type);
     console.log(event.currentTarget);

       mouseDownX = event.clientX;
       mouseDownY = event.clientY;
       
       originalLeft = parseInt(window.getComputedStyle(this).left);
       originalTop = parseInt(window.getComputedStyle(this).top);

       //In a drag operation: Initiate move and up listeners
       document.addEventListener("mouseup", onMouseUp, true);
       document.addEventListener("mousemove", onMouseMove, true);

       // Event handled, prevent spilling to anyone else
       event.stopPropagation();
       event.preventDefault();
     }
   
     // What should happen on mouseMove (after mouseDown)
     function onMouseMove(event){
       // Move the thing
       self.element.style.left = originalLeft + event.clientX - mouseDownX + "px";
       self.element.style.top = originalTop + event.clientY - mouseDownY + "px";

       // Event handled, prevent spilling to anyone else
       event.stopPropagation();
     }

     // What should happen on mouseUp (after mouseDown)
     function onMouseUp(event){
       // This is the drop: Unregister the move and up events if inside lump
        var cheesePos = getOffset(self.element);


       if (cheesePos.left < lumpPos.left || cheesePos.left > lumpPos.left + 275 || cheesePos.top < lumpPos.top || cheesePos.top > lumpPos.top + 275) {
         // Outside
         // Get cheese id number
         var i = self.element.id.replace('cheese','');
         
         //Move element back to start position
         self.element.style.left = cheeseStart[i].left;
         self.element.style.top =  cheeseStart[i].top;
       } else {
         // Inside
         // cheeses.splice(cheese , 1);

         var j = self.element.id
         var quizzle = document.getElementById(j)
        // console.log(j);
        // console.log(quizzle);
        //  // j.classList.add("hidey")
        //  console.log(quizzle.classList);
         quizzle.classList.add("hidey");
         // quizzle.classList.add("pulse");

       }
       
       document.removeEventListener("mousemove", onMouseMove, true);
       document.removeEventListener("mouseup", onMouseUp, true);

       // Event handled, prevent spilling to anyone else
       event.stopPropagation();
     }
 
     this.element.addEventListener("mousedown", onMouseDown, false);
   }
 
  
  // Will need this later
  var lump = document.getElementById("lump");
  var lumpPos = getOffset(lump);
  
  var cheeses = [];
  var draggables = [];
  var cheeseStart = [];
  
  for(i = 0; i < 7; i++) {
    cheeses[i] = document.getElementById("cheese" + i);
    draggables[i] = new Draggable(cheeses[i]);
    
    //Record starting positions
    cheeseStart[i] = getOffset(cheeses[i]);
  }
};

// Returns element position
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

window.addEventListener("load", doFirst, false);