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
        console.log(msg.data.subs);
        var day = d.getDate();
        var month = d.getMonth()+1;
        var year = d.getFullYear()
        if(day<10)
        day = '0'+day;
        if(month<10)
        month = '0'+month;
        const date = day+'/'+month+'/'+year;
        const enc_date = btoa(date);
        const meetingId = btoa(msg.data.meetingId);
        const ref1 = ref(db,'/transcript/email/'+enc_date+'/'+meetingId);
        let subtitle = "";
        onValue(ref1,(snap)=>{
            var data = snap.val();
            // console.log(meetingId);
            var subtitle = "";
            if(data !== null)
            subtitle = data['subtitle'];
            console.log(set(ref1,{'subtitle':subtitle+msg.data.subs}));
        },{
            onlyOnce : true
        })
        res("response");
    }
    return true;
});