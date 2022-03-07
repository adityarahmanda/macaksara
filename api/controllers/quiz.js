import { Router } from 'express';
import  quizModel  from "../models/quiz";

const router = Router()

router.get('/quiz', function (req, res) {
    quizModel.getQuiz((err, data) => {
        if(err) {
            res.status(500, err);
        }

        res.status(200).json(data);
    });
})

router.get('/quiz/:id', function (req, res) {
    const quizId = req.params.id
    quizModel.getQuizById((err, data) => {
        if(err) {
            res.status(500, err);
        }

        res.status(200).json(data);
    }, quizId);
})

router.get('/quiz/:id/:level', function (req, res) {
    const quizId = req.params.id
    const quizLevel = req.params.level
    quizModel.getQuizQuestion((err, data) => {
        if(err) {
            res.status(500, err);
        }

        res.status(200).json(data);
    }, quizId, quizLevel);
})

router.get('/quiz-level/:id', function (req, res) {
    const quizId = req.params.id
    quizModel.getQuizLevelById((err, data) => {
        if(err) {
            res.status(500, err);
        }

        res.status(200).json(data);
    }, quizId);
})

module.exports = router