console.log("working");
const observer = new MutationObserver((mutation)=>{
    if(document.body.querySelector("div[jscontroller='kAPMuc']"))
    {
        observer.disconnect();
        console.log("now disconnected");
        subtitleGeneration();
    }
    else
    console.log("observer working");
});

observer.observe(document.body,{
    childList : true,
    subtree : true
})

function subtitleGeneration(){
    console.log("now going to generate subtitle");
    const subtitle = document.body.querySelector("div[jscontroller='TEjq6e']");
    if(subtitle.style.display === "none")
    alert("turn on the cc");
    // else
    // {
        console.log("cc is on");
        let globalTranscript = "";
        let currTranscript = "";
        const subtitleObserver = new MutationObserver((mutation)=>{
            // console.log(mutation.length);
            let done = 0;
            mutation.forEach((record)=>{
                if(record.removedNodes.length !== 0 && record.target.classList.contains("iTTPOb"))
                {
                    currTranscript = record.removedNodes[0].innerText + currTranscript;
                    done = 1;
                }
            })
            if(done === 1)
            {
                setTimeout(()=>{
                    // globalTranscript += currTranscript;
                    //sending these transcript to firebase : //
                    console.log(currTranscript);
                    chrome.runtime.sendMessage({command:"firebase",subs:currTranscript},(res)=>{
                        console.log(res);
                    });
                    currTranscript = "";
                },1000);
            }
        });
        subtitleObserver.observe(subtitle,{
            childList : true,
            subtree : true,
            characterData : false,
            attributes : false
        })
    // }

}