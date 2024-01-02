function findAccountById(accounts, id) {
  if (!accounts) return null;

  let personAccount;

  accounts.find((account) => {
    if (account.id === id) {
      personAccount = account;
    }
  });

  return personAccount;
}

function sortAccountsByLastName(accounts) {
  if (!accounts) return null;

  accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1,
  );

  return accounts;
}

function getAccountFullNames(accounts) {
  if (!accounts) return null;

  let fullNames = [];

  accounts.map((account) => {
    fullNames.push(account.name.first + " " + account.name.last);
  });

  return fullNames;
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    const count = book.borrows.reduce((borrowAcc, borrow) => {
      return borrow.id === account.id ? borrowAcc + 1 : borrowAcc;
    }, 0);

    return acc + count;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter((book) => {
      const recent = book.borrows[0];
      return !recent.returned && recent.id === account.id;
    })
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return { ...book, author };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getAccountFullNames,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
