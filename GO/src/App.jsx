function App() {

  return (
      <div style={styles.container}>
        <p>Modifiez et créer de nouveaux éléments SEULEMENT dans le package src</p>
        <button style={styles.buttons} onClick={() => alert("cool")}>Compris</button>
        <button style={styles.buttons} onClick={() => window.close()}>Nique ta mère</button>
      </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
  },
  buttons: {
    borderRadius: 5,
    backgroundColor: 'lightgray',
  }
}

export default App
