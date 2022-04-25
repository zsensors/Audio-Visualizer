


window.onload = function(){

   
    
    const btn = document.querySelector('.btn');
    let file = document.getElementById("song");
    let audio = document.getElementById("audio");

    btn.addEventListener('click', e => {
        audio.paused ? audio.play() : audio.pause();
        btn.classList.toggle('btn-play');
        btn.classList.toggle('btn-pause');
    
        
    });
    


  
    file.onchange = function() {
        
       
        let files = this.files;
        audio.src = URL.createObjectURL(files[0]);
        
        let context = new AudioContext();
        let src = context.createMediaElementSource(audio);
        let analyser = context.createAnalyser();

        

        let container = document.getElementById("container");
        container.width = window.innerWidth;
        container.height = window.innerHeight;
        let ctx = container.getContext("2d");

        src.connect(analyser);
        analyser.connect(context.destination);
        
        analyser.fftSize = 512;
        
        let bufferLenght = analyser.frequencyBinCount;
       
        console.log(bufferLenght);
        let dataArray = new Uint8Array(bufferLenght);
        
        let WIDTH = container.width;
        let HEIGHT = container.height;
        let barWidth = (WIDTH / bufferLenght) * 2.5;
        let barHeight;
        

        function renderFrame(){
            requestAnimationFrame(renderFrame)

            x = 0;

            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            for (let i = 0; i < bufferLenght; i++){
                barHeight = dataArray[i];
                let r = barHeight + (25* (i/bufferLenght));
                let g = 100 * (i/bufferLenght);
                let b = 50;
                    
                ctx.fillStyle = "rgb(" + b + "," + g + "," + r + ")";
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }
        }


        
        audio.play();
        renderFrame();

    };


};