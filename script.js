// SETUP CANVAS
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// background - sky
ctx.fillStyle = "skyblue";
ctx.fillRect(0, 0, canvas.width, canvas.height);


// sun
ctx.beginPath();
ctx.arc(700, 80, 50, 0, Math.PI * 2);
ctx.fillStyle = "yellow";
ctx.fill();
ctx.stroke();


// ground
ctx.fillStyle = "green";
ctx.fillRect(0, 350, canvas.width, 150);


// house
ctx.beginPath();
ctx.moveTo(200, 300);
ctx.lineTo(200, 200);
ctx.lineTo(350, 200);
ctx.lineTo(350, 300);
ctx.closePath();
ctx.fillStyle = "tan";
ctx.fill();
ctx.stroke();

// roof
ctx.beginPath();
ctx.moveTo(200, 200);
ctx.lineTo(275, 150);
ctx.lineTo(350, 200);
ctx.closePath();
ctx.fillStyle = "brown";
ctx.fill();
ctx.stroke();


// door
ctx.beginPath();
ctx.moveTo(260, 300);
ctx.lineTo(260, 240);
ctx.lineTo(300, 240);
ctx.lineTo(300, 300);
ctx.closePath();
ctx.fillStyle = "brown";
ctx.fill();
ctx.stroke();


// windows
ctx.fillStyle = "lightblue";
ctx.fillRect(220, 220, 30, 30);
ctx.strokeRect(220, 220, 30, 30);

ctx.fillRect(300, 220, 30, 30);
ctx.strokeRect(300, 220, 30, 30);


// caption
ctx.fillStyle = "black";
ctx.font = "20px Arial";
ctx.fillText("Cartoon House", 230, 50);


// for loop and translate - grass
for (let i = 0; i < 20; i++) {
    ctx.save();

    ctx.translate(i * 40, 350);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(5, -20);
    ctx.lineTo(10, 0);
    ctx.fillStyle = "darkgreen";
    ctx.fill();

    ctx.restore();
}