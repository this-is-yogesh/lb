1. transform: translateX(-50%);

   moves the element itself back by half its own width.
   meaning "Put my center at 50%."
   translate(-50%,-50%) means, move left by 50% of my own width and move up by 50% of my own height
   so - in horizontal is left, - in vertical is up

**note**
so together what it means is
top: 50%;
left: 50%;
top and left place the element's top-left corner at the center of the parent,
transform: translate(-50%, -50%);
and translate(-50%, -50%) pulls the element back by half of its own size so its center ends up at the parent's center.

2. how to center a line whose width is 80%

**note**
divider: {
margin: "100px 0px 100px 0px",
width: "80%",
height: "1px",
backgroundColor: "grey",
opacity: "0.6",
marginLeft: "auto",
marginRight: "auto",
},
