grid = [];
interest = [];
iterate_aroundX = [0,1,1,1,0,-1,-1,-1];
iterate_aroundY = [1,1,0,-1,-1,-1,0,1];
winning_cases = '';
gSize = 0;
points = [0,0];

function evaluate(posy,posx) {
    if (grid[posy][posx] != " ") {
        interest[posy][posx] = -1;
    } else {
        interestV = 1;
        for (var i = 0 ; i < 8 ; i++) {
            try {
                space = [];
                for (var j = 0; j < 8; j++) {
                    try {
                        space.push(grid[posy+iterate_aroundY[i]*(j-2)][posx+iterate_aroundX[i]*(j-2)]);
                    } catch {
                        if (j < 6) {
                            space.push(grid[posy+iterate_aroundY[i]*(j)][posx+iterate_aroundX[i]*(j)]);
                        }
                    }
                }
                isP = false;
                consec = 0;
                for (var j = 0; j < 8; j++) {
                    if ((space[j] == " ") || (space[j] == "X")) {
                        consec++;
                        if (consec == 5) {
                            isP = true;
                        }
                    } else {
                        consec = 0;
                    }
                }
                if (isP) {
                    try {
                        xBonus = 0;
                        if (grid[posy+iterate_aroundY[i]*(-1)][posx+iterate_aroundX[i]*(-1)] == "X") {
                            xBonus = 2;
                            if (grid[posy+iterate_aroundY[i]*(-2)][posx+iterate_aroundX[i]*(-2)] == "X") {
                                xBonus = 4;
                            }
                        }
                    } catch {}
                    if (grid[posy+iterate_aroundY[i]*1][posx+iterate_aroundX[i]*1] == "X") {
                        if (interestV < (2+xBonus)) {interestV = 2 + xBonus;}
                        if (grid[posy+iterate_aroundY[i]*2][posx+iterate_aroundX[i]*2] == "X") {
                            if (interestV < (4+xBonus)) {interestV = 4 + xBonus;}
                            if (grid[posy+iterate_aroundY[i]*3][posx+iterate_aroundX[i]*3] == "X") {
                                if (xBonus != 0) {
                                    interestV = 12;
                                } else {
                                    if (grid[posy+iterate_aroundY[i]*4][posx+iterate_aroundX[i]*4] != "O") {
                                        if (interestV < (9+xBonus)) {interestV = 9 + xBonus;}
                                    }
                                    if (grid[posy+iterate_aroundY[i]*4][posx+iterate_aroundX[i]*4] == "X") {
                                        if (grid[posy+iterate_aroundY[i]*5][posx+iterate_aroundX[i]*5] == " ") {
                                            interestV = 0;
                                        } else if (grid[posy+iterate_aroundY[i]*5][posx+iterate_aroundX[i]*5] == "O") {
                                            if (interestV < (12+xBonus)) {interestV = 12 + xBonus;}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                isP = false;
                consec = 0;
                for (var j = 0; j < 8; j++) {
                    if ((space[j] == " ") || (space[j] == "O")) {
                        consec++;
                        if (consec == 5) {
                            isP = true;
                        }
                    } else {
                        consec = 0;
                    }
                }
                if (isP) {
                    oBonus = 0;
                    if (grid[posy+iterate_aroundY[i]*(-1)][posx+iterate_aroundX[i]*(-1)] == "O") {
                        oBonus = 2;
                        if (grid[posy+iterate_aroundY[i]*(-2)][posx+iterate_aroundX[i]*(-2)] == "O") {
                            oBonus = 4;
                        }
                    }
                    if (grid[posy+iterate_aroundY[i]*1][posx+iterate_aroundX[i]*1] == "O") {
                        if (interestV < (2+oBonus)) {interestV = 2+oBonus;}
                        if (grid[posy+iterate_aroundY[i]*2][posx+iterate_aroundX[i]*2] == "O") {
                            if (interestV < (3+oBonus)) {interestV = 3+oBonus;}
                            if (grid[posy+iterate_aroundY[i]*3][posx+iterate_aroundX[i]*3] == "O") {
                                if (interestV < (7+oBonus)) {interestV = 7+oBonus;}
                                if (grid[posy+iterate_aroundY[i]*4][posx+iterate_aroundX[i]*4] == "O") {
                                    if (grid[posy+iterate_aroundY[i]*5][posx+iterate_aroundX[i]*5] == " ") {
                                        if (interestV < 8) {interestV = 8;}
                                    } else {
                                        if (interestV < 11) {interestV = 11;}
                                    }
                                    winning_cases += String(posy+"/"+posx+"/"+i+"!");
                                }
                            }
                        }
                    }
                }
            } catch {if (0) {console.log("couldn't iterate one or more boxes");}}
        }
        //document.getElementById('l.'+posy+'.'+posx).innerHTML = String(interestV);
        interest[posy][posx] = interestV;
    }
    //return interest[posy][posx];
}

function evaluate_all() {
    for (var i = 0 ; i < gSize ; i++) {
        for (var j = 0 ; j < gSize ; j++) {
            if (document.getElementById('c'+i+'.'+j).classList.contains('blinkB')) {document.getElementById('c'+i+'.'+j).classList.remove('blinkB');}
            document.getElementById('c'+i+'.'+j).innerHTML = "";
            evaluate(i,j);
            check_wins(i,j,1);
        }
    }
    return interest;
}

function check_wins(posy,posx,p) {
    for (var i = 0 ; i < 8 ; i++) {
        if (p == 1) {
            try {
                if (grid[posy+iterate_aroundY[i]*1][posx+iterate_aroundX[i]*1] == "X") {
                    if (grid[posy+iterate_aroundY[i]*2][posx+iterate_aroundX[i]*2] == "X") {
                        if (grid[posy+iterate_aroundY[i]*3][posx+iterate_aroundX[i]*3] == "X") {
                            if (grid[posy+iterate_aroundY[i]*4][posx+iterate_aroundX[i]*4] == "X") {
                                if (grid[posy+iterate_aroundY[i]*5][posx+iterate_aroundX[i]*5] == "X") {
                                    for (var k = 0; k < 5; k++) {
                                        grid[posy+iterate_aroundY[i]*(k+1)][posx+iterate_aroundX[i]*(k+1)] = "X"+points[1];
                                        document.getElementById('c'+String(posy+iterate_aroundY[i]*(k+1))+'.'+String(posx+iterate_aroundX[i]*(k+1))).style = 'background-color: #80FF80;';
                                    }
                                    points[1]++;
                                }
                            }
                        }
                    }
                }
            }
            catch {}
        } else {
            try {
                if (grid[posy+iterate_aroundY[i]*1][posx+iterate_aroundX[i]*1] == "O") {
                    if (grid[posy+iterate_aroundY[i]*2][posx+iterate_aroundX[i]*2] == "O") {
                        if (grid[posy+iterate_aroundY[i]*3][posx+iterate_aroundX[i]*3] == "O") {
                            if (grid[posy+iterate_aroundY[i]*4][posx+iterate_aroundX[i]*4] == "O") {
                                if (grid[posy+iterate_aroundY[i]*5][posx+iterate_aroundX[i]*5] == "O") {
                                    for (var k = 0; k < 5; k++) {
                                        grid[posy+iterate_aroundY[i]*(k+1)][posx+iterate_aroundX[i]*(k+1)] = "O"+points[0];
                                        document.getElementById('c'+String(posy+iterate_aroundY[i]*(k+1))+'.'+String(posx+iterate_aroundX[i]*(k+1))).style = 'background-color: #8080FF;';
                                    }
                                    points[0]++;
                                }
                            }
                        }
                    }
                }
            }
            catch {}
        }
    }
}

function playrnd() {
    interestR = evaluate_all();
    console.log(interestR);
    imax = 0;
    coords_max = [];
    for (var i = 0 ; i < gSize ; i++) {
        for (var j = 0 ; j < gSize ; j++) {
            if(imax < interestR[i][j]) {imax = interestR[i][j];} 
        }
    }
    for (var i = 0 ; i < gSize ; i++) {
        for (var j = 0 ; j < gSize ; j++) {
            if(imax == interestR[i][j]) {coords_max.push(String(i+"-"+j));}
        }
    }
    rnd = Math.floor(Math.random() * (coords_max.length));
    playbox = coords_max[rnd].split("-");
    grid[playbox[0]][playbox[1]] = "O";
    /*wc1 = winning_cases.split('!');
    wc1.pop();
    color = true;
    for (var i = 0; i < wc1.length; i++) {
        if ((playbox[0] == wc1[i].split('/')[0]) && (playbox[1] == wc1[i].split('/')[1])) {
            color = false;
            for (var k = 0; k < 5; k++) {
                y=parseInt(parseInt(playbox[0])+parseInt(iterate_aroundY[wc1[i].split('/')[2]]*k));
                x=parseInt(parseInt(playbox[1])+parseInt(iterate_aroundX[wc1[i].split('/')[2]]*k));
                console.log(y,x);
                grid[y][x] = "O"+points[0];
                document.getElementById('c'+String(y)+'.'+String(x)).style = "background-color: #8080FF;";
            }
            points[0]++
        }
    }*/
    document.getElementById('c'+String(playbox[0]+'.'+String(playbox[1]))).style = "background-color: #41C8FF;";
    document.getElementById('c'+String(playbox[0]+'.'+String(playbox[1]))).classList.add('blinkB');
    for (var i = 0 ; i < gSize ; i++) {
        for (var j = 0 ; j < gSize ; j++) {
            check_wins(i,j,0);
        }
    }
}

function make_grid(size) {
    points = [0,0];
    winning_cases = '';
    gSize = size;
    grid = [];
    interest = [];
    for (var k = 0; k < size; k++) {
        a = [];
        b = [];
        for (var l = 0; l < size; l++) {
            a.push(" ");
            b.push(" ");
        }
        grid.push(a);
        interest.push(b);
    }
    document.body.innerHTML = "";
    document.body.innerHTML += '<div class="grille" id="grille"></div>';
    for (var i = 0; i < size; i++) {
        document.getElementById('grille').innerHTML += '<div class="line" id="l'+String(i)+'"></div>';
        document.getElementById('l'+String(i)).style.height = String(100/size)+'%';
        for (var j = 0; j < size; j++) {
            document.getElementById('l'+i).innerHTML += '<div class="column" id="c'+String(i)+'.'+String(j)+'" onclick="clicked(this)"><label id="l.'+String(i)+'.'+String(j)+'"></label></div>';
            document.getElementById('l.'+String(i)+'.'+String(j)).style = "font-size: "+String(90/size)+'vh;';
        }
    }
}

function clicked(elem) {
    for (var i = 0 ; i < gSize ; i++) {
        for (var j = 0 ; j < gSize ; j++) {
            if (document.getElementById('c'+i+'.'+j).classList.contains('blinkJ')) {document.getElementById('c'+i+'.'+j).classList.remove('blinkJ');}
        }
    }
    elem.classList.add('blinkJ');
    elem.style = "background-color: #FFFC41;";
    n=elem.id.replace("c","").split('.');
    y=n[0];
    x=n[1];
    grid[y][x] = "X";
    playrnd();
}

/*i=0;j=0;function lol() {if (j==0) {if (i<20) {j=0} else {j=1}} make_grid(i); if (j==0) {i++;} else {i--;} if (i==0) {j=0;} setTimeout(lol,20);}*/