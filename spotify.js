console.log("javascript");

//declarations

let songIndex=0;
let audioElement = new Audio("06. Aaoge Jab Tum.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('Songitem'));
let Timer=document.querySelector('#timer');
let TimeStamp=document.querySelectorAll(".timestamp");
// console.log(TimeStamp)
// Timer.innerText=`${audioElement.duration}/${progress}`;
//songs path
let songs=[
    {songName: "06. Aaoge Jab Tum", filePath:"06. Aaoge Jab Tum.mp3",coverPath:'logo.jpg'},
    {songName: "Tumse Hi", filePath:"02  Tumse Hi .mp3",coverPath:'logo.jpg'},
    {songName: "Tum Saath Ho", filePath:'03 Tum Saath Ho.mp3',coverPath:'logo.jpg'},
    {songName: "Apna-Bana-le", filePath:'Apna-Bana-le.mp3',coverPath:'logo.jpg'},
    {songName: "Hoshwalon Ko Khabar Kya", filePath:'Hoshwalon Ko Khabar Kya - Sarfarosh.mp3',coverPath:'logo.jpg'},
    {songName: "Just Chill - MPKK", filePath:'Just Chill - Maine Pyaar Kyun Kiya .mp3',coverPath:'logo.jpg'},
    {songName: "Pehli Nazar me", filePath:'Pehli Nazar me.mp3',coverPath:'logo.jpg'},
    {songName: "Phir Aur Kya Chahiye", filePath:'Tu Hai To Mujhe Phir Aur Kya Chahiye.mp3',coverPath:'logo.jpg'},
]
// for(i=0;i<songs.length;i++){
    // console.log(songs[i].filePath);
    // }

    Timer.innerText=`0:00/5:23`;

    //setting songs path for each element
    songItems.forEach((element, i) => {
         element.getElementsByTagName('img')[0].src = songs[i].coverPath;
         element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
     })


     //setting time stamp for each songs
     TimeStamp.forEach((element, i) => {
        let audio = new Audio(songs[i].filePath)
        audio.setAttribute('preload', "metadata")
        audio.addEventListener('loadedmetadata', () => {
            // console.log(`Duration: ~ ${audio.duration.toFixed()}s`)
            element.innerText = `${parseInt(audio.duration/60)}:${parseInt(audio.duration%60)}`;
            // element.innerHTML =`${parseInt(audio.duration/60)}:${parseInt(audio.duration%60)}<i id='${i}'
            // class="fa-solid fa-play songItemPlay"></i>`
          })
        // console.log(audio.duration)
        // element.innerText = `${parseInt(songs.songName[i].duration/60)}:${parseInt(songs.songName[i].duration%60)}`;
    })
//audioElement.play();


//handle play/pause click on tab
masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            makeAllPlays();
            console.log(songIndex)
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
                console.log(element.id)
                if(element.id==songIndex) {
                   element.classList.remove('fa-play');
                   element.classList.add('fa-pause');
                }
             });
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            gif.style.opacity = 1;
        }
         else{
            audioElement.pause();
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
                if(element.id==songIndex) {
                   element.classList.remove('fa-pause');
                   element.classList.add('fa-play');
                }
             });
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity = 0;
         }
    })
//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar and changing songs with it with timer and also for timer
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    Timer.innerText=`${parseInt(audioElement.currentTime/60)}:${parseInt(audioElement.currentTime%60)}/${parseInt(audioElement.duration/60)}:${parseInt(audioElement.duration%60)}`;
    myProgressBar.value = progress;
    if(myProgressBar.value==100){
        if(songIndex>=7)
        songIndex=0;
        else
        songIndex += 1;
        audioElement.src = `${songs[songIndex].filePath}`;
        masterSongName.innerText = songs[songIndex].songName;
              audioElement.currentTime = 0;
              audioElement.play();
              makeAllPlays();
              Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
                 if(element.id==songIndex) {
                    element.classList.remove('fa-play');
                    element.classList.add('fa-pause');
                 }
              });
              masterPlay.classList.remove('fa-play');
              masterPlay.classList.add('fa-pause');
              gif.style.opacity = 1;

    }
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})



const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');

    })
}

//adding pause/play on playlist
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if (audioElement.paused || audioElement.currentTime <= 0) {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        // console.log(e.target.id);
          e.target.classList.remove('fa-play');
          e.target.classList.add('fa-pause');
          masterSongName.innerText = songs[songIndex].songName;
          audioElement.src = `${songs[songIndex].filePath}`
          audioElement.currentTime = 0;
          audioElement.play();
          gif.style.opacity = 1;
          masterPlay.classList.remove('fa-play');
          masterPlay.classList.add('fa-pause');}
          else{
            makeAllPlays();
           e.target.classList.remove('fa-pause');
          e.target.classList.add('fa-play');
          audioElement.pause();
          gif.style.opacity = 0;
          masterPlay.classList.remove('fa-pause');
          masterPlay.classList.add('fa-play');
          }
        })
})

//adding tab next feature
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7)
    songIndex=0;
    else
    songIndex += 1;
    audioElement.src = `${songs[songIndex].filePath}`;
    masterSongName.innerText = songs[songIndex].songName;
          audioElement.currentTime = 0;
          audioElement.play();
          makeAllPlays();
          Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
             if(element.id==songIndex) {
                element.classList.remove('fa-play');
                element.classList.add('fa-pause');
             }
          });
          masterPlay.classList.remove('fa-play');
          masterPlay.classList.add('fa-pause');
          gif.style.opacity = 1;


})

//adding tab previous feature
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0)
    songIndex=songs.length-1;
    else
    songIndex -=1;
    audioElement.src = `${songs[songIndex].filePath}`
    masterSongName.innerText = songs[songIndex].songName;
          audioElement.currentTime = 0;
          audioElement.play();
          makeAllPlays();
          Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            if(element.id==songIndex) {
               element.classList.remove('fa-play');
               element.classList.add('fa-pause');
            }
         });
          masterPlay.classList.remove('fa-play');
          masterPlay.classList.add('fa-pause');
          gif.style.opacity = 1;
})