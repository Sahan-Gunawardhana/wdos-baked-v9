//getting references from the form
//personal details const
const theForm = document.getElementById("room-reservations");
const fnameInput = document.getElementById("f-name");
const lnameInput = document.getElementById("l-name");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("t-number");

//room booking const
const branchInput = document.getElementById("branch-1");
const adultInput = document.getElementById("adults");
const kidInput = document.getElementById("kids");
const arrivalInput = document.getElementById("a-date");
const depatureInput = document.getElementById("d-date");
const singleBedRoomInput = document.getElementById("s-room");
const doubleBedRoomInput = document.getElementById("d-room");
const tripleBedRoomInput = document.getElementById("t-room");
const extraBedInput = document.getElementById("ex-bed");
const promoCodeInput = document.getElementById("promo");

//adventure booking conts
const advBranchInput = document.getElementById('branch-2');
const advTypeInput = document.getElementById('adventure');
const foreignAdultsInput = document.getElementById('f-adults');
const foreignKidsInput = document.getElementById('f-kids');
const localAdultsInput = document.getElementById('l-adults');
const localKidsInput = document.getElementById('l-kids');
const advDurationInput = document.getElementById('duration');
const guideInput = document.getElementById('guide');

//output field references
const nameCell = document.getElementById("name-cell");
const emailCell = document.getElementById("email-cell");
const contactCell = document.getElementById("contact-cell");
const branchCell = document.getElementById("branch-cell-1");
const adultCell = document.getElementById("adult-cell-1");
const kidCell = document.getElementById("kid-cell-1");
const arrivalCell = document.getElementById('arrival-cell');
const depatureCell = document.getElementById('depature-cell')
const durationCell = document.getElementById('duration-cell');
const singleCell = document.getElementById('single-cell')
const doubleCell = document.getElementById('double-cell');
const tripleCell = document.getElementById('triple-cell');
const promoCell = document.getElementById('promo-cell');
const branchCell_2 = document.getElementById('branch-cell-2');
const advCell = document.getElementById('adv-cell');
const participantCell = document.getElementById('participant-cell');
const avdDurationCell = document.getElementById('adv-duration-cell');
const guideCell = document.getElementById('guide-cell');
const extraRequirementsCell = document.getElementById("extra-requirements-cell");
const loyaltyOutCell = document.getElementById("loyaltyOut");


const extraRequirementRadio = document.getElementsByName("requirement-1");
const extraRequirementCheckboxes = document.getElementsByName("requirement");
const totalCell_1 = document.getElementById('total-1');
const totalCell_2 = document.getElementById('total-2');
const overallTotalCell = document.getElementById('overall');
const overalllBooking = document.getElementById('overall-booking');

//buttons
btnReserve = document.getElementById("reserve");
btnadvReserve = document.getElementById('reserve-adv');
btnLoyalty = document.getElementById('loyalty');
btnFavourite = document.getElementById('add-fav');
btnReturn = document.getElementById('return');

//prices
let singleRoomPrice = 25000;
let doubleRoomPrice = 35000;
let tripleRoomPrice = 40000;
let extraBedPrice = 8000;
let extraMealPrice = 5000;
let guideForAdult = 1000;
let guideForKid = 500;
let fAdultPrice = 10000;
let fKidPrice = 5000;
let lAdultPrice = 5000;
let lKidPrice = 2000;


//adding event listeners
window.addEventListener('load', init);

btnReserve.addEventListener('click', reserveRoom);
btnadvReserve.addEventListener('click', reserveAdv);
btnLoyalty.addEventListener('click', displayLoyalty);
btnFavourite.addEventListener('click',saveToFavorites);
btnReturn.addEventListener('click', returnToTop);

//dynamic event lsiteners 
fnameInput.addEventListener('input', currentSum);
lnameInput.addEventListener('input', currentSum);
emailInput.addEventListener('input', currentSum);
contactInput.addEventListener('input', currentSum);
branchInput.addEventListener('input', currentSum);
adultInput.addEventListener('input', currentSum);
extraBedInput.addEventListener('input', currentSum);
kidInput.addEventListener('input', currentSum);
singleBedRoomInput.addEventListener('input', currentSum);
doubleBedRoomInput.addEventListener('input', currentSum);
tripleBedRoomInput.addEventListener('input', currentSum);
promoCodeInput.addEventListener('input',currentSum);
advBranchInput.addEventListener('input', currentSum);
advTypeInput.addEventListener('change', currentSum);
arrivalInput.addEventListener('change', currentSum);
depatureInput.addEventListener('input', currentSum);
foreignAdultsInput.addEventListener('input', currentSum);
foreignKidsInput.addEventListener('input', currentSum);
localAdultsInput.addEventListener('input', currentSum);
localKidsInput.addEventListener('input', currentSum);
guideInput.addEventListener('change', currentSum);
advDurationInput.addEventListener('change',currentSum);
extraRequirementRadio.forEach(function (radio) {
  radio.addEventListener("change", updateExtraRequirements);
});
extraRequirementCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", updateExtraRequirements);
});





//indial function
function init() {
    bTotal = 0.00;
    advTotal = 0.00;
    oTotal = 0.00;
    updateTableCell(totalCell_1,'LKR ' + bTotal.toFixed(2));
    updateTableCell(totalCell_2,'LKR ' + advTotal.toFixed(2));
    updateTableCell(overallTotalCell,'LKR ' + oTotal.toFixed(2));
}

//function that updates cells for the outputs
function updateTableCell(cell, value) {
    if (cell) {
        
        cell.textContent = value;
    }
}

//function which appends the content to the extra requirement cell
function appendToCell(cell, content) {
    const paragraph = cell.querySelector("p");
    paragraph.innerHTML += content + '<br>';
}

//function that gives extra requiremnts to the cell
function updateExtraRequirements() {

    extraRequirementsCell.innerHTML = "<p></p>";


    extraRequirementRadio.forEach(function (radio) {
        if (radio.checked) {
            appendToCell(extraRequirementsCell, radio.value);

        }
    });


    extraRequirementCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            appendToCell(extraRequirementsCell, checkbox.value);
        }
    });
}

//validates number to check if there are other types or if its a NaN
function validateNumber(value) {
    const num = parseFloat(value);
    return isNaN(num) || num < 0 ? 0 : num;
}

//day duration calculation
function dayDifference(){
    
    let arrival = arrivalInput.value;
    let depature = depatureInput.value;
    let arrivalValue = new Date(arrival);
    let depatureValue = new Date(depature);
    if (depatureValue < arrivalValue) {
        alert("Kindly ensure that the departure date falls on or after the arrival date to proceed with the reservation. Thank you!");
        return;
    }
    let dayDifference = (depatureValue.getTime() - arrivalValue.getTime())/(24 * 60 * 60 * 1000);
    if (isNaN(dayDifference)) {
        dayDifference = 0;
    }
    return dayDifference;
}

//calculating promo code values 
function promoCodeValidation(){
    if(promoCodeInput.value == "Promo123"){
        promoValidation = "Promo code is valid";
    } else{
        promoValidation = "Not a valid code"
    };
    return promoValidation;
}

//displays loyalty to the user
function displayLoyalty() {
    let lyl = parseInt(localStorage.getItem('loyaltyPoints'));
    loyaltyOutCell.style.display = 'block';
    if (lyl > 0) {
       loyaltyOutCell.innerText = `You currently have a total of ${lyl} loyalty points. We appreciate your continued support!`;
    } else {
        loyaltyOutCell.innerText = "At the moment, you haven't accumulated any loyalty points.";
    }
}



//calculate loyalty points 
function calculateLoyalty(){
    let singleRoom = validateNumber(parseInt(singleBedRoomInput.value));
    let doubleRoom = validateNumber(parseInt(doubleBedRoomInput.value));
    let tripleRoom = validateNumber(parseInt(tripleBedRoomInput.value));
    totalRooms = singleRoom + doubleRoom + tripleRoom;

    if(totalRooms > 3){
        loyaltyPoints = totalRooms * 20;
        
    } else {
        loyaltyPoints = 0;
        
    }
    return loyaltyPoints;
}

//function that clears the cells
function clearRoomCells(){
    updateTableCell(nameCell,'');
    updateTableCell(emailCell, '');
    updateTableCell(contactCell, '');
    updateTableCell(adultCell, '');
    updateTableCell(kidCell,'');
    updateTableCell(arrivalCell, '');
    updateTableCell(depatureCell, '');
    updateTableCell(durationCell, '');
    updateTableCell(singleCell, '');
    updateTableCell(doubleCell, '');
    updateTableCell(tripleCell, '');
    updateTableCell(branchCell, '');
    updateTableCell(branchCell_2, '');
    updateTableCell(advCell, '');
    updateTableCell(extraRequirementsCell,'');
    updateTableCell(participantCell, '');
    updateTableCell(avdDurationCell, '');
    updateTableCell(guideCell, '');
    updateTableCell(promoCell, '');
}

//updating the table dynamically 
function currentSum (){

    let fullName = fnameInput.value + ' ' + lnameInput.value;
    let email = emailInput.value;
    let contact = contactInput.value;
    let branchRoom = branchInput.value;
    let noOfAdults = adultInput.value;
    let noOfKids = kidInput.value;
    let arrival = arrivalInput.value;
    let depature = depatureInput.value;
    let stayDuration = dayDifference();

    let singleRoom = (parseInt(singleBedRoomInput.value));
    let doubleRoom = parseInt(doubleBedRoomInput.value);
    let tripleRoom = parseInt(tripleBedRoomInput.value);
    let promoValidation = promoCodeValidation();

    let advBranch = advBranchInput.value;
    let advType = advTypeInput.value;
    let fAdNo = validateNumber(foreignAdultsInput.value);
    let fKNo = validateNumber(foreignKidsInput.value);
    let lAdNo = validateNumber(localAdultsInput.value);
    let lKNo = validateNumber(localKidsInput.value);
    let noOfParticiapnts = fAdNo + lAdNo + lKNo + fKNo;
    
    let bTotal = bookingTotal();

    let advDuration = validateNumber(advDurationInput.value);
    let fAdultCost = fAdNo * fAdultPrice;
    let fkidCost = fKNo * fKidPrice;
    let lAdultCost = lAdNo * lAdultPrice;
    let lKidCost = lKNo * lKidPrice;
    let guideCost = 0;
    let guide = guideInput.value || "No guide required";
    calculateLoyalty();
    localStorage.setItem('loyaltyPoints', loyaltyPoints);

    if(guide === "Guide required"){
        guide = 'Guide required'
        guideCost = ((fAdNo + lAdNo) * guideForAdult) + ((lKNo + fKNo) * guideForKid);
    }
    else{
        guide = 'No guide required'
        guideCost = 0;
    }
    advParticipantTotal = ((fAdultCost + fkidCost + lAdultCost + lKidCost) * advDuration) + guideCost;
    
   
    nameCell.innerText = fullName;
    emailCell.innerText = email;
    contactCell.innerText = contact;
    branchCell.innerText = branchRoom;
    adultCell.innerText = noOfAdults;
    kidCell.innerText = noOfKids;
    arrivalCell.innerText = arrival;
    depatureCell.innerText = depature;
    durationCell.innerText = stayDuration;
    singleCell.innerText = singleRoom;
    doubleCell.innerText = doubleRoom;
    tripleCell.innerText = tripleRoom;
    promoCell.innerText = promoValidation;
    totalCell_1.innerText = 'LKR ' + bTotal.toFixed(2);

    branchCell_2.innerText = advBranch;
    advCell.innerText = advType;
    participantCell.innerText = noOfParticiapnts;
    avdDurationCell.innerText = advDuration;
    guideCell.innerText = guide;
    totalCell_2.innerText = 'LKR ' + advParticipantTotal.toFixed(2);

    oTotal = bTotal + advParticipantTotal;

    overallTotalCell.innerText = 'LKR ' + oTotal.toFixed(2);
}

//calculate booking total
function bookingTotal(){

    let noOfKidsTotal = validateNumber(kidInput.value) * extraMealPrice;
    let stayDuration = validateNumber(dayDifference())
    let singleRoom = validateNumber(singleBedRoomInput.value) * singleRoomPrice;
    let doubleRoom = validateNumber(doubleBedRoomInput.value) * doubleRoomPrice;
    let tripleRoom = validateNumber(tripleBedRoomInput.value) * tripleRoomPrice;
    let exBed = validateNumber(extraBedInput.value) * extraBedPrice;
    let bTotal = 0;
    bTotal = ((singleRoom + doubleRoom + tripleRoom) * stayDuration) + noOfKidsTotal + exBed;
    discount = 0;
    if(promoCodeInput.value == "Promo123"){
        discount = bTotal * 0.05;
    }
    else {
        discount = 0;
    }
    bTotal = bTotal - discount;
    if (isNaN(bTotal) || bTotal < 0) {
        bTotal = 0;
    }
    return bTotal;
}

//reserve rooms 
function reserveRoom(event){
    event.preventDefault();
    
    let fullName = fnameInput.value + ' ' + lnameInput.value;
    let email = emailInput.value;
    let contact = contactInput.value;
    let branchRoom = branchInput.value;
    let noOfAdults = adultInput.value;
    let noOfKids = kidInput.value;
    let arrival = arrivalInput.value;
    let depature = depatureInput.value;
    let stayDuration = dayDifference();

    let singleRoom = singleBedRoomInput.value;
    let doubleRoom = doubleBedRoomInput.value;
    let tripleRoom = tripleBedRoomInput.value;
    let promoValidation = promoCodeValidation();
    
    let bTotal = bookingTotal();

    
    let totalAmount = bTotal;
    let overallTable = document.getElementById('table-wrapper');
    const emptyDiv = document.getElementById('empty');
    const overallTotalElement = document.getElementById('overall-total');
    const overallBooking = document.getElementById('overall-booking');
    const returnToTop = document.getElementById('return');
    
   
    
    if (
        fullName.trim() === '' ||
        email.trim() === '' ||
        contact.trim() === '' ||
        branchRoom.trim() === '' ||
        parseInt(noOfAdults) <= 0 ||
        arrival.trim() === '' ||
        depature.trim() === '' ||
        parseInt(singleRoom) == 0 &&
        parseInt(doubleRoom) == 0 &&
        parseInt(tripleRoom) == 0
    ){
       alert("Please make sure to fill out all the required fields.");
       return;
    } else{
        clearRoomCells();
        overallTable.style.display = 'block';
        emptyDiv.style.display = 'block';
        returnToTop.style.display = 'block';
        
        overallBooking.innerHTML = `
        <span>Name :</span> ${fullName} <br>
        <span>E-mail :</span> ${email} <br>
        <span>Contact Number :</span> ${contact} <hr> <br> 
        <span>Branch :</span> ${branchRoom} <br>
        <span>No. of Adults :</span> ${noOfAdults} <br>
        <span>No. of Kids :</span> ${noOfKids} <br>
        <span>Arrival Date :</span> ${arrival} <br>
        <span>Depature Date :</span> ${depature} <br>
        <span>Duration of the stay :</span> ${stayDuration} <br>
        <span>No. of Rooms :</span> ${parseInt(singleRoom) + parseInt(doubleRoom) + parseInt(tripleRoom)} <br>
        <span>Promo : </span> ${promoValidation}<br>`;

    overallTotalElement.innerHTML = `<span>Total : </span> LKR ${totalAmount.toFixed(2)}`;

    if (returnToTop) {
        returnToTop.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    }
    }

}

//reserves adventures
function reserveAdv(event){
    event.preventDefault();
    let fullName = fnameInput.value + ' ' + lnameInput.value;
    let email = emailInput.value;
    let contact = contactInput.value;
    let advBranchValue = advBranchInput.value;
    let advTypeValue = advTypeInput.value;
    let foreignAdultsValue = parseInt(foreignAdultsInput.value);
    let foreignKidsValue = parseInt(foreignKidsInput.value);
    let localAdultValue = parseInt(localAdultsInput.value);
    let localKidValue = parseInt(localKidsInput.value);
    let advDurationValue = advDurationInput.value;
    let guideValue = guideInput.value;
    let overallTable = document.getElementById('table-wrapper');
    const emptyDiv = document.getElementById('empty');
    const returnToTop = document.getElementById('return')
    if (
        fullName.trim() === '' ||
        email.trim() === '' ||
        contact.trim() === '' ||
        advBranchValue.trim() === '' ||
        advTypeValue.trim() === '' ||
        foreignAdultsValue == 0 &&
        foreignKidsValue == 0 &&
        localAdultValue == 0 &&
        localKidValue == 0
    ){
        alert("Please ensure that all the required fields are filled out.");
    } else {
        clearRoomCells();
        init();
        emptyDiv.style.display = 'none';
        overallTable.style.display = 'none';
        returnToTop.style.display = 'none';
        alert(
            [
                `Thank you for choosing us! 
                Branch : ${advBranchValue}
                Adventure: ${advTypeValue}
                No. of Participants: ${foreignKidsValue + foreignAdultsValue + localAdultValue + localKidValue}
                Adventure Duration: ${advDurationValue} hour(s)
                Guide Requirement: ${guideValue}`
            ]
        );
    }
    
}

//saving favourites to the local storage
function saveToFavorites(event) {
    event.preventDefault();
    dayFav = dayDifference();
    loyalty = calculateLoyalty();
    let fullName = fnameInput.value + ' ' + lnameInput.value;
    let email = emailInput.value;
    let contact = contactInput.value;
    let branchRoom = branchInput.value;
    let noOfAdults = adultInput.value;
    let arrival = arrivalInput.value;
    let depature = depatureInput.value;
    let singleRoom = singleBedRoomInput.value;
    let doubleRoom = doubleBedRoomInput.value;
    let tripleRoom = tripleBedRoomInput.value;
    // Retrieve existing favorites from local storage or start an empty array
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if(
        fullName.trim() === '' ||
        email.trim() === '' ||
        contact.trim() === '' ||
        branchRoom.trim() === '' ||
        noOfAdults.value > 0 ||
        arrival.trim() === '' ||
        depature.trim() === '' ||
        parseInt(singleRoom) == 0 &&
        parseInt(doubleRoom) == 0 &&
        parseInt(tripleRoom) == 0
    ){
       alert("Please make sure to fill out all the required fields.");
    }else{    const favouriteRoomData = {
        bookingType: 'Room Booking',
        name: `${fnameInput.value} ${lnameInput.value}`,
        email: emailInput.value,
        contact: contactInput.value,
        branch: branchInput.value,
        adult: adultInput.value,
        kid: kidInput.value,
        arrivalDate: arrivalInput.value,
        depatureDate: depatureInput.value,
        duration: dayFav,
        singleRoom: singleBedRoomInput.value,
        doubleRoom: doubleBedRoomInput.value,
        tripleRoom: tripleBedRoomInput.value,
        promoCode: promoCodeInput.value,
        extraBed: extraBedInput.value,
        loyaltypoints:  loyalty,
    };
    const favoriteAdventureData = {
        bookingType: 'Adventure Booking',
        adventureBranch: advBranchInput.value,
        adventureType: advTypeInput.value,
        noOfForeignAdults: foreignAdultsInput.value,
        noOfForeignKids: foreignKidsInput.value,
        noOfLocalAdults: localAdultsInput.value,
        noOfLocalKids: localKidsInput.value,
        duration: advDurationInput.value,
        guide: guideInput.value,
    }
    
    favorites.push(favouriteRoomData,favoriteAdventureData);

    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert("You reservation has been added to favourites");
    }

    console.log(favorites);
}

function returnToTop(){
    const fnameInput = document.getElementById('f-name');
    fnameInput.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
    })
}
