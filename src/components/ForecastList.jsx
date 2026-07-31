import styled from "@emotion/styled";
import HourlyCard from "./HourlyCard";
import DailyCard from "./DailyCard";

const List = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;

  padding: 20px;

  border: 1px solid #d9d9d9;
  border-radius: 15px;

  background: #fafafa;

  margin: 0 30px 40px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border-radius: 8px;
  }
`;

const Heading = styled.h2`
  margin: 30px 30px 15px;
  font-size: 26px;
  color: #333;
`;


export default function ForecastList({
    title,
    forecasts,
    type,
    units,
    onCardClick
}) {
  if (!forecasts || !forecasts.length) return null;

  return (
    <>
      <Heading>{title}</Heading>

      <List>
        {forecasts.map(item => (
          type === "hourly" ? (
            <HourlyCard
                key={item.dt}
                item={item}
                units={units}
            />
          ) : (
            <DailyCard
              key={item.dt}
              item={item}
              units={units}
              onClick={() => onCardClick?.(item)}
            />
          )
        ))}
      </List>
    </>
  );
}
