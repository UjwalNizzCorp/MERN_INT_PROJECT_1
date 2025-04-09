function foo() {
  console.log(this);
}

const bar = () => {
  console.log(this);
};

bar.bind({ name: "bar" })();

console.log(bar);

function fooooo() {
  let hai = 1;
  const barr = () => {
    console.log(this);
  };
  barr();
}

foo();
bar();
fooooo();
