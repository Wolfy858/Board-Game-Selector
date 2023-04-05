const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const condenseDescription = async (description) => {
  const response = await openai.createChatCompletion({
    "model": "gpt-3.5-turbo",
    "messages":[
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": `The following is a description of a board game. Your task is to summarize the description in 250 characters or less. Description: ${description}`},
      ]
    ,
    "temperature": 0,
    "max_tokens": 500
  })
  return response.data.choices[0].message.content
}

export default condenseDescription;
