(function(){
  
  Renderer = function(canvas){
    var canvasid = canvas
    var canvas = $(canvas).get(0)
    var ctx = canvas.getContext("2d");
    var gfx = arbor.Graphics(canvas);
    var zoom = 1;
    var particleSystem = null

    var that = {
      init:function(system){
        particleSystem = system
        particleSystem.screenSize(canvas.width, canvas.height) 
        particleSystem.screenPadding(40)
        $(window).resize(that.resize);
        that.resize();
        that.initMouseHandling();
      },

      resize:function(){
        canvas.width = $(canvasid).width() * zoom;
        canvas.height = $(canvasid).height() * zoom;
        that.redraw();
      },

      zoomin:function(){
        if(zoom < 1.9) {
          zoom -= 0.1;
        }
        that.resize();
      },

      zoomout:function(){
        if(zoom > 0.1) {
          zoom += 0.1;
        }
        that.resize();
      },

      setzoom:function(val){
        zoom = val;
        that.resize();
      },

      zoom:function(val){
        return zoom;
      },

      redraw:function(){
        if (!particleSystem) return

        gfx.clear() // convenience ƒ: clears the whole canvas rect

        particleSystem.screenSize($(canvas).get(0).width, $(canvas).get(0).height)

        // draw the nodes & save their bounds for edge drawing
        nodeBoxes = {}

        particleSystem.eachNode(function(node, pt){
          // node: {mass:#, p:{x,y}, name:"", data:{}}
          // pt:   {x:#, y:#}  node position in screen coords

          // determine the box size and round off the coords if we'll be 
          // drawing a text label (awful alignment jitter otherwise...)
          var label = node.data.label||""
          var text = node.data.text || new Array();

          var w = ctx.measureText(""+label).width + 10
          //Roughly estimating image:20 + text:20 + margin:10 = 50
          var h = 50;
          for(var i = 0; i < text.length; i++){
            w = Math.max(w, ctx.measureText("" + text[i]).width+10);
            h += 20;
          }
          //Minimum
          var w = Math.max(w, 30);

          if (!(""+label).match(/^[ \t]*$/)){
            pt.x = Math.floor(pt.x)
            pt.y = Math.floor(pt.y)
          }else{
            label = null
          }

          // draw a rectangle centered at pt
          if (node.data.color) ctx.fillStyle = node.data.color
          else ctx.fillStyle = "rgba(0,0,0,.2)"
          if (node.data.color=='none') ctx.fillStyle = "white"

          if (node.data.shape=='dot'){
            gfx.oval(pt.x-w/2, pt.y-w/2, w,w, {fill:ctx.fillStyle})
            nodeBoxes[node.name] = [pt.x-w/2, pt.y-w/2, w,w]
          }else if(node.data.shape=='event_blob_image'){
            //This is for events with an image attached to them
              gfx.rect(pt.x-w/2, pt.y-10, w, h, 4, {fill:ctx.fillStyle});
              if(node.data.image) {
                var nodeImage = new Image();
                nodeImage.src = node.data.image;
                ctx.drawImage(nodeImage, pt.x-nodeImage.width/2, pt.y-nodeImage.height/2+20);
              }
              nodeBoxes[node.name] = [pt.x-w/2, pt.y-11, w, h]
          }else if(node.data.shape=='contact_blob_image'){
              gfx.rect(pt.x-w/2, pt.y-10, w, h, 4, {fill:ctx.fillStyle});
              if(node.data.image) {
                var nodeImage = new Image();
                nodeImage.src = node.data.image;
                ctx.drawImage(nodeImage, pt.x-nodeImage.width/2, pt.y-nodeImage.height/2+20);
              }
              nodeBoxes[node.name] = [pt.x-w/2, pt.y-11, w, h]
          }else{
            gfx.rect(pt.x-w/2, pt.y-10, w,20, 4, {fill:ctx.fillStyle})
            nodeBoxes[node.name] = [pt.x-w/2, pt.y-11, w, 22]
          }

          // draw the text
          if (label){
            ctx.font = "12px Helvetica"
            ctx.textAlign = "center"
            ctx.fillStyle = "white"
            if (node.data.color=='none') ctx.fillStyle = '#333333'
            ctx.fillText(label||"", pt.x, pt.y+4)
          }
          if (text){
            ctx.font = "12px Helvetica"
            ctx.textAlign = "center"
            ctx.fillStyle = "white"
            if (node.data.color=='none') ctx.fillStyle = '#333333'
            //This is the reletive distance from the top.
            var position = 50;
            for(var i=0; i<text.length; i++){
              ctx.fillText(text[i], pt.x, pt.y+position)
              position += 20;
            }
          }
        })          


        // draw the edges
        particleSystem.eachEdge(function(edge, pt1, pt2){
          // edge: {source:Node, target:Node, length:#, data:{}}
          // pt1:  {x:#, y:#}  source position in screen coords
          // pt2:  {x:#, y:#}  target position in screen coords

          var weight = edge.data.weight
          var color = edge.data.color

          if (!color || (""+color).match(/^[ \t]*$/)) color = null

          // find the start point
          var tail = intersect_line_box(pt1, pt2, nodeBoxes[edge.source.name])
          var head = intersect_line_box(tail, pt2, nodeBoxes[edge.target.name])

          ctx.save() 
            ctx.beginPath()
            ctx.lineWidth = (!isNaN(weight)) ? parseFloat(weight) : 1
            ctx.strokeStyle = (color) ? color : "#cccccc"
            ctx.fillStyle = null

            ctx.moveTo(tail.x, tail.y)
            ctx.lineTo(head.x, head.y)
            ctx.stroke()
          ctx.restore()

          // draw an arrowhead if this is a -> style edge
          if (edge.data.directed){
            ctx.save()
              // move to the head position of the edge we just drew
              var wt = !isNaN(weight) ? parseFloat(weight) : 1
              var arrowLength = 6 + wt
              var arrowWidth = 2 + wt
              ctx.fillStyle = (color) ? color : "#cccccc"
              ctx.translate(head.x, head.y);
              ctx.rotate(Math.atan2(head.y - tail.y, head.x - tail.x));

              // delete some of the edge that's already there (so the point isn't hidden)
              ctx.clearRect(-arrowLength/2,-wt/2, arrowLength/2,wt)

              // draw the chevron
              ctx.beginPath();
              ctx.moveTo(-arrowLength, arrowWidth);
              ctx.lineTo(0, 0);
              ctx.lineTo(-arrowLength, -arrowWidth);
              ctx.lineTo(-arrowLength * 0.8, -0);
              ctx.closePath();
              ctx.fill();
            ctx.restore()
          }
        })



      },
      initMouseHandling:function(){
        // no-nonsense drag and drop (thanks springy.js)
        selected = null;
        nearest = null;
        var dragged = null;
        var oldmass = 1

        // set up a handler object that will initially listen for mousedowns then
        // for moves and mouseups while dragging
        var handler = {
          //This is originally from arborjs.org's main side
          moved:function(e){

            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            nearest = sys.nearest(_mouseP);

            if (!nearest.node) return false

            if (nearest.node.data.shape=='event_blob_image'){
              selected = (nearest.distance < 50) ? nearest : null
              //TODO, Find out how to actually use this to create hyperlinks.

              // if (selected){
              //    canvasid.addClass('linkable')
              //    window.status = selected.node.data.link.replace(/^\//,"http://"+window.location.host+"/").replace(/^#/,'')
              // }
              // else{
              //    canvasid.removeClass('linkable')
              //    window.status = ''
              // }
            }
            
            return false
          },
          clicked:function(e){
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            selected = nearest = dragged = particleSystem.nearest(_mouseP);

            if (dragged.node !== null) dragged.node.fixed = true

            $(canvas).unbind('mousemove', handler.moved);
            $(canvas).bind('mousemove', handler.dragged)
            $(window).bind('mouseup', handler.dropped)

            return false
          },
          dragged:function(e){
            var old_nearest = nearest && nearest.node._id
            var pos = $(canvas).offset();
            var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

            if (!nearest) return
            if (dragged !== null && dragged.node !== null){
              var p = particleSystem.fromScreen(s)
              dragged.node.p = p
            }

            return false
          },

          dropped:function(e){
            if (dragged===null || dragged.node===undefined) return
            if (dragged.node !== null) dragged.node.fixed = false
            dragged.node.tempMass = 50
            particleSystem.eachNode(function(node, pt){
              if(node.name != dragged.node.name && overlap(nodeBoxes[node.name], nodeBoxes[dragged.node.name])){
                if(particleSystem.getEdges(node, dragged.node).length == 0 && particleSystem.getEdges(dragged.node, node).length == 0 ){
                  if(node.data.type == 'event' && dragged.node.data.type == 'contact' ||
                     node.data.type == 'contact' && dragged.node.data.type == 'event') {
                    var r=confirm("Do you want to link " + node.data.label + " to " + dragged.node.data.label + "?");
                    if (r==true){
                      linkNodes(node, dragged.node);
                    }
                  }
                }
                else{
                  var r=confirm("Do you want to unlink " + node.data.label + " from " + dragged.node.data.label + "?");
                  if (r==true){
                    unlinkNodes(node, dragged.node)
                  }
                }
              }
            })
            dragged = null
            selected = null
            $(canvas).unbind('mousemove', handler.dragged)
            $(window).unbind('mouseup', handler.dropped)
            $(canvas).bind('mousemove', handler.moved);
            _mouseP = null
            return false
          }
        }
        $(canvas).mousedown(handler.clicked);
        $(canvas).mousemove(handler.moved);

      }

    }

    // helpers for figuring out if nodes overlap
    var overlap = function(boxTuple1, boxTuple2){
      var p3_1 = {x:boxTuple1[0], y:boxTuple1[1]},
          w_1 = boxTuple1[2],
          h_1 = boxTuple1[3]

      var tl_1 = {x: p3_1.x, y: p3_1.y};
      var tr_1 = {x: p3_1.x + w_1, y: p3_1.y};
      var bl_1 = {x: p3_1.x, y: p3_1.y + h_1};
      var br_1 = {x: p3_1.x + w_1, y: p3_1.y + h_1};
      var mid_1 ={x: (tl_1.x + br_1.x)/2, y: (tl_1.y + br_1.y)/2}

      //These are the points to check, simplified to edge points and middle.
      //If more accuracy is needed to check overlap, use a different system than checking these points.
      var points_1 = [tl_1, tr_1, bl_1, br_1, mid_1];

      var p3_2 = {x:boxTuple2[0], y:boxTuple2[1]},
          w_2 = boxTuple2[2],
          h_2 = boxTuple2[3]

      var tl_2 = {x: p3_2.x, y: p3_2.y};
      var tr_2 = {x: p3_2.x + w_2, y: p3_2.y};
      var bl_2 = {x: p3_2.x, y: p3_2.y + h_2};
      var br_2 = {x: p3_2.x + w_2, y: p3_2.y + h_2};
      var mid_2 ={x: (tl_2.x + br_2.x)/2, y: (tl_2.y + br_2.y)/2};

      var points_2 = [tl_2, tr_2, bl_2, br_2, mid_2];


      for(var i=0; i<points_1.length; i++){
        //alert("" + points_1[i].x + ">" + tl_2.x + "&&" + points_1[i].x + "<" + br_2.x + "&&" + points_1[i].y +"<"+ br_2.y +"&&"+ points_1[i].y +">"+ tl_2.y)
        if(points_1[i].x > tl_2.x && points_1[i].x < br_2.x && points_1[i].y < br_2.y && points_1[i].y > tl_2.y){
          return true;
        }
      }
      for(var i=0; i<points_2.length; i++){
        if(points_2[i].x > tl_1.x && points_2[i].x < br_1.x && points_2[i].y < br_1.y && points_2[i].y > tl_1.y){
          return true;
        }
      }
      return false;
    }

    // helpers for figuring out where to draw arrows (thanks springy.js)
    var intersect_line_line = function(p1, p2, p3, p4)
    {
      var denom = ((p4.y - p3.y)*(p2.x - p1.x) - (p4.x - p3.x)*(p2.y - p1.y));
      if (denom === 0) return false // lines are parallel
      var ua = ((p4.x - p3.x)*(p1.y - p3.y) - (p4.y - p3.y)*(p1.x - p3.x)) / denom;
      var ub = ((p2.x - p1.x)*(p1.y - p3.y) - (p2.y - p1.y)*(p1.x - p3.x)) / denom;

      if (ua < 0 || ua > 1 || ub < 0 || ub > 1)  return false
      return arbor.Point(p1.x + ua * (p2.x - p1.x), p1.y + ua * (p2.y - p1.y));
    }

    var intersect_line_box = function(p1, p2, boxTuple)
    {
      var p3 = {x:boxTuple[0], y:boxTuple[1]},
          w = boxTuple[2],
          h = boxTuple[3]

      var tl = {x: p3.x, y: p3.y};
      var tr = {x: p3.x + w, y: p3.y};
      var bl = {x: p3.x, y: p3.y + h};
      var br = {x: p3.x + w, y: p3.y + h};

      return intersect_line_line(p1, p2, tl, tr) ||
            intersect_line_line(p1, p2, tr, br) ||
            intersect_line_line(p1, p2, br, bl) ||
            intersect_line_line(p1, p2, bl, tl) ||
            false
    }

    var linkNodes = function(node1, node2){
      particleSystem.addEdge(node1, node2);
      //TODO Nongraphical updates
    }

    var unlinkNodes = function(node1, node2){
      var edgesTo = particleSystem.getEdges(node1, node2);
      for(var i=0; i<edgesTo.length; i++){
        particleSystem.pruneEdge(edgesTo[i]);
      }
      var edgesFrom = particleSystem.getEdges(node2, node1);
      for(var i=0; i<edgesFrom.length; i++){
        particleSystem.pruneEdge(edgesFrom[i]);
      }
      //TODO Nongraphical updates
    }

    return that
  }    
  
})()