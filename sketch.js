let n = [];
let N = 200;
let w = 30;
let h = 20;
let pn = 0;
let cnv;
let numbers = [];
let bg = 240;

function setup() {
  cnv = createCanvas(350, 430);

  sl1 = createSlider(2, N, N, 1);
  sl1.position(1, cnv.position().y+ height);
  
  //print(sl1.position());
  
  dv1 = createDiv("Prime Numbers:2-" + N + ":" + pn);
  dv1.style("font-size", "16px");
  dv1.position(sl1.position().x + 150, sl1.position().y);
  sl1.changed(PrintDV1);
  
  bt1 = createButton('Find All Prime Numbers!');
  bt1.position(sl1.position().x, sl1.position().y +20);
  bt1.mousePressed(pressBT1);

  bt2 = createButton('reset');
  bt2.position(bt1.position().x + 200, bt1.position().y);
  bt2.mousePressed(pressBT2);
  
  // initialize n[] = 'true'
  //initN(N);

  // init nArr[] = new Number();
  for (let i = 0; i <= N; i++) {
    numbers[i] = new Number(
      i,
      w * ((i % 10) + 1),
      h * (floor(i / 10) + 1),
      true
    );
  }

  numbers[0].setPrime(false);
  numbers[1].setPrime(false);

  //printElement();

 // noLoop();
}

function draw() {
  background(bg);
  // printElement();
  pn = 0 ;
  for (let i = 2; i <= N; i++) {
    numbers[i].show(mouseX,mouseY);
    if(numbers[i].prime == true){
      pn ++;
    }
  }
  
  N = sl1.value();
  dv1.html("Prime Numbers[2-" + N + "]: " + pn,  false);
 
}


function pressBT1() {
 // perform eratosthenes' sieve
  for (let i = 2; i <= N/2; i++) {
    if (numbers[i].prime == true) {
      EratosSieve(i,N);
    }
  }
}

function pressBT2() {
   for (let i = 2; i <= N; i++) {
    numbers[i].setPrime(true);
  }
}

function mousePressed() {
  for(let i = 2; i<= N ; i ++){
    if(numbers[i].contains(mouseX, mouseY)) {
      EratosSieve(i,N);
    }
  }
}

function EratosSieve(a, lastN) {
  let ln = lastN/a;
  for (let mul = 2; mul <= ln; mul++) {
    let amul = a * mul;
    numbers[amul].setPrime(false);
  }
}

function PrintDV1() {
  N = sl1.value();
  //findPrime(N);
  //redraw();
  dv1.html("Prime Numbers[2-" + N + "]: " + pn, false);
}

function printElement() {
  pn = 0;
  textSize(10);
  for (let i = 2; i <= N; i++) {
    // print(i + ":" + n[i]);
    if (n[i] == true) {
      fill(255, 0, 0);
      pn++;
    } else {
      fill(0, 0, 255);
    }
    text(i, w * ((i % 10) + 1), 20 * (floor(i / 10) + 1));
  }
}

function initN(lastN) {
  for (let i = 2; i <= lastN; i++) {
    n[i] = true;
  }
}

function findPrime(lastN) {
  // perform eratosthenes' sieve
  for (let i = 2; i <= lastN; i++) {
    if (n[i] == true) {
      sieve(i, lastN);
    }
  }
}

function sieve(a, lastN) {
  for (let i = 2; i <= lastN / 2; i++) {
    if (a * i <= lastN) n[a * i] = false;
  }
}


class Number {
  constructor(n, x, y, tf) {
    this.n = n;
    this.prime = tf;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.l = x;
    this.t = y - h;
    this.r = this.l + w;
    this.b = y;
  }
  show(mx, my) {
    noStroke();
    if (this.contains(mx, my)) {
      fill(0,255,0);
    } else {
      fill(bg);
    };
    rect(this.l, this.t, this.w, this.h);
    
    textSize(10);
    if (this.prime == true) {
      fill(255, 0, 0);
    } else {
      fill(0, 0, 255);
      stroke(0);
      line(this.l,this.b,this.l+15,this.b-10);
    }
    text(this.n, this.x, this.y);
    noFill();
    stroke(0);
    //rect(this.x,this.y-h,w,h);
  }
  setPrime(tf) {
    this.prime = tf;
  }
  contains(mx, my) {
    if ( this.l <= mx && mx <= this.r &&
      this.t <= my && my <= this.b    ) {
      return true;
    } else {
      return false;
    }
  }
  
}
