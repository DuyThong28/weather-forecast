# WEATHER FORECAST
![image](https://github.com/DuyThong28/weather-forecast/assets/116278919/ef94cbb6-b247-4224-96e1-900249552693)
<ul>
  <li><b>Demo: </b><a href="https://www.youtube.com/watch?v=lypsnomIpp4">Weather forecast demo</a></li>
    <li><b>Deploy: </b><a href="https://weather-forecast-lovat-eta.vercel.app/">Weather Forecast</a></li>
</ul>

# Features
<ul>
  <li>Search for a city and display weather information:
    <ul>
      <li>
        Show the weather includes temperature, wind speed, humidity for present day.
      </li>
      <li>Show forecast 4 days later and more (load more).</li>
      </ul>
</li>
  <li>Use current location for displaying weather information.</li>
  <li>Save temporary city infomation to display weather information when visiting website again.</li>
  <li>Register and unsubscribe to receive daily weather forecast information of a city at midnight via email address. (Email confirmation with OTP).</li>
  <li>Responsive design with smooth animations for desktops & mobile phones</li>
</ul>

# Technologies
<b>Frontend:</b> ReactJS, Boostrap, scss, HTML,Javascript, TanStack Query<br/>
<b>Backend: </b> NodeJS, ExpressJS, sequelize, mySQL
<b>Deploy: <b>
<ul>
  <li><b>Client:</b> <a href="https://vercel.com/">vercel.com</a></li>
  <li><b>Server:</b> <a href="https://render.com/">render</a></li>
    <li><b>DB:</b> <a href="https://freedb.tech/">freedb.tech</a></li>
</ul>




# Installation
<b>Step 1: </b>Clone this repos on main branch for running on localhost purpose <br/>
<b>Step 2: </b>Open source code with vscode<br/>
<b>Step 3: </b>Run these command:
<ul>
  <li>cd client</li>
  <li>npm install</li>
    <li>npm run dev</li>
</ul>
<b>Step 4: </b>Create .env file in folder server with this content:  <br/>
<p>PORT = 8080<br/>
GOOGLE_APP_EMAIL="thongduy2811@gmail.com"<br/>
GOOGLE_APP_PASSWORD="oxnx mdrg avdk pwda"<br/>
DB_NAME =forecast<br/>
DB_USERNAME =root<br/>
DB_PASSWORD =<br/>
API_KEY =cdb01ad87ab6475492d105348240307<br/>
CLIENT_PORT=http://localhost:3000/
</p>
<b>Step 5: </b>Create new database with name: forecast in in xampp or msqlWorkench <br/>
<b>Step 6: </b>Open new terminal and run these command: <br/>
<ul>
  <li>cd server</li>
  <li>npm install</li>
  <li>npx sequelize-cli db:migrate</li>
    <li>npm run start</li>
</ul>
<b>Step 7: </b>Open <a href="http://localhost:3000/">http://localhost:3000/</a> on your browse<br/>
