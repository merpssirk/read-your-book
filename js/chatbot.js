//CHATBOT CODING STARTED

const mic = document.getElementById("mic"); //DOM Element
//console.log(mic);

const chatAreaMain = document.querySelector('.chatarea-main'); // DOM Element

const chatAreaOuter = document.querySelector('.chatarea-outer');// DOM Element

const intro = ["Hello, I am Chitti", "Hi, I am a Robo", "Hello, My name is Chitti"];

const help = ["How may i assist you?","How can i help you?","What i can do for you?"];

const greetings = ["i am good you little piece of love", "i am fine, what about you", "don't want to talk", "i am good"];

const hobbies = ["i love to talk with humans", "i like to make friends like you", "i like cooking"];

const pizzas = ["which type of pizza do you like?", "i can make a pizza for you", "i would love to make a pizza for you", "would you like cheese pizza?"];

const thank = ["Most welcome","Not an issue","Its my pleasure","Mention not"];

const closing = ['Ok bye-bye','As you wish, bye take-care','Bye-bye, see you soon..'];

const speechText = ['This is Test Message', "Hi there. What's up?", "I'm not sure I understand", "I'm not sure Could you try again?", "I am as old as the eastern wind", "Sorry, I'm having trouble with the connection. Please try again in a moment", "I'm robo, your virtual assistant", "I'm over here..."]

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 
const recognition = new SpeechRecognition();
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API 
// माथीको लिङ्कमा ग्लोबल एपिआइ छ, अनि त्यसलाई हाम्रो फाइलमा कपि गर्दा हामीले अगाडि 'window' भन्ने लेख्नु पर्छ किन कि हामी विन्डोको साथमा प्रयोग गर्न चाहन्छौं। हामीले स्पिच रिकोड्निसन बनाइसक्यौं। 

//अब transcript लाई यो फंसनमा पास गर्नुपर्छ। 
function showUserMsg(userMsg){
    let output = '';
    output += `<div class="chatarea-inner user">${userMsg}</div>`; // We create a div dynamically // अब यो माथिको अउटपुटलाई हामीले च्याट-एरिया-आउटर भित्र राख्नु पर्छ। त्यसको लागि तलको जस्तै गर्नुपर्छ। 
    chatAreaOuter.innerHTML += output; // अरू म्यासेज थप्नको लागि माथिको लाइनमा हामीले += गरेका हौं। 
    return chatAreaOuter;
}
/// रोबोटले बोलेको कुरालाई म्यसेजमा परिणत गर्नको लागि तलको फंसन बनाइएको हो। त्यसपछि यो फंसनलाई अनरिजल्ट मेथड भित्र कल गर्ने नभइ, हामीले chatbotvoice फंसन भित्र कल 
function showChatBotMsg(chatBotMsg){
    let output = '';
    output += `<div class="chatarea-inner chatbot">${chatBotMsg}</div>`;
    chatAreaOuter.innerHTML += output;
    return chatAreaOuter;
}

// To get Voice from chatbot(रोबोटको आवाज सुन्नको लागि) we need to create function as below.
function chatBotVoice(message){
    const speech = new SpeechSynthesisUtterance();//to get response from robbot we wrote this line. We can see more information here about it: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance // हामीले वबजेक्ट बनायौं। 
    speech.text = speechText[Math.floor(Math.random() * speechText.length)];//"This is test message"; // रोबोटले यो भित्रको स्ट्रिङमा भएको वाक्य पढ्छ। 
    if(message.includes('who are you')){
        let finalresult = intro[Math.floor(Math.random() * intro.length)];
        speech.text = finalresult;
    }

    if(message.includes('fine')){
        let finalresult = help[Math.floor(Math.random() * help.length)];
        speech.text = finalresult;
    }

    if(message.includes('how are you' || 'how are you doing today' || 'how old are you')){
        let finalresult = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalresult;
    }

    if(message.includes('tell me something about you' || 'tell me something about your hobbies')){
        let finalresult = hobbies[Math.floor(Math.random() * hobbies.length)];
        speech.text = finalresult;
    }

    if(message.includes('pizza')){
        let finalresult = pizzas[Math.floor(Math.random() * pizzas.length)];
        speech.text = finalresult;
    }

    if(message.includes('thank you' || 'thank you so much')){
        let finalresult = thank[Math.floor(Math.random() * thank.length)];
        speech.text = finalresult;
    }

    if(message.includes('talk to you' || 'talk')){
        let finalresult = closing[Math.floor(Math.random() * closing.length)];
        speech.text = finalresult;
    }
    window.speechSynthesis.speak(speech); // त्यसपछि हामीले विन्डो भित्र speechSynthesis मेथडमा speak() मेथड राखेर त्यस भित्र speech पास गऱ्यौं।  
    // यसपछि यो फंसनलाई तलहामीले बनाएको अन रेजल्ट मेथड भित्र पास गर्नु पर्छ । 
    chatAreaMain.appendChild(showChatBotMsg(speech.text));
}
//हामीले बोलेको कुरालाई, स्पीचलाई टेक्स्टमा चेन्ज गर्नको लागि हामीले माथी बनाएको रिकग्निसन लाई अनरिजल्ट म्याथडमा लेख्नुपर्छ। ठ्याक्कै तलको जस्तै। 
recognition.onresult= ((event)=> {
    //console.log(event); //यो लाईनले कन्सलमा गएर SpeechRecognitionEvent देखाउँछ अनि त्यो भित्र गएर resultIndex, results र transcript लाई तल लेखिएको जस्तै गरी लेख्नु पर्छ। 
   let resultIndex = event.resultIndex;
   let transcript = event.results[resultIndex][0].transcript;
   chatAreaMain.appendChild(showUserMsg(transcript));//chatareaouter भन्ने डिभ  chatareamain भित्र भएकोले माथिको लाइनमा हामीले appendChild गर्दा chatareamain मा गरेका हौं। 
  chatBotVoice(transcript);
  console.log(transcript);
});
//onend() this is a function. यसले इभेन्टलिसनरको काम सकिए पछि, हरियो कलर लाई पहिलाको जस्तै अवस्थामा लैजान्छ। 
recognition.onend= (()=>{
    mic.style.background="#50CDDD";
});

mic.addEventListener("click", ()=>{
    mic.style.background='#39c81f';
   recognition.start(); //यो एउटा म्याथड हो। यो म्य़ाथडले वेवकिटस्पिच रिकग्निसनलाई स्टार्ट गर्छ। 
    console.log("Activated");
});
