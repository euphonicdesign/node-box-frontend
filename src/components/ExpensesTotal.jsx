function ExpensesTotal({ expenses }) {
  return (
    <>
      <h2>
        Total:{" "}
        {expenses.length > 0 &&
          expenses.reduce((acc, curr) => {
            return acc + Number(curr.value);
          }, 0)}
      </h2>
    </>
  );
}

export default ExpensesTotal;
