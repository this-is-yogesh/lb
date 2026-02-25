1-what happens if we put script a. in head b. at start of body c. at end of body
2-if you want anything between a boundary including the end then do Math.floor(Math.random() * (max-min+1)) + min , this will do what is 
say i want 50-100 and then 50-99
for 50-100
Math.floor(Math.random() * (100-50+1)) will give from 0 - 50.99
and then + 50 will do 100
for 50-99
Math.floor(Math.random() * (100-50)) will give from 0 - 49.99
and then + 50 will do 99
so main thing is, Math.random() * anything is 0 to anything -1