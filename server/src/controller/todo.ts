import { Request, Response } from "express";
import { Todo } from "../models/todo";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createTodo = async (req: AuthRequest, res: Response) => {
  const { title } = req.body;
  const userId = req.user?._id;

  try {
    const newTodo = await Todo.create({
      title,
      userId,
    });

    res.status(201).json({ message: "New todo added", todo: newTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todoList = await Todo.find();
    res.status(200).json({ message: "Todos are fetched.", todo: todoList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No todos are found." });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);

    res.status(200).json({ message: "Todo Found.", todo: todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Todo not found." });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
      },
      { new: true }
    );

    res.status(201).json({ message: "Todo is updated.", todo: updateTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);

    res.status(500).json({ message: "Todo has been deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
