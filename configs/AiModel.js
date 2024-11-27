const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const courseOutline = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a study material for Python for Exam and level of difficulty will be EASY with summary of course, List of Chapters along with summary for each chapter, Topic list in each chapter, also there should be course_title, difficulty, summary and then chapters in the form of array json format,\nAll result in JSON format.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course_title\": \"Introduction to Python Programming\",\n  \"difficulty\": \"Easy\",\n  \"summary\": \"This course provides a gentle introduction to Python programming, covering fundamental concepts and syntax.  It's designed for beginners with little to no prior programming experience.  By the end of the course, students will be able to write basic Python programs, understand fundamental data structures, and apply simple control flow techniques.\",\n  \"chapters\": [\n    {\n      \"chapter_title\": \"Introduction to Programming and Python\",\n      \"summary\": \"This chapter introduces the concept of programming, explains why Python is a popular choice, and sets up the environment for coding.\",\n      \"topics\": [\n        \"What is Programming?\",\n        \"Why Python?\",\n        \"Installing Python\",\n        \"Running Python code (Interactive Interpreter & Script)\",\n        \"Basic Syntax (Indentation, Comments)\",\n        \"Printing to the Console\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Variables and Data Types\",\n      \"summary\": \"This chapter covers fundamental data types in Python and how to work with variables.\",\n      \"topics\": [\n        \"Variables and Assignment\",\n        \"Integers (int)\",\n        \"Floating-Point Numbers (float)\",\n        \"Strings (str)\",\n        \"Booleans (bool)\",\n        \"Type Conversion\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Operators\",\n      \"summary\": \"This chapter explores different types of operators used in Python for calculations and comparisons.\",\n      \"topics\": [\n        \"Arithmetic Operators (+, -, *, /, //, %, **)\",\n        \"Comparison Operators (==, !=, >, <, >=, <=)\",\n        \"Logical Operators (and, or, not)\",\n        \"Assignment Operators (=, +=, -=, *=, /=)\",\n        \"Operator Precedence\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Input and Output\",\n      \"summary\": \"Learn how to get input from the user and display output in a user-friendly way.\",\n      \"topics\": [\n        \"Getting Input from the User (input())\",\n        \"Formatting Output (print() with f-strings)\",\n        \"Basic User Interaction\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Control Flow: Conditional Statements\",\n      \"summary\": \"This chapter teaches how to control the flow of execution using 'if', 'elif', and 'else' statements.\",\n      \"topics\": [\n        \"if Statements\",\n        \"if-else Statements\",\n        \"if-elif-else Statements\",\n        \"Nested Conditional Statements\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Control Flow: Loops\",\n      \"summary\": \"This chapter introduces 'for' and 'while' loops for repetitive tasks.\",\n      \"topics\": [\n        \"for Loops (iterating through sequences)\",\n        \"while Loops (repetition based on a condition)\",\n        \"break and continue statements\",\n        \"Nested Loops\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Introduction to Lists\",\n      \"summary\": \"This chapter introduces lists, a fundamental data structure in Python.\",\n      \"topics\": [\n        \"Creating Lists\",\n        \"Accessing List Elements (indexing and slicing)\",\n        \"Modifying Lists (append, insert, remove, pop)\",\n        \"List Operations (+, *)\",\n        \"List Comprehension (basic)\"\n      ]\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });

    export const generateNotesAiModel = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {text: "Generate exam material detail content for each chapter, Make sure to include all topic point in the content, make sure to give content in HTML format (Do not add HTMLKL, head, body, title tag) The chapters :\n\n{\n      \"chapter_title\": \"Core OOP Concepts\",\n      \"chapter_summary\": \"This chapter lays the foundation by explaining the fundamental principles of OOP.\",\n      \"topics\": [\n        \"What is Object-Oriented Programming?\",\n        \"Four Pillars of OOP (Abstraction, Encapsulation, Inheritance, Polymorphism)\",\n        \"Classes and Objects: Defining and Instantiating\",\n        \"Attributes (Data) and Methods (Behavior)\",\n        \"Constructors (__init__)\",\n        \"self Keyword\"\n      ]\n    },"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```html\n<h2>Core OOP Concepts</h2>\n<p>This chapter introduces the fundamental principles of Object-Oriented Programming (OOP).</p>\n\n<h3>What is Object-Oriented Programming?</h3>\n<p>Explain the concept of OOP, its advantages over procedural programming, and real-world analogies to illustrate the core ideas.  Include a discussion of objects and classes.</p>\n\n<h3>Four Pillars of OOP (Abstraction, Encapsulation, Inheritance, Polymorphism)</h3>\n<ul>\n  <li><strong>Abstraction:</strong> Define abstraction, explain its purpose in simplifying complex systems, and provide examples of how it is used in OOP.  Discuss the difference between abstract classes and interfaces (if applicable to the language being taught).</li>\n  <li><strong>Encapsulation:</strong> Define encapsulation and its role in data protection and code maintainability. Explain the use of access modifiers (public, private, protected, etc.) to control access to class members.</li>\n  <li><strong>Inheritance:</strong> Explain the concept of inheritance, its benefits (code reuse, extensibility), and different types of inheritance (single, multiple, multilevel, hierarchical – if applicable). Discuss the use of base classes and derived classes.  Include examples of inheritance and the `super()` method (or equivalent).</li>\n  <li><strong>Polymorphism:</strong> Define polymorphism and explain its role in creating flexible and extensible code.  Discuss method overriding and method overloading (if applicable) with clear examples.</li>\n</ul>\n\n<h3>Classes and Objects: Defining and Instantiating</h3>\n<p>Explain the difference between a class (a blueprint) and an object (an instance of a class). Provide examples of defining classes and creating objects using constructors.  Illustrate the process with code examples in the chosen programming language.</p>\n\n<h3>Attributes (Data) and Methods (Behavior)</h3>\n<p>Explain the role of attributes (data members) in representing the state of an object and methods (functions) in defining its behavior.  Provide examples of how to define and use attributes and methods within a class.</p>\n\n<h3>Constructors (<code>__init__</code>)</h3>\n<p>Explain the purpose of constructors (the <code>__init__</code> method in Python, for example), how they are used to initialize object attributes, and demonstrate their usage with code examples.  Discuss the concept of constructor overloading (if applicable).</p>\n\n<h3><code>self</code> Keyword</h3>\n<p>Explain the role of the <code>self</code> keyword (or equivalent in other languages) in binding attributes and methods to an instance of a class.  Illustrate its use with code examples and explain why it's essential in OOP.</p>\n```\n"},
            ],
          },
        ],
      });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  
