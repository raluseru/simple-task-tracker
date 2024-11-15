import React from "react";
import styled from "styled-components";
import TaskList from "components/Tasks/TaskList/TaskList";
import AddTask from "components/Tasks/AddTask/AddTask";
import Filter from "components/Filter/Filter";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useTaskContext } from "./context/TaskContext";
const AppContainer = styled.div`
  max-width: 780px;
  margin: 50px auto;
  @media screen (min-width: 1400px) {
    max-width: 1280px;
  }
`;
const PageContainer = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Sidebar = styled.div`
  display:flex;
  flex-direction:column;
  padding: 8px;
  margin-right: 20px;
  max-width: 300px;
`;
const ContentWrapper = styled.div`
width: calc(100% - 300px);
@media (max-width: 768px) {
  width: 100%;
}
`;
const SearchWrapper = styled.div`
display:flex;
flex-direction:column;
margin-bottom: 20px;
`;
const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;

`;
const Label = styled.label`
  margin-bottom: 5px;
`;
const App: React.FC = () => {
  const { setFilter, setQuery, reorderTaskList } = useTaskContext()

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    // Set new order
    reorderTaskList(source.index, destination.index);
  };

  return (

    <AppContainer>
      <h1>Task List Exercise</h1>
      <PageContainer>
        <Sidebar>
          {/* Priority Filter */}
          <Filter onChange={setFilter} />

          {/* Add a search Filter */}
          <SearchWrapper>
            <Label>Search:</Label>
            <Input
              onChange={(e) => setQuery(e.target.value)}
              type="search"
            />
          </SearchWrapper>

          {/* Add Task */}
          <AddTask
          />
        </Sidebar>
        <ContentWrapper>
          {/* Display task list */}
          <DragDropContext onDragEnd={onDragEnd}>
            <TaskList />
          </DragDropContext>
        </ContentWrapper>
      </PageContainer>
    </AppContainer>
  );
}

export default App;
