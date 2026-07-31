import { useState } from "react";
import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  justify-content: center;
  gap: 0;
  margin: 0;
`;

const Input = styled.input`
  padding: 8px 16px;
  font-size: 16px;
  width: min(550px, 80vw);
  border: 1px solid #e0e0e0;
  border-radius: 30px 0 0 30px;
  outline: none;
  transition: all 0.2s ease;
  &:focus {
    border-color: #1c6cff;
  }
`;

const Button = styled.button`
  padding: 8px 24px;
  font-size: 16px;
  border: none;
  border-radius: 0 30px 30px 0;
  background-color: #d6d6d6;
  color: black;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #bbbbbb;
  }
`;

export default function CityForm({ onSearch }) { /* handling search bar stuff */
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); /* makes sure default text cant be searched */
    if (!city.trim()) return;
    onSearch(city);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="City,State,Country"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </Form>
  );
}
