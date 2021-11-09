import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const formatDate = (date) => formatDistanceToNow(new Date(date));

export default {
  formatDate,
};
