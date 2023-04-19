import logo from './logo.svg';
import './App.css';
import painel from './components/painel'
import Painel from './components/painel';
import { useState, useEffect } from 'react';

const API = "http://localhost:5000"

function App() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState(false);
  const [listaItens, setListaItens] = useState([]);
  const [somaGanhos, setGanhos] = useState(0);
  const [somaPerdas, setPerdas] = useState(0);

  useEffect(() => {

    const loadData = async () => {
      const res = await fetch(API + "/transacao")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      setListaItens(res);
      calcularTudo();
    }
    loadData()
  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault();

    const item = {
      id: Math.random(),
      title,
      value,
      type,
    };

    if ((item.type == "Ganho") || (item.type == "Perda")){
    await fetch(API + "/transacao", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setListaItens((prevState) => [...prevState, item]);

    setTitle("");
    setValue("");
    setType(false);
    document.querySelector(".title-input").value = "";
    document.querySelector(".value-input").value = "";
    document.querySelector(".type-input").value = "";
  }else{
    window;alert("defina o tipo")
  }
  calcularTudo();
  }
  const handeDelete = async (id) => {
    await fetch(API + "/transacao/" + id, {
      method: "DELETE"
    });

    setListaItens((prevState) => prevState.filter((item) => item.id !== id));
    calcularTudo();
  }

  const calcularGanhos = () => {
    const ganhos = document.querySelectorAll('.Ganho');
    let total = 0;

    ganhos.forEach(ganho => {
      total += parseFloat(ganho.textContent);
    });

    setGanhos(total.toFixed(2));
  }

  const calcularPerdas = () => {
    const perdas = document.querySelectorAll('.Perda');
    let total = 0;

    perdas.forEach(perda => {
      total += parseFloat(perda.textContent);
    });

    setPerdas(total.toFixed(2));
  }
  const calcularTudo = () => {
    setTimeout(() => {
      calcularGanhos();
      calcularPerdas();
    }, 500);
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Gerenciador de finanças</h1>
        <div className='description'>
          Tenha suas despesas sob controle com esse gerenciador de finanças pessoais
        </div>
      </div>
      <div className="main">
        <Painel
        lucro={somaGanhos}
        perda={somaPerdas}

        />
        <div className='main-section'>
          <form onSubmit={handleSubmit}>
            <div>
              <p>Adicionar transação: </p>
              <input
                type="text"
                placeholder="Descrição"
                className="title-input"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="number"
                placeholder="Valor"
                className="value-input"
                onChange={(e) => e.target.value != "" ? setValue(Number(e.target.value).toFixed(2)) : setValue("")}
                min={0.01}
                step={0.01}
              />
              <select
                className="type-input"
                onChange={(e) => setType(e.target.value)}
              >
                <option></option>
                <option>Ganho</option>
                <option>Perda</option>
              </select>
              <button type="submit" class="submit-button">Adicionar</button>
            </div>
          </form>
          <table>
            <thead>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th></th>
            </thead>
            <tbody>
              <tr className='new-item'>
                <td>{title}</td>
                <td>{value}</td>
                <td>{type}</td>
                <td></td>
              </tr>
              {listaItens.length === 0 && <tr><td colSpan={4}>Não há transações!</td></tr>}
              {listaItens.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td className={item.type}>{item.value}</td>
                  <td>{item.type}</td>
                  <td><input type='button' value="apagar" onClick={() => handeDelete(item.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
