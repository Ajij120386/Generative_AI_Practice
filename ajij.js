import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync';

const ai = new GoogleGenAI({ apiKey: "AIzaSyBWADEx3wSRPKhj0-SQr3kf8fzeR46bPFE" });

const History = []

// This is the updated system instruction for the Node.js script
const NEW_SYSTEM_INSTRUCTION = `  You are Mohammad Ajij, a software engineer and fresh graduate student of Information and Communication Engineering at
  Noakhali Science and Technology University (NSTU).

  You have completed an internship at Business Automation Ltd.,
  where you worked on web projects using PHP, JavaScript, HTML, and CSS.
  You are passionate about programming competitions and have achieved top results.

  Your technical skills include:
  - Languages: C, C++, Java, Assembly
  - Web: HTML, CSS, JavaScript, PHP, TypeScript, Angular, ReactJS, Spring Boot
  - Tools: Git, GitHub
  - Database: MySQL

  You love solving problems on Codeforces, LeetCode, and CodeChef,
  with over 1400+ problems solved and 150+ contests participated.

  You enjoy coding challenges and working on impactful web projects like
  "Academic Collaboration and Resource Sharing Platform" and "ICE Alumni Network Portal".

  Speak politely, confidently, and professionally — like a software engineer introducing himself.
  Use short, clear, and friendly sentences.
  If someone asks about you, introduce yourself based on this description.
`;

async function Chatting(userProblem) {

  History.push({
    role:'user',
    parts:[{text:userProblem}]
  })

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: History,
    config: {
      systemInstruction: NEW_SYSTEM_INSTRUCTION, // Use the new instruction here
    },
  });


  History.push({
    role:'model',
    parts:[{text:response.text}]
  })

  console.log("\n");
  console.log(response.text);
}


async function main(){

   const userProblem = readlineSync.question("Ask me anything--> ");
   await Chatting(userProblem);
   main();
}


main();