import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  getTodoById,
  updateTodo,
} from "../controller/todo";

const router = Router();

router.post("/create", createTodo);
router.get("/todos", getTodos);
router.get("/todos/:id", getTodoById);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
