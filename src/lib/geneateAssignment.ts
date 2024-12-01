import {
  GenerationConfig,
  GoogleGenerativeAI,
  SchemaType,
} from "@google/generative-ai";

export const generateAssignment = async (API_KEY: string, prompt: string) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);

    const generationConfig: GenerationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8189,
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          requirements: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
          examples: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
          instructions: { type: SchemaType.STRING },
          testCases: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                input: { type: SchemaType.STRING },
                expected: { type: SchemaType.STRING },
                id: { type: SchemaType.NUMBER },
              },
              required: ["input", "expected"],
            },
          },
          codeTemplate: { type: SchemaType.STRING },
          solution: { type: SchemaType.STRING },
        },
        required: [
          "title",
          "description",
          "requirements",
          "examples",
          "instructions",
          "testCases",
          "codeTemplate",
          "solution",
        ],
        example: {
          title: "Calculate Factorial",
          description:
            "Write a function to calculate the factorial of a number.",
          requirements: [
            "The function must handle positive integers.",
            "The function should return 1 for 0 as input.",
            "Handle edge cases like negative numbers gracefully.",
          ],
          examples: ["Input: 5, Output: 120", "Input: 0, Output: 1"],
          instructions:
            "Create a function `factorial` that takes an integer and returns its factorial. The factorial of n is the product of all positive integers less than or equal to n.",
          testCases: [
            { input: "5", expected: "120", id: 1 },
            { input: "0", expected: "1", id: 2 },
            { input: "1", expected: "1", id: 3 },
          ],
          codeTemplate:
            "function test(){\n  //student code here\n\n};\nreturn test;",
          solution:
            "The function should correctly compute the test of test cases and pass.",
        },
      },
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig,
    });

    // const prePrompt = "Keep the title short";
    const prePrompt =
      "Provide a detailed and structured coding assignment with the following: a concise title, clear description, specific requirements, examples, step-by-step instructions, test cases with unique id, a starter code template/function for student to use as a starting point, and a complete solution. Which should be json parsable.";
    const result = await model.generateContent(`${prePrompt}. ${prompt}`);

    return result.response.text();
  } catch (error) {
    console.error("Error generating assignment:", error);
  }
};
