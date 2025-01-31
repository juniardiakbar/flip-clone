const MONTH = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const parseDate = (date) => {
  const parsedDate = String(date).split(' ');
  const days = String(parsedDate[0]).split('-');
  return [parseInt(days[0]), parseInt(days[1]) - 1, parseInt(days[2])];
};

export const formatDate = (date) => {
  const parsedDate = parseDate(date);

  return `${parsedDate[2]} ${MONTH[parsedDate[1]]} ${parsedDate[0]}`;
};

export const isDateBefore = (dateBefore, dateAfter) => {
  const newDateBefore = new Date(...parseDate(dateBefore));
  const newDateAfter = new Date(...parseDate(dateAfter));

  return newDateBefore >= newDateAfter;
};
