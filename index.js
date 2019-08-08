import Course from "./Course";
// import fs in order to load in the json file
import fs from "fs";
import express from "express";

let app = express();

const loadJson = (path, callback) => {
    fs.readFile(require.resolve(path), (err, data) => {
        if (err){
            callback(err);
        } else {
            callback(null, JSON.parse(data));
        }
    })

};

// courses is empty array in case of issue with json loading
const courses = [];

// we don't use error in this case so removed param
loadJson("./Courses.json", (_, data) => {
    for (const entry in data) {
        const course = new Course(data[entry], entry);
        courses.push(course);
    }
})

// we don't use next in this case so removed param
app.get("/courses/instructor/:name", (req, res, _) => {
    const foundCourses = [];
    for (let i = 0; i < courses.length; i += 1) {
        const course = courses[i];
        if (course.hasInstructor(req.params.name)) {
            foundCourses.push(course.toData(req.params.name));
        }
    }
    res.json(foundCourses);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
