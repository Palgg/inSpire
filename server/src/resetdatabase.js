var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = 'InspireInc';

// Put the initial mock objects here.
var initialData = {
  "students": {
      "12345678": {
          "_id": new ObjectID("000000000000000012345678"),
          "firstName": "Jason",
          "lastName": "Jackson",
          "gradYear": 2017,
          "major": "Sociology",
          "birthDate": new Date(1992, 2, 14),
          "gender": "M",
          "advisor": 1,
          "email": "jjackson@umass.edu",
          "academicInstitution": "U. of Massachusetts Amherst",
          "enrolledCourses": [
            new ObjectID("000000000000000012345678"), new ObjectID("000000000000000019103958"), new ObjectID("000000000000000092819522")
          ],
          "cart": [
            new ObjectID("000000000000000018271821"), new ObjectID("000000000000000085938173"), new ObjectID("000000000000000009876543")
          ],
          "completedCourses": [[new ObjectID("000000000000000092819522"), "A+"], [new ObjectID("000000000000000012345678"), "B-"]]
      },
      "27133668": {
          "_id": new ObjectID("000000000000000027133668"),
          "firstName": "Christine",
          "lastName": "Thielen",
          "gradYear": 2018,
          "major": "Computer Science",
          "birthDate": new Date(1994, 11, 14),
          "gender": "F",
          "advisor": 2,
          "email": "cthielen@umass.edu",
          "academicInstitution": "Amherst College",
          "enrolledCourses": [
            new ObjectID("000000000000000018271821"), new ObjectID("000000000000000085938173"), new ObjectID("000000000000000009876543")
          ],
          "cart": [
            new ObjectID("000000000000000012345678"), new ObjectID("000000000000000092819522"), new ObjectID("000000000000000019103958")
          ],
          "completedCourses": []
      },
      "07894436": {
          "_id": new ObjectID("000000000000000007894436"),
          "firstName": "James",
          "lastName": "Ensor",
          "gradYear": 2016,
          "major": "Chemistry",
          "birthDate": new Date(1993, 4, 25),
          "gender": "M",
          "advisor": 3,
          "email": "jensor@umass.edu",
          "academicInstitution": "Hampshire College",
          "enrolledCourses": [
            new ObjectID("000000000000000012345678"), new ObjectID("000000000000000019103958"), new ObjectID("000000000000000085938173")
          ],
          "cart": [
            new ObjectID("000000000000000092819522"), new ObjectID("000000000000000018271821"), new ObjectID("000000000000000009876543")
          ],
          "completedCourses": []
      }
  },
  // "Document" storing professors
  "professor": {
      "12345678": {
          "_id": new ObjectID("000000000000000012345678"),
          "firstName": "Verty",
          "lastName": "Verts",
          "office": "LGRT 300",
          "teaches": [new ObjectID("000000000000000012345678"), new ObjectID("000000000000000018271821")]
      },
      "83719683": {
          "_id": new ObjectID("000000000000000083719683"),
          "firstName": "Jason",
          "lastName": "Derulo",
          "office": "LGRT 100",
          "teaches": [new ObjectID("000000000000000092819522"), new ObjectID("000000000000000019103958")]
      },
      "23810589": {
          "_id": new ObjectID("000000000000000023810589"),
          "firstName": "Tim",
          "lastName": "Richards",
          "office": "CS 240",
          "teaches": [new ObjectID("000000000000000085938173"), new ObjectID("000000000000000009876543")]
      }
  },
  // "Document" storing courses
  "courses": {
      "12345678": {
          "_id": new ObjectID("000000000000000012345678"),
          "courseTag": "COMPSCI",
          "courseNumber": "220",
          "courseName": "Programming Methodology",
          "section": 1,
          "subject": "Computer Engineering",
          "genEdCategory": "AL Literature",
          "session": "*University",
          "instructionMode": "Classroom",
          "description": "Development of individual skills necessary for designing, implementing, testing and modifying larger programs, including: use of integrated design environments, design strategies and patterns, testing, working with large code bases and libraries, code refactoring, and use of debuggers and tools for version control. There will be significant programming and a mid-term and final examination.",
          "location": "Morrill Sci Ctr (1)  Room N375",
          "credits": 4,
          "capacity": 120,
          "enrolled": [ new ObjectID("000000000000000012345678") ],
          "restrictions": "",
          "instructor": new ObjectID("000000000000000012345678"),
          "final": [new Date(2017, 0, 22,10,0,0,0),new Date(2017,0,22,12,0,0,0), "School of Management rm 135"],
          "start": new Date(0,0,0,8,0),
          "end": new Date(0,0,0,8,50),
          "days": ["Monday","Wednesday","Friday"]
      },
      "92819522": {
          "_id": new ObjectID("000000000000000092819522"),
          "courseTag": "COMPSCI",
          "courseNumber": "230",
          "courseName": "Computer Systems Principles",
          "section": 1,
          "subject": "Computer Engineering",
          "genEdCategory": "AL Literature",
          "session": "*University",
          "instructionMode": "Classroom",
          "description": "Large-scale software systems like Google - deployed over a world-wide network of hundreds of thousands of computers - have become a part of our lives. These are systems success stories - they are reliable, available (\"up\" nearly all the time), handle an unbelievable amount of load from users around the world, yet provide virtually instantaneous results. On the other hand, many computer systems don't perform nearly as well as Google - hence the now-cliché \"the system is down.\" In this class, we study the scientific principles behind the construction of high-performance, scalable systems. The course begins with a discussion of C language, and moves up the stack from there to the features of modern architectures, assembly languages, and operating system services such as I/O and synchronization.",
          "location": "School of Management rm 137",
          "credits": 4,
          "capacity": 90,
          "enrolled": [new ObjectID("000000000000000012345678")],
          "restrictions": "",
          "instructor": new ObjectID("000000000000000083719683"),
          "final": [new Date(2017, 0, 22,8,0,0,0),new Date(2017,0,22,10,0,0,0), "School of Management rm 136"],
          "start": new Date(0,0,0,16,00),
          "end": new Date(0,0,0,17,15),
          "days": ["Tuesday", "Thursday"]
      },
      "19103958": {
          "_id": new ObjectID("000000000000000019103958"),
          "courseTag": "COMPSCI",
          "courseNumber": "240",
          "courseName": "Reasoning About Uncertainty",
          "section": 2,
          "subject": "Computer Science",
          "genEdCategory": "History",
          "session": "*University",
          "instructionMode": "Classroom",
          "description": "Development of mathematical reasoning skills for problems that involve uncertainty. Each concept will be illustrated by real-world examples and demonstrated though in-class and homework exercises, some of which will involve Java programming. Counting and probability -- basic counting problems, probability definitions, mean, variance, binomial distribution, Markov and Chebyshev bounds. Probabilistic reasoning -- conditional probability and odds, Bayes' Law, Naive Bayes classifiers, Monte Carlo simulation. Markov chains, Markov decision processes, classical game theory, introduction to information theory.",
          "location": "Thompson Hall room 106",
          "credits": 3,
          "capacity": 120,
          "enrolled": [new ObjectID("000000000000000012345678")],
          "restrictions": "",
          "instructor": new ObjectID("000000000000000083719683"),
          "final": [new Date(2017, 0, 23,11,15,0,0),new Date(2017,0,23,13,15,0,0),"Thompson Hall room 105"],
          "start" : new Date(0,0,0,11,15),
          "end" : new Date(0,0,0,12,5),
          "days": ["Monday","Wednesday","Friday"]
      },
      "18271821": {
          "_id": new ObjectID("000000000000000018271821"),
          "courseTag": "COMPSCI",
          "courseNumber": "250",
          "courseName": "Introduction to Computation",
          "section": 2,
          "subject": "Computer Science",
          "genEdCategory": "History",
          "session": "CPE Summer Session 1",
          "instructionMode": "Online",
          "description": "Lecture, discussion. Basic concepts of discrete mathematics useful to computer science: set theory, strings and formal languages, propositional and predicate calculus, relations and functions, basic number theory. Induction and recursion: interplay of inductive definition, inductive proof, and recursive algorithms. Graphs, trees, and search. Finite-state machines, regular languages, nondeterministic finite automata, Kleene's Theorem. Problem sets, 2-3 midterm exams, timed final.",
          "location": "Thompson Hall room 106",
          "credits": 4,
          "capacity": 90,
          "enrolled": [],
          "restrictions": "",
          "instructor": new ObjectID("000000000000000012345678"),
          "final": [new Date(2017,3,22,14,30,0,0),new Date(2017,3,22,16,30,0,0), "Thompson Hall room 106"],
          "start" : new Date(0,0,0,14,30),
          "end" : new Date(0,0,0,15,45),
          "days": ["Monday","Wednesday","Friday"]
      },
      "85938173": {
          "_id": new ObjectID("000000000000000085938173"),
          "courseTag": "COMPSCI",
          "courseNumber": "320",
          "courseName": "Software Engineering",
          "section": 3,
          "subject": "Computer Science",
          "genEdCategory": "Biology",
          "session": "CPE Summer Session 1",
          "instructionMode": "Online",
          "description": "In this course, students learn and gain practical experience with software engineering principles and techniques. The practical experience centers on a semester-long team project in which a software development project is carried through all the stages of the software life cycle. Topics in this course include requirements analysis, specification, design, abstraction, programming style, testing, maintenance, communication, teamwork, and software project management. Particular emphasis is placed on communication and negotiation skills and on designing and developing maintainable software. Use of computer required. Several written assignments, in-class presentations, exams, and a term project. This course satisfies the IE Requirement.",
          "location": "Lederle Grad Res Ctr rm A301",
          "credits": 3,
          "capacity": 100,
          "enrolled": [],
          "restrictions": "Completion of CS 220 with grade of C or higher.",
          "instructor": new ObjectID("000000000000000023810589"),
          "final": [new Date(2017, 4, 22, 15, 0, 0), new Date(2017, 4, 22 ,17, 0, 0), "Lederle Grad Res Ctr rm A301"],
          "start" : new Date(0,0,0,15,0),
          "end" : new Date(0,0,0,18,0),
          "days": ["Tuesday", "Thursday"]
      },
      "09876543": {
          "_id": new ObjectID("000000000000000009876543"),
          "courseTag": "COMPSCI",
          "courseNumber": "326",
          "courseName": "Web Programming",
          "section": 3,
          "subject": "Computer Engineering",
          "genEdCategory": "Biology",
          "session": "CPE Summer Session 1",
          "instructionMode": "Online",
          "description": "The World Wide Web was proposed originally as a collection of static documents inter-connected by hyperlinks. Today, the web has grown into a rich platform, built on a variety of protocols, standards, and programming languages, that aims to replace many of the services traditionally provided by a desktop operating system. Topics will include: producing dynamic content using a server-based language, content serving databases and XML documents, session state management, multi-tier web-based architectures, web security, and core technologies including HTTP, HTML5, CSS, JavaScript, and SQL will be emphasized. This course will also study concepts and technologies including AJAX, social networking, mashups, JavaScript libraries (e.g., jQuery), and web security. This course is hands-on and project-based; students will construct a substantial dynamic web application based on the concepts, technologies, and techniques presented during lecture. This course satisfies the IE Requirement.",
          "location": "Hasbrouck Lab Add room 126",
          "credits": 3,
          "capacity": 90,
          "enrolled": [],
          "restrictions": "",
          "instructor": new ObjectID("000000000000000023810589"),
          "final": [new Date(2017, 5, 22,17,30,0,0),new Date(2017,5,22,19,30,0, 0),"Hasbrouck Lab Add room 126"],
          "start" : new Date(0,0,0,17,30),
          "end" : new Date(0,0,0,18,45),
          "days": ["Tuesday", "Thursday"]
      },
      "8874563": {
        "_id": new ObjectID("000000000000000008874563"),
        "courseTag": "COMPSCI",
        "courseNumber": "373",
        "courseName": "Intro to Computer Graphics",
        "description": "This course introduces the fundamental concepts of 2D and 3D computer graphics. It covers the basic methods for modeling, rendering, and imaging. Topics include: image processing, digital photography, 2D/3D modeling, 3D graphics pipeline, OpenGL, shading, texture mapping, ray tracing, 3D printing. Throughout the class, we will teach students to learn modern graphics techniques, to model the visual world algorithmically, and to implement algorithms using Java. Students who have taken COMPSCI 473 are not eligible to take this course. Prerequisites: COMPSCI 187 (or ECE 242) and COMPSCI 190DM (or MATH 235 or COMPSCI 240 or equivalent courses from other departments).",
        "location": "Computer Science Bldg rm 142",
        "credits": 3,
        "subject": "Computer Engineering",
        "genEdCategory": "Biology",
        "session": "CPE Summer Session 1",
        "instructionMode": "Online",
        "capacity": 110,
        "enrolled": [],
        "restrictions": "",
        "instructor": new ObjectID("000000000000000023810589"),
        "final": [new Date(2017, 5, 22,11,15,0,0),new Date(2017,5,22,13,15,0,0),"Computer Science Bldg rm 141"],
        "start" : new Date(0,0,0,11,15),
        "end" : new Date(0,0,0,12,5),
        "days": ["Monday", "Wednesday", "Friday"]
      }
  }
};

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

function addIndexes(db, cb) {
  db.collection('courses').createIndex({ "description": "text", "courseName": "text"}, null, cb);
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      addIndexes(db, cb);
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
