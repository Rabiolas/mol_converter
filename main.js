//Start 1 - to output mass concentration units selected in dropdown boxes
const mass = document.getElementById("mass");
const volume = document.getElementById("volume");
const toConvertMass = document.getElementById("kgl");

const massChange = () => {
    toConvertMass.innerHTML = mass.value + '/' + volume.value;
};

mass.addEventListener('input', massChange);
volume.addEventListener('input', massChange);

massChange(); //restores units to original value (value writen in the HTML)
// End 1

//Start 2 - to output molar concentration units selected in dropdown boxe
const molar = document.getElementById("molar");
const toConvertMol = document.getElementById("M");

const molarChange = () => {
    toConvertMol.innerHTML = molar.value;
};

molar.addEventListener('input', molarChange);

molarChange();
//End 2


// start 3 converting molecular formula to mass
const names = ['Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon','Sodium','Magnesium','Aluminium','Silicon','Phosphorus','Sulfur','Chlorine','Potassium','Argon','Calcium','Scandium','Titanium','Vanadium','Chromium','Manganese','Iron','Cobalt','Nickel','Copper ','Zinc','Gallium','Germanium','Arsenic','Selenium','Bromine','Krypton','Rubidium','Strontium','Yttrium','Zirconium','Niobium','Molybdenum','Technetium','Ruthenium','Rhodium','Palladium','Silver','Cadmium','Indium','Tin','Antimony ','Tellurium','Iodine','Xenon','Caesium','Barium','Lanthanum','Cerium','Praseodymium','Neodymium','Promethium','Samarium','Europium','Gadolinium','Terbium','Dysprosium','Holmium','Erbium','Thulium','Ytterbium','Lutetium','Hafnium','Tantalum','Tungsten ','Rhenium','Osmium','Iridium','Platinum','Gold','Mercury ','Thallium','Lead ','Bismuth','Polonium','Astatine','Radon','Francium','Radium','Actinium','Protactinium','Thorium','Neptunium','Uranium','Americium','Plutonium','Curium','Berkelium','Californium','Einsteinium','Fermium','Mendelevium','Nobelium','Lawrencium','Rutherfordium','Dubnium','Seaborgium','Bohrium','Hassium','Meitnerium','Darmstadtium','Roentgenium','Ununbium','Ununtrium','Ununquadium','Ununpentium','Ununhexium','Tennessine','Oganesson']
const symbols = ['H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','K','Ar','Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd','Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg','Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Pa','Th','Np','U','Am','Pu','Cm','Bk','Cf','Es','Fm','Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Uub','Uut','Uuq','Uup','Uuh','Uuh','Uuo']
const masses = [1.00794,4.002602,6.941,9.012182,10.811,12.0107,14.0067,15.9994,18.9984032,20.1797,22.98976928,24.305,26.9815386,28.0855,30.973762,32.065,35.453,39.0983,39.948,40.078,44.955912,47.867,50.9415,51.9961,54.938045,55.845,58.933195,58.6934,63.546,65.409,69.723,72.64,74.9216,78.96,79.904,83.798,85.4678,87.62,88.90585,91.224,92.906,95.94,981,101.07,102.905,106.42,107.8682,112.411,114.818,118.71,121.76,127.6,126.904,131.293,132.9054519,137.327,138.90547,140.116,140.90765,144.242,1451,150.36,151.964,157.25,158.92535,162.5,164.93,167.259,168.93421,173.04,174.967,178.49,180.94788,183.84,186.207,190.23,192.217,195.084,196.966569,200.59,204.3833,207.2,208.9804,210,210,220,223,226,227,231.03588,232.03806,237,238.02891,243,244,247,247,251,252,257,258,259,262,261,262,266,264,277,268,271,272,285,284,289,288,302,292,292];

function periodicTableMaker (names, symbols, masses) { //this function creates a periodic table object
    let periodicTable = {};
    for (let i=0; i < names.length; i++) {
        periodicTable[symbols[i]] = {name:names[i], mass:masses[i]}
    };
    return periodicTable;
};

function formulaTranslate (formula) { //this function transfers molecular formula into a array and deals with numbers in the dozens, hundreds, etc 
    let formulaList = [];
    let number = '';
    for (let i=0; i < formula.length; i++) {
        let index = formula.length - (i+1); //iterates over formula in reverse
        if (!isNaN(parseInt(formula[index]))) { //if it's a number, add on top of the number variable which is being composed as a string 
            number = formula[index] + number
        } else {  //else it's a symbol
            if (!isNaN(parseInt(formula[index+1]))) { //if previous [i] was a number then it's finalized and can be added to the formula_list
                formulaList.push(number);
                number = '';
            };
            if (formula[index] === formula[index].toLowerCase()) {
                formulaList.push(formula[index-1] + formula[index]);
                i++;
            } else {
                formulaList.push(formula[index])
            }
        }
    }
    return formulaList.reverse();
};

function calculateMass(formula) { //this function calculates the MW
    const formulaList = formulaTranslate(formula);
    const periodicTable = periodicTableMaker(names, symbols, masses);
    let mass = 0;
    for (let i=0; i < formulaList.length; i++) {
        if (isNaN(parseInt(formulaList[i]))) { // if it's a symbol i.e. not a number
            mass += periodicTable[formulaList[i]].mass;
        } else { // if it's a number adds the mass of the previous atom times the number minus one (minus one because we already accounted for one instance of the atom in the "if") 
            mass += ( periodicTable[formulaList[(i-1)]].mass * (parseInt(formulaList[i]) - 1) );
        }
    };
    return mass;
};

const formula = document.getElementById("formula");
const molecularWeight = document.getElementById("molweight");

formula.addEventListener('input', showMass);
molecularWeight.addEventListener('input', updateInputedMW);

let calculatedMW = 0;
function showMass (userInput) {
    calculatedMW = calculateMass(userInput.target.value);
    molecularWeight.setAttribute("placeholder", calculatedMW.toFixed(4));
};

let inputedMW = 0;
function updateInputedMW (userInput) {
    inputedMW = Number(userInput.target.value);
};

//end 3


// Start 4.1 - replacing above with on-click
const massConversions = {Kg: 1000, g: 1.00, mg: 0.001, ug: 0.000001, ng: 0.000000001, pg: 0.000000000001};
const volumeConversions = {L: 1.00, mL: 0.001, uL: 0.000001, nL: 0.000000001};
const molarConversions = {M: 1.0, mM: 1000, uM: 1000000, nM: 1000000000, pM: 1000000000000};

const output = document.getElementById("output");
const button = document.getElementById("calculate_button")


function convertFromMass () {
    const userInput = document.getElementById("input").value;
    const parsedInput = Number(userInput);
    let validMW = "";
    if (!calculatedMW && !inputedMW) {
        alert ("Please define a Molecular Weigth in Step 1")
    } else if (inputedMW) {
        console.log("2nd if");
        validMW = Number(inputedMW);
    } else {
        console.log("3rd if");
        validMW = Number(calculatedMW);

    }
    const molarValue = (parsedInput*massConversions[mass.value]*molarConversions[molar.value])/(validMW*volumeConversions[volume.value]);
    output.setAttribute("placeholder", molarValue.toFixed(4));
};

function convertFromMols () {
    const userInput = document.getElementById("input").value;
    const parsedInput = Number(userInput);
    let validMW = "";
    if (!calculatedMW && !inputedMW) {
        alert ("Please define a Molecular Weight in Step 1")
    } else if (inputedMW) {
        console.log("2nd if");
        validMW = Number(inputedMW);
    } else {
        console.log("3rd if");
        validMW = Number(calculatedMW);

    }
    const massConcentrationValue = (validMW*parsedInput*volumeConversions[volume.value])/(molarConversions[molar.value]*massConversions[mass.value])
    output.setAttribute("placeholder", massConcentrationValue.toFixed(4));
}
//end 4.1



