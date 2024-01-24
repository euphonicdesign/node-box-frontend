function ExpensesTotal({ expenses }) {
  return (
    <>
      <h2>Total</h2>
      <p>
        {expenses.length > 0 &&
          expenses.reduce((acc, curr) => {
            console.log(acc);
            return acc + Number(curr.value);
          }, 0)}
      </p>
    </>
  );
}

export default ExpensesTotal;
