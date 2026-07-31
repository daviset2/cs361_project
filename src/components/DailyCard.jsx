import styled from "@emotion/styled";

const Card = styled.div`
  width: 180px;
  padding: 16px;
  border-radius: 12px;
  background: white;
  text-align: center;
  transition: .2s;
  flex-shrink: 0;
  cursor: pointer;

  &:hover{
    background:#f3f3f3;
  }
`;

const Day = styled.h3`
  margin-top:0;
`;

const Icon = styled.img`
  width:70px;
  height:70px;
`;

export default function DailyCard({
    item,
    units,
    onClick
}) {

  const day = new Date(item.dt * 1000).toLocaleDateString([], {
    weekday:"long"
  });

  const high = Math.round(item.main.temp_max);
  const low = Math.round(item.main.temp_min);
  const rain = Math.round(item.pop * 100);
  const symbol = units === "metric" ? "°C" : "°F";

  return(
    <Card onClick={onClick}>
      <Day>{day}</Day>
      <Icon
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt={item.weather[0].description}
      />
      <p>High: {high}{symbol}</p>
      <p>Low: {low}{symbol}</p>
      <p>Rain: {rain}%</p>
    </Card>
  );
}