let url = '/api';
fetch(url)
.then(response => response.json())
.then(data =>
    {
        //populate(data);
        populateq1(data);
        //drawGrid();
        populateq2(data);
        populateq3(data);
        //console.log(data);
    });

const canvas = document.getElementById('question1');
const ctx = canvas.getContext('2d');

const canvas2 = document.getElementById('question2');
const ctx2 = canvas2.getContext('2d');

const canvas3 = document.getElementById('question3');
const ctx3 = canvas3.getContext('2d');
// Box Width:
var bw = 400;
// Box height
var bh = 400;
// Padding
var p = 10;

function populate(data) 
{
    console.log(data);
}

//Degree
function populateq1(data)
{
    
    var gameDev = data.q1.GD;
    var webDev = data.q1.WD;
    var infoSystem = data.q1.IS;


    ctx.fillStyle = '#c20000';
    ctx.fillRect(0,canvas.height - 10 * gameDev,100,200 * gameDev);

    ctx.fillStyle = '#009658';
    ctx.fillRect(100,canvas.height - 10 * webDev,100,200 * webDev);

    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(200,canvas.height - 10 * infoSystem,100,200 * infoSystem);
    //console.log(i);

    ctx.font = "px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Game", 0, 10);
    ctx.fillText("Web", 100, 10);
    ctx.fillText("Information Systems", 200, 10);

    
}


function populateq2(data)
{
    var c = data.q2.Christmas;
    var h = data.q2.Halloween;
    var t = data.q2.Thanksgiving;

    ctx2.fillStyle = '#c20000';
    ctx2.fillRect(0,canvas2.height - 10 * c,100,200 * c);

    ctx2.fillStyle = '#009658';
    ctx2.fillRect(100,canvas2.height - 10 * h,100,200 * h);

    ctx2.fillStyle = '#ff00ff';
    ctx2.fillRect(200,canvas2.height - 10 * t,100,200 * t);
    //console.log(i);
    ctx2.font = "px Arial";
    ctx2.fillStyle = "white";
    ctx2.fillText("Christmas", 0, 10);
    ctx2.fillText("Halloween", 100, 10);
    ctx2.fillText("Thanksgiving", 200, 10);
}


function populateq3(data)
{
        var pc = data.q3.PC;
        var xbox = data.q3.Xbox;
        var ps = data.q3.Playstation;
    
        ctx3.fillStyle = '#c20000';
        ctx3.fillRect(0,canvas3.height - 10 * pc,100,200 * pc);
    
        ctx3.fillStyle = '#009658';
        ctx3.fillRect(100,canvas3.height - 10 * xbox,100,200 * xbox);
    
        ctx3.fillStyle = '#ff00ff';
        ctx3.fillRect(200,canvas3.height - 10 * ps,100,200 * ps);
        ctx3.font = "px Arial";
        ctx3.fillStyle = "white";
        
        ctx3.fillText("PC", 0, 10);
        ctx3.fillText("Xbox", 100, 10);
        ctx3.fillText("Playstation", 200, 10);
// canvas.width = 800;
// canvas.height = 600;

            //x, y, width, height

}
