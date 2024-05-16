import { body } from "express-validator";

export const registerValidation = [
    body('email', "Некорректный email").isEmail(),
    body("password", "Минимальная длина пароля 5 символов").isLength({ min: 5 }),
    body("userName", "Имя пользователя не может быть пустым").notEmpty(),
    body("avatarUrl", "Некорректная ссылка на аватарку").optional().isURL(),
]

export const loginValidation = [
    body('email', "Некорректный email").isEmail(),
    body("password", "Минимальная длина пароля 5 символов").isLength({ min: 5 }),
]


export const testCreateValidation = [
    body('title', "Поле названия не быть меньше 3 символов").isLength({ min: 3 }).isString(),
    body("description").optional().isString(),
    body("questions", "Добавьте минимум 1 вопрос").notEmpty(),
    body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
]