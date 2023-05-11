import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { TodoList } from "../components/TodoList";
import { useEffect, useState } from "react";
import axios from "axios";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

interface Todo {
  id: string;
  description: string;
  completed: boolean;
}

interface IndexProps {
  todos: Todo[];
}

export default function Index({ todos }: IndexProps) {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<Todo[] | undefined>();
  const handleChange = (text: string) => setTodo(text);

  useEffect(() => {
    getTodos();
  }, []);

  const createNewTodo = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      description: todo,
      completed: false,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:4000/api/items", requestOptions);
    getTodos();
    setTodo("");
  };

  const getTodos = async () => {
    const res = await fetch("http://localhost:4000/api/items");
    const todos = await res.json().then((data) => {
      return data.map((todo) => {
        return {
          id: todo._id,
          description: todo.description,
          completed: todo.completed,
        };
      });
    });
    setTodoList(todos);
  };

  return (
    <Box
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      width="100vw"
      bg="green"
    >
      <Box display="flex" w="50%" minH="50%" flexDirection="row">
        <Input
          onChange={(e) => handleChange(e.target.value)}
          value={todo}
          placeholder="Todo description"
          marginRight={15}
          bg={"white"}
        />
        <Button onClick={() => createNewTodo()} colorScheme="blue">
          Add
        </Button>
      </Box>
      <Flex
        minHeight="50vh"
        minWidth="50vw"
        bg="white"
        style={{
          padding: 10,
          margin: 10,
          borderWidth: 1,
        }}
      >
        <TodoList todos={todoList} getTodos={getTodos} />
      </Flex>
    </Box>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:4000/api/items");
  const todos = await res.json().then((data) => {
    console.log(data);
    return data.map((todo) => {
      return {
        id: todo._id,
        description: todo.description,
        completed: todo.completed,
      };
    });
  });

  return {
    props: {
      todos,
    },
  };
}
