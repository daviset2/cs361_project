import styled from "@emotion/styled";

const Card = styled.div`
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 18px;
  padding: 30px;
  margin: 0 30px 40px;
`;

const Title = styled.h2`
  text-align: center;
  margin-top: 0;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
`;

const Temp = styled.div`
  font-size: 54px;
  font-weight: bold;
`;

const Description = styled.div`
  text-transform: capitalize;
  font-size: 22px;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  gap: 12px 60px;
  margin-top: 25px;
  font-size: 18px;
`;

export default function CurrentWeatherCard({ weather, units }) {
  if (!weather) return null;

  const symbol = units === "metric" ? "°C" : "°F";

  return (
    <Card>
      <Title>Current Conditions</Title>

      <Main>
        <Icon
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
        />

        <div>
          <Temp>{Math.round(weather.main.temp)}{symbol}</Temp>

          <Description>
            {weather.weather[0].description}
          </Description>
        </div>
      </Main>

      <Details>
        <div>
          <strong>Feels Like:</strong> {Math.round(weather.main.feels_like)}{symbol}
        </div>

        <div>
          <strong>Humidity:</strong> {weather.main.humidity}%
        </div>

        <div>
          <strong>Wind:</strong> {Math.round(weather.wind.speed)} {units === "metric" ? "m/s" : "mph"}
        </div>

        <div>
          <strong>Pressure:</strong> {weather.main.pressure} hPa
        </div>
      </Details>
    </Card>
  );
}