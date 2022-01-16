import { QueryFunction, QueryKey } from 'react-query';
import request from '.';

type summaryType = {
  get: {
    queryKey: QueryKey;
    queryFn: any;
  };
};
const summary: summaryType = {
  get: {
    queryKey: 'covidSummary',
    queryFn: () => request.get('/summary'),
  },
};

export default summary;
