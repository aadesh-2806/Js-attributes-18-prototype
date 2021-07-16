Array.prototype
//[constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]concat: ƒ concat()constructor: ƒ Array()copyWithin: ƒ copyWithin()entries: ƒ entries()every: ƒ every()fill: ƒ fill()filter: ƒ filter()find: ƒ find()findIndex: ƒ findIndex()flat: ƒ flat()flatMap: ƒ flatMap()forEach: ƒ forEach()includes: ƒ includes()indexOf: ƒ indexOf()join: ƒ join()keys: ƒ keys()lastIndexOf: ƒ lastIndexOf()length: 0map: ƒ map()pop: ƒ pop()push: ƒ push()reduce: ƒ reduce()reduceRight: ƒ reduceRight()reverse: ƒ reverse()shift: ƒ shift()slice: ƒ slice()some: ƒ some()sort: ƒ sort()splice: ƒ splice()toLocaleString: ƒ toLocaleString()toString: ƒ toString()unshift: ƒ unshift()values: ƒ values()Symbol(Symbol.iterator): ƒ values()Symbol(Symbol.unscopables): {copyWithin: true, entries: true, fill: true, find: true, findIndex: true, …}__proto__: Object

String.prototype
//String {"", constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}

String.prototype.grumps = () => alert("go away")
//() => alert("go away")

String.prototype
//String {"", grumps: ƒ, constructor: ƒ, anchor: ƒ, big: ƒ, …}grumps: () => alert("go away")anchor: ƒ anchor()big: ƒ big()blink: ƒ blink()bold: ƒ bold()charAt: ƒ charAt()charCodeAt: ƒ charCodeAt()codePointAt: ƒ codePointAt()concat: ƒ concat()constructor: ƒ String()endsWith: ƒ endsWith()fixed: ƒ fixed()fontcolor: ƒ fontcolor()fontsize: ƒ fontsize()includes: ƒ includes()indexOf: ƒ indexOf()italics: ƒ italics()lastIndexOf: ƒ lastIndexOf()length: 0link: ƒ link()localeCompare: ƒ localeCompare()match: ƒ match()matchAll: ƒ matchAll()normalize: ƒ normalize()padEnd: ƒ padEnd()padStart: ƒ padStart()repeat: ƒ repeat()replace: ƒ replace()replaceAll: ƒ replaceAll()search: ƒ search()slice: ƒ slice()small: ƒ small()split: ƒ split()startsWith: ƒ startsWith()strike: ƒ strike()sub: ƒ sub()substr: ƒ substr()substring: ƒ substring()sup: ƒ sup()toLocaleLowerCase: ƒ toLocaleLowerCase()toLocaleUpperCase: ƒ toLocaleUpperCase()toLowerCase: ƒ toLowerCase()toString: ƒ toString()toUpperCase: ƒ toUpperCase()trim: ƒ trim()trimEnd: ƒ trimEnd()trimLeft: ƒ trimStart()trimRight: ƒ trimEnd()trimStart: ƒ trimStart()valueOf: ƒ valueOf()Symbol(Symbol.iterator): ƒ [Symbol.iterator]()__proto__: Object[[PrimitiveValue]]: ""

const cat = 'blue'

cat.grumps()
//give alert

//it store properties of array or string
//this is actual template property

////////////////////////////////////////////////////////////obj_model////////////////////////////////////////////////////////////

function hex(r,g,b){
    return '#' + ( (1<<24) + (r<<16) + (g<<8) + b).toString(16).slice(1);
}
hex(255 , 100 , 25)
//"#ff6419"

function makeColor(r,g,b){
    const color = {};       //object
    color.r = r;
    color.g = g;
    color.b = b;
    //console.log(this);          //gives window
    color.rgb = function(){
        console.log(this);          //gives the color object
        const {r,g,b} = this;       //destructingthis to rgb for no longer string
        return `rgb(${r},${g},${b})`;
    }
    color.hex =  function(){
        const {r,g,b} = this;
        return '#' + ( (1<<24) + (r<<16) + (g<<8) + b).toString(16).slice(1);
    }
    return color;
}
const firstColor = makeColor(12,35,57)
firstColor.rgb();
/*
const red = makeColor(12,35,255)

const white = makeColor(112,35,255)

white.rgb() === red.rgb()
false
*/

// due to presence of rgb out of proto
////////////////////////////////////////////////////////////new////////////////////////////////////////////////////////////
function Color(r,g,b){                          /* always capitalise first letter of class */
    this.r = r;
    this.g = g;
    this.b = b;
    console.log(this)
}
Color(255,35,23);
//Window {window: Window, self: Window, document: document, name: "", location: Location, …}

new Color(255,35,23);
//Color {r: 255, g: 35, b: 23}
//constructor: ƒ Color(r,g,b)

function Color(r,g,b){
    this.r = r;
    this.g = g;
    this.b = b;
    
    /*this.rgb = function(){
        const {r,g,b} = this;
        return `rgb(${r},${g},${b})`;
    }*/
    
    //shows it within call i.e not in __proto__
    
    console.log(this)
}
Color.prototype.rgb = function(){
    const {r,g,b} = this;
    return `rgb(${r},${g},${b})`;
}
//but here in prototype

/*__proto__:
rgb: ƒ ()
constructor: ƒ Color(r,g,b)*/

class Color {
    constructor(r,g,b,name){
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
    }
    greet(){
        //return `rgb(${r},${g},${b})`;       //Uncaught ReferenceError: r is not defined
        const {r,g,b} = this;
        return `rgb(${r},${g},${b})`;        //"rgb(255,123,89)"
        return `hello ${this.name}`;            //"hello hesdwert"
    }
}
/*
const c = new Color(255,123,89,'hesdwert')

const white = new Color(255,123,255,'hsfesdwert')

white.greet === c.greet
//true
*/

//due to presence in prototype

class Color {
    constructor(r,g,b,name){
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
    }
    inner(){
        const {r,g,b} = this;
        return `${r},${g},${b}`;
    }
    rgb(){
        return `rgb(this.inner())`;       //do same but call it
    }
}