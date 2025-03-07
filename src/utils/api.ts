import axios from 'axios';

const pleaseText = 'Please do not send a whole sentence, just the list!';

export const fetchEmailResponse = async (name: string) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that suggests valid email addresses.',
        },
        {
          role: 'user',
          content: `Suggest at least three valid emails to the name ${name}`,
        },
      ],
      max_tokens: 50,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const fetchCountryResponse = async (name: string) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: "You are an assistant that finds out the user's country based on the name.",
        },
        {
          role: 'user',
          content: `Guess some countries that can belong to the user with the name ${name}. Send me only country names, does not matter if there are more! ${pleaseText}`,
        },
      ],
      max_tokens: 50,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const fetchCarBrandResponse = async (country: string) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: "You are an assistant that finds out the user's car brand based on the country.",
        },
        {
          role: 'user',
          content: `Guess some car brands that the user can have with in the country of ${country}. Send me only brand names! ${pleaseText}`,
        },
      ],
      max_tokens: 50,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const fetchCarTypeResponse = async (brand: string, country: string) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: "You are an assistant that finds out the user's car type based on the car brand and the country.",
        },
        {
          role: 'user',
          content: `Guess some car type of ${brand} that the user can have with in the country of ${country}. Send me only type names! ${pleaseText}`,
        },
      ],
      max_tokens: 50,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const fetchYearsResponse = async (brand: string, type: string, country: string) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You are an assistant that finds out the year of production of user's car based on the car brand, type and the country.",
        },
        {
          role: 'user',
          content: `Guess the production year of the car ${brand} ${type} that the user has in the country of ${country}. Send me only some guesses, but only the years! ${pleaseText}`,
        },
      ],
      max_tokens: 50,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const fetchCostResponse = async (brand: string, type: string, year: string, country: string) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You are an assistant that finds out the insurance cost of user's car based on the car brand, type, production year and the country.",
        },
        {
          role: 'user',
          content: `Guess the production year of the car ${brand} ${type} with the production year of ${year} that the user has in the country of ${country}. What do you think, how much will the full insurance (casco) cost for one year? If you need more information, never mind, just guess an average cost!`,
        },
      ],
      max_tokens: 300,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
