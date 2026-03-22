const { Configuration, OpenAIApi } = require('openai');

if (!process.env.OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY is not set. Chat will use fallback responses only.');
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || 'sk-placeholder',
});

const openai = new OpenAIApi(configuration);

const buildFallbackNutritionReply = (question = '') => {
  const q = question.toLowerCase();

  if (q.includes('protein')) {
    return 'Quick guide: most active adults target about 1.2-1.8 g protein per kg body weight daily. Spread protein across 3-4 meals and include one protein source in each meal.';
  }

  if (q.includes('sodium') || q.includes('salt')) {
    return 'A practical sodium target is usually below 2300 mg/day unless your clinician gives a different goal. Prioritize minimally processed foods and check labels for high-sodium packaged items.';
  }

  if (q.includes('vitamin') || q.includes('mineral')) {
    return 'For vitamins and minerals, prioritize variety: leafy greens, legumes, nuts/seeds, dairy or fortified alternatives, fruits, and whole grains. If you follow a restrictive diet, discuss B12, iron, vitamin D, calcium, and omega-3 coverage with a clinician.';
  }

  if (q.includes('recovery') || q.includes('workout')) {
    return 'For workout recovery, include protein (20-40 g) plus carbs after training, hydrate well, and include electrolyte-rich foods if you sweat heavily.';
  }

  return 'Nutrition assistant is temporarily under high demand. General guideline: build meals around lean protein, high-fiber carbs, healthy fats, and vegetables; adjust portions by your goal (fat loss, maintenance, or muscle gain).';
};

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
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Nutrition AI disabled (no API key configured)');
    }

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
      max_tokens: 400,
      temperature: 0.4,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    const status = error?.response?.status;
    const errorMessage = error?.message || 'Unknown error';

    console.error('OpenAI API error (status:', status, '):', errorMessage);

    // For ANY OpenAI failure, return fallback response
    const latestUserMessage =
      Array.isArray(messages) && messages.length
        ? [...messages].reverse().find((msg) => msg?.role === 'user' && typeof msg?.content === 'string')
        : null;

    return buildFallbackNutritionReply(latestUserMessage?.content || '');
  }
};

module.exports = {
  detectFoodFromImage,
  askNutritionAssistant,
};
