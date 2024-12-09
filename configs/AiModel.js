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

  const generationConfig2 = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/html",
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
      generationConfig2,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate structured and detailed study material for the provided chapter in valid HTML format (without <html>, <head>, <title>, or <body> tags). Each chapter should include:\n\nA brief introduction to the topic.\n\nClear headings and subheadings for organization.\n\nDetailed explanations with examples and code blocks (if applicable).\n\nKey takeaways or summary at the end.\n\nProperly formatted code blocks for easy readability.\n\nEnsure the content is clean, readable, and visually engaging, similar to professional documentation sites like MDN or React Docs.\n\nThe chapter details are: \"chapters\": [\n{\n\"chapter_title\": \"Setting up the Environment\",\n\"chapter_summary\": \"This chapter covers setting up your development environment and creating your first React Native project.\",\n\"topics\": [\n\"Installing Node.js and npm\",\n\"Installing Expo CLI\",\n\"Creating a new React Native project using Expo\",\n\"Running the project on an emulator or device\",\n\"Understanding the project structure\"\n]\n},\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```html\n<h1>Setting up the Environment</h1>\n\n<p>This chapter guides you through setting up your development environment and creating your first React Native project.  We'll cover the necessary tools and the process of building a basic application.</p>\n\n<h2>Installing Node.js and npm</h2>\n\n<p>React Native relies on Node.js and npm (Node Package Manager) for managing dependencies and building your application.  Ensure you have compatible versions installed.</p>\n\n<ol>\n  <li>Visit the official Node.js website (<a href=\"https://nodejs.org/\" target=\"_blank\">https://nodejs.org/</a>).</li>\n  <li>Download the installer for your operating system (Windows, macOS, or Linux).</li>\n  <li>Run the installer and follow the on-screen instructions.</li>\n  <li>Verify the installation by opening your terminal and typing <code>node -v</code> and <code>npm -v</code>. You should see the version numbers printed.</li>\n</ol>\n\n<p><strong>Note:</strong>  It's recommended to use a recent, Long Term Support (LTS) version of Node.js.</p>\n\n\n<h2>Installing Expo CLI</h2>\n\n<p>Expo CLI simplifies the development process by providing tools for creating, building, and running React Native projects. We'll use it to create our first project.</p>\n\n<p>Open your terminal and run the following command:</p>\n\n<pre><code class=\"language-bash\">npm install -g expo-cli\n</code></pre>\n\n<p>This installs the Expo CLI globally.  You might need administrator privileges (using <code>sudo</code> on Linux/macOS) to install globally.</p>\n\n\n<h2>Creating a new React Native project using Expo</h2>\n\n<p>Let's create a new project named \"MyFirstReactNativeApp\".  Navigate to your desired project directory in the terminal and run:</p>\n\n<pre><code class=\"language-bash\">expo init MyFirstReactNativeApp\n</code></pre>\n\n<p>Choose the \"blank (TypeScript)\" template or \"blank\" template if you prefer JavaScript.  Expo will download the necessary files and set up the project structure.</p>\n\n\n<h2>Running the project on an emulator or device</h2>\n\n<p>After the project is created, navigate to the project directory:</p>\n\n<pre><code class=\"language-bash\">cd MyFirstReactNativeApp\n</code></pre>\n\n<p>Then, start the development server:</p>\n\n<pre><code class=\"language-bash\">expo start\n</code></pre>\n\n<p>This will open a development server in your browser and give you options to run the app on an emulator (like Android Studio's emulator or iOS Simulator) or a physical device connected via USB.  Follow the on-screen instructions to choose your preferred method.</p>\n\n\n<h2>Understanding the project structure</h2>\n\n<p>Let's briefly examine the key files and folders in your newly created React Native project:</p>\n\n<ul>\n  <li><code>App.js</code> (or <code>App.tsx</code> for TypeScript): The main application component. This is where your app's logic and UI reside.</li>\n  <li><code>package.json</code>:  Lists project dependencies and scripts.</li>\n  <li><code>node_modules</code>: Contains all installed project dependencies.</li>\n  <li><code>assets</code>:  A folder for storing images, fonts, and other assets.</li>\n</ul>\n\n<p>Exploring these files will help you understand the basic structure of a React Native project.</p>\n\n\n<h2>Key Takeaways</h2>\n\n<ul>\n  <li>Successfully installed Node.js, npm, and Expo CLI.</li>\n  <li>Created a new React Native project using Expo.</li>\n  <li>Ran the project on an emulator or device.</li>\n  <li>Familiarized yourself with the basic project structure.</li>\n</ul>\n\n<p>Now you are ready to start building your first React Native application!</p>\n```\n"},
          ],
        },
      ],
    });

    export const generatStudyTypeContentAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate the flashcard on topic : Flutter Fundamentals,User Interface (UI) Development,Basic App Navigation in JSON format with front back content, Maximum 15\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"front\": \"What is a Widget in Flutter?\",\n    \"back\": \"A Widget is the fundamental building block of Flutter's UI. Everything you see on the screen is a widget, including layout structures, text, images, and buttons.\"\n  },\n  {\n    \"front\": \"What are the two main types of widgets?\",\n    \"back\": \"StatelessWidget (immutable) and StatefulWidget (mutable).\"\n  },\n  {\n    \"front\": \"Explain the difference between StatelessWidget and StatefulWidget.\",\n    \"back\": \"StatelessWidget doesn't change its state over time, while StatefulWidget can update its UI based on changes in its state.\"\n  },\n  {\n    \"front\": \"Name some common layout widgets.\",\n    \"back\": \"Row, Column, Stack, Container, SizedBox, Expanded.\"\n  },\n  {\n    \"front\": \"What is a Scaffold widget used for?\",\n    \"back\": \"It provides a basic visual layout structure for your app, typically including an AppBar, body, and floatingActionButton.\"\n  },\n  {\n    \"front\": \"What is the purpose of a Container widget?\",\n    \"back\": \"It's a powerful widget that allows you to control the size, padding, margin, decoration, and other aspects of a child widget.\"\n  },\n  {\n    \"front\": \"How do you navigate between screens in Flutter?\",\n    \"back\": \"Using Navigator.push() to push a new route onto the navigation stack and Navigator.pop() to remove a route.\"\n  },\n  {\n    \"front\": \"What is a Route in Flutter navigation?\",\n    \"back\": \"A route represents a single screen or page in your application's navigation stack.\"\n  },\n  {\n    \"front\": \"What is Material Design in Flutter?\",\n    \"back\": \"A design language developed by Google that provides a consistent and visually appealing UI framework. Flutter incorporates it extensively.\"\n  },\n  {\n    \"front\": \"What is Cupertino in Flutter?\",\n    \"back\": \"A set of widgets that mimic the design language of Apple's iOS, providing an iOS-like look and feel.\"\n  },\n  {\n    \"front\": \"How do you pass data between screens during navigation?\",\n    \"back\": \"Using arguments with Navigator.push() and extracting them in the new screen's constructor or initState().\"\n  },\n  {\n    \"front\": \"What is the purpose of `BuildContext`?\",\n    \"back\": \"It provides information about the location of a widget in the widget tree, allowing access to the parent, siblings, and other aspects of the widget's environment.\"\n  },\n  {\n    \"front\": \"Explain the concept of a Key in Flutter.\",\n    \"back\": \"Keys are used to identify widgets uniquely. They are crucial when working with dynamic lists or when the widget tree changes over time.\"\n  },\n  {\n    \"front\": \"What is the difference between `setState()` and `build()`?\",\n    \"back\": \"`setState()` triggers a rebuild of the widget, while `build()` is the method that constructs the widget's UI based on its current state.\"\n  },\n  {\n    \"front\": \"Name a widget used to display images in Flutter.\",\n    \"back\": \"Image.asset() or Image.network()\"\n  }\n]\n```\n"},
          ],
        },
      ],
    });
  
    export const generateQuizAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Quiz on topic : Flutter Fundamentals, User Interface (UI) Development, Basic App Navigation with Question and Options along with correct answer in JSON format, (Max 10)\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"quizTitle\": \"Flutter Fundamentals & UI Quiz\",\n  \"questions\": [\n    {\n      \"question\": \"What is the primary language used for building Flutter applications?\",\n      \"options\": [\"Java\", \"Kotlin\", \"Dart\", \"Swift\"],\n      \"answer\": \"Dart\"\n    },\n    {\n      \"question\": \"Which widget is the root of most Flutter UI hierarchies?\",\n      \"options\": [\"Container\", \"Row\", \"Column\", \"MaterialApp\"],\n      \"answer\": \"MaterialApp\"\n    },\n    {\n      \"question\": \"What is the purpose of a StatefulWidget in Flutter?\",\n      \"options\": [\"To create static UI elements\", \"To create UI elements that change over time\", \"To manage application state globally\", \"To handle user input\"],\n      \"answer\": \"To create UI elements that change over time\"\n    },\n    {\n      \"question\": \"Which widget is used to arrange children horizontally?\",\n      \"options\": [\"Column\", \"Row\", \"Stack\", \"Container\"],\n      \"answer\": \"Row\"\n    },\n    {\n      \"question\": \"How do you navigate to a new route in Flutter?\",\n      \"options\": [\"`Navigator.pushNamed()`\", \"`Navigator.pop()`\", \"`setState()`\", \"`runApp()`\"],\n      \"answer\": \"`Navigator.pushNamed()`\"\n    },\n    {\n      \"question\": \"What widget is used to display text in Flutter?\",\n      \"options\": [\"`Text()`\", \"`Image()`\", \"`Icon()`\", \"`Button()`\"],\n      \"answer\": \"`Text()`\"\n    },\n    {\n      \"question\": \"What does the `BuildContext` provide in Flutter?\",\n      \"options\": [\"App's theme data\", \"Access to the widget tree\", \"User's location\", \"Network connectivity status\"],\n      \"answer\": \"Access to the widget tree\"\n    },\n    {\n      \"question\": \"What is the purpose of a `StatelessWidget` in Flutter?\",\n      \"options\": [\"To manage app state\", \"To create UI that doesn't change\", \"To handle user input\", \"To perform background tasks\"],\n      \"answer\": \"To create UI that doesn't change\"\n    },\n     {\n      \"question\": \"Which widget is best suited for displaying a list of items that can be scrolled?\",\n      \"options\": [\"`Row`\", \"`Column`\", \"`ListView`\", \"`Stack`\"],\n      \"answer\": \"`ListView`\"\n    },\n    {\n      \"question\": \"Which method is used to remove the current route from the navigation stack?\",\n      \"options\": [\"`Navigator.push()`\", \"`Navigator.pushNamed()`\", \"`Navigator.pop()`\", \"`Navigator.removeRoute()`\"],\n      \"answer\": \"`Navigator.pop()`\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  
