export interface User {
  id?: string; // Question Mark Signifies Optionality
  name: string;
  datetime: DateTime;
  greeting: Greeting;
  newsfeed: NewsFeed;
  weather: Weather;
}

interface DateTime {
  display: boolean;
  top: number;
  left: number;
  clockFormat: boolean;
}

interface Greeting {
  display: boolean;
  top: number;
  left: number;
}

interface NewsFeed {
  display: boolean;
  top: number;
  left: number;
  sources: Array<number>;
  type: boolean;
}

interface Weather {
  display: boolean;
  top: number;
  left: number;
  city: string;
  country: string;
  unit: string;
}

