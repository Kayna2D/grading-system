import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [grades, setGrades] = useState([{ id: uuidv4(), value: 0 }]);
  const [average, setAverage] = useState(0);

  const addGrade = () => {
    setGrades((grades) => [...grades, { id: uuidv4(), value: 0 }]);
  };

  const deleteGrade = (index) => {
    setGrades ((grades) => grades.filter((_, i) => i !== index));
  };

  const calculate = (e) => {
    e.preventDefault();
    const formValid = grades.every(({ value }) => !isNaN(+value));
    if (!formValid) {
      return;
    }
    setAverage(
      grades.map(({ value }) => value).reduce((a, b) => +a + +b, 0) /
      grades.length
    );
  };

  return (
    <div className="App">
      <form onSubmit={calculate}>
        {grades.map((g, i) => {
          return (
            <div key={g.id}>
              <label>Nota</label>
              <input
               value={g.value}
               onChange={(e) => {
                 const grds = [...grades];
                 grds[i].value = e.target.value;
                 setGrades(grds);
               }}
              />
              <button type="button" onClick={() => deleteGrade(i)}>
                Apagar nota
              </button>
            </div>
          );
        })}

        <button type="button" onClick={addGrade}>
          Adicionar nota
        </button>
        <button type="submit">Calcular média</button>
      </form>
      <div>Média {average}</div>
    </div>
  )


}