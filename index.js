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
    // entry is the name of the key for each course ID
    for (const entry in data) {
        // for each entry grab all the data in the dictionary
        const course = new Course(data[entry], entry);
        // then add each course object to the courses array
        courses.push(course);
    }
})

// we don't use next in this case so removed param
// creates the express route using :name as the variable for queries
app.get("/courses/instructor/:name", (req, res, _) => {
    // set up array to hold courses that have an instructor name that matches query
    const foundCourses = [];
    // could use an ES6 function
    // courses.forEach(course => {
    // if (course.hasInstructor(req.params.name)) {
    //     foundCourses.push(course.toData(req.params.name));
    //  }
    // })
    for (let i = 0; i < courses.length; i += 1) {
        const course = courses[i];
        if (course.hasInstructor(req.params.name)) {
            foundCourses.push(course.toData(req.params.name));
        }
    }
    // sends back to browser as json array
    res.json(foundCourses);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
