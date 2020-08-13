//LOAD A BOOK FROM DISK
function loadBook(filename, displayName) {
    let currentBook = "";
    let url = "books/" + filename;
    //reset our UI
    document.querySelector("#fileName").innerHTML = displayName;
    document.querySelector("#searchstat").innerHTML = "";
    document.querySelector("#keyword").value = "";
    //create a server a request to load our books
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = (()=> {
        if (xhr.readyState == 4 && xhr.status == 200) {
            currentBook = xhr.responseText;
            getDocStatus(currentBook);          
            //remove line breaks and carriage returns and replace with a <br>
            currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');
            document.querySelector("#fileContent").innerHTML = currentBook;
            let elmnt = document.querySelector("#fileContent");
            elmnt.scrollTop = 0; //Scroll viewer to top
        }
    });
}
//GET THE STATS FOR THE BOOK
function getDocStatus(fileContent) {
    const docLength = document.querySelector("#docLength");
    const wordCount = document.querySelector("#wordCount");
    const charCount = document.querySelector("#charCount");
    let text = fileContent.toLowerCase();
    let wordArray = text.match(/\b\S+\b/g); //It looks for spaces with a slash and then characters in between any two spaces it will return the array of words
    let wordDictionary = {}; //
    let uncommonWords = [];  // This is for un common word that we do not want to count.

    //FILTER OUT THE UNCOMMON WORDS
    uncommonWords = filterStopWords(wordArray);

    //COUNT EVERY WORD IN THE  WORDARRAY
    for (let word in uncommonWords) {
        let wordValue = uncommonWords[word];
        if (wordDictionary[wordValue] > 0) {
            wordDictionary[wordValue] += 1;
        } else {
            wordDictionary[wordValue] = 1;
        }
    }
    //SORT THE ARRAY
    let wordList = sortProperties(wordDictionary);
    //RETURN THE TOP 5 WORDS
    let top5Words = wordList.slice(0, 6);
    //RETURN THE LEAST 5 WORDS
    let least5Words = wordList.slice(-6, wordList.length);
    //WRITE THE VALUES TO THE PAGE
    ULTemplate(top5Words, document.querySelector("#mostUsed"));
    ULTemplate(least5Words, document.querySelector("#leastUsed"));
    docLength.innerText = "Document Length: " + text.length; // it will shows the doucment length on Document Staticis section
    wordCount.innerText = "Word Count: " + wordArray.length;// it will count the doucment length on Document Staticis section

}
function ULTemplate(items, element) {
    let rowTemplate = document.querySelector('#template-ul-items');
    let templateHTML = rowTemplate.innerHTML;
    let resultsHTML = "";
    for (let i = 0; i < items.length - 1; i++) {
        resultsHTML += templateHTML.replace('{{val}}', items[i][0] + " : " + items[i][1] + " time(s)");
    }
    element.innerHTML = resultsHTML;
}

function sortProperties(obj) {
    //FIRST CONVERT THE OBJECT TO AN ARRAY
    let rtnArray = Object.entries(obj);
    //SORT THE ARRAY
    rtnArray.sort((first, second) => {
        return second[1] - first[1];
    });
    return rtnArray;
}

//FILTER OUT STOPS WORDS
function filterStopWords(wordArray) {
    const commonWords = getStopWords();
    const commonObj = {};
    const uncommonArr = [];
    for (let i = 0; i < commonWords.length; i++) {
        commonObj[commonWords[i].trim()] = true;
    }
    for (let i = 0; i < wordArray.length; i++) {
        word = wordArray[i].trim().toLowerCase();
        if (!commonObj[word]) {
            uncommonArr.push(word);
        }
    }
    return uncommonArr;
}

//a list of stop words we don't want to include in stats

function getStopWords() {
    return ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most" , "mr", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];
}

//HIGHLIGHT THE WORDS IN SEARCH

function highlightTheWordsInSearch() {
    //READ THE KEYWORD
    let keyword = document.querySelector("#keyword").value;
    let display = document.querySelector("#fileContent");
    let newContent = "";
    //FIND ALL THE CURRENTLY MARKED ITEMS
    let spans = document.querySelectorAll('mark'); // it will look for the mark, like this <mark>Harry</mark>

    for (let i = 0; i < spans.length; i++) {
        spans[i].outerHTML = spans[i].innerHTML; // outerHTML will be this: <mark>Harry</mark> innerHTML will be just "Harry"
        //what it does is it takes string here this <mark>Harry</mark> and takes "Harry" from there.
    }

    let re = new RegExp(keyword, "gi"); //look for globally (g) and i don't care about case sensetive (i);
    let replaceText = "<mark id ='markme'>$&</mark>";
    let bookContent = display.innerHTML;

    //add the mark to the book content
    newContent = bookContent.replace(re,replaceText);

    display.innerHTML = newContent;
    let count = document.querySelectorAll('mark').length;
    document.querySelector("#searchstat").innerHTML = "found " + count + " matches";

    if (count > 0) {
        let element = document.querySelector("#markme");
        element.scrollIntoView();
    };

}

//CHATBOT CODING STARTED

const mic = document.getElementById("mic"); //DOM Element
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

//CODING FOR CALENDAR STARTED

const date = new Date();
//console.log(date);

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  //console.log(lastDay);

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
 //console.log(prevLastDay);

  const firstDayIndex = date.getDay();
  //console.log(firstDayIndex);

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  //console.log(lastDayIndex);

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January", //index 0
    "February",// index 1
    "March",//index 2
    "April",//index 3
    "May",//index 4
    "June",//index 5
    "July",//index 6
    "August",//index 7
    "September",//index 8
    "October",//index 9
    "November",//index 10
    "December",//index 11
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()]; //months[0];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

//CODING STARTED FOR CONTACT FORM

/* const userDataForm = document.querySelector('#user-data');

userDataForm.addEventListener('submit', (event)=>{
    event.preventDefault();
});
 */


// id [name, email, phone, website]

const name = document.querySelector('#name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const website = document.querySelector('#website');

name.addEventListener('blur', valiDateName);
email.addEventListener('blur', validateEmail);
phone.addEventListener('blur', validatePhone);
website.addEventListener('blur', validateWebsite);

function valiDateName() {
    //console.log(name.value);

    const reg = /^[a-zA-Z]{2,35}$/;

    if (!reg.test(name.value)) {
       
       name.classList.add('is-invalid');   
       
       name.classList.remove('is-valid'); 

    }

    else {
        
        name.classList.remove('is-invalid'); 

        name.classList.add('is-valid'); 
    }
}

function validateEmail () {

    const reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if(!reg.test(email.value)) {

        email.classList.add('is-invalid');

        email.classList.remove('is-valid');
    }
    else {

        email.classList.remove('is-invalid');

        email.classList.add('is-valid');
    }
}

function validatePhone () {
    const reg = /^(\+49-|\+49|0)?\d{15}$/;
    
    if (!reg.test(phone.value)) {

        phone.classList.add('is-invalid');

        phone.classList.remove('is-valid');
    }
    else {
        phone.classList.remove('is-invalid');

        phone.classList.add('is-valid');
    }
}

function validateWebsite () {
    const reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,50})$/;

    if (!reg.test(website.value)) {

        website.classList.add('is-invalid');

        website.classList.remove('is-valid');
    }
    else {
        website.classList.remove('is.invalid');

        website.classList.add('is-valid');
    }
}
// FORM SECTION JS CODE END //

