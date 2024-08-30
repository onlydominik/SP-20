function f() {
  try {
    alert("start");
    throw new Error("an error");
  } catch (err) {
    // ...
    if ("can't handle the error") {
      throw err;
    }
  }
}

f();
alert("cleanup!");

//FETCH API AND PROMISES LEARNING IN BACKGROUND
