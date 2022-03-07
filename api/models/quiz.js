import mysql from "mysql2";
import dbconfig  from "../../config/database";

const quizModel = {};

quizModel.getQuiz = (callback) => {
    const conn = mysql.createConnection(dbconfig.connection);
    if (conn) {
        conn.query('SELECT * FROM sinahuaksara_quiz',
            (err, rows) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, rows);
                    conn.end()
                }
            }
        )
    }
}

quizModel.getQuizById = (callback, quizId) => {
    const conn = mysql.createConnection(dbconfig.connection);
    if (conn) {
        conn.query('SELECT * FROM sinahuaksara_quiz WHERE quiz_id = "' + quizId + '"',
            (err, rows) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, rows);
                    conn.end()
                }
            }
        )
    }
}

quizModel.getQuizLevelById = (callback, quizId) => {
    const conn = mysql.createConnection(dbconfig.connection);
    if (conn) {
        conn.query('SELECT level FROM sinahuaksara_quiz_level WHERE quiz_id = "' + quizId + '"',
            (err, rows) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, rows);
                    conn.end()
                }
            }
        )
    }
}

quizModel.getQuizQuestion = (callback, quizId, quizLevel) => {
    const conn = mysql.createConnection(dbconfig.connection);
    if (conn) {
        conn.query('SELECT question, translation FROM sinahuaksara_quiz_question WHERE quiz_id = "' + quizId + '" AND level_id = "' + quizLevel + '"',
            (err, rows) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, rows);
                    conn.end()
                }
            }
        )
    }
}

export default quizModel