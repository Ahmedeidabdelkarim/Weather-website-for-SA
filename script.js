//////////////////////////////////////////////////////////
let cities=[
    {
    arabicName:"الرياض",
    name:"Ar Riyāḑ"
    },
    {
    arabicName:"مكه",
    name:"Makkah al Mukarramah"
    },
    {
    arabicName:"القسيم",
    name:"Al Qaşīm"
    },
    {
    arabicName:"الباحه",
    name:"Al Bāḩah"
    }];

////////// fill content in selection option/////////////////
for(city of cities){
    let content=`
        <option value="${city.arabicName}">${city.arabicName}</option>
    `
    document.getElementById("cities-select").innerHTML+=content;
}



document.getElementById("cities-select").addEventListener("change",function(){
    //alert("hi")
    //console.log(this.value);
    document.getElementById("nameCity").textContent=this.value;
    
    let cityName=""
    for(let city of cities){
        if(city.arabicName==this.value){
            cityName=city.name
        }
    }
    getPrayersTimingsOfCity(cityName)

})

function getPrayersTimingsOfCity(cityName="Ar Riyāḑ"){
    let params = {
        country: "SA",
        city: cityName,//"Makkah al Mukarramah"
    };

    axios.get("http://api.aladhan.com/v1/timingsByCity", { params: params })
    .then((response) => {
        console.log(response.data.data);

        let timings = response.data.data.timings;
        document.getElementById("fajr-time").textContent = timings.Fajr;
        document.getElementById("sunrise-time").textContent = timings.Sunrise;
        document.getElementById("dhur-time").textContent = timings.Dhuhr;
        document.getElementById("aser-time").textContent = timings.Asr;
        document.getElementById("sunset-time").textContent = timings.Sunset;
        document.getElementById("isha-time").textContent = timings.Isha;

        const readableDate = response.data.data.date.readable;
        const weekDay = response.data.data.date.hijri.weekday.ar;
        console.log(readableDate + "  " + weekDay);

        document.getElementById("date").textContent =
            weekDay + " " + readableDate;
        })
        .catch((error) => {
        console.log(error);
        });
}
//////////////defult///////////////////
getPrayersTimingsOfCity("Ar Riyāḑ")
