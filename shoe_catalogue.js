// Capture necessary elements
const form = document.getElementById('userInput');
const shoeSize = document.querySelector('#sizeSelect');
const shoeColor = document.querySelector('#colorSelect');
const submitButton = document.querySelector('#submitButton');
const userOutput = document.querySelector('#userOutput');
const updateStockButton = document.querySelector('#updateStockButton');
const updateStockSection = document.querySelector('.updateStockSection');
const updateStockFormSection = document.querySelector('.updateStockFormSection');
const closeFormButton = document.querySelector('#closeFormButton');
// Shoes in stock
// var totalStock = [
//         {
//             color : 'blue',
//             price : 350,
//             size : 5,
//             in_stock : 5
//         },
//         {
//             color : 'red',
//             price : 275,
//             size : 10,
//             in_stock : 3
//         },
// ];

//our total stock should be stored in localStorage
//if it is not stored in localStorage, we set a base inventory in localStorage,
//then we set out totalStock to
if (localStorage.getItem('inventory') === null) {
  var totalStock = [
          {
              color : 'blue',
              price : 350,
              size : 5,
              in_stock : 5
          },
          {
              color : 'red',
              price : 275,
              size : 10,
              in_stock : 3
          },
  ];
  console.log("creating new localStorage");
  localStorage.setItem('inventory', JSON.stringify(totalStock));
}
else {
  console.log("retrieving localStorage");
  var totalStock = JSON.parse(localStorage.getItem('inventory'));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  //check if a search result is already being displayed, therefore check
  //if a p element already exists inside of our output div
  var elementExists = userOutput.getElementsByTagName('p');
  var shoeSizeIndex = shoeSize.selectedIndex;
  var selectedShoeSize = Number(shoeSize.options[shoeSizeIndex].value);
  var shoeColorIndex = shoeColor.selectedIndex;
  var selectedShoeColor = shoeColor.options[shoeColorIndex].value;
  var resultMsg = "Out of stock";
  //check inside our stock array starting at first object
  for (var i = 0; i < totalStock.length; i++){
    //check current object
    var currentItem = totalStock[i];
    var itemColor = currentItem.color;
    var itemSize = currentItem.size;
    //if current object's color and size equal input, display price and stock
    if (itemColor === selectedShoeColor && itemSize === selectedShoeSize){
      resultMsg = "Price: R" + currentItem.price.toString() + " Total in stock: " + currentItem.in_stock.toString();
    }
  };
  //if no <p> exists yet, we create and append a <p> element
  if (elementExists.length === 0){
    var outputMsg = document.createElement('p');
    outputMsg.className = "userQueryP";
    outputMsg.textContent = resultMsg;
    userOutput.appendChild(outputMsg);
  }
  //if <p> already exists, then we just edit the text content of the existing <p>
  else {
    var outputMsg = userOutput.getElementsByTagName('p')[0];
    outputMsg.innerHTML = resultMsg;
  };
});

var isActivated = 'inactive';

updateStockButton.addEventListener('click', (event) => {
  if (isActivated === 'inactive'){
    isActivated = 'active';
    //when updateStockButton is clicked
    //1) document.createElement('form');
    //2) document.createElement('input'); for each input
    //3) document.createElement('button'); type 'submit' for client
    // to submit the stock update
    //needs to look like:
    //<form>
    //  <input type="text" name="updateShoeSize">
    //  <input type="text" name="updateShoeColor">
    //  <input type="text" name="updateStockNum">
    //  <input type="text" name="updatePrice">
    //  <button type="submit" name="submitStockUpdate" value="submit">
    //</form>
    var stockUpdateForm = document.createElement('form');
    stockUpdateForm.id = "stockUpdateForm";

    var shoeSizeP = document.createElement('p');
    shoeSizeP.textContent = "Enter shoe size: "
    var updateShoeSize = document.createElement('input');
    updateShoeSize.id = "stockUpdateShoeSize"
    updateShoeSize.type = "text";
    updateShoeSize.name = "shoe size";
    updateShoeSize.className = "updateInput";

    var shoeColorP = document.createElement('p');
    shoeColorP.textContent = "Enter shoe color: "
    var updateShoeColor = document.createElement('input');
    updateShoeColor.id = "stockUpdateShoeColor";
    updateShoeColor.type = "text";
    updateShoeColor.name = "shoe color";
    updateShoeColor.className = "updateInput";

    var shoeStockP = document.createElement('p');
    shoeStockP.textContent = "Enter number of stock to add: "
    var updateShoeStock = document.createElement('input');
    updateShoeStock.id = "stockUpdateShoeStock";
    updateShoeStock.type = "text";
    updateShoeStock.name = "shoe stock";
    updateShoeStock.className = "updateInput";

    var shoePriceP = document.createElement('p');
    shoePriceP.textContent = "Enter the price: ";
    var updateShoePrice = document.createElement('input');
    updateShoePrice.id = "stockUpdateShoePrice";
    updateShoePrice.type = "text";
    updateShoePrice.name = "shoe price";
    updateShoePrice.className = "updateInput";

    var submitStockUpdate = document.createElement('button');
    submitStockUpdate.id = "stockUpdateSubmitButton";
    submitStockUpdate.type = "submit";
    submitStockUpdate.value = "submit";
    submitStockUpdate.textContent = "Update Stock"
    var closeForm = document.createElement('button');
    closeForm.type = "submit";
    closeForm.value = "submit";
    closeForm.textContent = "Close";
    closeForm.id = "closeFormButton";
    //build the stockUpdateForm form element
    stockUpdateForm.appendChild(shoeSizeP);
    stockUpdateForm.appendChild(updateShoeSize);
    stockUpdateForm.appendChild(shoeColorP);
    stockUpdateForm.appendChild(updateShoeColor);
    stockUpdateForm.appendChild(shoeStockP);
    stockUpdateForm.appendChild(updateShoeStock);
    stockUpdateForm.appendChild(shoePriceP);
    stockUpdateForm.appendChild(updateShoePrice);
    stockUpdateForm.appendChild(document.createElement('br'));
    stockUpdateForm.appendChild(submitStockUpdate);
    //append the form to the updateStockSection div
    updateStockFormSection.appendChild(stockUpdateForm);
    //append close button to the updateStockSection div
    //stockUpdateForm.appendChild(closeForm);
  };
});
// function translateCurrent(currentIteration) {
//   switch (currentIteration) {
//     case 0:
//       return "shoe size"
//     case 1:
//       return "shoe color"
//     case 2:
//       return "shoe price"
//     case 3:
//       return "shoe stock"
//   };
// };
  //function to check if any input fields are not filled in
  // isFieldEmptry returns false if all input fields have been properly filled
  // in, and returns true when a field is empty
 function isFieldEmpty(listOfTextInputElements, outputElement){
   for (var i = 0; i < listOfTextInputElements.length; i++){
     var currentElement = listOfTextInputElements[i];
     var currentTextInput = currentElement.value;
     if(currentTextInput === ""){
       //outputElement.innerHTML = "Please input valid " + currentElement.getAttribute(name);
       outputElement.innerHTML = "Please input valid " + currentElement.name  ;
       return true;
     }
   }
   return false;
 };

//add eventListener to stockUpdateForm to select related elements
//first select the form element

//add submit type event listener
updateStockSection.addEventListener('submit', (e) => {
  //if the close button is clicked, the update Stock Section should close
  console.log(e.target.id);
  if (e.target.id === "closeFormButton"){
    console.log("the close button has been pressed");
    updateStockSection.parentNode.removeChild('stockUpdateForm');
  }
  if (e.target.id === "stockUpdateForm"){
    e.preventDefault();
    const stockUpdateForm = document.querySelector('#stockUpdateForm');
    var stockUpdateOutput = document.querySelector('#stockUpdateOutput');
    //when client submits the form, check for any empty fields
    const allInput = stockUpdateForm.querySelectorAll('input');
    // for(var i = 0; i < allInput.length; i++){
    //   var currentElement = allInput[i];
    //   if(currentElement === ""){
    //     stockUpdateOutput.innerHTML = "Please input valid " + currentElement.name;
    //   }
    // }
    var checkEmptyFields = isFieldEmpty(allInput, stockUpdateOutput);
    if(checkEmptyFields === false){
      const inputShoeSize = Number(document.querySelector('#stockUpdateShoeSize').value);
      const inputShoeColor = document.querySelector('#stockUpdateShoeColor').value.toLowerCase();
      const inputShoeStock = Number(document.querySelector('#stockUpdateShoeStock').value);
      const inputShoePrice = Number(document.querySelector('#stockUpdateShoePrice').value);
      //reset input fields to empty strings after capturing current inputs
      document.querySelector('#stockUpdateShoeSize').value = "";
      document.querySelector('#stockUpdateShoeColor').value = "";
      document.querySelector('#stockUpdateShoeStock').value = "";
      document.querySelector('#stockUpdateShoePrice').value = "";
      //initalise var that holds whether input as been found in stock. Since it hasn't
      //been found yet, it is false
      var itemFoundInStock = false;
      //initialise var to display total in_stock of input item
      var totalInStock = 0;
      //loop through totalStock array
      for(var i = 0; i < totalStock.length; i++){
        //look in current object
        var currentObj = totalStock[i];
        var currentSize = currentObj.size;
        var currentColor = currentObj.color;
        //if current object contains the same shoe size and color as input, we
        //can update the current object with the input information
        if(currentSize === inputShoeSize && currentColor === inputShoeColor){
          console.log("currentSize and currentColor are the same as the inputs");
          currentObj.price = inputShoePrice;
          currentObj.in_stock += inputShoeStock;
          totalInStock = currentObj.in_stock;
          // change itemFoundInStock to true to indicate that we do not need
          // to add a new object
          itemFoundInStock = true;
        };
      }
      //if the input item details do not match any items in client's stock, create
      //a new item as an object
      if(itemFoundInStock === false){
        var updateObj = {};
        updateObj.color = inputShoeColor;
        updateObj.size = inputShoeSize;
        updateObj.price = inputShoePrice;
        updateObj.in_stock = inputShoeStock;
        //append the new item object to totalStock array
        totalStock.push(updateObj);
        totalInStock = updateObj.in_stock;
      }
      stockUpdateOutput.innerHTML = "Stock has been updated. You have " + totalInStock + " size " + inputShoeSize + " " + inputShoeColor + " in stock.";
      localStorage.setItem('inventory', JSON.stringify(totalStock));
    };
  };
});

closeFormButton.addEventListener('click', (e) => {
  if (isActivated === 'active'){
    isActivated = 'inactive';
    var elementToRemove = document.getElementById('stockUpdateForm');
    updateStockFormSection.parentNode.removeChild(elementToRemove);
  };
});
