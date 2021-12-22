import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {getDatabase,ref,onValue,set} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,MESSAGING_SENDER_ID,APP_ID } from "./var.js";

const firebaseConfig = {
apiKey: API_KEY,
authDomain: AUTH_DOMAIN,
projectId: PROJECT_ID,
storageBucket: STORAGE_BUCKET,
messagingSenderId: MESSAGING_SENDER_ID,
appId: APP_ID
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