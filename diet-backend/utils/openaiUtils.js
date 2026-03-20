const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const detectFoodFromImage = async (base64Image) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
            {
              type: 'text',
              text: `Analyze this food image and provide the following in JSON format:
{
  "foodName": "name of the food",
  "calories": estimated_calories,
  "protein": estimated_protein_in_grams,
  "carbs": estimated_carbs_in_grams,
  "fat": estimated_fat_in_grams
}

Provide only the JSON object, no additional text.`,
            },
          ],
        },
      ],
      max_tokens: 200,
    });

    const content = response.data.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse food data');
  } catch (error) {
    console.error('Error detecting food from image:', error);
    throw error;
  }
};

const askNutritionAssistant = async (messages) => {
  try {
    const safeMessages = Array.isArray(messages)
      ? messages
          .filter((msg) => msg && typeof msg.content === 'string' && msg.content.trim())
          .map((msg) => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content.trim(),
          }))
      : [];

    const response = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a nutrition-focused assistant for a fitness app. Provide practical guidance about calories, protein, carbs, fats, fiber, sugar, sodium, vitamins and minerals. Mention medical caution when needed. Never provide diagnosis, emergency care instructions, or medication dosing. Encourage consulting a licensed clinician for medical conditions.',
        },
        ...safeMessages,
      ],
      max_tokens: 500,
      temperature: 0.4,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in nutrition assistant chat:', error);
    throw error;
  }
};

module.exports = {
  detectFoodFromImage,
  askNutritionAssistant,
};
