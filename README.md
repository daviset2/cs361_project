# Assignment 3

**→ Preferred deadline: 11:59pm on Monday, 2/16/2026** <br/>
**→ Extension deadline: 11:59pm on Wednesday, 2/18/2026 (no submissions allowed after this)** <br/>
**→ Grading demo due: 11:59pm on Monday 3/2/2026**

The primary goal of this assignment is to practice fetching data from an HTTP API and using Emotion to style the components of an app.  Specifically, you'll use the [OpenWeather API](https://openweathermap.org/api) create a simple weather app that can display a daily forecast for a city specified by the user.  The assignment is broken down into parts below.

## 1. Sign up for an OpenWeather API key

To be able to use the OpenWeather API, you'll first need to sign up for an OpenWeather API key here: http://openweathermap.org/appid.  Without this API key, you won't be able to make calls to the API.  Once you have your API key, you can [use an environment variable](https://vitejs.dev/guide/env-and-mode) to incorporate it into your app.

> Importantly, environment variables are not a secure way to incorporate secrets into a production application, since their values will be visible to any user who downloads your application bundle.  However, using environment variables *does* allow you to avoid publishing values to your GitHub repo by hard-coding them into your application.  In other words, it works well for development purposes only.

## 2. Fetch forecast data for a user-specified city

Next, incorporate components into your app that allow the user to submit a city name for which to fetch forecast data (e.g. a text input box and a "submit" button).  When the user submits a new city name, make a call to one of the OpenWeather API methods to fetch forecast data for the specified city.

Note that there are several different API methods that might work well here, though some of them require a paid subscription to the OpenWeather API.  Note that since you're a student, [OpenWeather will upgrade your API key for free](https://docs.openweather.co.uk/our-initiatives/student-initiative), giving you access to some of the API methods you'd normally have to pay for.  Here are a few of the API methods that might work well for this assignment:
  * [The 16-day daily forecast](https://openweathermap.org/forecast16) (requires an upgraded API key)
  * [The hourly forecast](https://openweathermap.org/api/hourly-forecast) (requires an upgraded API key)
  * [The 5 day/3 hour forecast](https://openweathermap.org/forecast5)

Note that these API calls might require you to use OpenWeather's [geocoding API](https://openweathermap.org/api/geocoding-api) to allow queries by city name.  In other words, the geocoding API would allow you to translate the city name typed by the user into geo coordinates (i.e. latitude and longitude).

> Note: The OpenWeather geocoding API works best when you use a specific format for the city name, e.g. "Corvallis,OR,US".  To make it easier on you, you can assume that users will type city names in this format.

Whatever API method(s) you use, make sure you fetch several periods of forecast data (e.g. several days or several 3-hour periods).  Then, once you receive a response from the API, parse the relevant data out of the response body, and use it to render forecast cards in your app, each of which should represent the forecast for a specific period from the data.  Each card may display as much of the weather data as you want, but at a minimum, it should display the following information:
  * The date/time
  * The high and low temperatures
  * The probability of precipitation
  * The short description of the day's weather
  * The appropriate icon for the day's weather.  You can read more about how to get an OpenWeather icon URL from the forecast data here: https://openweathermap.org/weather-conditions.

**To fetch forecast data from the OpenWeather API, you *must* use either TanStack Query or React Router's data loaders.**  You can use a combination of both if you want.

## 3. Add styles to mimic an existing app

Finally, choose an existing published web app, and add styling to your weather app to mimic as closely as possible your chosen published app.  For example, try to make your weather app look like Airbnb.  Obviously, you will probably not be able to exactly match the styling of your chosen app, since the app you choose may be centered around something different than weather data.  Still try to mimic elements of your chosen published app (e.g. font choice, iconography, card styling, navigational mechanisms, site header and footer, etc.) as closely as you can while making reasonable adaptations to display weather data.

When chosing a published app to mimic, make sure to choose one that is responsively styled (i.e. one that adapts its styling to look good on mobile devices).  The styles you implement should also mimic the responsive styling of your chosen published app.

Feel free to use your browser's developer tools (e.g. [the inspector](https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/examine_and_edit_css/index.html) and [responsive design mode](https://firefox-source-docs.mozilla.org/devtools-user/responsive_design_mode/)) to help you understand how the styling is implemented for the published app you've chosen to mimic.

Here are some additional requirements your application styling should satisfy:

  * You must take screenshots of the published app whose style you are mimicing and submit those screenshots along with your source code.  Make sure your screenshots capture all the aspects of the published app you are mimicing in your own styling, including its responsive styling.

  * You may use Emotion or TailwindCSS to implement your styles.  You may also use another styling framework by getting the explicit approval of the instructor.  You *may not* use vanilla CSS files for this assignment.

  * You may use a component library like the ones we discussed in class.  However, if the components provided by that library do not already closely match the styling of your chosen published app, you'll need to add additional styles to more closely mimic that app.  Your grade will be based in part on how closely you are able to mimic your chosen published app's styling.

## Extra credit

For up to 10 points of extra credit, you may use geo coordinates (i.e. latitude and longitude) to display a nice looking map indicating the location of the city for which the forecast is being displayed.  Geo coordinates may be obtained from the OpenWeather API response.  You can use any map library/API you like.  Some possibilities are [Leaflet](https://leafletjs.com/) (in conjunction with [React Leaflet](https://react-leaflet.js.org/)), [Mapbox](https://www.mapbox.com/), and [Google Maps](https://developers.google.com/maps/documentation/javascript/overview) (in conjunction with [Google Map React](https://www.npmjs.com/package/google-map-react)).  Note that OpenWeather has [a weather map API](https://openweathermap.org/api/weathermaps) that provides many different kinds of weather map.  As a further challenge, you could use this API to display a weather map for the specified location.

## Running the application

The code you're provided with here was created using Vite.  Before the first time you run this app, make sure to run `npm install` to install needed dependencies.  Then, to run the app, you can run:
```
npm run dev
```
This will run the app using Vite's development server.  You should be able to visit the running app by viewing [http://localhost:5173](http://localhost:5173) (or whatever URL Vite gives you) to view the app in your browser.

## Assignment submission

We'll be using GitHub Classroom for this assignment, and you will submit your assignment via GitHub.  Just make sure your completed files are committed and pushed by the assignment's deadline to the main branch of the GitHub repo that was created for you by GitHub Classroom.  A good way to check whether your files are safely submitted is to look at the main branch of your assignment repo on the github.com website (i.e. https://github.com/osu-cs494-w26/assignment-3-YourGitHubUsername/). If your changes show up there, you can consider your files submitted.

## Assignment grading

This assignment is worth 100 points total.

* Data fetching: 25 points
  * 10 points - Multiple time periods worth of weather data is successfully fetched by making one or more calls to the OpenWeather API
  * 5 points - Data is fetched based on a city name that is typed into the app by the user
  * 10 points - TanStack Query and/or React Router data loaders are used to perform data fetching

* Styling: 25 points
  * 10 points - Styles implemented for the app closely mimic the styling of the chosen published app, including responsive styling
  * 10 points - Emotion, TailwindCSS, or another instructor-approved framework is used to implement styles for the app
  * 5 points - Screenshots of the published app that was chosen to mimic are submitted along with the implementation of the weather app
    * Submitted screenshots should depict all aspects of the styling being mimiced, including responsive styling

* Understanding: 50 points
  * To earn these points, you must demonstrate a strong understanding of all aspects of the assignment and of your own implementation

In addition, you may earn up to 10 points of extra credit by incorporating a map into your application, as described above.
