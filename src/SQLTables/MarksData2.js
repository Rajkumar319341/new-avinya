import React from "react";
import axios from "axios";
import "../CRUDTable.css";
import { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIData } from "../Authentication/APIData";
import * as AiIcons from "react-icons/ai";
import CRUDTable, {
    Fields,
    Field,
    CreateForm,
    DeleteForm,
    UpdateForm,
    Pagination,
} from "react-crud-table";
import Loading from "../Loading";
import { Link } from "react-router-dom";
toast.configure();
let tasks = [];
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

function returntypebased() {
    if (sessiondetails) {
        if (sessiondetails.userType === "superadmin") {
            return (
                <div>
                    <Link to="createMarks">
                        <div className="Upload">
                            <AiIcons.AiOutlinePlusCircle />
                        </div>
                    </Link>
                    <CRUDTable
                        caption="MARKS"
                        fetchItems={(payload) => service.fetchItems(payload)}
                    >
                        <Fields>
                            <Field
                                name="id"
                                label="ID"
                                placeholder="ID"
                                type="number"
                                hideInCreateForm
                                hideFromTable
                                readOnly
                                hideInUpdateForm
                            />
                            <Field
                                name="student_id"
                                label="Student ID"
                                placeholder="Student ID"
                            />
                            <Field
                                hideInUpdateForm
                                name="grade"
                                label="Grade"
                                placeholder="Grade"
                            />
                            <Field
                                hideInUpdateForm
                                name="name"
                                label="Name"
                                placeholder="Name"
                            />
                            <Field
                                hideInUpdateForm
                                name="test_type"
                                label="Type"
                                placeholder="Test Type"
                            />
                            <Field
                                hideInUpdateForm
                                name="science"
                                label="Sci"
                                placeholder="Science"
                            />
                            <Field
                                hideInUpdateForm
                                name="social"
                                label="Social"
                                placeholder="Social"
                            />
                            <Field
                                hideInUpdateForm
                                name="mathematics"
                                label="Maths"
                                placeholder="Mathematics"
                            />
                            <Field
                                hideInUpdateForm
                                name="first_language"
                                label="FL"
                                placeholder="First Language"
                            />
                            <Field
                                hideInUpdateForm
                                name="second_language"
                                label="SL"
                                placeholder="Second Language"
                            />
                            <Field
                                hideInUpdateForm
                                name="third_language"
                                label="TL"
                                placeholder="Third Language"
                            />
                            <Field
                                hideInUpdateForm
                                name="max_score"
                                label="Max "
                                placeholder="Max Score"
                            />
                            <Field
                                hideInUpdateForm
                                name="total"
                                label="Total"
                                placeholder="Total"
                            />
                            <Field
                                hideInUpdateForm
                                name="test_date"
                                label="Date"
                                placeholder="Test Date"
                                type="date"
                            />
                            <Field
                                hideInUpdateForm
                                name="percentage"
                                label="%"
                                placeholder="Percentage"
                                type="number"
                                max="100"
                            />
                            <Field
                                name="months"
                                label="Months"
                                placeholder="Months"
                                type="string"
                                hideInUpdateForm
                            />
                            <Field name="email_id" label="Email" placeholder="Email" />
                        </Fields>
                        {/* <CreateForm
 title="Marks Creation"
 message="Create a new Marks!"
 trigger={<AiIcons.AiFillPlusCircle />}
 onSubmit={(task) => service.create(task)}
 submitText="Create"
 validate={(values) => {
 const errors = {};
 if (!values.student_id) {
 errors.student_id = "Please, provide Student ID";
 }

 if (!values.grade) {
 errors.grade = "Please, provide Grade";
 }

 if (!values.name) {
 errors.name = "Please, provide Name";
 }
 if (!values.test_type) {
 errors.test_type = "Please, provide Test Type";
 }
 if (!values.science) {
 errors.science = "Please, provide Science Marks";
 }
 if (!values.social) {
 errors.social = "Please, provide Social Marks";
 }
 if (!values.mathematics) {
 errors.mathematics = "Please, provide Mathematics Marks";
 }
 if (!values.first_language) {
 errors.first_language = "Please, provide First Language Marks";
 }
 if (!values.second_language) {
 errors.second_language =
 "Please, provide Second Language Marks";
 }
 if (!values.third_language) {
 errors.third_language = "Please, provide Third Language Marks";
 }
 if (!values.max_score) {
 errors.max_score = "Please, provide Maximum Marks";
 }
 if (!values.total) {
 errors.total = "Please, provide Total";
 }
 if (!values.test_date) {
 errors.test_date = "Please, provide Test Date";
 }
 if (!values.percentage) {
 errors.percentage = "Please, provide Percentage";
 }

 return errors;
 }}
 /> */}
                        <UpdateForm
                            title="Marks Email Process"
                            message="Email student"
                            trigger={<AiIcons.AiFillMail />}
                            onSubmit={(task) => service.update(task)}
                            submitText="Email"
                            validate={(values) => {
                                const errors = {};

                                if (!values.student_id) {
                                    errors.student_id = "Please, provide Student ID";
                                }

                                if (!values.grade) {
                                    errors.grade = "Please, provide Grade";
                                }

                                if (!values.name) {
                                    errors.name = "Please, provide Name";
                                }
                                if (!values.test_type) {
                                    errors.test_type = "Please, provide Test Type";
                                }
                                if (!values.science) {
                                    errors.science = "Please, provide Science Marks";
                                }
                                if (!values.social) {
                                    errors.social = "Please, provide Social Marks";
                                }
                                if (!values.mathematics) {
                                    errors.mathematics = "Please, provide Mathematics Marks";
                                }
                                if (!values.first_language) {
                                    errors.first_language =
                                        "Please, provide First Language Marks";
                                }
                                if (!values.second_language) {
                                    errors.second_language =
                                        "Please, provide Second Language Marks";
                                }
                                if (!values.third_language) {
                                    errors.third_language =
                                        "Please, provide Third Language Marks";
                                }
                                if (!values.max_score) {
                                    errors.max_score = "Please, provide Maximum Marks";
                                }
                                if (!values.total) {
                                    errors.total = "Please, provide Total";
                                }
                                if (!values.test_date) {
                                    errors.test_date = "Please, provide Test Date";
                                }
                                if (!values.percentage) {
                                    errors.percentage = "Please, provide Percentage";
                                }
                                if (!values.months) {
                                    errors.months = "Please, provide the month";
                                }

                                return errors;
                            }}
                        />
                        <DeleteForm
                            title="Marks Delete Process"
                            message="Are you sure you want to delete the Marks?"
                            trigger={<AiIcons.AiFillDelete />}
                            onSubmit={(task) => service.delete(task)}
                            submitText="Delete"
                            validate={(values) => {
                                const errors = {};

                                return errors;
                            }}
                        />
                        <Pagination
                            itemsPerPage={10}
                            activePage={1}
                            fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
                        />
                    </CRUDTable>
                </div>
            );
        } else if (sessiondetails.userType === "admin") {
            return (
                <div>
                    <Link to="createMarks">
                        <div className="Upload">
                            <AiIcons.AiOutlinePlusCircle />
                        </div>
                    </Link>
                    <CRUDTable
                        caption="MARKS"
                        fetchItems={(payload) => service.fetchItems(payload)}
                    >
                        <Fields>
                            <Field
                                hideInUpdateForm
                                name="id"
                                label="ID"
                                placeholder="ID"
                                type="number"
                                hideInCreateForm
                                hideFromTable
                                readOnly
                            />
                            <Field
                                name="student_id"
                                label="Student ID"
                                placeholder="Student ID"
                            />
                            <Field
                                hideInUpdateForm
                                name="grade"
                                label="Grade"
                                placeholder="Grade"
                            />
                            <Field
                                hideInUpdateForm
                                name="name"
                                label="Name"
                                placeholder="Name"
                            />
                            <Field
                                hideInUpdateForm
                                name="test_type"
                                label="Type"
                                placeholder="Test Type"
                            />
                            <Field
                                hideInUpdateForm
                                name="science"
                                label="Sci"
                                placeholder="Science"
                            />
                            <Field
                                hideInUpdateForm
                                name="social"
                                label="Social"
                                placeholder="Social"
                            />
                            <Field
                                hideInUpdateForm
                                name="mathematics"
                                label="Maths"
                                placeholder="Mathematics"
                            />
                            <Field
                                hideInUpdateForm
                                name="first_language"
                                label="FL"
                                placeholder="First Language"
                            />
                            <Field
                                hideInUpdateForm
                                name="second_language"
                                label="SL"
                                placeholder="Second Language"
                            />
                            <Field
                                hideInUpdateForm
                                name="third_language"
                                label="TL"
                                placeholder="Third Language"
                            />
                            <Field
                                hideInUpdateForm
                                name="max_score"
                                label="Max "
                                placeholder="Max Score"
                            />
                            <Field
                                hideInUpdateForm
                                name="total"
                                label="Total"
                                placeholder="Total"
                            />
                            <Field
                                hideInUpdateForm
                                name="test_date"
                                label="Date"
                                placeholder="Test Date"
                                type="date"
                            />
                            <Field
                                hideInUpdateForm
                                name="percentage"
                                label="%"
                                placeholder="Percentage"
                                type="number"
                                max="100"
                            />
                            <Field
                                name="months"
                                label="Months"
                                placeholder="Months"
                                type="string"
                                hideInUpdateForm
                            />
                            <Field
                                name="email_id"
                                label="Email"
                                placeholder="Email"
                                hideFromTable
                            />
                        </Fields>
                        {/* <CreateForm
 title="Marks Creation"
 message="Create a new Marks!"
 trigger={<AiIcons.AiFillPlusCircle />}
 onSubmit={(task) => service.create(task)}
 submitText="Create"
 validate={(values) => {
 const errors = {};
 if (!values.student_id) {
 errors.student_id = "Please, provide Student ID";
 }

 if (!values.grade) {
 errors.grade = "Please, provide Grade";
 }

 if (!values.name) {
 errors.name = "Please, provide Name";
 }
 if (!values.test_type) {
 errors.test_type = "Please, provide Test Type";
 }
 if (!values.science) {
 errors.science = "Please, provide Science Marks";
 }
 if (!values.social) {
 errors.social = "Please, provide Social Marks";
 }
 if (!values.mathematics) {
 errors.mathematics = "Please, provide Mathematics Marks";
 }
 if (!values.first_language) {
 errors.first_language = "Please, provide First Language Marks";
 }
 if (!values.second_language) {
 errors.second_language =
 "Please, provide Second Language Marks";
 }
 if (!values.third_language) {
 errors.third_language = "Please, provide Third Language Marks";
 }
 if (!values.max_score) {
 errors.max_score = "Please, provide Maximum Marks";
 }
 if (!values.total) {
 errors.total = "Please, provide Total";
 }
 if (!values.test_date) {
 errors.test_date = "Please, provide Test Date";
 }
 if (!values.percentage) {
 errors.percentage = "Please, provide Percentage";
 }

 return errors;
 }}
 /> */}
                        <UpdateForm
                            title="Marks Email Process"
                            message="Email student"
                            trigger={<AiIcons.AiFillMail />}
                            onSubmit={(task) => service.update(task)}
                            submitText="Email"
                            validate={(values) => {
                                const errors = {};

                                if (!values.student_id) {
                                    errors.student_id = "Please, provide Student ID";
                                }

                                if (!values.grade) {
                                    errors.grade = "Please, provide Grade";
                                }

                                if (!values.name) {
                                    errors.name = "Please, provide Name";
                                }
                                if (!values.test_type) {
                                    errors.test_type = "Please, provide Test Type";
                                }
                                if (!values.science) {
                                    errors.science = "Please, provide Science Marks";
                                }
                                if (!values.social) {
                                    errors.social = "Please, provide Social Marks";
                                }
                                if (!values.mathematics) {
                                    errors.mathematics = "Please, provide Mathematics Marks";
                                }
                                if (!values.first_language) {
                                    errors.first_language =
                                        "Please, provide First Language Marks";
                                }
                                if (!values.second_language) {
                                    errors.second_language =
                                        "Please, provide Second Language Marks";
                                }
                                if (!values.third_language) {
                                    errors.third_language =
                                        "Please, provide Third Language Marks";
                                }
                                if (!values.max_score) {
                                    errors.max_score = "Please, provide Maximum Marks";
                                }
                                if (!values.total) {
                                    errors.total = "Please, provide Total";
                                }
                                if (!values.test_date) {
                                    errors.test_date = "Please, provide Test Date";
                                }
                                if (!values.percentage) {
                                    errors.percentage = "Please, provide Percentage";
                                }
                                if (!values.months) {
                                    errors.months = "Please, provide the months";
                                }

                                return errors;
                            }}
                        />
                        <DeleteForm
                            title="Marks Delete Process"
                            message="Are you sure you want to delete the Marks?"
                            trigger={<AiIcons.AiFillDelete />}
                            onSubmit={(task) => service.delete(task)}
                            submitText="Delete"
                            validate={(values) => {
                                const errors = {};
                                if (!values.student_id) {
                                    errors.student_id = "Please, provide Student ID";
                                }

                                return errors;
                            }}
                        />
                        <Pagination
                            itemsPerPage={10}
                            activePage={1}
                            fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
                        />
                    </CRUDTable>
                </div>
            );
        } else if (sessiondetails.userType === "student") {
            return (
                <CRUDTable
                    caption="MARKS"
                    fetchItems={(payload) => service.fetchItems(payload)}
                >
                    <Fields>
                        <Field
                            name="id"
                            label="ID"
                            placeholder="ID"
                            type="number"
                            hideInCreateForm
                            hideFromTable
                            readOnly
                        />
                        <Field
                            name="student_id"
                            label="Student ID"
                            placeholder="Student ID"
                        />
                        <Field name="grade" label="Grade" placeholder="Grade" />
                        <Field name="name" label="Name" placeholder="Name" />
                        <Field name="test_type" label="Type" placeholder="Test Type" />
                        <Field name="science" label="Sci" placeholder="Science" />
                        <Field name="social" label="Social" placeholder="Social" />
                        <Field name="mathematics" label="Maths" placeholder="Mathematics" />
                        <Field
                            name="first_language"
                            label="FL"
                            placeholder="First Language"
                        />
                        <Field
                            name="second_language"
                            label="SL"
                            placeholder="Second Language"
                        />
                        <Field
                            name="third_language"
                            label="TL"
                            placeholder="Third Language"
                        />
                        <Field name="max_score" label="Max " placeholder="Max Score" />
                        <Field name="total" label="Total" placeholder="Total" />
                        <Field
                            name="test_date"
                            label="Date"
                            placeholder="Test Date"
                            type="date"
                        />
                        <Field
                            name="percentage"
                            label="%"
                            placeholder="Percentage"
                            type="number"
                            max="100"
                        />
                        <Field
                            name="months"
                            label="Months"
                            placeholder="Months"
                            type="string"
                            hideInUpdateForm
                        />
                        <Field
                            name="email_id"
                            label="Email"
                            placeholder="Email"
                            hideFromTable
                        />
                    </Fields>
                    {/* <CreateForm
 title="Marks Creation"
 message="Create a new Marks!"
 trigger={<AiIcons.AiFillPlusCircle />}
 onSubmit={task => service.create(task)}
 submitText="Create"
 validate={values => {
 const errors = {};
 if (!values.student_id) {
 errors.student_id = "Please, provide Student ID";
 }

 if (!values.grade) {
 errors.grade = "Please, provide Grade";
 }

 if (!values.name) {
 errors.name = "Please, provide Name";
 }
 if (!values.test_type) {
 errors.test_type = "Please, provide Test Type";
 }
 if (!values.science) {
 errors.science = "Please, provide Science Marks";
 }
 if (!values.social) {
 errors.social = "Please, provide Social Marks";
 }
 if (!values.mathematics) {
 errors.mathematics = "Please, provide Mathematics Marks";
 }
 if (!values.first_language) {
 errors.first_language = "Please, provide First Language Marks";
 }
 if (!values.second_language) {
 errors.second_language = "Please, provide Second Language Marks";
 }
 if (!values.third_language) {
 errors.third_language = "Please, provide Third Language Marks";
 }
 if (!values.max_score) {
 errors.max_score = "Please, provide Maximum Marks";
 }
 if (!values.total) {
 errors.total = "Please, provide Total";
 }
 if (!values.test_date) {
 errors.test_date = "Please, provide Test Date";
 }
 if (!values.percentage) {
 errors.percentage = "Please, provide Percentage";
 }


 return errors;
 }}
 />
<UpdateForm
 title="Marks Email Process"
 message="Email student"
 trigger= {<AiIcons.AiFillMail />}
 onSubmit={task => service.update(task)}
 submitText="Email"
 validate={values => {
 const errors = {};

 if (!values.student_id) {
 errors.student_id = "Please, provide Student ID";
 }

 if (!values.grade) {
 errors.grade = "Please, provide Grade";
 }

 if (!values.name) {
 errors.name = "Please, provide Name";
 }
 if (!values.test_type) {
 errors.test_type = "Please, provide Test Type";
 }
 if (!values.science) {
 errors.science = "Please, provide Science Marks";
 }
 if (!values.social) {
 errors.social = "Please, provide Social Marks";
 }
 if (!values.mathematics) {
 errors.mathematics = "Please, provide Mathematics Marks";
 }
 if (!values.first_language) {
 errors.first_language = "Please, provide First Language Marks";
 }
 if (!values.second_language) {
 errors.second_language = "Please, provide Second Language Marks";
 }
 if (!values.third_language) {
 errors.third_language = "Please, provide Third Language Marks";
 }
 if (!values.max_score) {
 errors.max_score = "Please, provide Maximum Marks";
 }
 if (!values.total) {
 errors.total = "Please, provide Total";
 }
 if (!values.test_date) {
 errors.test_date = "Please, provide Test Date";
 }
 if (!values.percentage) {
 errors.percentage = "Please, provide Percentage";
 }


 return errors;
 }}
 />
 <DeleteForm
 title="Marks Delete Process"
 message="Are you sure you want to delete the Marks?"
 trigger={<AiIcons.AiFillDelete />}
 onSubmit={task => service.delete(task)}
 submitText="Delete"
 validate={values => {
 const errors = {};
 if (!values.student_id) {
 errors.student_id = "Please, provide Student ID";
 }


 return errors;
 }}
 /> */}
                    <Pagination
                        itemsPerPage={10}
                        activePage={1}
                        fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
                    />
                </CRUDTable>
            );
        } else if (sessiondetails.userType === "employee") {
            return (
                <div>
                    <Link to="createMarks">
                        <div className="Upload">
                            <AiIcons.AiOutlinePlusCircle />
                        </div>
                    </Link>
                    <CRUDTable
                        caption="MARKS"
                        fetchItems={(payload) => service.fetchItems(payload)}
                    >
                        <Fields>
                            <Field
                                hideInUpdateForm
                                name="id"
                                label="ID"
                                placeholder="ID"
                                type="number"
                                hideInCreateForm
                                hideFromTable
                                readOnly
                            />
                            <Field
                                name="student_id"
                                label="Student ID"
                                placeholder="Student ID"
                            />
                            <Field
                                hideInUpdateForm
                                name="grade"
                                label="Grade"
                                placeholder="Grade"
                            />
                            <Field
                                hideInUpdateForm
                                name="name"
                                label="Name"
                                placeholder="Name"
                            />
                            <Field
                                hideInUpdateForm
                                name="test_type"
                                label="Type"
                                placeholder="Test Type"
                            />
                            <Field
                                hideInUpdateForm
                                name="science"
                                label="Sci"
                                placeholder="Science"
                            />
                            <Field
                                hideInUpdateForm
                                name="social"
                                label="Social"
                                placeholder="Social"
                            />
                            <Field
                                hideInUpdateForm
                                name="mathematics"
                                label="Maths"
                                placeholder="Mathematics"
                            />
                            <Field
                                hideInUpdateForm
                                name="first_language"
                                label="FL"
                                placeholder="First Language"
                            />
                            <Field
                                hideInUpdateForm
                                name="second_language"
                                label="SL"
                                placeholder="Second Language"
                            />
                            <Field
                                hideInUpdateForm
                                name="third_language"
                                label="TL"
                                placeholder="Third Language"
                            />
                            <Field
                                hideInUpdateForm
                                name="max_score"
                                label="Max "
                                placeholder="Max Score"
                            />
                            <Field
                                hideInUpdateForm
                                name="total"
                                label="Total"
                                placeholder="Total"
                            />
                            <Field
                                hideInUpdateForm
                                name="test_date"
                                label="Date"
                                placeholder="Test Date"
                                type="date"
                            />
                            <Field
                                hideInUpdateForm
                                name="percentage"
                                label="%"
                                placeholder="Percentage"
                                type="number"
                                max="100"
                            />
                            <Field
                                name="months"
                                label="Months"
                                placeholder="Months"
                                type="string"
                                hideInUpdateForm
                            />
                            <Field
                                name="email_id"
                                label="Email"
                                placeholder="Email"
                                hideFromTable
                            />
                        </Fields>
                        {/* <CreateForm
 title="Marks Creation"
 message="Create a new Marks!"
 trigger={<AiIcons.AiFillPlusCircle />}
 onSubmit={(task) => service.create(task)}
 submitText="Create"
 validate={(values) => {
 const errors = {};
 if (!values.student_id) {
 errors.student_id = "Please, provide Student ID";
 }

 if (!values.grade) {
 errors.grade = "Please, provide Grade";
 }

 if (!values.name) {
 errors.name = "Please, provide Name";
 }
 if (!values.test_type) {
 errors.test_type = "Please, provide Test Type";
 }
 if (!values.science) {
 errors.science = "Please, provide Science Marks";
 }
 if (!values.social) {
 errors.social = "Please, provide Social Marks";
 }
 if (!values.mathematics) {
 errors.mathematics = "Please, provide Mathematics Marks";
 }
 if (!values.first_language) {
 errors.first_language = "Please, provide First Language Marks";
 }
 if (!values.second_language) {
 errors.second_language =
 "Please, provide Second Language Marks";
 }
 if (!values.third_language) {
 errors.third_language = "Please, provide Third Language Marks";
 }
 if (!values.max_score) {
 errors.max_score = "Please, provide Maximum Marks";
 }
 if (!values.total) {
 errors.total = "Please, provide Total";
 }
 if (!values.test_date) {
 errors.test_date = "Please, provide Test Date";
 }
 if (!values.percentage) {
 errors.percentage = "Please, provide Percentage";
 }

 return errors;
 }}
 /> */}
                        <UpdateForm
                            title="Marks Email Process"
                            message="Email student"
                            trigger={<AiIcons.AiFillMail />}
                            onSubmit={(task) => service.update(task)}
                            submitText="Email"
                            validate={(values) => {
                                const errors = {};

                                if (!values.student_id) {
                                    errors.student_id = "Please, provide Student ID";
                                }

                                if (!values.grade) {
                                    errors.grade = "Please, provide Grade";
                                }

                                if (!values.name) {
                                    errors.name = "Please, provide Name";
                                }
                                if (!values.test_type) {
                                    errors.test_type = "Please, provide Test Type";
                                }
                                if (!values.science) {
                                    errors.science = "Please, provide Science Marks";
                                }
                                if (!values.social) {
                                    errors.social = "Please, provide Social Marks";
                                }
                                if (!values.mathematics) {
                                    errors.mathematics = "Please, provide Mathematics Marks";
                                }
                                if (!values.first_language) {
                                    errors.first_language =
                                        "Please, provide First Language Marks";
                                }
                                if (!values.second_language) {
                                    errors.second_language =
                                        "Please, provide Second Language Marks";
                                }
                                if (!values.third_language) {
                                    errors.third_language =
                                        "Please, provide Third Language Marks";
                                }
                                if (!values.max_score) {
                                    errors.max_score = "Please, provide Maximum Marks";
                                }
                                if (!values.total) {
                                    errors.total = "Please, provide Total";
                                }
                                if (!values.test_date) {
                                    errors.test_date = "Please, provide Test Date";
                                }
                                if (!values.percentage) {
                                    errors.percentage = "Please, provide Percentage";
                                }
                                if (!values.months) {
                                    errors.months = "Please, provide the month";
                                }

                                return errors;
                            }}
                        />
                        <DeleteForm
                            title="Marks Delete Process"
                            message="Are you sure you want to delete the Marks?"
                            trigger={<AiIcons.AiFillDelete />}
                            onSubmit={(task) => service.delete(task)}
                            submitText="Delete"
                            validate={(values) => {
                                const errors = {};
                                if (!values.student_id) {
                                    errors.student_id = "Please, provide Student ID";
                                }

                                return errors;
                            }}
                        />
                        <Pagination
                            itemsPerPage={10}
                            activePage={1}
                            fetchTotalOfItems={(payload) => service.fetchTotal(payload)}
                        />
                    </CRUDTable>
                </div>
            );
        } else if (sessiondetails.userType === "user") {
        }
    }
}

function getTask(testTask) {
    tasks = testTask;
}

// function PostUpdateMarks(AdminMarksRow){
// var sendState={
// student_id : AdminMarksRow.student_id,
// grade : AdminMarksRow.grade,
// name : AdminMarksRow.name,
// test_type : AdminMarksRow.test_type,
// science : AdminMarksRow.science,
// social : AdminMarksRow.social,
// mathematics : AdminMarksRow.mathematics,
// first_language : AdminMarksRow.first_language,
// second_language : AdminMarksRow.second_language,
// third_language : AdminMarksRow.third_language,
// max_score : AdminMarksRow.max_score,
// total : AdminMarksRow.total,
// test_date : AdminMarksRow.test_date,
// percentage : AdminMarksRow.percentage,
// email_id : AdminMarksRow.email_id

// }
// axios
// .post(APIData.api+'marks/', sendState ,{headers:APIData.headers})
// .then(response => {
// if(response.data.status.toString().toLowerCase() =="success"){
// toast(response.data.description)
// window.location.reload();
// }
// else{
// toast(response.data.errorDesc)
// window.location.reload()
// }
// })
// .catch(error => {
// toast('Its Time to Grab A coffee')
// })
// }
// function deletemarks(id){
// const url = APIData.api+"marks/"+id;
// axios.delete(url,{headers:APIData.headers})
// window.location.reload("")
// }

const SORTERS = {
    NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
    const mapper = (x) => x[data.field];
    let sorter = SORTERS.STRING_ASCENDING(mapper);

    if (data.field === "student_id") {
        sorter =
            data.direction === "ascending"
                ? SORTERS.STRING_ASCENDING(mapper)
                : SORTERS.STRING_DESCENDING(mapper);
    } else if (data.field === "name") {
        sorter =
            data.direction === "ascending"
                ? SORTERS.STRING_ASCENDING(mapper)
                : SORTERS.STRING_DESCENDING(mapper);
    } else if (data.field === "grade") {
        sorter =
            data.direction === "ascending"
                ? SORTERS.STRING_ASCENDING(mapper)
                : SORTERS.STRING_DESCENDING(mapper);
    } else if (data.field === "test_type") {
        sorter =
            data.direction === "ascending"
                ? SORTERS.STRING_ASCENDING(mapper)
                : SORTERS.STRING_DESCENDING(mapper);
    } else if (data.field === "test_date") {
        sorter =
            data.direction === "ascending"
                ? SORTERS.STRING_ASCENDING(mapper)
                : SORTERS.STRING_DESCENDING(mapper);
    }  else if (data.field === "email_id") {
        sorter =
            data.direction === "ascending"
                ? SORTERS.STRING_ASCENDING(mapper)
                : SORTERS.STRING_DESCENDING(mapper);
    } else if (data.field === "months") {
        sorter =
            data.direction === "ascending"
                ? SORTERS.STRING_ASCENDING(mapper)
                : SORTERS.STRING_DESCENDING(mapper);
    } else {
        sorter =
            data.direction === "ascending"
                ? SORTERS.NUMBER_ASCENDING(mapper)
                : SORTERS.NUMBER_DESCENDING(mapper);
    }

    return sorter;
};

// let count = tasks.length;
// console.log(count);
const service = {
    fetchItems: (payload) => {
        const { activePage, itemsPerPage } = payload.pagination;
        const start = (activePage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        let result = Array.from(tasks);
        result = result.sort(getSorter(payload.sort));
        return Promise.resolve(result.slice(start, end));
    },
    fetchTotal: (payload) => {
        return Promise.resolve(tasks.length);
    },
    create: (task) => {
        window.responseload.responseloading();
        axios
            .post(APIData.api + "marks/", task, { headers: APIData.headers })
            .then((response) => {
                if (response.data.status.toString().toLowerCase() == "success") {
                    toast(response.data.description);
                    tasks.push({ ...task });
                    window.responseload.responseloading();
                } else {
                    toast(response.data.errorDesc);
                    window.responseload.responseloading();
                }
            })
            .catch((error) => {
                toast("Its Time to Grab A coffee");
                window.responseload.responseloading();
            });

        return Promise.resolve(task);
    },
    update: (data) => {
        const task = tasks.find((t) => t.id === data.id);

        window.responseload.responseloading();
        axios
            .post(APIData.api + "marks/email/", task, { headers: APIData.headers })
            .then((response) => {
                task.grade = data.grade;
                task.name = data.name;
                task.test_type = data.test_type;
                task.science = data.science;
                task.social = data.social;
                task.mathematics = data.mathematics;
                task.first_language = data.first_language;
                task.second_language = data.second_language;
                task.third_language = data.third_language;
                task.max_score = data.max_score;
                task.total = data.total;
                task.test_date = data.test_date;
                task.percentage = data.percentage;
                task.email_id = data.email_id;
                task.months = data.months;
                toast("Email sent Successfully");
                window.responseload.responseloading();
            })
            .catch((error) => {
                toast("Its Time to Grab A coffee");
                window.responseload.responseloading();
            });

        return Promise.resolve(task);
    },
    delete: (data) => {
        const task = tasks.find((t) => t.id === data.id);
        const url = APIData.api + "marks/" + data.id;
        window.responseload.responseloading();
        axios.delete(url, { headers: APIData.headers }).then((response) => {
            if (response.status == 200) {
                toast("Marks Deleted");
                tasks = tasks.filter((t) => t.id !== task.id);
                window.responseload.responseloading();
            } else {
                toast("Marks Deletion Failed");
                window.responseload.responseloading();
            }
        });

        return Promise.resolve(task);
    },
};

const styles = {
    container: { margin: "auto", width: "fit-content" },
};

const Marks = () => <div style={styles.container}>{returntypebased()}</div>;

class MarksData extends Component {
    state = {
        loading: false,
    };
    constructor(props) {
        super(props);
        window.responseload = this;
        getTask(this.props.data);
    }
    responseloading() {
        this.setState({ loading: !this.state.loading });
    }
    render() {
        return (
            <div>
                <div>{this.state.loading ? <Loading /> : <Marks />}</div>
            </div>
        );
    }
}

export default MarksData;

