import styled from "@emotion/styled";

const Card = styled.div`
  min-width: 90px;
  padding: 15px;
  border-radius: 10px;
  background: white;
  text-align: center;
  transition: 0.2s;
  flex-shrink: 0;

  &:hover {
    background: #f3f3f3;
  }
`;

const Time = styled.h4`
  margin: 0 0 10px;
`;

const Icon = styled.img`
  width: 55px;
  height: 55px;
`;

const Temp = styled.p`
  margin: 8px 0 0;
  font-size: 20px;
  font-weight: bold;
`;

export default function HourlyCard({ item, units }) {
  const time = new Date(item.dt * 1000).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const temp = Math.round(item.main.temp);
  const symbol = units === "metric" ? "°C" : "°F";

  return (
    <Card>
      <Time>{time}</Time>
      <Icon
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt={item.weather[0].description}
      />
      <Temp>{temp}{symbol}</Temp>
    </Card>
  );
}