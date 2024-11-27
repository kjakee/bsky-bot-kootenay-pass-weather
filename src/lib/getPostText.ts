import axios from 'axios';
import OpenAI from "openai";

const openai = new OpenAI();

export default async function getPostText() {
  
    const response = await axios.get('https://www.drivebc.ca/api/weather/observations/39121');
    const users = response.data;


 const stream = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "write a tweet from " + response.data + " and remove text DriveBC Alert. Include only hashtags #KootenayPass #KootenayPassWeather #KootenayPassRoadCondition #DriveKootenayPass"}],
  stream: true,
});
var tweetString = '';
for await (const chunk of stream) {
  tweetString = tweetString + (chunk.choices[0]?.delta?.content || "");
}
  // Generate the text for your post here. You can return a string or a promise that resolves to a string
  return tweetString;
}