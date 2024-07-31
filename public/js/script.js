let form = document.getElementById('form1');
const errorF = document.getElementById('error');
const locationF = document.getElementById('location');
const forecastF = document.getElementById('forecast');
const loadingMessage = document.getElementById('loadingMessage'); 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    weatherFun();
    form.reset();
});

let weatherFun = async () => {
    try {
        const address = document.getElementById('address').value;
        loadingMessage.style.display = 'block';
        errorF.innerText = 'Please wait, fetching weather data...';
        locationF.innerText = '';
        forecastF.innerText = '';

        const res = await fetch('http://localhost:3000/weather?address=' + address);
        const data = await res.json();
        console.log(data);

        if (data.error) {
            errorF.innerText = data.error;
           
        } else {
           
            locationF.innerHTML = '';
            forecastF.innerHTML = '';
            locationF.innerHTML = `
            <div class="info-container">
                <div class="info-item">Location: ${data.location}</div>
                <div class="info-item">Latitude: ${data.latitude}</div>
                <div class="info-item">Longitude: ${data.longitude}</div>
                <div class="info-item">Temperature: ${data.forecast}°C</div>
            </div>`;
            errorF.innerText = '';
        }
    } catch (e) {
        console.log(e);
        errorF.innerText = 'An error occurred while fetching data.';
        locationF.innerText = '';
        forecastF.innerText = '';
        
    }   finally {
              loadingMessage.style.display = 'none';
           }
};