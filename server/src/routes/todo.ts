import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  getTodoById,
  updateTodo,
} from "../controller/todo";
import { protect } from "../middlewares/authMiddleware";
import { authorizeOwner } from "../middlewares/authorizeOwner";

const router = Router();

router.post("/create", protect, createTodo);
router.get("/todos", getTodos);
router.get("/todos/:id", getTodoById);
router.put("/update/:id", protect, authorizeOwner, updateTodo);
router.delete("/delete/:id", protect, authorizeOwner, deleteTodo);

export default router;
