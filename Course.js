export default class Course {
    constructor(data, id) {
        // convert json to model object and only expose data we want to share
        this.courseId = id;
        this.courseArea = data.course_area;
        this.courseDesc = data.course_desc;
        this.courseName = data.course_name;
        this.courseTitle = data.course_title;
        // Using Set to add in each teacher without duplicates
        // if they taught the same class in multiple terms
        this.terms = new Set();

        for (const term in data.terms) {
            const instructors = data.terms[term].instructors
            // could use an ES6 function
            for (let i = 0; i < instructors.length; i += 1) {
                // add is a function on the Set() to add unique values
                this.terms.add(instructors[i]);
            }
        }
    };

    hasInstructor(letters) {
        let found = false
        
        // for each name in the "terms" of a unique ID,
        // see if it includes the letters passed in the url

        // we don't use key and set in this case so removed params
        this.terms.forEach((_, name, __) => {
            if (name.includes(letters)) {
                found = true;
            }
        });
        return found;
    };

    toData(letters) {
        const matchingInstructors = [];

        // only returning instructors who match the search query
        // instead of all instructors if one of them matches the query

        // we don't use key and set in this case so removed params
        this.terms.forEach((_, name, __) => {
            if (name.includes(letters)) {
                matchingInstructors.push(name);
            }
        });

        // controlling what data is returned to the user
        return {
            courseId:this.courseId,
            courseArea:this.courseArea,
            courseDesc:this.courseDesc,
            courseName:this.courseName,
            courseTitle:this.courseTitle,
            instructors:matchingInstructors
        }
    };
}