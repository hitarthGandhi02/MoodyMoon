var isS4 = false;
function firstDate() {
    let fDate = new Date;
    let d = fDate.getDate();
    let m = fDate.getMonth()+1;
    let y = fDate.getFullYear();
    let detailsDate = (y+"-"+m+"-"+d);
    let finalDateArr = [fDate.getDate(), fDate.getMonth()+1, fDate.getFullYear()];
    let [a0,a1,a2] =  dateFormat(finalDateArr);
    changeDate([a0,a1,a2]); 
    getMoon(finalDateArr).then((moonPhase) => {
       changeMoon(moonPhase);
    });
    getDetails(detailsDate);
}
var city = 'phalodi';
const img = document.getElementById("mainImg");
function getMoon([d,m,y]) {
    let mdate = `${y}-${m}-${d}`;
    const getMoonUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/pune/${mdate}?unitGroup=us&key=QUJDTLMVZNTPMAL2CFAQ8AVBT&include=days`
    return new Promise((res, rej) => {
    let p =  fetch(getMoonUrl);
    p.then((val1) => {
        if(!val1) {
            throw new Error ("api error");
        }
        return val1.json();
    }).then((val2) => {
            var moonPhase = val2.days[0].moonphase;
            console.log(val2);
            res(moonPhase);
    })
});
}

function changeDate(arr) {
    console.log(arr);
    document.querySelector(".date").innerHTML = `${arr[0]} ${arr[1]}, ${arr[2]}`;
    document.querySelector(".dateS2").innerHTML = `${arr[0]} ${arr[1]}, ${arr[2]}`;
}
function changeMoon(moonPhase) {
    if(moonPhase == 0) {
        changeImageName("NEW_MOON");
        if(isS4) {
            horoscope("NEW_MOON");
        }
    }
    else if(moonPhase > 0 && moonPhase < 0.25) {
        changeImageName("WAXING_CRESCENT");
        if(isS4) {
            horoscope("WAXING_CRESCENT");
        }
    }
    else if(moonPhase == 0.25) {
        changeImageName("FIRST_QUARTER");
        if(isS4) {
            horoscope("FIRST_QUARTER");
        }
    }
    else if(moonPhase > 0.25 && moonPhase < 0.5) {
        changeImageName("WAXING_GIBBOUS");
        if(isS4) {
            horoscope("WAXING_GIBBOUS");
        }
    }
    else if(moonPhase == 0.5) {
        changeImageName("FULL_MOON");
        if(isS4) {
            horoscope("FULL_MOON");
        }
    }
    else if(moonPhase > 0.5 && moonPhase < 0.75) {
        changeImageName("WANING_GIBBOUS");
        if(isS4) {
            horoscope("WANING_GIBBOUS");
        }
    }
    else if(moonPhase == 0.75) {
        changeImageName("THIRD_QUARTER");
        if(isS4) {
            horoscope("THIRD_QUARTER");
        }
    }
    else if(moonPhase > 0.75 && moonPhase < 1) {
        changeImageName("WANING_CRESCENT");
        if(isS4) {
            horoscope("WANING_CRESCENT");
        }
        
    }
}
function changeImageName(phaseName) {
    let moonImgS1 = document.getElementById("mainImg");
    let phaseTextS1 = document.getElementById("phase");
    let moonImgS2 = document.getElementById("mainImgS2");
    let moonImgS4 = document.getElementById("moonImgS4");
    let phaseTextS4 = document.querySelector(".slide4Title");
    moonImgS1.setAttribute("src", `images/${phaseName}.png`);
    phaseTextS1.textContent = phaseName.replace("_", " ");
    moonImgS2.setAttribute("src", `images/${phaseName}.png`);
    if(isS4){
    moonImgS4.setAttribute("src", `images/${phaseName}.png`);
    phaseTextS4.textContent = phaseName.replace("_", " ");
    }
}

function dateSubmit() {
    let dateInput = document.getElementById("datePicker")
    let dateInputArr = new Date(dateInput.value);
    let d = dateInputArr.getDate();
    let m = dateInputArr.getMonth()+1;
    let y = dateInputArr.getFullYear();
    let detailsDate = (y+"-"+m+"-"+d);
    let [ar0, ar1, ar2] = dateFormat([d,m,y]);
    changeDate([ar0, ar1, ar2]);
    getMoon([d,m,y]).then((moonPhase) => {
        changeMoon(moonPhase);
     });
    getDetails(detailsDate);
}
function dateFormat(dateInput) {
    console.log(dateInput)  
    let d1 = `${dateInput[2]}-${dateInput[1]}-${dateInput[0]}`;
    console.log(d1);
    let dateFinal = new Date(d1);
    let date = dateFinal.getDate();
    let month = dateFinal.toLocaleString('default', { month: 'long' });
    let year = dateFinal.getFullYear();
    console.log([date, month, year]);
    return [date, month, year];
} 
async function getDetails(newDate) {
        let response = await fetch(`https://api.worldweatheronline.com/premium/v1/astronomy.ashx?key=8151074f9b5b446c91080555242801&q=ahmedabad&date=${newDate}`);
        let tres = await response.text();
        var x2js = new X2JS();  
        let fres = x2js.xml_str2json(tres)
        changeDetails(fres.data.time_zone);
}
function changeDetails(timeZone) {
    console.log(timeZone);
    let fPhaseName = document.getElementById("phasenameVal");
    let illumPer = document.getElementById("illumPerVal");
    let moonRise = document.getElementById("moonRiseVal");
    let moonSet = document.getElementById("moonSetVal");
    let sunRise = document.getElementById("sunRiseVal");
    let sunSet = document.getElementById("sunSetVal");
    fPhaseName.innerHTML = timeZone.moon_phase;
    illumPer.innerHTML = timeZone.moon_illumination + "%";
    moonRise.innerHTML = timeZone.moonrise;
    moonSet.innerHTML = timeZone.moonset;
    sunRise.innerHTML = timeZone.sunrise;
    sunSet.innerHTML = timeZone.sunset;
}
let wanGib = "The Waning Gibbous Moon is the first phase after the Full Moon, and the beginning of the Moon’s waning. While this may imply a decline of some sort, a better way to think about it is “reflection”. An individual born under the Waning Gibbous Moon often seems wise beyond their years, with an enhanced ability to parse their experiences and learn from them. This tendency also makes them particularly good teachers and communicators.";
let wanCre = "he Waning Crescent Moon is the very last Moon phase, where the Moon is nearing the completion of its cycle. Individuals born under this phase are influenced by the energy of an aged, wise Moon, and are gifted with a kind of energy that isn’t necessarily reflected in personality or even in the physical world. In other words, you are likely a talented psychic who is closely in touch with your spiritual side, even if you may not realize it. Through dreams and daydreams, you may receive insights or even visions that help you to be more successful in life. In line with this tendency, you may also have an extremely active imagination. This is because human imagination is the most active under low light conditions - near-darkness, with just a hint of what’s around us, is a very fertile ground for the imagination.";
let waxCre = "Children of the Waxing Crescent tend to be similar to those born under the New Moon - you are adventurous, joyous and full of curiosity. But there one key difference: you tend to be more timid and conservative when it comes to taking risks and trying new things. In fact, you have a tendency to cling to the past and stay in your comfort zone. Being relatively weak in energy, your instinct is to ensure your own security above all.";
let waxGib = "The Waxing Gibbous Moon is the phase just before the Full Moon, when the Moon is nearing its full potential. Individuals born under this Moon are predisposed to be caring, nurturing, and calming. You likely excel at developing relationships with other people, guiding them and inspiring them to reach new heights in their lives. If you put in the time and effort, you can easily surround yourself with people who love you, or at least respect you.";
let fulMoo = "The Full Moon is well known for driving people to lunacy, aggression, and in extreme cases, even lycanthropy. While it is unlikely that being born under a Full Moon will literally turn you into a werewolf, it is true that the Moon is intimately tied to a person’s emotions - and may have more control over you than you think.";
let newMoo = "During the New Moon phase, both the Sun and Moon are lined up perfectly, which means your Sun sign is the same as your Moon sign. In other words, your mind and your heart are in perfect harmony. As the exact opposite of a Full Moon child, you don’t let inner conflict trouble you too much. You are very in tune with what you want - and what you want is usually that next new shiny thing on the horizon.";
let firQua = "As an individual born under the First Quarter Moon, you have never doubted that you are the protagonist of your own life. You are a person of action who loves a good challenge - the more difficult a challenge is, the more excited you get, and the better you perform. You want to achieve things, not necessarily for the sense of accomplishment or to be praised by others, but simply because you cannot fathom any other way of living.";
let lasQua = "While children of the Waxing Crescent cling to the past out of fear, children of the Third Quarter Moon hold onto the past out of love. You have a quality about you that seems slow, almost frozen in time. While you have no fear of the present or future, you tend to get deeply attached to things, people, places - and while that means you’re exceedingly talented at finding meaning and happiness in life, even the smallest things, this tendency can also prevent you from moving on when you need to.";
function s4DateSubmit() {
    document.querySelector(".slide4MainText").classList.add("hidden")
    document.querySelector(".s4After").classList.remove("hidden");
    let dateInput = document.getElementById("s4DatePicker")
    isS4 = true;
    let dateInputArr = new Date(dateInput.value);
    let d = dateInputArr.getDate();
    let m = dateInputArr.getMonth()+1;
    let y = dateInputArr.getFullYear();
    let detailsDate = (y+"-"+m+"-"+d);
    let [ar0, ar1, ar2] = dateFormat([d,m,y]);
    console.log([ar0, ar1, ar2])
    changeDate([ar0, ar1, ar2]);
    getMoon([d,m,y]).then((moonPhase) => {
        changeMoon(moonPhase);
        console.log("ishARRRR  :  " + moonPhase)
     });
}
function horoscope(Phasename) {
    let horoText = document.getElementById("horText");
    let luckyNum = document.getElementById("luck-num");
    switch(Phasename) {
        case "WANING_GIBBOUS":
            horoText.textContent = wanGib;
            luckyNum.textContent = 6;
            break;
            case "WANING_CRESCENT":
                horoText.textContent = wanCre;
                luckyNum.textContent = 9;
                break;
                case "WAXING_CRESCENT":
                    horoText.textContent = waxCre;
                    luckyNum.textContent = 7;
                    break;
                    case "WAXING_GIBBOUS":
                        horoText.textContent = waxGib;
                        luckyNum.textContent = 1;
                        break;
                        case "FULL_MOON":
                            horoText.textContent = fulMoo;
                            luckyNum.textContent = 3;
                            break;
                            case "NEW_MOON":
                                horoText.textContent = newMoo;
                                luckyNum.textContent = 8;
                                break;
                                case "NEW_MOON":
                                    horoText.textContent = newMoo;
                                    luckyNum.textContent = 5;
                                    break;
                                    case "FIRST_QUARTER":
                                        horoText.textContent = firQua;
                                        luckyNum.textContent = 2;
                                        break;
                                        case "LAST_QUARTER":
                                            horoText.textContent = lasQua;
                                            luckyNum.textContent = 4;
                                            break;
    }
}