import styled from "@emotion/styled";

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.45);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:1000;
`;

const Modal = styled.div`
    width:400px;
    background:white;
    border-radius:15px;
    padding:25px;
    position:relative;
`;

const CloseButton = styled.button`
    position:absolute;
    right:15px;
    top:15px;
    border:none;
    background:none;
    font-size:24px;
    cursor:pointer;
`;

export default function DailyForecastModal({
    item,
    units,
    onClose
}){
    if(!item) return null;
    const date = new Date(item.dt * 1000);
    const symbol = units === "metric" ? "°C" : "°F";
    return(
        <Overlay onClick={onClose}>
            <Modal onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    ✕
                </CloseButton>
                <h2>
                    {date.toLocaleDateString([],{
                        weekday:"long",
                        month:"numeric",
                        day:"numeric"
                    })}
                </h2>
                <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt=""
                />
                <p><strong>High:</strong> {Math.round(item.main.temp_max)}{symbol}</p>
                <p><strong>Low:</strong> {Math.round(item.main.temp_min)}{symbol}</p>
                <p><strong>Weather:</strong> {item.weather[0].description}</p>
                <p><strong>Rain Chance:</strong> {Math.round(item.pop*100)}%</p>
                <p><strong>Humidity:</strong> {item.main.humidity}%</p>
                <p><strong>Wind:</strong> {Math.round(item.wind.speed)} {units==="metric" ? "m/s" : "mph"}</p>
            </Modal>
        </Overlay>
    );
}