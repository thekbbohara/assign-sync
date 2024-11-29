import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export const generateAssignment = async (API_KEY: string, prompt: string) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);

    const generationConfig = {
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
              },
              required: ["input", "expected"],
            },
          },
          codeTemplate: { type: SchemaType.STRING },
          output: { type: SchemaType.STRING },
        },
        required: [
          "title",
          "description",
          "requirements",
          "examples",
          "instructions",
          "testCases",
          "codeTemplate",
          "output",
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
            { input: "5", expected: "120" },
            { input: "0", expected: "1" },
            { input: "1", expected: "1" },
          ],
          codeTemplate: "function factorial(n) { /* Your code */ }",
          output:
            "The function should return the factorial of the input number.",
        },
      },
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig,
    });

    // const result = await model.generateContent(prompt);
    const prePrompt = "keep the title short";
    const result = await model.generateContent(`${prePrompt}. ${prompt}`);
    // console.log(prompt)
    // console.log("Generated Assignment:", result.response.text());
    // console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error generating assignment:", error);
  }
};
