import styled from "styled-components";

const AppContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 16px;
  background-color: #f4f4f4;
`;
function App() {
  return (
    <AppContainer>
      <h1>Task List Exercise</h1>
    </AppContainer>
  );
}

export default App;
