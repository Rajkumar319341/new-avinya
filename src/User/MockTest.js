import React from "react";
import "../CRUDTable.css";
import { Component } from "react";
import Loading from "../Loading";
import { APIData } from '../Authentication/APIData';

var a = []
class MockTest extends Component {
    state = {
        loading: true,
        user: null,
        easy_questions: null,
        moderate_questions: null,
        difficult_questions: null,
        total_correct: 0,
        easy_correct: 0,
        moderate_correct: 0,
        difficult_correct: 0,
        easy_count: 0,
        moderate_count: 0,
        difficult_count: 0,
        easy_index: 0,
        moderate_index: 0,
        difficult_index:0,
        max_score:0,
        obtained_score:0,
        current:"easy",
        selected_option: ""
        
    };
    async componentDidMount() {
        //   const url = APIData.api+"courses/course/";
        //   const response = await fetch(url,{headers:APIData.headers});
        //     const daata = await response.json();
        this.setState({
            // user: daata,
            // loading:false,
            easy_questions: this.easy,
            moderate_questions: this.moderate,
            difficult_questions: this.difficult
        });
    }

    easy = [
        {
            queid: 1,
            subjectcode: "",
            question: "Who invented Java Programming?1",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 2,
            subjectcode: "",
            question: "Who invented Java Programming?2",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 3,
            subjectcode: "",
            question: "Who invented Java Programming?3",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 4,
            subjectcode: "",
            question: "Who invented Java Programming?4",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 5,
            subjectcode: "",
            question: "Who invented Java Programming?5",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 6,
            subjectcode: "",
            question: "Who invented Java Programming?6",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 7,
            subjectcode: "",
            question: "Who invented Java Programming?7",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 8,
            subjectcode: "",
            question: "Who invented Java Programming?8",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 9,
            subjectcode: "",
            question: "Who invented Java Programming?9",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 10,
            subjectcode: "",
            question: "Who invented Java Programming?10",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 1,
            subjectcode: "",
            question: "Who invented Java Programming?11",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 12,
            subjectcode: "",
            question: "Who invented Java Programming?12",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 13,
            subjectcode: "",
            question: "Who invented Java Programming?13",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 14,
            subjectcode: "",
            question: "Who invented Java Programming?14",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 15,
            subjectcode: "",
            question: "Who invented Java Programming?15",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 16,
            subjectcode: "",
            question: "Who invented Java Programming?16",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 17,
            subjectcode: "",
            question: "Who invented Java Programming?17",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 18,
            subjectcode: "",
            question: "Who invented Java Programming?18",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 19,
            subjectcode: "",
            question: "Who invented Java Programming?19",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        },
        {
            queid: 20,
            subjectcode: "",
            question: "Who invented Java Programming?20",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "easy",
        }
    ]
    moderate = [
        {
            queid: 1,
            subjectcode: "",
            question: "Moderate Question 1",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 2,
            subjectcode: "",
            question: "Moderate Question 2",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 3,
            subjectcode: "",
            question: "Moderate Question 3",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 4,
            subjectcode: "",
            question: "Moderate Question 4",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 5,
            subjectcode: "",
            question: "Moderate Question 5",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 6,
            subjectcode: "",
            question: "Moderate Question 6",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 7,
            subjectcode: "",
            question: "Moderate Question 7",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 8,
            subjectcode: "",
            question: "Moderate Question 8",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 9,
            subjectcode: "",
            question: "Moderate Question 9",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 10,
            subjectcode: "",
            question: "Moderate Question 10",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 1,
            subjectcode: "",
            question: "Moderate Question 11",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 12,
            subjectcode: "",
            question: "Moderate Question 12",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 13,
            subjectcode: "",
            question: "Moderate Question 13",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 14,
            subjectcode: "",
            question: "Moderate Question 14",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 15,
            subjectcode: "",
            question: "Moderate Question 15",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 16,
            subjectcode: "",
            question: "Moderate Question 16",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 17,
            subjectcode: "",
            question: "Moderate Question 17",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 18,
            subjectcode: "",
            question: "Moderate Question 18",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 19,
            subjectcode: "",
            question: "Moderate Question 19",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        },
        {
            queid: 20,
            subjectcode: "",
            question: "Moderate Question 20",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "moderate",
        }
    ]
    difficult = [
        {
            queid: 1,
            subjectcode: "",
            question: "Difficult Question 1",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 2,
            subjectcode: "",
            question: "Difficult Question 2",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 3,
            subjectcode: "",
            question: "Difficult Question 3",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 4,
            subjectcode: "",
            question: "Difficult Question 4",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 5,
            subjectcode: "",
            question: "Difficult Question 5",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 6,
            subjectcode: "",
            question: "Difficult Question 6",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 7,
            subjectcode: "",
            question: "Difficult Question 7",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 8,
            subjectcode: "",
            question: "Difficult Question 8",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 9,
            subjectcode: "",
            question: "Difficult Question 9",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 10,
            subjectcode: "",
            question: "Difficult Question 10",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 1,
            subjectcode: "",
            question: "Difficult Question 11",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 12,
            subjectcode: "",
            question: "Difficult Question 12",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 13,
            subjectcode: "",
            question: "Difficult Question 13",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 14,
            subjectcode: "",
            question: "Difficult Question 14",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 15,
            subjectcode: "",
            question: "Difficult Question 15",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 16,
            subjectcode: "",
            question: "Difficult Question 16",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 17,
            subjectcode: "",
            question: "Difficult Question 17",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 18,
            subjectcode: "",
            question: "Difficult Question 18",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 19,
            subjectcode: "",
            question: "Difficult Question 19",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        },
        {
            queid: 20,
            subjectcode: "",
            question: "Difficult Question 20",
            uploads: "",
            option1: "Guido van Rossum",
            option2: "James Gosling",
            option3: "Dennis Ritchie",
            option4: "Bjarne Stroustrup",
            answer: "James Gosling",
            description: "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
            status: "",
            difficulty: "Difficult",
        }
    ]
Easy_OnChange = (e) => {
    console.log(this.state.selected_option)
    
    this.setState({
        easy_index: this.state.easy_index + 1,
        max_score: this.state.max_score + 2,
        easy_count: this.state.easy_count +1
    })
    if(this.state.selected_option == this.easy[this.state.easy_index].answer)
    {
        this.setState({
            easy_correct: this.state.easy_correct + 1,
            obtained_score: this.state.obtained_score + 2
        })
    }
    if(this.state.easy_count >= 5)
    {
        this.Decision_Maker()
    }
    console.log(this.state)
    e.preventDefault();

}

Moderate_OnChange = (e) => {
    this.setState({
        moderate_index: this.state.moderate_index + 1,
        max_score: this.state.max_score + 3,
        moderate_count: this.state.moderate_count +1
    })
    if(this.state.selected_option == this.moderate[this.state.moderate_index].answer)
    {
        this.setState({
            moderate_correct: this.state.moderate_correct + 1,
            obtained_score: this.state.obtained_score + 3
        })
    }
    if(this.state.moderate_count >= 5)
    {
        this.Decision_Maker()
    }
    e.preventDefault();

}

Difficult_OnChange = (e) => {
    this.setState({
        difficult_index: this.state.difficult_index + 1,
        max_score: this.state.max_score + 5,
        difficult_count: this.state.difficult_count +1
    })
    if( this.state.selected_option == this.difficult[this.state.difficult_index].answer)
    {
        this.setState({
            difficult_correct: this.state.difficult_correct + 1,
            obtained_score: this.state.obtained_score + 5
        })
    }
    if(this.state.difficult_count >=5)
    {
        this.Decision_Maker()
    }
    e.preventDefault();

}


Decision_Maker = () => {
    console.log("Inside Decision Maker",this.state)
    if(this.state.current=="easy")
    {
        if(this.state.easy_correct==5)
        {
            this.setState({
                current: "difficult"
            })
        }
        else if(this.state.easy_correct>=3)
        {
            this.setState({
                current: "moderate"
            })
        }
        else
        {
            this.setState({
                current: "easy"
            })
        }
        this.setState({
            easy_count: 0,
        })
    }
    else if(this.state.current=="moderate")
    {
        if(this.state.moderate_correct==5)
        {
            this.setState({
                current: "difficult"
            })
        }
        else if(this.state.moderate_correct>=3)
        {
            this.setState({
                current: "moderate"
            })
        }
        else
        {
            this.setState({
                current: "easy",
                easy_count: 0
            })
        }
        this.setState({
            moderate_count: 0,
            moderate_correct:0
        })
    }
    else if(this.state.current=="difficult")
    {
        if(this.state.difficult_correct==5)
        {
            this.setState({
                current: "difficult"
            })
        }
        else if(this.state.difficult_correct>=3)
        {
            this.setState({
                current: "moderate"
            })
        }
        else
        {
            this.setState({
                current: "easy"
            })
        }
        this.setState({
            difficult_count: 0,
            difficult_correct: 0
        })
    }

    console.log(this.state)
}

changeHandler = (e) => {
    this.setState({
        selected_option: e.target.value
    })
}

    render() {
        return (
            <div className="MockTests">
                <div>
                    {/* {this.state.loading || !this.state.user ? <Loading /> : */}
                    <p>
                        <div className="carrybox">
                            <h2>Mock exam</h2> 
                            <br></br>
                            <br></br>
                            {
                                (this.state.current=="easy" && this.state.easy_count<= 5) ?
                                <div>
                                    {/* Easy_Section */}
                                    
                                    <b>{this.easy[this.state.easy_index].question}</b>
                                    <div>
                                    <form onSubmit={this.Easy_OnChange}>
                                    <input type="radio" value={this.easy[this.state.easy_index].option1}  name={this.easy[this.state.easy_index].queid} onChange={this.changeHandler} />{this.easy[this.state.easy_index].option1}
                                    <br></br><input type="radio" value={this.easy[this.state.easy_index].option2}  name={this.easy[this.state.easy_index].queid} onChange={this.changeHandler}/> {this.easy[this.state.easy_index].option2}
                                    <br></br><input type="radio" value={this.easy[this.state.easy_index].option3}  name={this.easy[this.state.easy_index].queid} onChange={this.changeHandler}/> {this.easy[this.state.easy_index].option3}
                                    <br></br><input type="radio" value={this.easy[this.state.easy_index].option4}  name={this.easy[this.state.easy_index].queid} onChange={this.changeHandler}/> {this.easy[this.state.easy_index].option4}
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    <button >Next</button>
                                    </form>
                                    </div>
                                </div>:
                                this.state.current==="moderate" && this.state.moderate_count<=5 ?
                                <div>
                                    {/* Moderate_Section */}
                                    
                                    <b>{this.moderate[this.state.moderate_index].question}</b>
                                    <div>
                                        <form onSubmit={this.Moderate_OnChange}>
                                    <input type="radio" value={this.moderate[this.state.moderate_index].option1} name={this.moderate[this.state.moderate_index].queid} onChange={this.changeHandler} />{this.moderate[this.state.moderate_index].option1}
                                    <input type="radio" value={this.moderate[this.state.moderate_index].option2} name={this.moderate[this.state.moderate_index].queid} onChange={this.changeHandler}/> {this.moderate[this.state.moderate_index].option2}
                                    <input type="radio" value={this.moderate[this.state.moderate_index].option3} name={this.moderate[this.state.moderate_index].queid} onChange={this.changeHandler}/> {this.moderate[this.state.moderate_index].option3}
                                    <input type="radio" value={this.moderate[this.state.moderate_index].option4} name={this.moderate[this.state.moderate_index].queid} onChange={this.changeHandler}/> {this.moderate[this.state.moderate_index].option4}
                                    <br></br>
                                    <button >Next</button>
                                    </form>
                                    </div>
                                </div>:
                                this.state.current== "difficult" && this.state.difficult_count<=5 ?
                                <div>
                                    {/* Difficult_Section */}
                                    
                                    <b>{this.difficult[this.state.difficult_index].question}</b>
                                    <div>
                                    <form onSubmit={this.Difficult_OnChange}>
                                    <input type="radio" value={this.difficult[this.state.difficult_index].option1} name={this.difficult[this.state.difficult_index].queid} onChange={this.changeHandler} />{this.difficult[this.state.difficult_index].option1}
                                    <input type="radio" value={this.difficult[this.state.difficult_index].option2} name={this.difficult[this.state.difficult_index].queid} onChange={this.changeHandler}/> {this.difficult[this.state.difficult_index].option2}
                                    <input type="radio" value={this.difficult[this.state.difficult_index].option3} name={this.difficult[this.state.difficult_index].queid} onChange={this.changeHandler}/> {this.difficult[this.state.difficult_index].option3}
                                    <input type="radio" value={this.difficult[this.state.difficult_index].option4} name={this.difficult[this.state.difficult_index].queid} onChange={this.changeHandler}/> {this.difficult[this.state.difficult_index].option4}
                                    <br></br>
                                    <button >Next</button>
                                    </form>
                                    </div>
                                </div>:null
                            }
                        </div>
                    </p>
                    {/* } */}
                </div>
            </div>
        );
    }
}

export default MockTest;