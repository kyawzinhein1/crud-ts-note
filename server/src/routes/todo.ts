import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  getTodoById,
  updateTodo,
} from "../controller/todo";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", protect, createTodo);
router.get("/todos", getTodos);
router.get("/todos/:id", getTodoById);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
