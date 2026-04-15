3. because  drawCirlce gets created only once, and it captures the value of cirlces at that time (which is []) hence every time drawCirlce is called, circles.length is stale value but prevState.lenght is latest value

4. function getRandomColor() {
  let combinations = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    console.log(Math.floor(Math.random() * 16),'randome');
    color += combinations[Math.floor(Math.random() * 16)];
  }
  return color;
}