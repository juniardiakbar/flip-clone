import {isDateBefore} from './date';

const quickSort = (originalList, option) => {
  console.log(originalList);
  if (originalList.length <= 1) {
    return originalList;
  } else {
    const leftArr = [];
    const rightArr = [];
    const newArr = [];
    const pivot = originalList.pop();
    const length = originalList.length;
    for (let i = 0; i < length; i++) {
      switch (option) {
        case 1:
          if (originalList[i].beneficiary_name <= pivot.beneficiary_name) {
            leftArr.push(originalList[i]);
          } else {
            rightArr.push(originalList[i]);
          }
          break;
        case 2:
          if (originalList[i].beneficiary_name >= pivot.beneficiary_name) {
            leftArr.push(originalList[i]);
          } else {
            rightArr.push(originalList[i]);
          }
          break;
        case 3:
          if (isDateBefore(originalList[i].created_at, pivot.created_at)) {
            leftArr.push(originalList[i]);
          } else {
            rightArr.push(originalList[i]);
          }
          break;
        case 4:
          if (!isDateBefore(originalList[i].created_at, pivot.created_at)) {
            leftArr.push(originalList[i]);
          } else {
            rightArr.push(originalList[i]);
          }
          break;
        default:
      }
    }
    return newArr.concat(
      quickSort(leftArr, option),
      pivot,
      quickSort(rightArr, option),
    );
  }
};

const filterSearchList = (originalList, search) => {
  const searchList = [];
  originalList.map((element) => {
    if (
      element.beneficiary_name.match(new RegExp('\\b' + search + '.*', 'i')) ||
      element.beneficiary_bank.match(new RegExp('\\b' + search + '.*', 'i')) ||
      element.sender_bank.match(new RegExp('\\b' + search + '.*', 'i')) ||
      element.amount.toString().match(new RegExp('\\b' + search + '.*', 'i'))
    ) {
      searchList.push(element);
    }
  });
  return searchList;
};

/*
 * sort params is int [0,1,2,3,4]
 * 0 => Default
 * 1 => Name A-Z (ASC)
 * 2 => Name Z-A (DESC)
 * 3 => Date (ASC)
 * 4 => Date (DESC)
 */
export const sortAndSearchList = (list, search, sort) => {
  let newList = [];

  Object.keys(list).map((key) => {
    newList.push(list[key]);
  });

  if (search && search !== '') {
    newList = [...filterSearchList(newList, search)];
  }

  if (sort !== 0) {
    const sortList = quickSort(newList, sort);
    console.log(sortList);
    newList = [...sortList];
  }

  return newList;
};
