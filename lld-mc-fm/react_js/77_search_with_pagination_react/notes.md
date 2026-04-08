1--what happens if we do {...data} as props
doing {..data} is exactly same as writing
 id={1} imageUrl={https://} user_name={'lakeO'}

2--why is lazy loading
The browser immediately:
Parses the HTML->Sees 10 <img> tags->Starts downloading all 10 images immediately->Competes with CSS, JS, fonts for bandwidth
Even if:
The images are below the fold
The user never scrolls
The user switches page immediately

with lazy loading 
Now the browser Checks if image is visible in viewport->If NOT visible → delays download->Only loads when user scrolls near it
So:
Initial page loads faster->Less network usage->Less memory usage->Faster Time To Interactive (TTI)

example of lazy loadng
10 images
Each ~200KB
Total = 2MB

Without lazy:
→ 2MB downloaded instantly
With lazy:
→ Maybe only 3 images (600KB) downloaded initially
→ Rest downloaded only if user scrolls

Massive difference on slow networks.

3-- how memo works in react and what difference it makes
so in order to make memo work correctly the component we are wrapping it with should be outside of App here because if we place memo(function()) inside the app, on every app render it will create a new a brand new memo-wrapped component which is a new identity so it will run again no matter what

so now if you placed your memo(function()) outside app now what memo will do is, it will compare the props getting received with the older prop and new prop so say we change page then newId !==oldId and it will run the funciton inside memo again but if newId === oldId it will skip render and so if just change setLoading the old and new props will be same function inside memo will not run again 

one thing to take care of when passing props so here we are passing props as {...data} which is fine because internally it is getting passed as id='3132' name='ds' , data ={data} is also fine but if were doing something like data={{data}} or data={{id='dsd' , name='ads'}} then memo will consider that oldPropobj !== newPropobj because this creates new obj instannce everytime and so it will always render

4-- how to use select option