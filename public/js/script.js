function toggleDisplay() {
  // document.getElementsByClassName("signup-container")[0].style.display =
  //   "flex";
  // document.getElementsByClassName(
  //   "results-div"
  // )[0].style.display = "none";
  window.location = "";
}

function muscleCalculator(sex, age, heightInFt, heightInInch, weight) {
  document.getElementsByClassName("signup-container")[0].style.display = "none";
  document.getElementsByClassName("results-div")[0].style.display = "block";

  const weightInKilograms = parseFloat(weight) / 2.2;
  const convertedAge = convertAge(parseFloat(age), weightInKilograms);
  const convertedHeight = convertHeight(
    parseFloat(heightInFt),
    parseFloat(heightInInch),
    convertedAge
  );
  let { protein, fat, carb } = convertNutrients(sex, convertedHeight);
  let { conProtein, conFat, conCarb } = convertCalories(protein, fat, carb);
  let totalCalories = conProtein + conFat + conCarb;
  let { proteinPercent, fatPercent, carbPercent } = caloriePercent(
    conProtein,
    conFat,
    conCarb,
    totalCalories
  );
  // console.log(protein, fat, carb, "sadasdasddas");
  step8(protein, fat, carb);

    drawChart(
      parseFloat(proteinPercent.toFixed(2)),
      parseFloat(fatPercent.toFixed(2)),
      parseFloat(carbPercent.toFixed(2))
    );

  // const ctx = document.getElementById("myChart");
  // new Chart(ctx, {
  //   type: "doughnut",
  //   data: {
  //     labels: ["Protein", "Fat", "Carb"],
  //     datasets: [
  //       {
  //         label: "% of Daily Calories",
  //         data: [
  //           proteinPercent.toFixed(2),
  //           fatPercent.toFixed(2),
  //           carbPercent.toFixed(2),
  //         ],
  //         backgroundColor: [
  //           "rgb(0, 0, 255)",
  //           "rgb(255, 0, 0)",
  //           "rgb(0, 0, 0)",
  //         ],
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         position: "top",
  //         display: true,
  //       },
  //       title: {
  //         display: true,
  //         text: "%  Percentage of daily calories",
  //       },
  //    },
  //   },
  // });
  // let result = `Age: ${age}
  // 					Sex:  ${sex}
  //       Height: ${heightInFt}' ${heightInInch}''
  //       Weight: ${weight}
  //       total daily calories: ${totalCalories}
  //       Total daily grams of each macro:
  //       Protein: ${protein}
  //       Fat: ${fat}
  //       Carb:  ${carb}
  //       Total daily calories for each macros
  //       Protein: ${conProtein}
  //       FAT: ${conFat}
  //       CARB: ${conCarb}`;

  document.getElementById("sexVal").innerHTML = `${sex}`;
  document.getElementById("ageVal").innerHTML = `${age} yrs`;
  document.getElementById(
    "heightVal"
  ).innerHTML = `${heightInFt}' ${heightInInch}"`;
  document.getElementById("weightVal").innerHTML = `${weight} lbs`;
  document.getElementById("proteinCal").innerHTML = `${protein.toFixed(0)}gm`;
  document.getElementById("fatCal").innerHTML = `${fat.toFixed(0)}gm`;
  document.getElementById("carbCal").innerHTML = `${carb.toFixed(0)}gm`;
  document.getElementById("totalCal").innerHTML = `${totalCalories.toFixed(0)}`;
  document.getElementById("fatC").innerHTML = `${conFat.toFixed(0)}`;
  document.getElementById("carbC").innerHTML = `${conCarb.toFixed(0)}`;
  document.getElementById("proteinC").innerHTML = `${conProtein.toFixed(0)}`;

  //for mail
  document.getElementById('mce-HEIGHT').value = `${heightInFt} ${heightInInch}`;
  document.getElementById('mce-DCFAT').value = `${conFat.toFixed(0)}`;
  document.getElementById('mce-DCCARBS').value = `${conCarb.toFixed(0)}`;
  document.getElementById('mce-DCPROTEIN').value = `${conProtein.toFixed(0)}`;
  document.getElementById('mce-CALORIES').value = `${totalCalories.toFixed(0)}`;
  document.getElementById('mce-CARBS').value = `${carb.toFixed(0)}`;
  document.getElementById('mce-FAT').value = `${fat.toFixed(0)}`;
  document.getElementById('mce-PROTEIN').value = `${protein.toFixed(0)}`;
  document.getElementById('mce-WEIGHT').value = `${weight}`;
  document.getElementById('mce-GENDER').value = `${sex}`;
  document.getElementById('mce-AGE').value = `${age}`;
  //end for mail
}

function convertAge(age, weightInKilograms) {
  let conAge;
  switch (true) {
    case age > 44 && age < 51:
      conAge = weightInKilograms * 1;
      break;
    case age < 45:
      conAge = weightInKilograms * (((45 - age) / 5) * 0.015 + 1);
      break;
    case age > 50:
      conAge = weightInKilograms * (1 - ((age - 50) / 5) * 0.015);
  }

  return conAge;
}

function convertHeight(hf, hi, factor) {
  let conHeight;
  switch (true) {
    case hf == 5 && hi == 10:
      conHeight = factor * 1;
      break;
    case (hf <= 5 && hi < 10) || hf < 5:
      conHeight = factor * (1 - (70 - (hf * 12 + hi)) * 0.009);
      break;
    case (hf >= 5 && hi > 10) || hf > 5:
      conHeight = factor * ((hf * 12 + hi - 70) * 0.009 + 1);
      break;
  }

  return conHeight;
}

function convertNutrients(gender, factor) {
  let protein, fat, carb;
  if (gender.toLowerCase() == "male") {
    protein = factor * 2.15;
    fat = factor * 1.11;
    carb = factor * 3;
  } else if (gender.toLowerCase() == "female") {
    protein = factor * 2;
    fat = factor * 1.05;
    carb = factor * 3;
  }
  return {
    protein,
    fat,
    carb,
  };
}

function convertCalories(protein, fat, carb) {
  const conProtein = protein * 4;
  const conFat = fat * 9;
  const conCarb = carb * 4;

  return {
    conProtein,
    conFat,
    conCarb,
  };
}

function caloriePercent(protein, fat, carb, total) {
  const proteinPercent = (protein * 100) / total;
  const fatPercent = (fat * 100) / total;
  const carbPercent = (carb * 100) / total;
  return {
    proteinPercent,
    fatPercent,
    carbPercent,
  };
}

function step8(protein, fat, carb) {
  let { mp1, mp2, mp3, mp4, mp5 } = calStep8(
    23.75,
    17.5,
    17.5,
    17.5,
    23.75,
    protein,
    "protein"
  );
  let { mf1, mf2, mf3, mf4, mf5 } = calStep8(28, 25, 10, 10, 27, fat, "fat");
  let { mc1, mc2, mc3, mc4, mc5 } = calStep8(17, 17, 25, 31, 10, carb, "carb");

  let data = new google.visualization.DataTable();
  data.addColumn("string", "Meal");
  data.addColumn("number", "Protein");
  data.addColumn({ type: "string", role: "annotation" });
  data.addColumn("number", "Fat");
  data.addColumn({ type: "string", role: "annotation" });
  data.addColumn("number", "Carb");
  data.addColumn({ type: "string", role: "annotation" });

  data.addRows([
    [
      { f: "Breakfast" },
      parseFloat(mp1.toFixed(2)),
      mp1.toFixed(1),
      parseFloat(mf1.toFixed(2)),
      mf1.toFixed(1),
      parseFloat(mc1.toFixed(2)),
      mc1.toFixed(1),
    ],
    [
      { v: "AM Snack", f: "AM Snack" },
      parseFloat(mp2.toFixed(2)),
      mp2.toFixed(1),
      parseFloat(mf2.toFixed(2)),
      mf2.toFixed(1),
      parseFloat(mc2.toFixed(2)),
      mc2.toFixed(1),
    ],
    [
      { v: "Pre-PT Lunch", f: "Pre-PT Lunch" },
      parseFloat(mp3.toFixed(2)),
      mp3.toFixed(1),
      parseFloat(mf3.toFixed(2)),
      mf3.toFixed(1),
      parseFloat(mc3.toFixed(2)),
      mc3.toFixed(1),
    ],
    [{ v: "PT/Excercise", f: "PT/Excercise" }, 0, "", 0, "", 0, ""],
    [
      { v: "Post-PT Dinner", f: "Post-PT Dinner" },
      parseFloat(mp4.toFixed(2)),
      mp4.toFixed(1),
      parseFloat(mf4.toFixed(2)),
      mf4.toFixed(1),
      parseFloat(mc4.toFixed(2)),
      mc4.toFixed(1),
    ],
    [
      { v: "PM Snack", f: "PM Snack" },
      parseFloat(mp5.toFixed(2)),
      mp5.toFixed(1),
      parseFloat(mf5.toFixed(2)),
      mf5.toFixed(1),
      parseFloat(mc5.toFixed(2)),
      mc5.toFixed(1),
    ],
  ]);

  // let options = {
  //   title: "Daily Meal Macro Distribution",
  //   annotations: {
  //     alwaysOutside: true,
  //     textStyle: {
  //       fontSize: 11,
  //     },
  //   },
  //   hAxis: {
  //     title: "",
  //   },
  //   vAxis: {
  //     format: "#.##gm",
  //   },
  //   backgroundColor: "#cbc6c6",
  //   chartArea: {
  //     backgroundColor: "#cbc6c6",
  //   },
  //   colors: ["rgb(0, 0, 255)", "rgb(255, 0, 0)", "rgb(0, 0, 0)"],
  //   legend: { position: "top", textStyle: { color: "black", fontSize: 12 } },
  // };
  // let chart = new google.visualization.ColumnChart(
  //   document.getElementById("barchart")
  // );
  // chart.draw(data, options);
  
}

function calStep8(m1, m2, m3, m4, m5, fact, cal) {
  if (cal == "protein") {
    return {
      mp1: (m1 / 100) * fact,
      mp2: (m2 / 100) * fact,
      mp3: (m3 / 100) * fact,
      mp4: (m4 / 100) * fact,
      mp5: (m5 / 100) * fact,
    };
  } else if (cal == "fat") {
    return {
      mf1: (m1 / 100) * fact,
      mf2: (m2 / 100) * fact,
      mf3: (m3 / 100) * fact,
      mf4: (m4 / 100) * fact,
      mf5: (m5 / 100) * fact,
    };
  } else if (cal == "carb") {
    return {
      mc1: (m1 / 100) * fact,
      mc2: (m2 / 100) * fact,
      mc3: (m3 / 100) * fact,
      mc4: (m4 / 100) * fact,
      mc5: (m5 / 100) * fact,
    };
  }
}

function drawChart(pper, fper, cper) {
  let data = google.visualization.arrayToDataTable([
    ["Nutrition", "Values"],
    ["Protein", pper],
    ["Fat", fper],
    ["Carb", cper],
  ]);

  let options = {
    title: "Macros %",
    titleTextStyle: {
      fontName: '',
      fontSize: 21,
      bold: true,
  },
    backgroundColor: "#e5e5e5",
    colors: ["rgb(0, 0, 255)", "rgb(255, 0, 0)", "rgb(0, 0, 0)"],
    legend: { position: "none" },
    pieHole: 0.3
  };

    let chart = new google.visualization.PieChart(
      document.getElementById("myChart")
    );
    chart.draw(data, options);
}


//for popup
document.querySelector("#open-subscribe-form").addEventListener("click",function(){
  document.querySelector(".subscribe-form").classList.add("active");
});

document.querySelector(".subscribe-form .close-btn").addEventListener("click",function(){
  document.querySelector(".subscribe-form").classList.remove("active");
});
//end for popup
