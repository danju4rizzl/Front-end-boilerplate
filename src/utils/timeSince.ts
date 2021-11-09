import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';

const timeSince = (date?: Date | number) => {
  if (!date) {
    return null;
  }

  if (differenceInDays(new Date(), new Date(date)) >= 5) {
    const dateFormat =
      new Date().getFullYear() === new Date(date).getFullYear()
        ? 'd MMM'
        : 'd MMM yy';
    return format(new Date(date), dateFormat);
  }

  const splitDate = formatDistanceStrict(new Date(date), new Date()).split(' ');
  const stringDate = `${splitDate[0]}${splitDate[1][0]}`;
  if (stringDate === '0s') {
    return 'now';
  }
  return stringDate;
};

export default timeSince;
