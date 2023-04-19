function Painel({lucro , perda}) {
  return (
    <div className="Painel">
      <div className="info-lucro">
        <h3>Ganhos</h3>
        <div className="info-content">+{Number(lucro).toFixed(2)}</div>
      </div>
      <div className="info-perda">
        <h3>Perdas</h3>
        <div className="info-content">-{Number(perda).toFixed(2)}</div>
      </div>
      <div className="info-atual">
        <h3>Saldo atual</h3>
        <div className="info-content">{(Number(lucro) -  Number(perda)).toFixed(2)}</div>
      </div>
    </div>
  );
}

export default Painel;
