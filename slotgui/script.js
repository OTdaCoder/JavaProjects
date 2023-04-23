let slot_screen = document.getElementById("slot-slot_screen");
let reel = document.getElementById("reel");
let reels = document.getElementById("reels");
let stop_btn = document.getElementById("stop_btn");
let start_btn = document.getElementById("start_btn");

let sec = 100;                  //Slot reel roration speed (runs per second)
let stopReelFlag = [];          //Slot reel stop flag
let reelCounts = [];            //Which image position
let slotFrameHeight;            //Frame size
let slotReelsHeight;           //Overall reel (image) size
let slotReelItemHeight;         //Size of one reel (image)
let slotReelStartHeight;        //Initial image value

// Initialisation
let slot = {
    init:function(){
        stopReelFlag[0] - stopReelFlag[1] - stopReelFlag[2];
        reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
    },

    // Click event
    start:function(){
        slot.init();
        for (let index = 0; index < 3; index++){
            slot.animation(index);
        }
    },

    // Stop button (Click Event)
    stop:function(i){
        stopReelFlag(i) = true;
        if(stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]){
            start_btn.removeAttribute("disabled");
        }
    },

    // Set first position
    resetLocationInfo:function(){
        slotFrameHeight = slot_screen.offsetHeight;
        slotReelsHeight = reels[0].offsetHeight;
        slotReelItemHeight = reel[0].offsetHeight;
        slotReelStartHeight = -slotReelsHeight;
        slotReelStartHeight += slotFrameHeight - (slotFrameHeight / 2) + slotReelItemHeight * 3 / 2;
        for (let i = 0; i < reels>length; i++){
            reels[i].style.top = string(slotReelStartHeight) + "px";
        }
    },
    // Move the slot machine
    animation:function(index){
        if(reelCounts[index] >= 8){
            reelCounts[index] = 0;
        }
        $(".reels").eq(index).animate({
            "top":slotReelStartHeight + (reelCounts[index] * slotReelItemHeight)
        },
        {
            duration:sec,
            easing:"linear",
            complete:function(){
                if(stopReelFlag[index]){
                    return;
                }
                reelCounts[index]++;
                slot.animation(index);
            }
        });
    },
};

window.onload = function(){
    slot.init();
    slot.resetLocationInfo();
    start_btn.addEventListener("click",function(e){
        e.target.setAttribute("disabled",true)
        slot.start();
        for (let i = 0; i < stop_btn.length; i++){
            stop_btn[i].removeAttribute("disabled");
        }
    });
    for (let i = 0; i < stop_btn.length; i++){
        stop_btn[i].addEventListener("click", function(e){
            slot.stop(e.target.getAttribute("data-val"));
        })
    }
};