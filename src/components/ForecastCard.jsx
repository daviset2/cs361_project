/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  width: 180px;
  text-align: center;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #c4c4c44f;
    transform: translateY(-2px);
  }
`;

const DateText = styled.h3`
  font-size: 13px;
  margin-bottom: 8px;
  font-weight: 700;
  color: #020202;
`;

const TempText = styled.p`
  margin: 4px 0;
  font-size: 14px;
  font-weight: 500;
  color: #202020;
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 4px;
  border-radius: 4px;
  background: #f9f9f9;
  padding: 8px;
`;


export default function ForecastCard({ item }) { 
  const date = new Date(item.dt * 1000).toLocaleString("en-US", { /* takes the given UNIX time and converts it to something that is actuall readable */
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const high = Math.round(item.main.temp_max);
  const low = Math.round(item.main.temp_min);
  const pop = Math.round((item.pop || 0) * 100);
  const description = item.weather[0].description;
  const icon = item.weather[0].icon;

  return ( /* the content of our 'card' for weather data */
    <Card>
      <DateText>{date}</DateText> 
      <WeatherIcon
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
        alt={description}
      />
      <TempText><strong>High:</strong> {high}°F</TempText>
      <TempText><strong>Low:</strong> {low}°F</TempText>
      <TempText><strong>Rain:</strong> {pop}%</TempText>
      <TempText>{description}</TempText>
    </Card>
  );
}
