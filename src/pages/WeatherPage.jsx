import { useState, useEffect } from "react";
import CityForm from "../components/CityForm";
import ForecastList from "../components/ForecastList";
import { getForecast, getCurrentWeather } from "../api/weather";
import styled from "@emotion/styled";
import DailyForecastModal from "../components/DailyForecastModal";
import CurrentWeatherCard from "../components/CurrentWeatherCard";

const Disclaimer = styled.p`
  text-align: center;
  font-size: 13px;
  color: #666;
  margin: 5px 0 20px;
`;

const AppContainer = styled.div`
  font-family: "Helvetica Neue", Arial, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 50px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 42px;
  font-weight: 700;
  color: #333;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 18px;
`;

const SearchRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 30px 0 10px;
`;

const LocationButton = styled.button`
  padding: 10px 18px;
  border-radius: 20px;
  border: 1px solid black;
  background: white;
  cursor: pointer;

  &:hover {
    background: #f3f3f3;
  }
`;

const CurrentCity = styled.h3`
  text-align: center;
  margin-bottom: 30px;
  font-weight: normal;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 8px 14px;
  border-radius: 30px;
  background: #f3f3f3;
`;

const ToggleButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #999;
  background: white;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #f3f3f3;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: auto;

  background: white;

  border-radius: 15px;

  padding: 30px;

  box-shadow: 0 3px 10px rgba(0,0,0,.08);
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
`;

const SliderInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #ccc;
  }

  &:checked + span:before {
    transform: translateX(24px);
  }
`;

const Slider = styled.span`
  position: absolute;
  inset: 0;
  background-color: #ccc;
  border-radius: 34px;
  cursor: pointer;
  transition: .3s;

  &:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    left: 4px;
    bottom: 4px;
    background: white;
    border-radius: 50%;
    transition: .3s;
  }
`;

const UnitLabel = styled.span`
  font-weight: ${({ active }) => (active ? "700" : "400")};
  color: ${({ active }) => (active ? "#2d6cdf" : "#888")};
  transition: .2s;
`;

export default function Home() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("imperial");
  const [currentCity, setCurrentCity] = useState("Corvallis,OR,US");
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  console.log(currentWeather);

  const handleSearch = async (cityInput) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentCity(cityInput);
      const [forecastData, currentData] = await Promise.all([
        getForecast(cityInput, units),
        getCurrentWeather(cityInput, units)
      ]);
      console.log("Current Weather API:", currentData);
      setForecast(forecastData);
      setCurrentWeather(currentData);
    } catch (err) {
      setError("Could not fetch weather");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnits = async () => {
    const newUnits =
      units === "imperial" ? "metric" : "imperial";

    setUnits(newUnits);

    try {
      setLoading(true);

      const [forecastData, currentData] = await Promise.all([
        getForecast(currentCity, newUnits),
        getCurrentWeather(currentCity, newUnits)
      ]);

      setForecast(forecastData);
      setCurrentWeather(currentData);

    } catch (err) {
      setError("Could not fetch weather.");
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(currentCity);
  }, []);

  const hourlyForecasts = forecast ? forecast.list.slice(0, 12) : [];
  const dailyForecasts = [];

  if (forecast) {
    const seenDays = new Set();
    forecast.list.forEach(item => {
      const day = item.dt_txt.split(" ")[0];
      if (!seenDays.has(day)) {
        seenDays.add(day);
        dailyForecasts.push(item);
      }
    });
  }

  return ( /* main page content */
    <AppContainer>
      <Content>
        <Header>
          <Title>Weather Application</Title>

          <HeaderInfo>
            <span>{new Date().toLocaleDateString()}</span>

            <span>
              {new Date().toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>

            <ToggleContainer>
              <UnitLabel active={units === "imperial"}>
                °F
              </UnitLabel>
              <Switch>
                <SliderInput
                  type="checkbox"
                  checked={units === "metric"}
                  onChange={toggleUnits}
                />
                <Slider />
              </Switch>
              <UnitLabel active={units === "metric"}>
                °C
              </UnitLabel>
            </ToggleContainer>

          </HeaderInfo>
        </Header>

        <SearchRow>
          <CityForm onSearch={handleSearch} />

          <LocationButton
            onClick={() => handleSearch("Corvallis,OR,US")}
          >
            Use Location
          </LocationButton>
        </SearchRow>

        <Disclaimer>
          ℹ️ Location data is not shared or stored.
        </Disclaimer>

        <CurrentCity>
          Currently Viewing: {currentCity.replace(",US", "").replace(",", ", ")}
        </CurrentCity>

        {currentWeather && (
          <CurrentWeatherCard
            weather={currentWeather}
            units={units}
          />
        )}

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {/* ONLY RENDER AFTER SEARCH */}
        {forecast && (
          <>
            <ForecastList
              title="3 Hour Forecast"
              forecasts={hourlyForecasts}
              type="hourly"
              units={units}
            />

            <ForecastList
              title="Daily Forecast"
              forecasts={dailyForecasts}
              type="daily"
              units={units}
              onCardClick={setSelectedDay}
            />
          </>
        )}
        {selectedDay && (
          <DailyForecastModal
            item={selectedDay}
            units={units}
            onClose={() => setSelectedDay(null)}
          />
        )}
      </Content>
    </AppContainer>
  );
}
