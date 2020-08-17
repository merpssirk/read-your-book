
//CODING FOR CALENDAR STARTED

const date = new Date(); //constructor function
//console.log(date);

const renderCalendar = () => {
  date.setDate(1); // Yasle Mahina ko pahilo din dekhaunchha.
  //console.log(date.getDay());

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(), //यो म्याथडले करेन्ट यियर दिन्छ। 
    date.getMonth() + 1, // यसले करेन्ट महिनाको दिन्छ । जब date.getMonth() मेथडमा हामीले जिरो स्पेसिफाइ गर्छौं तब हामी अघिल्लो महिनाको लास्ट डे अफ दि मन्थ देख्न सक्छौं। करेन्ट महिनाको लास्ट डे गेट गर्नको लागि हामीले date.getMonth() यो मेथडमा +१ गर्नु पर्छ ।
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

  const nextDays = 7 - lastDayIndex - 1; //yasma "-1" kina gareko bhane weekdays index are "o" based. 

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

  document.querySelector(".date h1").innerHTML = months[date.getMonth()]; //months[0];//Dom Element महिना देखाउनको लागी मैले एच १ ट्याग स्लेक्ट गरे अनि डाइनामिकली महिना देखाउनको लागि मैले माथि getMonth() म्याथड युज गरे। 

  document.querySelector(".date p").innerHTML = new Date().toDateString();  // मिती देखाउनको लागि यो लाइनमा toDateString() यस्तो गरिएको हो। 

  // क्यालेन्डरमा दिनहरू डाइनामिकलि देखाउनको लागि तल हामीले लुपको प्रयोग गरेका छौं। 

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    //May mahina ko Din Friday bata suru hunchha. Tyasaile Friday samma week index 5 hunchha. Mathiko loop le index 5, yaneki friday bata count suru garchha ani 0 index samma yaneki Sunday samma count garchha ra last month ko din haru rakchha. 
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
    // यो लुपले दिनहरू डाइनामिकली क्रिएट गर्छ। Ani एचटिएमएल मा हामीलाई दिनहरू चाहीं दैन। 
    /* 
    let days = '';
    for (let i = 1; i<=31; i++) {
      monthDays.innerHTML = days;
    }
     */
  }

  //to get the next date we have to do following loop
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