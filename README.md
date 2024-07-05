# WEATHER FORECAST
![image](https://github.com/DuyThong28/weather-forecast/assets/116278919/ef94cbb6-b247-4224-96e1-900249552693)
<br/><b>Demo: </b><a href="https://www.youtube.com/watch?v=lypsnomIpp4">Weather forecast demo</a>
# Installation
<b>Step 1:</b> clone this repos on main branch<br/>
<b>Step 2:</b> open source code with vscode<br/>
<b>Step 3:</b> run these command:
<ul>
  <li>cd client</li>
  <li>npm install</li>
    <li>npm run dev</li>
</ul>
<b>Step 4:</b>Create .env file in folder server with this content:  <br/>
<p>PORT = 8080<br/>
GOOGLE_APP_EMAIL="thongduy2811@gmail.com"<br/>
GOOGLE_APP_PASSWORD="oxnx mdrg avdk pwda"<br/>
DB_NAME =forecast<br/>
DB_USERNAME =root<br/>
DB_PASSWORD =<br/>
API_KEY =cdb01ad87ab6475492d105348240307
</p>
<b>Step 5:</b>Create new database with name: forecast in in xampp or msqlWorkench <br/>
<b>Step 6:</b>Open new terminal and run these command: <br/>
<ul>
  <li>cd server</li>
  <li>npm install</li>
  <li>npx sequelize-cli db:migrate</li>
    <li>npm run start</li>
</ul>
<b>Step 7:</b>Open link <a href="http://localhost:3000/">http://localhost:3000/</a> on your browse<br/>
