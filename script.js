console.log("some js code ongoing")
//check
let currSong = new Audio();
let play = document.getElementById("playButtonOfPlaybar")


async function gettingSongs() {
    let songs = await fetch("http://127.0.0.1:5500/songs/");

    let response = await songs.text()

    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    // console.log(as);
    let songList = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {

            songList.push(element.href)
        }
    }
    return songList;
}//function for getting songs





function playMusic(track) {
    currSong.src = "/songs/" + track +"(PagalWorld)%20-%20Copy.mp3";
    currSong.play()
    play.src="pause.svg"
    document.querySelector(".songinfo").innerHTML=track
}//function for playing a song






function secondsToMinute(seconds){
    if (isNaN(seconds)||seconds<0) {
        return invalid
    }
    sec=Math.floor(seconds)
let minutes=Math.floor(sec/60);
let remainingseconds=Math.floor(sec % 60)
let formattedmins=String(minutes).padStart(2, '0')
let formattedsec=String(remainingseconds).padStart(2, '0')

return `${formattedmins}:${formattedsec}`
}//function for converting seconds to min:sec format







async function main() {
    let songsplaylist = await gettingSongs();

    

    console.log(songsplaylist)

    for (let i = 0; i < songsplaylist.length; i++) {
        const element = songsplaylist[i].split(`/songs/`)[1];
        let goodElement = element.replaceAll("%20", " ");
        let songName = goodElement.split('(PagalWorld)')[0];

        let Created_div = document.createElement("div")
        Created_div.classList.add("song")
        Created_div.innerHTML =
            `<img src="song.svg" class="invert" alt="">
<div class="songdetails">
<div>${songName}</div>
<div>Song Artist</div>
</div>

<div class="playForSong">
 <span>Play Now</span>
 <img src="playwithcircle.svg" class="invert" alt="">
 </div>
`;
        let playList = document.querySelector(".playList")
        playList.append(Created_div)

    }
    //adding event listener to the song
    Array.from(document.querySelector(".playList").querySelectorAll(".song")).forEach((e) => {
        e.addEventListener("click", elem => {
            // console.log(e.querySelector(".songdetails").firstElementChild.innerHTML)
            
             
            playMusic(e.querySelector(".songdetails").firstElementChild.innerHTML);



            
            //adding functionalities to the buttons

            play.addEventListener("click", () => {
                if (currSong.paused) {
                    currSong.play()
                    play.src = "pause.svg"

                } 
                else {
                    currSong.pause()
                    play.src = "play.svg"
                }
            })
        }
        )
    }
    )



   let songDur=document.querySelector(".songduration");
   currSong.addEventListener("timeupdate",()=>{
    songDur.innerHTML=`${secondsToMinute(currSong.currentTime)}/${secondsToMinute(currSong.duration)}`
    }

    )
}//main function


main()