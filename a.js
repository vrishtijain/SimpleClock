 
    // global letiable timer
    let timer=0;


    function showDigitalClock(){
        // make analog clock disappear and clock2 disappear
        if(timer>0){
            timer=0;
        }
        document.getElementById("AnalogClock").style.opacity=0;
        document.getElementById("DigitalClock").style.opacity=1;
        document.getElementById("DigitalClock2").style.opacity=0;
        console.log(timer)
       
        showDigitalTime();
        
        // console.log("inside this fucntion digital 12 h  clock");

    }
    function showAnalogClock()
{
    if(timer>0){
            timer=0;
        }
    document.getElementById("AnalogClock").style.opacity=1;
    document.getElementById("DigitalClock").style.opacity=0;
    document.getElementById("DigitalClock2").style.opacity=0;
    // console.log("inside this fucntion analog clock");
    setInterval(drawClock, 1000);

    }
    function showDigitalClock2(){

        if(timer>0){
            timer=0;
        }
        document.getElementById("AnalogClock").style.opacity=0;
        document.getElementById("DigitalClock").style.opacity=0;
        document.getElementById("DigitalClock2").style.opacity=1;
        console.log(timer)
        
        show24FormatTime();
        // console.log("inside clock 2 ")

    }
    function showDigitalTime(){

      
        let date = new Date();
        let h = date.getHours(); // 0 - 23
        let m = date.getMinutes(); // 0 - 59
        let s = date.getSeconds(); // 0 - 59
        let session = "AM";
        // chaning in appropriate format
        if(h == 0){
            h = 12;
        }
        
        if(h >=12){

            h = h - 12;
            session = "PM";
        }
        
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        
        let time = h + ":" + m + ":" + s + " " + session;
        document.getElementById("DigitalClock").innerText = time;
        document.getElementById("DigitalClock").textContent = time;
        
       timer=  setInterval(showDigitalTime, 1000);
        
    }



    function show24FormatTime(){
         if(timer>0){
            timer=0;
        }
        let date = new Date();
        let h = date.getHours(); // 0 - 23
        let m = date.getMinutes(); // 0 - 59
        let s = date.getSeconds(); // 0 - 59
        let session = "AM";
        if(h > 12){

            session = "PM";
        }

        let time = h + ":" + m + ":" + s + " " + session;
      // console.log(time)
      document.getElementById("DigitalClock2").innerText = time;
      document.getElementById("DigitalClock2").textContent = time;

      timer= setInterval(show24FormatTime, 1000);

    }


    // ANALOG CLOCK 

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let radius = canvas.height /2 -100;
    ctx.translate(radius, radius);
    radius = radius * 0.90
    setInterval(drawClock, 1000);

    function drawClock() {
      drawFace(ctx, radius);
      drawNumbers(ctx, radius);
      drawTime(ctx, radius);
    }
    // for drawing the base of the clock
    function drawFace(ctx, radius) {
      let grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2*Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
      grad.addColorStop(0, '#333');
      grad.addColorStop(0.5, 'white');
      grad.addColorStop(1, '#333');
      ctx.strokeStyle = grad;
      ctx.lineWidth = radius*0.1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
      ctx.fillStyle = '#333';
      ctx.fill();
    }
    // for setting the numbers on the clolck
    function drawNumbers(ctx, radius) {
      let ang;
      let num;
      ctx.font = radius*0.15 + "px arial";
      ctx.textBaseline="middle";
      ctx.textAlign="center";
      for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }}
    // for drawing the 3 hands of the clock on the clock
    function drawTime(ctx, radius){

        let now = new Date();

        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        // for hour hand 
        hour=hour%12;
        hour=(hour*Math.PI/6)+
        (minute*Math.PI/(6*60))+
        (second*Math.PI/(360*60));

        drawHand(ctx, hour, radius*0.5, radius*0.07);

        // for minute hand 
        minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
        drawHand(ctx, minute, radius*0.8, radius*0.07);

        // for second hand 
        second=(second*Math.PI/30);
        drawHand(ctx, second, radius*0.9, radius*0.02);
    }
    //  generics function for drawing hands
    function drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0,0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }

    // functions for alarm's hour, second and minute menu 


    let sound=  new Audio ("alarm.mp3");

    function hoursMenu(){

        let select = document.getElementById('alarmhrs');
        let hrs = 12

        for (i=1; i <= hrs; i++) {
            select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
            
        }
    }
    hoursMenu();

    function minMenu(){

        let select = document.getElementById('alarmmins');
        let min = 59;

        for (i=0; i <= min; i++) {
            select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
        }
    }
    minMenu();

    function secMenu(){

        let select = document.getElementById('alarmsecs');
        let sec = 59;

        for (i=0; i <= sec; i++) {
            select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
        }
    }
    secMenu();



    // buttons setting the alarm 
    function alarmSet() {

        
        let hr=$( "#alarmhrs option:selected" ).text();

        let min=$( "#alarmmins option:selected" ).text();

        let sec=$( "#alarmsecs option:selected" ).text();

        let ap=$( "#ampm option:selected" ).text();

        // console.log("in this fucntion  alarm set ")
        sec=parseInt(sec);
        min=parseInt(min);
        hr=parseInt(hr);
        document.getElementById('alarmhrs').disabled = true;
        document.getElementById('alarmmins').disabled = true;
        document.getElementById('alarmsecs').disabled = true;
        document.getElementById('ampm').disabled = true;
        // console.log("printing alaram time ")
        // console.log(hr,min,sec,ap)
        let date , h,m,s, session;
        if(ap=='PM' && hr<12)
        {
           hr=hr+12

        }
        at=""+hr+min+sec+ap;
        console.log(at)
        

        timer=setInterval(function(){

         date = new Date();
         h = date.getHours(); // 0 - 23
         m = date.getMinutes(); // 0 - 59
         s = date.getSeconds(); // 0 - 59
         session="AM"
         if(h>=12){session="PM"}
        ct=""+h+m+s+session;
        console.log("settime",hr,min,sec,ap)
        console.log("curr time",h,m,s,session)
         console.log(ct)

        
        if(at == ct){
            console.log("in this function sound ")

            sound.play()
            //play sound
        }
        
    },1000);

    }
      

    // clearing the set alarm and enabling the input fields
    function alarmClear() {

        document.getElementById('alarmhrs').disabled = false;
        document.getElementById('alarmmins').disabled = false;
        document.getElementById('alarmsecs').disabled = false;
        document.getElementById('ampm').disabled = false;
        sound.pause();
        console.log("interval clearred  :P ")
        clearInterval(timer)
    }






