import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {getDatabase,ref,onValue,set} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";


const firebaseConfig = {
apiKey: "AIzaSyCG1FNQ7OVymxvgy_CVILlctpzJuc3JJSk",
authDomain: "transcript-generator-6fe0c.firebaseapp.com",
projectId: "transcript-generator-6fe0c",
storageBucket: "transcript-generator-6fe0c.appspot.com",
messagingSenderId: "268654169176",
appId: "1:268654169176:web:85498ade864b40a50bce2d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);








chrome.runtime.onMessage.addListener((msg,sender,res)=>{
    if(msg.command === "firebase")
    {
        const d = new Date();
        console.log(msg.subs);
        const date = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
        const enc_date = btoa(date);
        const ref1 = ref(db,'transcript/'+enc_date);
        let subtitle = "";
        onValue(ref1,(snap)=>{
            const data = snap.val();
            if(data !== null)
            subtitle = data.subtitle;
            console.log(set(ref1,{subtitle:subtitle+msg.subs}));
        },{
            onlyOnce : true
        })
        res("response");
    }
    return true;
});