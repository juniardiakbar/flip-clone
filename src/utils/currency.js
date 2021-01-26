export const formatCurrency = (nominal) => {
  if (nominal) {
    const reverse = nominal.toString().split('').reverse().join('');
    let output = reverse.match(/\d{1,3}/g);
    return `Rp${output.join('.').split('').reverse().join('')}`;
  }
  return 'Rp0';
};
