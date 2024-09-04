async function getData() {
    let response;
  try {
   response = await fetch("./data.json");
  } catch (error) {
    console.log("ERROR: ", error);
  }

  if (response?.ok) {
    const data = await response.json();
    data.forEach((element) => {
      console.log(element.timeframes.daily.current);
    });
  } else {
    console.log(`HTTP Response Code: ${response?.status}`);
  }
}
getData();
