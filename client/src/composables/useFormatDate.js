import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function useFormatDate() {
  const formatDate = (date) => formatDistanceToNow(new Date(date));

  return {
    formatDate,
  };
}
