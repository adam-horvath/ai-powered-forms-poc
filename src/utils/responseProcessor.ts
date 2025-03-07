export interface OpenAIResponse {
  choices: Choice[];
}

export interface Choice {
  message: Message;
}

export interface Message {
  content: string;
}

export const processResponse = (response: OpenAIResponse) => {
  return response.choices?.[0].message.content;
};

export const processEmails = (emails: string) => emails.split(/\s+/).filter((mail: any) => mail.includes('@'));

export const processCommaSeparated = (countries: string) =>
  countries.split(',').map((country: string) => country.trim());

export const processCars = (cars: string) => {
  return cars
    .split(/\d/.test(cars) ? /\d+/ : cars.includes(',') ? ',' : '\n')
    .map((car) => car.replace(',', '').replace('.', '').replace('-', '').trim())
    .filter((car: string) => car.length >= 2);
};

export const processYears = (cars: string) => {
  return cars
    .split(cars.includes(',') ? ',' : '\n')
    .map((car) => car.replace(',', '').replace('.', '').trim())
    .filter((car: string) => car.length >= 2);
};
