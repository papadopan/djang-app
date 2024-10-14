export type InspireData = {
  title: string;
  abstract: string;
  publication_date: string;
};

export type ApiDataResponse = {
  summary: string;
  results: InspireData[];
};
