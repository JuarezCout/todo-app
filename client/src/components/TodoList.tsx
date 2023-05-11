import {
  Box,
  Button,
  IconButton,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import axios from "axios";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface Todo {
  id: string;
  description: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[] | undefined;
  getTodos: () => Promise<void>;
}

export function TodoList({ todos, getTodos }: TodoListProps) {
  const deleteTodo = async (id: string) => {
    await axios.delete("http://localhost:4000/api/items/" + id);
    getTodos();
  };

  const completeTodo = async (id: string, status: boolean) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      completed: status,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:4000/api/items/" + id, requestOptions);
    getTodos();
  };

  return (
    <Box>
      <UnorderedList>
        {todos?.map((todo) => (
          <ListItem
            key={todo.id}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            w="100vh"
            m={5}
          >
            <Box>
              <IconButton
                aria-label={todo.completed ? "Incomplete" : "Complete"}
                size="lg"
                variant={todo.completed ? "" : "outline"}
                onClick={() =>
                  completeTodo(todo.id, todo.completed ? false : true)
                }
                icon={todo.completed ? <CheckIcon /> : undefined}
              />
            </Box>

            <Text> {todo.description}</Text>

            <IconButton
              aria-label="Delete"
              size="lg"
              colorScheme={"red"}
              onClick={() => deleteTodo(todo.id)}
              icon={<CloseIcon />}
            />
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
