//**************************************************
// 2020 text decomposition and transformation JavaScript Lib, Prof. Charlotte Schubert Alte Geschichte, Leipzig


/*
GPLv3 copyrigth

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


"use strict"; 



/*------------------------------------------------------------------------------

GLOBALS FROM silben.js MISSING

------------------------------------------------------------------------------*/

let howmuchhaufisselten = 25;
let nachbarschaft = 6; //gerade zahl 10, 12, ... 20

//let satzzeichen = new Array(".", ";", ",", ":", "!", "?", "·");

let trenner = {"-":1}; //silbentrennersymbol
//let leidenklammerung = {"[":"im Original beschädigt", "]":"im Original beschädigt",  "(": "im Original augelassen", ")":"im Original augelassen", "<":"Korrektur eines Fehlers aus dem Original",">":"Korrektur eines Fehlers aus dem Original", "{":"im Vergleich zum Original getilgte Worte","}":"im Vergleich zum Original getilgte Worte", "[[":"Rasur","]]":"Rasur"}; //editorische Klammerung

/*buchstaben und bewertungen*/
//lateinische Zeichen / Verwendungen / Bedeutungen im grammatischen System
let buchstLAT = {"d":1, "b":1, "g":1, "p":1, "t":1, "c":1, "k":1, "q":1, "qu":1, "ph":1, "th":1, "ch":1, "x":1, "z":1, "f":1, "v":1, "s":1, "m":1, "n":1, "l":1, "r":1, "a":1,"i":2,"e":3,"o":4,"u":5,"v":6, "y":7, "h":1};//? // liste (array) mit bezeichnern statt Indices
//vokale
let vokaleLAT = {"a":1,"i":2,"e":3,"o":4,"u":5,"v":6, "y":7}; 
//let vokalelangLAT = {}; //?
//let vokalekurzLAT = {}; //?
//let vokalelangkurzLAT = {};//?
let disptongLAT = {"ae":1, "au":1, "eu":1, "oe":1 };
//konsonanten
let konLAT = {"d":1, "b":1, "g":1, "p":1, "t":1, "c":1, "k":1, "q":1, "qu":1, "ph":1, "th":1, "ch":1, "x":1, "z":1, "f":1, "v":1, "s":1, "m":1, "n":1, "l":1, "r":1};
let doppelkonsonanzLAT = {"x":"ks", "z":"ts"};
let doppelabereinzelkonsonantLAT = { 	"ph":1, "th":1, "ch":1};
let labiovelareLAT = {"qu":1, "su":1, "gu":1};
let mutacumliquidaLAT = {"dl":1, "gl":1, "pl":1, "tl":1, "cl":1, "kl":1, "ql":1, "dr":1, "gr":1, "pr":1, "tr":1, "cr":1, "kr":1, "qr":1 }; //SIND DIE RICHTIG HAB ICH EINFACH SO ANGENOMMEN OHNE BUCH - m und n könnten als quasi liquida dazu kommen
//dauer und hörbarkeit
let mutaeLAT = {"d":1, "g":1, "p":1, "t":1, "c":1, "k":1, "q":1, "qu":1, "ph":1, "th":1, "ch":1, "x":1, "z":1}; 
//dazu
let mediaeLAT = {"b":"labial", "d":"dental", "g":"guttural"};
let tenuesLAT = {"p":"labial", "t":"dental", "c":"guttural", "k":"guttural", "q":"guttural", "qu":"guttural"};
let aspirataeLAT = {"ph":"labial", "th":"dental", "ch":"guttural"};
//dauer und hörbarkeit
let dauerlauteLAT = { "f":1, "v":1, "s":1, "m":1, "n":1, "l":1, "r":1}; 
//dazu
let spirantesLAT = {"f":"labial", "v":"labial", "s":"dental"};
let nasalesLAT = {"m":"labial", "n":"dental"};
let liquidaeLAT = {"l":"dental", "r":"dental"};


//altgriechische Zeichen / Verwendungen
let diacriticsunicode = new Array( "\u0313", "\u0314", "\u0300","\u0301", "\u00B4", "\u02CA", "\u02B9", "\u0342", "\u0308", "\u0304", "\u0306");
//let buchstGRI = {"α":1, "β": 1, "γ":1, "δ":1, "ε":1, "ζ":1, "η":1, "θ":1, "ι":1, "κ":1, "λ":1, "μ":1, "ν":1, "ξ":1, "ο":1, "π":1, "ρ":1, "σ":1, "ς": 1, "τ":1, "υ":1, "φ":1, "χ":1, "ψ":1, "ω":1};//unvollständig!!!!ἀρχῆς
//schneller weg um das vorhandensein zu checken: console.log( buchstGRI["α"], buchstGRI["υ"] );, Abfrage if(buchstGRI["α"]), resultiert auch in kürzerem code
let vokaleGRI = {"ι":1,"υ":1,"ε":1,"ο":1,"α":1,"ω":1,"η":1};
let diphtongGRI = {"αι":1,"υι":1,"οι":1,"ει":1,"αυ":1,"ευ":1,"ου":1,"ηυ":1,"ωυ":1,"ᾳ":1,"ῃ":1,"ῳ":1,"Αι":1,"Ηι":1,"Ωι":1};
let vokalelangGRI = {"ω":1,"η":1};;
let vokalekurzGRI = {"ε":1,"ο":1};
let vokalelangkurzGRI = {"α":1,"ι":1,"υ":1};
let konGRI = {"β":1, "γ":1, "δ":1, "ζ":1, "θ":1, "κ":1, "λ":1, "μ":1, "ν":1, "ξ":1, "π":1, "ρ":1, "σ":1, "τ":1, "φ":1, "χ":1, "ψ":1};
let doppelkonsonanzGRI = {"ξ":"κσ", "ψ":"πσ", "ζ":"σδ"}; //richtig so?
let doppelabereinzelkonsonantGRI = {};
let mutacumliquidaGRI = {"πλ":1, "πρ":1, "πν": 1, "βλ":1, "βρ":1, "φλ":1, "φρ":1, "τλ":1, "τρ":1, "τμ":1, "δρ":1, "δμ": 1, "θλ":1, "θρ":1, "θν":1, "κλ":1, "κρ":1, "κν":1, "γλ":1, "γρ":1, "γν":1, "χλ":1, "χρ":1 }; //das wird beim Silbentrennen berücksichtigt nicht bei der Zusammenziehung lautlicher Einheiten
let mutaeGRI = {"κ":1, "π":1, "τ":1, "γ":1, "β":1, "δ":1, "χ":1, "φ":1, "θ":1};
let meiaeGRI = {"γ":"guttural", "β":"labial", "δ":"dental"};
let tenuesGRI = {"κ":"guttural", "π":"labial", "τ":"dental"};
let aspirataeGRI = {"χ":"guttural", "φ":"labial", "θ":"dental"};
let dauerlauteGRI = { "λ":1, "ρ":1, "μ":1, "ν":1,  "ϝ":1, "σ":1 };
let spirantesGRI = {"ϝ":"labial", "σ":"dental"};
let nasalesGRI = {"μ":"labial", "ν":"dental"};
let liquidaeGRI = {"λ":"dental", "ρ":"dental"};

let konsonantengruppenambeginneineswortes = {
'βγ': 1,
'βδ': 65,
'βζ': 1,
'βλ': 597,
'βλσ': 1,
'βν': 1,
'βρ': 1006,
'βρκ': 1,
'βσμβ': 1,
'γδ': 1,
'γλ': 396,
'γμ': 2,
'γν': 554,
'γρ': 689,
'γψ': 1,
'γψξ': 1,
'δβ': 1,
'δγ': 1,
'δζ': 1,
'δμ': 4,
'δν': 1,
'δρ': 821,
'ζγ': 2,
'ζδ': 1,
'ζφ': 1,
'θκ': 1,
'θλ': 59,
'θμ': 5,
'θν': 82,
'θρ': 863,
'θρν': 2,
'κβ': 11,
'κγ': 7,
'κδ': 12,
'κζ': 8,
'κθ': 7,
'κλ': 1405,
'κν': 144,
'κπ': 2,
'κρ': 2291,
'κσ': 2,
'κτ': 520,
'κτλ': 1,
'κφ': 1,
'λβ': 5,
'λγ': 5,
'λδ': 4,
'λζ': 5,
'λθ': 3,
'λλ': 1,
'μβ': 5,
'μγ': 7,
'μδ': 3,
'μζ': 5,
'μθ': 5,
'μλ': 2,
'μμ': 3,
'μν': 391,
'μπ': 80,
'μπρ': 2,
'μφ': 1,
'νβ': 7,
'νγ': 3,
'νδ': 7,
'νζ': 4,
'νθ': 5,
'νν': 1,
'νρ': 1,
'νσ': 1,
'ντ': 17,
'ντζ': 1,
'ξβ': 4,
'ξγ': 5,
'ξδ': 3,
'ξζ': 4,
'ξθ': 5,
'πβ': 4,
'πγ': 4,
'πδ': 3,
'πζ': 1,
'πθ': 1,
'πλ': 2765,
'πν': 229,
'ππ': 1,
'πρ': 20808,
'πρσβ': 1,
'πρτ': 1,
'πτ': 467,
'ργ': 2,
'ρδ': 2,
'ρζ': 1,
'ρκ': 6,
'ρκβ': 1,
'ρκγ': 1,
'ρκδ': 2,
'ρκζ': 1,
'ρλ': 4,
'ρλβ': 1,
'ρλγ': 2,
'ρλδ': 1,
'ρλζ': 1,
'ρλθ': 1,
'ρμ': 4,
'ρμγ': 1,
'ρν': 6,
'ρνγ': 1,
'ρξ': 6,
'ρξβ': 1,
'ρξγ': 1,
'ρξζ': 1,
'ρξθ': 1,
'ρπ': 8,
'ρπβ': 1,
'ρπδ': 2,
'ρπθ': 1,
'ρρ': 1,
'σβ': 46,
'σγ': 11,
'σδ': 3,
'σθ': 44,
'σθλ': 12,
'σκ': 2107,
'σκδ': 1,
'σκλ': 128,
'σκν': 5,
'σκρ': 37,
'σλ': 3,
'σμ': 199,
'σμγ': 1,
'σν': 3,
'σνβ': 1,
'σνγ': 1,
'σξ': 2,
'σξγ': 1,
'σπ': 1139,
'σπγ': 1,
'σπδ': 1,
'σπθ': 1,
'σπλ': 27,
'σρ': 3,
'σρτ': 1,
'στ': 2752,
'στλ': 3,
'στρ': 1537,
'σφ': 807,
'σφρ': 68,
'σχ': 573,
'τβ': 1,
'τγ': 1,
'τδ': 1,
'τζ': 287,
'τκ': 3,
'τκβ': 1,
'τκδ': 1,
'τλ': 42,
'τλβ': 1,
'τλζ': 1,
'τμ': 45,
'τν': 5,
'τνδ': 1,
'τνθ': 1,
'τξ': 3,
'τπ': 1,
'τρ': 3096,
'φβ': 1,
'φδ': 1,
'φθ': 570,
'φκ': 1,
'φλ': 436,
'φλβ': 1,
'φλδ': 1,
'φμ': 1,
'φμθ': 1,
'φν': 1,
'φπ': 1,
'φπβ': 1,
'φπδ': 1,
'φρ': 1243,
'χβ': 1,
'χθ': 71,
'χκθ': 1,
'χλ': 207,
'χμ': 2,
'χμγ': 1,
'χν': 12,
'χνδ': 1,
'χπ': 2,
'χρ': 2417,
'χτ': 1,
'χχ': 1,
'ψκ': 1,
'ψκζ': 1,
'ψλ': 1,
'ψμ': 1,
'ψμζ': 1,
'ψν': 1,
'ψνζ': 1,
'ψξ': 1,
'ψξθ': 1
}; //rein griechisches Kriterium für die Silbentrennung
/*weitere Annahmen, die sich implizit dem Programm auswirken
SILBEN
- ein Silbe besteht aus drei Teilen dem Kopf, dem Nucleus, und der Koda 
- Kopf und Koda sind konsonantsich geprägt, Koda und/oder Kopf können leer sein
- der Nucleus ist vokalisch

Latein speziell
- Berücksitigen der Diphtonge
- U-V vor Konsonaten als U (Vokal), vor Vokalen als V (Konsonant) gemessen
- steht nach p t c ein h ist dies als Einheit zu werten
- steht i in Verbindung mit einem anderen Vokal, dann ist das i ein Konsonant (iacere, iunctum, iungere)
- qu entspricht einem Konsonanten
- x, z entsrechen zwei Konsonanten
- Berücksichtigen der muta cum liquida
*/
//Deklinationen der Substantive im Griechsichen / umfasst scheinbar auch Adjektive
//codierung: s singular, p plural, n nominativ, v vokativ,g genitiv, d dativ, a akkusativ, 
let deklination1stammauslautGRI = {"α":1, "η":1}; //???mach ich das so, oder kommt das ins deklinations array???
let deklination1endGRI = {"α":["s", "n", "v"], "η":["s","n","v"], "ης":["s","g"], "ας":["s","g"], "ῃ":["s","d"], "ᾳ":["s","d"],"ην":["s","a"], "αι":["p", "n", "v"], "ων":["p","g"], "αις":["p", "d"], "ας":["p","a"]}; 
let deklination2stammauslautGRI = {"ο":1, "ω":1};
let deklination2endGRI = {"ος":["s","n"], "ου":["s","g"], "ῳ":["s","d"], "ον":["s","a"], "ε":["a","v"], "οι":["p","n","v"], "ων":["p","g"], "οις":["p","d"], "ους":["p","a"]};
let deklination3stammauslautGRI = {"λ":1, "ρ":1, "κ":1, "γ":1, "χ":1, "π":1, "β":1, "φ":1, "τ":1, "δ":1, "θ":1, "ν":1, "ντ":1, "ος":1, "εσ":1, "ι":1, "υ":1, "ω":1, "ο":1};
let deklination3endGRI = {"ς":["s","n"], "ος":["s","g"], "ι":["s","d"], "α":["s","a"], "ες":["p","nv"], "ων":["p","g"], "οι":["p","d"], "οιν":["p","d"], "ας":["p","a"]};

let endungennachkasus = { "n": ["α", "η", "αι", "ος", "οι", "ς", "ες"],  
						  "g": ["ης", "ας", "ων", "ου", "ος"], 
					      "d": ["ῃ", "ᾳ", "αις", "ῳ", "οις", "ι", "οι", "οιν"], 
						  "a": ["ην", "ας", "ον", "ε", "ους", "α"],
						  "v": ["α", "η", "αι", "ε", "οι", "ες"], };

//konjugation der Verben

let konjugationVerbaVocalia = {
    "ω":["KAVs1", "KAFs1"],
    "εις":["KAVs2"],
    "ει":["KAVs3", "MAVs2"],
    "ομεν":["KWAVp1"],
    "ετε":["KWAVp2"],
    "ουσιν":["KWAVp3"],
    "ουσι":["KAWVp3"],
    "ουνι":["KAWVp3"],   
    "σω": ["KQVs1", "KZFs1", "MZVs2"],  
    "σεις":["KQVs2"],
    "σει": ["KQVs3"],
    "σομεν":["KQVp1"],
    "σετε":["KQVp2"],
    "σουσιν":["KQVp3"],
    "σουσι":["KQVp3"],
    "σουνι":["KQVp3"],   
    "κα": ["KOVs1"],
    "κας": ["KOVs2"],
    "κεν": ["KOVs3"],
    "κε": ["KOVs3"],
    "καμεν": ["KOVp1"],
    "κατε": ["KOVp2"], 
    "κασιν": ["KOVp3"], 
    "κασι": ["KOVp3"],
    "ον": ["KWVs1", "KZVp3", "KAk"],
    "ες": ["KWVs2"],
    "ε": ["KWVs3"],
    "εν": ["KWVs3"],
    "σα": ["KZVs1"],
    "σας": ["KVZs2"],
    "σε": ["KVZs3"],
    "σεν": ["KVZs3"],
    "σαμεν": ["KVZp1"],
    "σατε": ["KVZp2"],
    "σαν": ["KVZp3", "KZk"],
    "κειν": ["KVLs1", "KVLs3"],
    "κη": ["KVLs1"],
    "κεις": ["KVLs2"],
    "κης": ["KVLs2"], 
    "κει": ["KVLs3"], 
    "κεμεν": ["KVLp1"],
    "κειμεν": ["KVLp1"],
    "κετε": ["KVLp2"],
    "κειτε": ["KVLp2"],
    "κεσαν": ["KVLp3"],
    "κεισαν": ["KVLp3"], 
    "ῃς": ["KAFs2"],
    "ῃ": ["KAFs3"], 
    "ωμεν": ["KAFp1"],
    "ητε": ["KAFp2"],
    "ωσιν": ["KAFp3"],  
    "ωσι": ["KAFp3"], 
    "σῃς": ["KZFs2"], 
    "σῃ": ["KZFs3"],
    "σωμεν": ["KZFp1"], 
    "σητε": ["KZFp2"], 
    "σωσιν": ["KZFp3"],   
    "σωσι": ["KZFp3"], 
    "κω": ["KOFs1"], 
    "κῃς": ["KOFs2"], 
    "κῃ": ["KOFs3"],
    "κωμεν": ["KOFp1"], 
    "κητε": ["KOFp2"], 
    "κωσιν": ["KOFp3"],   
    "κωσι": ["KOFp3"],   
    "οιμι": ["KAos1"],
    "οις": ["KAos2"],
    "οι": ["KAos3"],
    "οιμεν": ["KAop1"],
    "οιτε": ["KAop2"],
    "οιεν": ["KAop3"],
    "σοιμι": ["KQos1"],
    "σοις": ["KQos2"],
    "σοι": ["KQos3"],
    "σοιμεν": ["KQop1"],
    "σοιτε": ["KQop2"],
    "σοιεν": ["KQop3"],
    
    "σαιμι": ["KZos1"],
    "σαις": ["KZos2"], 
    "σειας": ["KZos2"],
    "σαι": ["KZos3", "KZU", "MZms2"],
    "σειεν": ["KZos3"],
    "σειε": ["KZos3"],
    "σαιμεν": ["KZop1"],
    "σαιτε": ["KZop2"],
    "σαιεν": ["KZop3"],

    "κοιμι": ["KOos1"],
    "κοις": ["KOos2"],
    "κοι": ["KOos3"],
    "κοιμεν": ["KOop1"],
    "κοιτε": ["KOop2"],
    "κοιεν": ["KOop3"],

    "ε": ["KAms2"],
    "έτω": ["KAms3"],
    "ετε": ["KAmp2"],
    "όντων": ["KAmp3"],
    "έτωσαν": ["KAmp3"],

    "σον": ["KZms2"],
    "σάτω": ["KZms3"],
    "σατε": ["KZmp2"],
    "σάντων": ["KZmp3"],
    "σάτωσαν": ["KZmp3"],

    "ειν": ["KAU"],
    "ων": ["KAk"],
    "οντος": ["KAk"],
    "ουσα": ["KAk"],
    "ούσης": ["KAk"],
    "οντος": ["KAk"],

    "σειν":["KQU"],
    "σων": ["KQk"],
    "σοντος": ["KQk"],
    "σουσα": ["KQk"],
    "σούσης": ["KQk"],
    "σον": ["KQk"],
    "σοντος": ["KQk"],

    
    "σᾱς": ["KZk"],
    "σαντος": ["KZk"],
    "σᾱσα": ["KZk"],
    "σᾱ́σης": ["KZk"],

    "κέναι":["KOU"],
    "κώς": ["KOk"],
    "κότος": ["KOk"],
    "κυῖα": ["KOk"],
    "κυίᾱς": ["KOk"],
    "κος": ["KOk"],

    //medium
    "ομαι":["MAVs1"],
    "ῃ":["MAVs2", "MAFs2"],
    "εται":["MAVs3"],
    "όμεθα":["MAVp1"],
    "εσθε":["MAVp2"],
    "ονται":["MAVp3"],

    "σομαι":["MQVs1"],
    "σῃ":["MQVs2"],
    "σεται":["MQVs3"],
    "σόμεθα":["MQVp1"],
    "σεσθε":["MQVp2"],
    "σονται":["MQVp3"],

    "μαι":["MOVs1"],
    "σαι":["MOVs2"],
    "ται":["MOVs3"],
    "μεθα":["MOVp1", "MLVp1"],
    "σθε":["MOVp2", "MLVp2", "MOLmp2"],
    "νται":["MOVp3"],

    "όμην":["MWVs1"],
    "ου":["MWVs2", "MAms2"],
    "ετο":["MWVs3"],
    "όμεθα":["MWVp1"],
    "εσθε":["MWVp2"],
    "οντο":["MWVp3"],

    "σάμην":["MZVs1"],
    "σατο":["MZVs3"],
    "σάμεθα":["MZVp1"],
    "σασθε":["MZVp2"],
    "σαντο":["MZVp3"],

    "μην":["MLVs1"],
    "σο":["MLVs2", "MOLos", "MOLms2"],
    "το":["MLVs3"],
    "ντο":["MLVp3"],

    "ωμαι":["MAFs1"],
    "ηται":["MAFs3"],
    "ώμεθα":["MAFp1"],
    "ησθε":["MAFp2"],
    "ωνται":["MAFp3"],

    "σωμαι":["MZFs1"],
    "σῃ":["MZFs2"],
    "σηται":["MZFs3"],
    "σώμεθα":["MZFp1"],
    "σησθε":["MZFp2"],
    "σωνται":["MZFp3"],

    "μένος":["MOLFs"],
    "μένοι":["MOLFp"],

    "οίμην":["MAos1"],
    "οιο":["MAos2"],
    "οιτο":["MAos3"],
    "οίμεθα":["MAop1"],
    "οισθε":["MAop2"],
    "οιντο":["MAop3"],

    "σοίμην":["MQos1"],
    "σοιο":["MQos2"],
    "σοιτο":["MQos3"],
    "σοίμεθα":["MQop1"],
    "σοισθε":["MQop2"],
    "σοιντο":["MQop3"],

    "σαίμην":["MZos1"],
    "σαιο":["MZos2"],
    "σαιτο":["MZos3"],
    "σαίμεθα":["MZop1"],
    "σαισθε":["MZop2"],
    "σαιντο":["MZop3"],

    "σθω":["MOLop", "MOLms3"],
   
    "έσθω":["MAms3"],
    "εσθε":["MAmp2"],
    "έσθων":["MAmp3"],

    "σάσθω":["MZms3"],
    "σασθε":["MZmp2"],
    "σάσθων":["MZmp3"],

    "σθων":["MOLmp3"],

    "εσθαι": ["MAU"],
    "όμενος": ["MAk"],
    "ομένη": ["MAk"],
    "ομενον": ["MAk"],
    
    "σεσθαι": ["MQU"],
    "σόμενος": ["MQk"],
    "σομένη": ["MQk"],
    "σομενον": ["MQk"],

    "σασθαι": ["MZU"],
    "σάμενος": ["MZk"],
    "σαμένη": ["MZk"],
    "σάμενον": ["MZk"],

    "σθαι": ["MOLU"],
    "μένος": ["MOLk"],
    "μένη": ["MOLk"],
    "μένον": ["MOLk"],
};

let konjugationVerbaVocaliaVORS = { //vorsilben
    "ἐ": ["LZVsp123"]
}

let konjugationVerbaVocaliaVORW = { //vor dem verb stehend optativ konjunktiv
    "ἵνα": ["ZOLFsp123"],
    "εἴθε": ["ZVOLosp123"]
}

let konjugationVerbaVocaliaNACHW = { //vor dem verb stehend - unsicher
    "ὦ": ["OLFsp123"],
    "ᾖς": ["OLFsp123"],
    "ᾖ": ["OLFsp123"],
    "ἦτε": ["OLFsp123"], 
    "ὦσιν": ["OLFsp123"],
    "εἴην": ["OLos1"],
    "εἴης": ["OLos2"],
    "εἴη": ["OLos3"],
    "εἴημεν": ["OLop1"],
    "εἴητε": ["OLop2"],
    "εἴησαν": ["OLop3"],
}

//REDUBLIKATION IST NOCH NICHT BERÜCKSICHTIGT
let konjugationVerbaMuta = {
    "":"",                            
};

let konjugationVerbaLiquida = {
    "":"",                            
};

//adjektive
let komparation = {//adverbien von Adjektiven abgeleitet oder adjektive
    "τερος":[""], //komparativ
    "τέρᾱ":[""], //komparativ
    "τερον":[""], //komparativ
    "τατος":[""], //superlativ
    "τάτη":[""], //superlativ
    "τατον":[""], //superlativ
    };

//adverbien
let advervEndung = {
    "ως":[""],
    };

let adverbGRI = {
    "οὕτω":["g"],
    "οὕτως": ["g"],
    "οὕτω": ["g"],
    "χωρίς":["g"],
	"χωρὶς":["g"],
	"πλήν":["g"],
	"πλὴν":["g"],
	"ἄνω":["g"],
	"κάτω":["g"],
	"καταντικρύ":["g"],
	"καταντικρὺ":["g"],
	"ἐκτός":["g"],
	"ἐκτὸς":["g"],
	"ἐντός":["g"],
	"ἐντὸς":["g"],
	"ἔνερθεν":["g"],
	"ἔξω":["g"],
	"εἴσω":["g"],
	"πέρα":["g"],
	"ἀντιπέρας":["g"],
	"ἀντιπέρα":["g"],
	"ὄπισθεν":["g"],
    "ὀπίσω":["g"],
    "οὔκων":["g"],
	"κατόπιν":["g"],
	"ἔμπροσθεν":["g"],
	"πρόσθεν":["g"],
	"πόρρω":["g"],
	"πρόσω":["g"],
	"ἐγγύς":["g"],
	"ἐγγὺς":["g"],
	"πλησίον":["g"],
	"ἄχρι":["g"],
	"μέχρι":["g"],
	"μεταξύ":["g"],
	"μεταξὺ":["g"],
	"λάθρᾳ":["g"],
	"κρύφα":["g"],
	"ἐναντίον":["g"],
	"εὐθύς":["g"],
	"εὐθὺς":["g"],
	"νῦν": [""],
    "νυν": [""],
    "νυ": [""],
    "ὀπίσω": [""],
    "οὔκων": [""]
	}; //

let adverbLAT = {
    "antea": [],//d. Zeit
    "postea": [],
    "interea": [],
    "interim": [],
    "interdum": [],
    "interdiu": [],
    "noctu": [],
    "hodie": [],
    "postridie": [],
    "pridie": [],
    "pridem": [],
    "cottidie": [],
    "quotannis": [],
    "heri": [],
    "cras": [],
    "nunc": [],
    "modo": [],
    "nuper": [],
    "mox": [],
    "olim": [],
    "saepe": [],
    "semper": [],
    "iam": [],
    "denique": [],
    "tandem": [],
    "demum": [],
    "extemplo": [],
    "statim": [],
    "simul": [],
    "diu": [],
    "nondum": [],
    "prope": [], //d. Ortes
    "procul": [],
    "obviam": [],
    "retro": [],
    "foris": [],
    "foras": [],
    "primum": [], //d. Art u. Weise
    "primo": [],
    "postremum": [],
    "postremo": [],
    "plerumque": [],
    "paulum": [],
    "parum": [],
    "nimis": [],
    "nimium": [],
    "satis": [],
    "tantum": [],
    "modo": [],
    "rursus": [],
    "iterum": [],
    "denuo": [],
    "ceterum": [],
    "imprimis": [],
    "partim": [],
    "paulatim": [],
    "raro": [],
    "crebro": [],
    "cito": [],
    "merito": [],
    "consulto": [],
    "subito": [],
    "secreto": [],
    "ultro": [],
    "falso": [],
    "forte": [],
    "fortasse": [],
    "fere": [],
    "ferme": [],
    "paene": [],
    "prope": [],
    "frustra": [],
    "nequiquam": [],
    "nequaquam": [],
    "propterea": [],
    "adeo": [],
    "admodum": [],
    "magnopere": [],
    "tantopere": [],
    "quantopere": []
    };
let preposGRI = { 
    "εἵνεκεν": [""],    
    "ἀνά": ["a"],
    "ἀνὰ":["a"],
    "εἰς":["a"],
    "ἐς":["a"],
    "ὡς":["a"],
    "ἐν":["d"],
    "σύν":["d"],
    "σὺν":["d"],
    "ἅμα":["d"],
    "ἅμ’":["d"],
    "ὁμοῦ":["d"],
    "ἀντί":["g"],
    "ἀντὶ":["g"],
    "ἀνθ’":["g"],
    "ἀπό":["g"],
    "ἀπὸ":["g"],
    "ἀφ’":["g"],
    "ἐκ":["g"],
    "ἐξ":["g"],
    "πρό":["g"],
    "πρὸ":["g"],
    "ἕνεκα":["g"],
    "χάριν":["g"],
    "διὰ":["a", "g"],
    "διά":["a", "g"],
    "δι’":["a", "g"],
    "δι᾽":["a", "g"],
    "κατά":["a", "g"],
    "κατα":["a", "g"],
    "κατὰ":["a", "g"],
    "κατ’":["a", "g"],
    "καθ’":["a", "g"],
    "ὑπέρ":["a", "g"],
    "ὑπὲρ":["a", "g"],
    "μετά":["a", "g"],
    "μετ’":["a", "g"],
    "μετὰ":["a", "g"],
    "μεθ’":["a", "g"],
    "ἀμφί":["a", "d", "g"],
    "ἀμφὶ":["a", "d", "g"],
    "ἐπί":["a", "d", "g"],
    "ἐφ’":["a", "d", "g"],
    "ἐπὶ":["a", "d", "g"],
    "ἐπ’":["a", "d", "g"],
    "ἐπ᾽": ["a", "d", "g"],
    "παρά":["a", "d", "g"],
    "παρὰ":["a", "d", "g"],
    "παρ’":["a", "d", "g"],
    "περί":["a", "d", "g"],
    "περὶ":["a", "d", "g"],
    "πρός":["a", "d", "g"],
    "πρὸς":["a", "d", "g"],
    "ὑπό":["a", "d", "g"],
    "ὑπὸ":["a", "d", "g"],
    "ὐπά":["a", "d", "g"],
    "ὑπ᾽": ["a", "d", "g"],
    "ὑφ’":["a", "d", "g"]
    }; // weisen kasus zu, auch lokale, temporale, kausale, konzessive, modale Bedeutung


let preposLAT = {
    "in":["a", "l"], 
    "sub":["a", "l"],
    "super":["a","l"],
    "ā":["l"],
    "ab":["l"],
    "abs":["l"],
    "cōram":["l"],
    "cum":["l"],
    "dē":["l"],
    "ē":["l"],
    "ex":["l"],
    "palam":["l"],
    "prae":["l"],
    "prō":["l"],
    "sine":["l"],
    "ad":["a"],
    "adversus":["a"],
    "ante":["a"],
    "apud":["a"],
    "circā":["a"],
    "circum":["a"],
    "circiter":["a"],
    "citrā":["a"],
    "contrā":["a"],
    "ergā":["a"],
    "extrā":["a"],
    "īnfrā":["a"],
    "inter":["a"],
    "intrā":["a"],
    "iuxtā":["a"],
    "ob":["a"],
    "penes":["a"],
    "per":["a"],
    "post":["a"],
    "praeter":["a"],
    "prope":["a"],
    "propter":["a"],
    "secundum":["a"],
    "suprā":["a"],
    "trāns":["a"],    
    "ultrā":["a"]
	 };
let postproGRI = {
    "ἕνεκα":["g"], 
    "ἕνεκεν":[] 
	 };
let postproLAT = {
    "causā":["g"], 
    "grātiā":["g"] 
	 };

let artikelGRI = {	   
    "ὁ": ["msnB"], 
    "τώ": ["munB", "funB", "eunB", "muaB", "fuaB", "euaB"], 
    "οἱ": ["mpnB"], 
    "τοί": ["mpnB"],
    "τοῖσι": ["fpdB"],
    "ἡ": ["fsnB"], 
    "αἱ": ["fpnB"], 
    "τό": ["esnB", "esaB"], 
    "τὸ": ["esnB", "esaB"], 
    "τὰ": ["epnB", "epaB"],
    "τά": ["epnB", "epaB"], 
    "τοῦ": ["msgB", "esgB"], 
    "τοῖο": ["msgB", "esgB"],
    "τοῖν": ["mugB", "fugB", "eugB", "mudB", "fudB", "eudB"], 
    "τῶν": ["mpgB", "fpgB", "epgB"], 
    "τῆς": ["fsgB"], 
    "τῷ": ["msdB", "esdB"], 
    "τοῖς": ["mpdB", "epdB"], 
    "τῇ": ["fsdB"], 
    "ταῖς": ["fpdB"], 
    "τόν": ["msaB"], 
    "τὸν": ["msaB"], 
    "τούς": ["mpaB"], 
    "τοὺς": ["mpaB"],
    "τήν": ["fsaB"], 
    "τάς": ["fpaB"], 
    "τὴν": ["fsaB"]		
                }; 	

//hinweise als Demonstrativpronomen - hinweis geht auf etwas nachfolgend im text?
let demonstrativpronomLAT = { //determinativpronomen scheinen reingemsihct
    "hic": ["snm"],
    "haec": ["snf", "pne", "pae"],
    "hoc": ["sne", "sae", "slm", "sle"],
    "huius": ["sgm", "sgf", "sge"],
    "huic": ["sdm", "sdf", "sde"],
    "hunc": ["sam"],
    "hanc": ["saf"],
    "hac": ["slf"],
    "hi": ["pnm"],
    "hae": ["pnf"],
    "horum": ["pgm", "pge"],
    "harum": ["pgf"],
    "his": ["pdm", "pdf", "pde", "plm", "plf", "ple"],
    "hos": ["pam"],
    "has": ["paf"],
    "ille": ["snm"],
    "illa": ["snf", "pne", "slf", "pae", "pne"],
    "illud": ["sne", "sae"],
    "illius": ["sgm", "sgf", "sge"],
    "illi": ["sdm", "sdf", "sde", "pnm"],
    "illum": ["sam"],
    "illam": ["saf"],
    "illo": ["slm", "sle"],
    "illae": ["pnf"],
    "illorum": ["pgm", "pge"],
    "illis": ["pdm", "pdf", "pde", "plm", "plf", "ple"],
    "illos": ["pam"],
    "illas": ["paf"],
    "iste": ["snm"],
    "ista": ["snf", "slf", "pne", "pae"],
    "istud": ["sne", "sae"],
    "istius": ["sgm", "sgf", "sge"],
    "isti": ["sdm", "sdf", "sde", "pnm"],
    "istum": ["sam"],
    "istam": ["saf"],
    "isto": ["slm", "sle"],
    "istae": ["pnf"],
    "istorum": ["pgm", "pge"],
    "istis": ["pdm", "pdf", "pde", "plm", "plf", "ple"],
    "istos": ["pam"],
    "istas": ["paf"],
    "is": ["snm"],
    "ea": ["snf", "slf", "pne", "pae"],
    "id": ["sne", "sae"],
    "eius": ["sgm", "sgf", "sge"],
    "ei": ["sdm", "sdf", "sde", "pnm"],
    "eum": ["sam"],
    "eam":["saf"],
    "eo": ["slm", "sle"],
    "ea": ["slf", "pne", "pae"],
    "ii": ["pnm"],
    "eae": ["pnf"],
    "eorum": ["pgm", "pge"],
    "earum": ["pgf"],
    "eis":["pdm", "pdf", "pde", "plm", "plf", "ple"],
    "iis":["pdm", "pdf", "pde", "plm", "plf", "ple"],
    "eos":["pam"],
    "eas":["paf"],
    "idem": ["snm", "sne", "sae"],
    "eadem":["snf", "slf", "pne", "pae"],
    "eiusdem": ["sgm", "sgf", "sge"],
    "eidem": ["sdm", "sdf", "sde"],
    "eundem": ["sam"],
    "eandem": ["saf"],
    "eodem": ["slm", "sle"],
    "iidem": ["pnm"],
    "eaedem": ["pnf"],
    "eorundem": ["pgm", "pge"],
    "earundem": ["pgf"],
    "iisdem": ["pdm", "pdf", "pde", "plm", "plf", "ple"],
    "eosdem": ["pam"],
    "easdem": ["paf"],
    "ipse": ["snm"],
    "ipsa": ["snf", "slf", "pne", "pae"],
    "ipsum": ["sne", "sam", "sae"],
    "ipsius": ["sgm", "sgf", "sge"],
    "ipsi": ["sdm", "sdf", "sde", "pnm"],
    "ipsam": ["saf"],
    "ipso": ["slm", "sle"],
    "ipsae": ["pnf"],
    "ipsorum": ["pgm", "pge"],
    "ipsarum": ["pgf"],
    "ipsis": ["pdm", "pdf", "pde", "plm", "plf", "ple"],
    "ipsos": ["pam"],
    "ipsas": ["paf"]
};
//https://de.wikibooks.org/wiki/Latein/_Grammatik/_Pronomina/_Demonstrativpronomina
let demonstrativpronomGRI = {
    "ἥ": [],
    "ὅ": [],
    "ὅδε": ["snm"],
    "ἥδε": ["snf"],
    "τόδε": ["sne", "sae"],
    "οἵδε": ["pnm"],
    "αἵδε": ["pnf"],
    "τάδε": ["pne", "pae"],
    "τούτω": ["unm", "une", "uam", "uae"],
    "ταύτα":["unf", "uaf"],
    "τοῦδε": ["sgm", "sge"],
    "τῆσδε": ["sgf"],
    "τῶνδε": ["pgm", "pgf", "pge"],
    "τούτοιν": ["ugm", "uge", "udm", "ude"],
    "ταύταιν": ["ugf", "udf"],
    "τῷδε": ["sdm", "sde"],
    "τῇδε": ["sdf"],
    "τοῖσδε": ["pdm", "pde"],
    "ταῖσδε": ["pdf"],
    "τόνδε": ["sam"],
    "τήνδε": ["saf"],
    "τούσδε": ["pam"],
    "τάσδε": ["paf"],
    "ἐκεῖνος": ["snm"],
    "ἐκείνη": ["snf"],
    "ἐκεῖνο": ["sne"],
    "ἐκεῖνοι": ["pnm"],
    "ἐκεῖναι": ["pnf"],
    "ἐκεῖνα": ["pne", "pae"],
    "ἐκείνου": ["sgm", "sge"],
    "ἐκείνης": ["sgf"],
    "ἐκείνων": ["pgm", "pgf", "pge"],
    "ἑκείνῳ": ["sdm", "sdf", "sde"],
    "ἐκείνοις": ["pdm", "pde"],
    "ἐκείναις": ["pdf"],
    "ἐκεῖνον": ["sam"],
    "ἐκείνην": ["saf"],
    "ἐκεῖνο": ["sae"],
    //"ἐκείνους": ["pam"], //perseus labelt das als adjektiv
    "ἐκείνας": ["paf"],
    "οὗτος": ["snm"],
    "αὕτη": ["snf"],
    "τοῦτο": ["sne", "sae"],
    "οὗτοι": ["pnm"],
    "αὗται": ["pnf"],
    "ταῦτα": ["pne", "pae"],
    "ταῦτα": ["pne", "pae"],
    "τούτου": ["sgm", "sge"],
    "ταύτης": ["sgf"],
    "τούτων": ["pgm", "pgf", "pge"],
    "τούτῳ": ["sdm", "sde"],
    "ταύτῃ": ["sdf"],
    "τούτοις": ["pdm", "pde"],
    "ταύταις": ["pdf"],
    "τοῦτον": ["sam"],
    "ταύτην": ["saf"],
    "τούτους": ["pam"],
    "ταύτας": ["paf"]
    }; //einge demonstrativpronomen sind auch personal pronomen

let perspronomenGRI = {
    "ἐγώ": ["1snrT"],
    "ἔγωγε": ["1snrT"],
    "ἐμοῦ": ["1sgrT"],
    "μου": ["1sgrt"],
    "ἐμαυτοῦ": ["1sgRm"],
    "ἐμαυτῆς": ["1sgRf"],
    "ἐμοί": ["1sdrT"],
    "ἔμοιγε": ["1sdrT"],
    "μοι": ["1sdrt"],
    "ἐμαυτῷ": ["1sdRm"],
    "ἐμαυτῇ": ["1sdRf"],
    "ἐμέ": ["1sarT"],
    "ἐμέγε": ["1sarT"],
    "με": ["1sart"],
    "ἐμαυτόν": ["1saRm"],
    "ἐμαυτήν": ["1saRf"],
    "σύ": ["2snrT"],
    "σύγε": ["2snrT"],
    "σοῦ": ["2sgrT"],
    "σου":["2sgrt"],
    "σεαυτοῦ":["2sgRm"],
    "σαυτοῦ":["2sgRm"],
    "σεαυτῆς":["2sgRf"],
    "σαυτῆς":["2sgRf"],
    "σοί": ["2sdrT"],
    "σοίγε": ["2sdrT"],
    "σοι":["2sdrt"],
    "σεαυτῷ":["2sdRm"],
    "σαυτῷ":["2sdRm"],
    "σεαυτῇ":["2sdRf"],
    "σαυτῇ":["2sdRf"],
    "σέ": ["2sarT"],
    "σέγε": ["2sarT"],
    "σε": ["2sart"],
    "σεαυτόν": ["2saRm"],
    "σαυτόν": ["2saRm"],
    "σεαυτήν": ["2saRf"],
    "σαυτήν": ["2saRf"],
    "οὗτος": ["3snr"],
    "αὐτοῦ":["3sgr"],
    "ῆς":["3sgr"],
    "οῦ":["3sgr"],
    "οὗ":["3sgI"],
    "οὑ":["3sgI"],
    "ἑαυτοῦ":["3sgRi"],
    "ἑαυτῆς":["3sgRi"],
    "ἑαυτοῦ":["3sgRi"],
    "αὑτοῦ":["3sgRI"],
    "αὑτῆς":["3sgRI"],
    "αὑτοῦ":["3sgRI"],
    "αὐτῷ":["3sdr"],
    "ῇ":["3sdr"],
    "ῷ":["3sdr"],
    "οἷ":["3sdI"],
    "οἱ":["3sdI"],
    "ἑαυτῷ":["3sdRi"],
    "ἑαυτῇ":["3sdRi"],
    "ἑαυτῷ":["3sdRi"],
    "αὑτῷ":["3sdRI"],
    "αὑτῇ":["3sdRI"],
    "αὑτῷ":["3sdRI"],
    "αὐτόν":["3sar"],
    "ήν":["3sar"],
    "ό":["3sar"],
    "ἕ":["3saI"],
    "ἑ":["3saI"],
    "ἑαυτόν":["3saRi"],
    "ἑαυτήν":["3saRi"],
    "ἑαυτό":["3saRi"],
    "αὑτόν":["3saRI"],
    "αὑτήν":["3saRI"],
    "αὑτό":["3saRI"],
    "ἡμεῖς":["1pnr"],
    "ἡμῶν":["1pgr"],
    "ἡμῶν αὐτῶν":["1pgRm"],
    "ἡμῶν αὐτῶν":["1pgRf"],
    "ἡμῖν":["1pdr"],
    "ἡμῖν αὐτοῖς":["1pdRm"],
    "ἡμῖν αὐταῖς":["1pdRf"],
    "ἡμᾶς":["1par"],
    "ἡμᾶς αὐτούς":["1paRm"],
    "ἡμᾶς αὐτάς":["1paRf"],
    "ὑμεῖς":["2pnr"],
    "ὑμῶν":["2pgr"],
    "ὑμῶν αὐτῶν":["2pgRm"],
    "ὑμῶν αὐτῶν":["2pgRf"],
    "ὑμῖν":["2pdr"],
    "ὑμῖν αὐτοῖς":["2pdRm"],
    "ὑμῖν αὐταῖς":["2pdRf"],
    "ὑμᾶς":["2par"],
    "ὑμᾶς αὐτούς":["2paRm"],
    "ὑμᾶς αὐτάς":["2paRf"],
    "οὗτοι":["3pnr"],
    "σφεῖς":["3pnI"],
    "σφέας":["3pam", "3paf"],
    "αὐτῶν":["3pgr"],
    "σφῶν αὐτῶν": ["3pgRI"],
    "σφῶν":["3pgI"],
    "ἑαυτῶν":["3pgRi"],
    "αὐτοῖς":["3pdr"],
    "σφίσι":["3pdI"],
    "σφισι":["3pdI"],
    "σφίσιν":["3pdI"],
    "σφισιν":["3pdI"],
    "ἑαυτοῖς":["3pdRi"],
    "ἑαυταῖς":["3pdRi"],
    "αὑτοῖς":["3pdRi"],
    "αὑταῖς":["3pdRi"],
    "σφίσιν αὐτοῖς":["3pdRI"],
    "σφίσιν αὐταῖς":["3pdRI"],
    "αὐτούς":["3par"],
    "σφᾶς":["3paI"],
    "ἑαυτούς":["3paRi"],
    "ἑαυτάς":["3paRi"],
    "ἑαυτά":["3paRi"],
    "αὑτούς":["3paRi"],
    "αὑτάς":["3paRi"],
    "αὑτά":["3paRi"],
    "σφᾶς αὐτούς":["3paRI"],
    "φᾶς αὐτάς":["3paRI"],
    "σφᾶς αὐτά":["3paRI"],
    "νώ":["1unav"],
    "σφώ":["2unav"],
    "σφωέ":["3unav"],
    "νῷν":["1ugd"],
    "σφῷν":["2ugd"],
    "σφωΐν":["3ugd"]
    }; //stehen für jemanden - vorher im Text genannt?
let perspronomenLAT = {
    "ego":["sn1"],
    "nōs":["pn1", "pa1"],
    "mei":["sg1"],
    "nostri":["pg1"],
    "nostrum":["pg1"],
    "mihi":["sd1"],
    "nōbīs":["pd1", "pl1"],
    "mē":["sa1"],
    "nōbīscum":["pl1"],
    "mē":["sl1"],
    "mēcum":["sl1"],
    "tū":["sn2", "sv2"],
    "vōs":["pa2", "pv2", "pa2"],
    "tui":["sg2"],
    "vestri":["pg2"],
    "vestrum":["pg2"],
    "tibi":["sd2"],
    "vōbīs":["pd2", "pl2"],
    "tē":["sa2", "sl2"],
    "tēcum":["sl2"],
    "vōbīscum":["pl2"]
    };
let reflxivpronomenGRI = {}; //rückbezügliche Reflexion, von etwas im Text vorher?
let reflxivpronomenLAT = {
    "sui":["g"],
    "sibi":["d"],
    "sē":["a", "l"],
    "sēsē":["a", "l"]
    };
let indefinitpronomenGRI = {
    "τις": ["sn"],
    "τι": ["sn", "sa"],
    "τινός": ["sg"],
    "τινί": ["sd"],
    "τινές": ["pn"],
    "τινά": ["sa", "pn", "pa"],
    "τινῶν": ["pg"],
    "τισί": ["pd"],
    "τισίν": ["pd"],
    "τινάς":["pa"]		
}; //auf etwas undefiniertes, nicht vorher nicht nachher im Text?, Akzent auf der zweiten Silbe
let indefinitpronomenLAT = {
    "aliquis":["snm", "snf"],
    "aliquid":["sne", "sae"],
    "alicuius":["sgm", "sgf", "sge"],
    "alicui":["sdm", "sdf", "sde"],
    "aliquem":["sam", "saf"],
    "aliquo":["slm", "slf"],
    "aliqua":["sle", "snf", "slf"],
    "aliquare":["sle"],
    "aliqui":["snm"],
    "aliquod":["sne", "sae"],
    "aliquam":[],
    "quisquam":[],
    "quidquam":[],
    "quicquam":[],
    "cuiusquam":[],
    "cuiquam":[],
    "quemquam":[],
    "quoquam":[],
    "ullus":[],
    "ulla":[],
    "ullum":[],
    "ullius":[],
    "ulli":[],
    "ullam":[],
    "ullo":[],
    "quidam":[],
    "quaedam":[],
    "quiddam":[],
    "quoddam":[],
    "cuiusdam":[],
    "cuidam":[],
    "quendam":[],
    "quandam":[],
    "quodam":[],
    "quadam":[],
    "quorundam":[],
    "quarundam":[],
    "quibusdam":[],
    "quosdam":[],
    "quasdam":[]
    };
let negativpronomenGRI = {}; //Keiner
let negativpronomenLAT = {
    "nūllus":[],
    "nūlla":[],
    "nūllā":[],
    "nūllum":[],
    "nūllīus":[],
    "nūllī":[],
    "nūllam":[],
    "nūllō":[],
    "nūlle":[],
    "nūllae":[],
    "nūllōrum":[],
    "nūllārum":[],
    "nūllōs":[],
    "nūllās":[],
    "nūllīs":[],
    "nēmō":[],
    "nēminī":[],
    "nēminem":[],
    "neuter":[],
    "neutrīus":[],
    "neutrī":[],
    "neutrum":[],
    "neutra":[],
    "nihil":[],
    "nīl":[],
    "nihili":[],
    "nihilum":[],
    "nihilō":[]
    }; //Keiner etc
let determinativpronomenGRI = {}; //auf jemanden bestimmtes hinweisend
let interogativpronomenGRI = { //fragen einleitend
    "τίς":["sn"],
    "τί":["sn", "sa"],
    "τίνος":["sg"],
    "τίνι":["sd"],
    "τίνα":["sa", "pn", "pa"],
    "τίνες":["pn"],
    "τίνων":["pg"],
    "τίσι":["pd"],
    "τίσιν":["pd"],
    "τίνας":["pa"]
    }; //fragend wer, was; immer kaut auf der ersten Silbe
let interogativpronomenLAT = {
    "quis":[],
    "quid":[],
    "cuius":[],
    "cui":[],
    "quem":[],
    "quo":[],
    "qui":[],
    "quae":[],
    "quod":[],
    "quam":[],
    "qua":[],
    "quorum":[],
    "quarum":[],
    "quibus":[],
    "quos":[],
    "quas":[]
    };
let relativpronomenGRI = {};
let korrelativpronomenLAT = {
    "tam":[],
    "tantus":[],
    "tanta":[],
    "tantum":[],
    "tanti":[],
    "tantae":[],
    "tot":[],
    "totiens":[],
    "talis":[],
    "tale":[],
    "quantus":[],
    "quanta":[],
    "quantum":[],
    "quanti":[],
    "quantae":[],
    "quot":[],
    "quotiens":[],
    "qualis":[],
    "quale":[]
    };
let numeraladjektivaLAT = {
    "unus":[],
    "solus":[],
    "totus":[],
    "ullus":[],
    "uter":[],
    "alter":[],
    "neuter":[],
    "nullus":[]
    };
let reziprokpronomenGRI = {
    "ἀλλήλων":["gm", "gn"],
    "αλλήλων":["gf"],
    "ἀλλήλοιν":["gu", "du"],
    "ἀλλήλαιν":["du"],
    "ἀλλήλοις":["dm", "dn"],
    "ἀλλήλαις":["df"],
    "ἀλλήλους":["am"],
    "ἀλλήλας":["af"],
    "ἄλληλα":["an"],
    "ἀλλήλω":["au"],
    "ἀλλήλα":["au"]};

let possesivpronLAT = {
    "meus":[],
    "meusa":[],
    "meusum":[],
    "meusi":[],
    "meusae":[],
    "tuus":[],
    "tusa":[],
    "tusum":[],
    "tusi":[],
    "tusae":[],
    "suus":[],
    "susa":[],
    "susum":[],
    "susi":[],
    "susae":[],
    "eius":[],
    "mei":[],
    "meiae":[],
    "meii":[],
    "meiorum":[],
    "meiarum":[],
    "tui":[],
    "tuiae":[],
    "tuii":[],
    "tuiorum":[],
    "tuiarum":[],
    "sui":[],
    "surum":[],
    "surum":[],
    "meo":[],
    "meoae":[],
    "meoo":[],
    "meis":[],
    "tuo":[],
    "tuoae":[],
    "tuoo":[],
    "tuis":[],
    "suo":[],
    "suae":[],
    "suis":[],
    "meum":[],
    "meumam":[],
    "meumum":[],
    "meumos":[],
    "meumas":[],
    "meuma":[],
    "tuum":[],
    "tumam":[],
    "tumum":[],
    "tumos":[],
    "tumas":[],
    "tuma":[],
    "sum":[],
    "suam":[],
    "suum":[],
    "suarum":[],
    "suorum":[],
    "suos":[],
    "suas":[],
    "sua":[],
    "tuoa":[],
    "meoa":[],
    "suoa":[],
    "noster":[],
    "nostra":[],
    "nostrum":[],
    "nostri":[],
    "nostrae":[],
    "vester":[],
    "vestra":[],
    "vestrum":[],
    "vestri":[],
    "vestrae":[],
    "eorum":[],
    "earum":[],
    "eorum":[],
    "nostrorum":[],
    "nostrarum":[],
    "vestrorum":[],
    "vestrarum":[],
    "nostro":[],
    "nostris":[],
    "vestro":[],
    "vestris":[],
    "nostram":[],
    "nostras":[],
    "nostros":[],
    "vestram":[],
    "vestras":[],
    "vestros":[]
    };// ? https://de.wikibooks.org/wiki/Latein/_Grammatik/_Pronomina/_Possessivpronomina
//Partikel / konjunktion
let otiACIGRI = { "ὅτι": [],
				"ὅττι": []}; //dass
//et

let konjunktionSubjunktionLAT = {
    "et":[],
    "ac":[],
    "atque":[],
    "aut":[],
    "vel":[],
    "neve":[],
    "autem":[],
    "sed":[],
    "vero":[],
    "verum":[],
    "nam":[],
    "etenim":[],
    "enim":[],
    "cum":[],
    "ut":[],
    "uti":[],
    "ne":[],
    "quod":[],
    "quia":[],
    "quoniam":[],
    "quam":[],
    "atque":[],
    "quasi":[],
    "quam":[],
    "tamquam":[],
    "aeque":[],
    "secus":[],
    "velut":[],
    "si":[],
    "nisi":[],
    "quin":[],
    "quamquam":[],
    "tametsi":[],
    "etsi":[],
    "etiamsi":[],
    "quamvis":[],
    "postquam":[],
    "ubi":[],
    "simul":[],
    "simulatque":[],
    "simulac":[],
    "antequam":[],
    "priusquam":[],
    "dum":[],
    "quoad":[],
    "donec":[],
    "quamdiu":[]
};//http://longua.org/latein.konjunktionen.php
//https://learnattack.de/schuelerlexikon/latein/konjunktion
let interjektionLAT = {
    "ecce":[],
    "pro":[],
    "proh":[],
};
let fktpartikelLAT = { //Verneinung, Hervorhebung, Wunsch, Frage
    "non":[],
    "haud":[],
    "ne":[],
    "quidem":[],
    "etiam":[],
    "nōnne":[],
    "utinam":[]
    };
let verneinungpartikelGRI = {	
    "μή":[], 
    "οὐ":[], 
    "οὐκ":[], 
    "οὐχ":[],
    "οὔτε":[],
    "μήτε":[],
    "οὐδέ":[],
    "μηδέ":[],
    "οὐδείς":[],
    "οὐδεμία":[],
    "οὐδέν":[],
    "μηδείς":[],
    "μηδεμία":[],
    "μηδέν":[]		}; //letzte Verbindungenb sind Konjunktionen eher

let partikelGRI = {"δὲ":[""], "δὲ":[""], "δ᾽":[""],"δ'":[""], "ἄν":[""], "γε":[""], "δέ":[""], "δή":[""], "δὴ":[""], "ἐάν":[""], "ἕως":[""], "μήν": [""], "μέν":[""], "μὲν":[""], "μέντοι":[""], "τε":[""], "ἔτι":[""], "οὖν":[""], "ἤ":[""]};

let konjuncGRI = {"μέχρι":[], "ὅπως":[], "κὰι":[], "καί": [],  "καὶ":[], "γὰρ":[], "γάρ":[], "ὡς":[], "ὡς":[], "ἢ":[], "ἐπείτε":[], "εἰ":[]};
//kausal konjunktion
//temporal konjunktion (more: http://www.schyren-gymnasium.de/gramm/wa/konjunktion.htm)

//codierung: m-maskulin, f-feminin, e-neutrum, u-dual, s-singular, p-plural, n-nominativ, v-vokativ, g-genitiv, d-dativ, a-akkusativ, D-unbestimmt, B-bestimmt, r-nichtreflexiv, R-refelxiv, t-unbetont, T-betont, i direkt, I indirekt
//genera, numeri, kasus, best/unbest
let gammatischecodierung = { 
    "m": "maskulin", 
	"f": "feminin", 
	"e": "neutrum", 
	"u": "dual", 
	"s": "singular", 
	"p": "plural", 
	"n": "nominativ", 
	"v": "vokativ", 
	"g": "genitiv", 
	"d": "dativ", 
	"a": "akkusativ", 
	"D": "unbestimmt", 
	"B": "bestimmt", 
	"r": "nichtreflexiv", 
	"R": "refelxiv", 
	"t": "unbetont", 
	"T": "betont", 
	"i": "direkt", 
	"I": "indirekt",
    "1": "1",
    "2": "2",
    "3": "3"
    };
let istempus = { 
    "A":"Präsens",
    "W":"Imperfekt",
    "Q":"Futur",
    "Z":"Aorist",
    "O":"Perfect",
    "L":"Plusquamperfekt" 
    };
let iskasus = { 
    "n":"nominativ",
    "g":"genitiv", 
    "d":"dativ", 
    "a":"akkusativ",
    "v": "vokativ", 
    "l": "ablativ"
    };
let isgenus = { 
    "m": "maskulin", 
    "f": "feminin", 
    "e":"neutrum", 
    "u":"dual",
    "M":"medium",
    "K": "aktiv",
    "D": "passiv" 
    };
let isnumerus = {
    "s":"singular", 
    "p":"plural" 
    };
let ismodus = { 
    "V": "indikativ",
    "F": "konjunktiv",
    "o": "optativ",
    "m": "imperativ",
    "U": "infinitiv",
    "k": "partizip" 
    }; 

//from https://github.com/aurelberra/stopwords/blob/master/stopwords_greek.txt
let stopGR = { 
"ἃ" :1, 
"ἅ" :1, 
"ἀεὶ" :1, 
"ἀεί" :1, 
"αἱ" :1, 
"αἳ" :1, 
"αἵ" :1, 
"αἵδε" :1, 
"αἷς" :1, 
"αἷστισι" :1, 
"αἷστισιν" :1, 
"αἵτινες" :1, 
"ἀλλ" :1, 
"ἀλλ'" :1, 
"ἀλλ’" :1, 
"ἄλλα" :1, 
"ἀλλὰ" :1, 
"ἀλλά" :1, 
"ἄλλαι" :1, 
"ἄλλαις" :1, 
"ἄλλας" :1, 
"ἄλλη" :1, 
"ἄλλῃ" :1, 
"ἀλλήλα" :1, 
"ἀλλήλαις" :1, 
"ἀλλήλας" :1, 
"ἀλλήλοις" :1, 
"ἀλλήλους" :1, 
"ἀλλήλων" :1, 
"ἄλλην" :1, 
"ἄλλης" :1, 
"ἄλλο" :1, 
"ἄλλοι" :1, 
"ἄλλοις" :1, 
"ἄλλον" :1, 
"ἄλλος" :1, 
"ἄλλου" :1, 
"ἄλλῳ" :1, 
"ἄλλων" :1, 
"ἄλλως" :1, 
"ἅμ'" :1, 
"ἅμ’" :1, 
"ἅμα" :1, 
"ἀμφὶ" :1, 
"ἀμφί" :1, 
"ἂν" :1, 
"ἄν" :1, 
"ἄν'" :1, 
"ἄν’" :1, 
"ἀνὰ" :1, 
"ἀνά" :1, 
"ἄνευ" :1, 
"ἀνθ'" :1, 
"ἀνθ’" :1, 
"ἀντ'" :1, 
"ἀντ’" :1, 
"ἀντὶ" :1, 
"ἀντί" :1, 
"ἄνω" :1, 
"ἀπ" :1, 
"ἀπ'" :1, 
"ἀπ’" :1, 
"ἅπαν" :1, 
"ἅπαντα" :1, 
"ἅπαντας" :1, 
"ἅπαντες" :1, 
"ἅπαντι" :1, 
"ἅπαντος" :1, 
"ἁπάντων" :1, 
"ἅπας" :1, 
"ἅπασα" :1, 
"ἅπασαι" :1, 
"ἅπασαις" :1, 
"ἅπασαν" :1, 
"ἅπασας" :1, 
"ἅπασῃ" :1, 
"ἅπασης" :1, 
"ἅπασι" :1, 
"ἁπάσων" :1, 
"ἁπλῶς" :1, 
"ἀπὸ" :1, 
"ἀπό" :1, 
"ἄρ'" :1, 
"ἄρ’" :1, 
"ἄρα" :1, 
"ἆρα" :1, 
"ἃς" :1, 
"ἅς" :1, 
"ἅστινας" :1, 
"ἀτὰρ" :1, 
"ἀτάρ" :1, 
"ἅτε" :1, 
"ἅτινα" :1, 
"αὖ" :1, 
"αὖθις" :1, 
"αὔτ'" :1, 
"αὔτ’" :1, 
"αὕτ'" :1, 
"αὕτ’" :1, 
"αὐτὰ" :1, 
"αὐτά" :1, 
"αὑτὰ" :1, 
"αὑτά" :1, 
"αὐταὶ" :1, 
"αὐταί" :1, 
"αὗται" :1, 
"αὐταὶς" :1, 
"αὐταίς" :1, 
"αὑταὶς" :1, 
"αὑταίς" :1, 
"αὐτὰς" :1, 
"αὐτάς" :1, 
"αὑτὰς" :1, 
"αὑτάς" :1, 
"αὐτὴ" :1, 
"αὐτῇ" :1, 
"αὕτη" :1, 
"αὑτῇ" :1, 
"αὐτὴν" :1, 
"αὐτήν" :1, 
"αὑτὴν" :1, 
"αὑτήν" :1, 
"αὐτῆς" :1, 
"αὑτῆς" :1, 
"αὐτὸ" :1, 
"αὐτό" :1, 
"αὑτό" :1, 
"αὐτοὶ" :1, 
"αὑτοί" :1, 
"αὐτοῖς" :1, 
"αὑτοῖς" :1, 
"αὐτὸν" :1, 
"αὐτόν" :1, 
"αὑτὸν" :1, 
"αὑτόν" :1, 
"αὐτὸς" :1, 
"αὐτός" :1, 
"αὐτοῦ" :1, 
"αὑτοῦ" :1, 
"αὐτοὺς" :1, 
"αὐτούς" :1, 
"αὑτοὺς" :1, 
"αὑτούς" :1, 
"αὐτῷ" :1, 
"αὑτῷ" :1, 
"αὐτῶν" :1, 
"αὑτῶν" :1, 
"ἀφ" :1, 
"ἀφ'" :1, 
"ἀφ’" :1, 
"γ'" :1, 
"γ’" :1, 
"γὰρ" :1, 
"γάρ" :1, 
"γε" :1, 
"γοῦν" :1, 
"δ'" :1, 
"δ’" :1, 
"δαί" :1, 
"δὲ" :1, 
"δέ" :1, 
"δεῖ" :1, 
"δεύτερα" :1, 
"δεύτεραι" :1, 
"δεύτεραις" :1, 
"δεύτερας" :1, 
"δεύτερη" :1, 
"δεύτερῃ" :1, 
"δεύτερην" :1, 
"δεύτερης" :1, 
"δεύτεροι" :1, 
"δεύτεροις" :1, 
"δεύτερον" :1, 
"δεύτερος" :1, 
"δεύτερου" :1, 
"δεύτερους" :1, 
"δεύτερῳ" :1, 
"δεύτερων" :1, 
"δὴ" :1, 
"δή" :1, 
"δῆτ'" :1, 
"δῆτ’" :1, 
"δῆτα" :1, 
"δι" :1, 
"δι'" :1, 
"δι’" :1, 
"διὰ" :1, 
"διά" :1, 
"διὸ" :1, 
"διό" :1, 
"διότι" :1, 
"δύο" :1, 
"δυοῖν" :1, 
"ἐὰν" :1, 
"ἐάν" :1, 
"ἑαυτὰ" :1, 
"ἑαυτά" :1, 
"ἑαυταῖς" :1, 
"ἑαυτὰς" :1, 
"ἑαυτάς" :1, 
"ἑαυτῇ" :1, 
"ἑαυτήν" :1, 
"ἑαυτῆς" :1, 
"ἑαυτὸ" :1, 
"ἑαυτό" :1, 
"ἑαυτοῖς" :1, 
"ἑαυτὸν" :1, 
"ἑαυτόν" :1, 
"ἑαυτοῦ" :1, 
"ἑαυτῷ" :1, 
"ἑαυτῶν" :1, 
"ἐγω" :1, 
"ἐγὼ" :1, 
"ἐγώ" :1, 
"εἰ" :1, 
"εἲ" :1, 
"εἴεἴη" :1, 
"εἴθ'" :1, 
"εἴθ’" :1, 
"εἶθ'" :1, 
"εἶθ’" :1, 
"εἴθε" :1, 
"εἰμι" :1, 
"εἰμὶ" :1, 
"εἰμί" :1, 
"εἶναι" :1, 
"εἴπερ" :1, 
"εἰς" :1, 
"εἷς" :1, 
"εἰσι" :1, 
"εἰσὶ" :1, 
"εἰσί" :1, 
"εἰσὶν" :1, 
"εἰσίν" :1, 
"εἰσιν" :1, 
"εἴτ'" :1, 
"εἴτ’" :1, 
"εἶτ'" :1, 
"εἶτ’" :1, 
"εἶτα" :1, 
"εἴτε" :1, 
"ἐκ" :1, 
"ἕκαστα" :1, 
"ἕκασται" :1, 
"ἑκάσταις" :1, 
"ἑκάστας" :1, 
"ἑκάστηἑκάστῃ" :1, 
"ἑκάστην" :1, 
"ἑκάστης" :1, 
"ἕκαστοι" :1, 
"ἑκάστοις" :1, 
"ἕκαστον" :1, 
"ἕκαστος" :1, 
"ἑκάστου" :1, 
"ἑκάστους" :1, 
"ἑκάστῳ" :1, 
"ἑκάστων" :1, 
"ἐκεῖ" :1, 
"ἐκεῖνα" :1, 
"ἐκεῖναι" :1, 
"ἐκείναις" :1, 
"ἐκείνας" :1, 
"ἐκείνη" :1, 
"ἐκείνῃ" :1, 
"ἐκείνην" :1, 
"ἐκείνης" :1, 
"ἐκεῖνο" :1, 
"ἐκεῖνοι" :1, 
"ἐκείνοις" :1, 
"ἐκεῖνον" :1, 
"ἐκεῖνος" :1, 
"ἐκείνου" :1, 
"ἐκείνους" :1, 
"ἐκείνῳ" :1, 
"ἐκείνων" :1, 
"ἐμὰ" :1, 
"ἐμά" :1, 
"ἐμαὶ" :1, 
"ἐμαί" :1, 
"ἐμαῖς" :1, 
"ἐμὰς" :1, 
"ἐμάς" :1, 
"ἐμὲ" :1, 
"ἐμέ" :1, 
"ἐμὴ" :1, 
"ἐμή" :1, 
"ἐμῇ" :1, 
"ἐμὴν" :1, 
"ἐμήν" :1, 
"ἐμῆς" :1, 
"ἐμοὶ" :1, 
"ἐμοί" :1, 
"ἐμὸν" :1, 
"ἐμόν" :1, 
"ἐμὸς" :1, 
"ἐμός" :1, 
"ἐμοῦ" :1, 
"ἐμοὺς" :1, 
"ἐμούς" :1, 
"ἐμῷ" :1, 
"ἐμῶν" :1, 
"ἐν" :1, 
"ἓν" :1, 
"ἕν" :1, 
"ἕν'" :1, 
"ἕν’" :1, 
"ἕνα" :1, 
"ἕνεκ'" :1, 
"ἕνεκ’" :1, 
"ἕνεκα" :1, 
"ἔνθ'" :1, 
"ἔνθ’" :1, 
"ἔνθα" :1, 
"ἐνθάδε" :1, 
"ἑνὶ" :1, 
"ἑνί" :1, 
"ἑνὸς" :1, 
"ἑνός" :1, 
"ἐνταῦθ'" :1, 
"ἐνταῦθ’" :1, 
"ἐνταῦθα" :1, 
"ἐντεῦθεν" :1, 
"ἐξ" :1, 
"ἔξω" :1, 
"ἐπ'" :1, 
"ἐπ’" :1, 
"επ" :1, 
"ἐπεὶ" :1, 
"ἐπεί" :1, 
"ἐπειδὴ" :1, 
"ἐπειδή" :1, 
"ἐπειθ'" :1, 
"ἐπειθ’" :1, 
"ἔπειτ'" :1, 
"ἔπειτ’" :1, 
"ἔπειτα" :1, 
"ἐπὶ" :1, 
"ἐπί" :1, 
"ἐςἔσται" :1, 
"ἔστι" :1, 
"ἐστι" :1, 
"ἐστὶ" :1, 
"ἐστί" :1, 
"ἔστιν" :1, 
"ἐστὶν" :1, 
"ἐστίν" :1, 
"ἐστιν" :1, 
"ἐσ": 1, //?
"ἔτ'" :1, 
"ἔτ’" :1, 
"ἕτερα" :1, 
"ἑτέρᾳ" :1, 
"ἑτέραις" :1, 
"ἑτέραν" :1, 
"ἑτέρας" :1, 
"ἕτεροι" :1, 
"ἑτέροις" :1, 
"ἕτερον" :1, 
"ἕτερος" :1, 
"ἑτέρου" :1, 
"ἑτέρους" :1, 
"ἑτέρῳ" :1, 
"ἑτέρων" :1, 
"ἔτη" :1, 
"ἔτι" :1, 
"εὖ" :1, 
"εὐθὺς" :1, 
"ἐφ" :1, 
"ἐφ'" :1, 
"ἐφ’" :1, 
"ἕως" :1,  
"ἢ" :1, 
"ἤ" :1, 
"ἦ" :1, 
"ᾖ" :1, 
"ἡ" :1, 
"ἣ" :1, 
"ἥ" :1, 
"ᾗ" :1, 
"ἤγουν" :1, 
"ἥδε" :1, 
"ἤδη" :1, 
"ἡμᾶς" :1, 
"ἡμεῖς" :1, 
"ἡμῖν" :1, 
"ἡμῶν" :1, 
"ἢν" :1, 
"ἤν" :1, 
"ᾖν" :1, 
"ἦν" :1, 
"ἣν" :1, 
"ἥν" :1, 
"ην" :1, 
"ἡνίκ'" :1, 
"ἡνίκ’" :1, 
"ἡνίκα" :1, 
"ἡνίχ'" :1, 
"ἡνίχ’" :1, 
"ἥντινα" :1, 
"ἧς" :1, 
"ης" :1, 
"ἦσαν" :1, 
"ἤτοι" :1, 
"θ'" :1, 
"θ’" :1, 
"ἵν'" :1, 
"ἵν’" :1, 
"ἵνα" :1, 
"καθ" :1, 
"καθ'" :1, 
"καθ’" :1, 
"καθάπερ" :1, 
"καὶ" :1, 
"καί" :1, 
"καίπερ" :1, 
"καίτοι" :1, 
"κἂν" :1, 
"κἄν" :1, 
"κἀν" :1, 
"κατ" :1, 
"κατ'" :1, 
"κατ’" :1, 
"κάτ" :1, 
"κᾶτ" :1, 
"κατὰ" :1, 
"κατά" :1, 
"κάτω" :1, 
"κε" :1, 
"κεῖναι" :1, 
"κείναις" :1, 
"κεινὰς" :1, 
"κεινάς" :1, 
"κείνη" :1, 
"κείνῃ" :1, 
"κεινὴ" :1, 
"κεινή" :1, 
"κεινὴν" :1, 
"κεινήν" :1, 
"κεινοὶ" :1, 
"κεινοί" :1, 
"κείνοις" :1, 
"κεινὸν" :1, 
"κεινόν" :1, 
"κεῖνος" :1, 
"κείνου" :1, 
"κείνους" :1, 
"κείνῳ" :1, 
"κεινῶν" :1, 
"κεν" :1, 
"λοιπὸν" :1, 
"μὰ" :1, 
"μά" :1, 
"μάλισθ'" :1, 
"μάλισθ’" :1, 
"μάλιστ'" :1, 
"μάλιστ’" :1, 
"μάλιστα" :1, 
"μᾶλλον" :1, 
"με" :1, 
"μέγα" :1, 
"μεθ" :1, 
"μεθ'" :1, 
"μεθ’" :1, 
"μὲν" :1, 
"μέν" :1, 
"μἐν" :1, 
"μέντοι" :1, 
"μετ" :1, 
"μετ'" :1, 
"μετ’" :1, 
"μετὰ" :1, 
"μετά" :1, 
"μεταξὺ" :1, 
"μέχρι" :1, 
"μὴ" :1, 
"μή" :1, 
"μηδὲ" :1, 
"μηδεὶς" :1, 
"μηδείς" :1, 
"μηδεμία" :1, 
"μηδεμίᾳ" :1, 
"μηδεμιᾶς" :1, 
"μηδὲν" :1, 
"μηδέν" :1, 
"μηδένα" :1, 
"μηδένας" :1, 
"μηδένες" :1, 
"μηδενὶ" :1, 
"μηδενί" :1, 
"μηδενὸς" :1, 
"μηδενός" :1, 
"μηδένων" :1, 
"μηδέσι" :1, 
"μηδέσιν" :1, 
"μὴν" :1, 
"μήν" :1, 
"μήτε" :1, 
"μία" :1, 
"μιᾷ" :1, 
"μίαν" :1, 
"μιᾶς" :1, 
"μοι" :1, 
"μόνα" :1, 
"μόναις" :1, 
"μόνας" :1, 
"μόνη" :1, 
"μόνῃ" :1, 
"μόνην" :1, 
"μόνης" :1, 
"μόνοι" :1, 
"μόνοις" :1, 
"μόνον" :1, 
"μόνος" :1, 
"μόνου" :1, 
"μόνους" :1, 
"μόνῳ" :1, 
"μόνων " :1, 
"μου" :1, 
"ναί" :1, 
"ναὶ" :1, 
"νῦν" :1, 
"ὁ" :1, 
"ὃ" :1, 
"ὅ" :1, 
"ὅδε" :1, 
"ὅθεν" :1, 
"οἱ" :1, 
"οἳ" :1, 
"οἵ" :1, 
"οἷ" :1, 
"οἵα" :1, 
"οἵᾳ" :1, 
"οἷα" :1, 
"οἷαι" :1, 
"οἵαις" :1, 
"οἵαν" :1, 
"οἵας" :1, 
"οἵδε" :1, 
"οἶμαι" :1, 
"οἷοι" :1, 
"οἵοις" :1, 
"οἷον" :1, 
"οἷος" :1, 
"οἵου" :1, 
"οἵους" :1, 
"οἷς" :1, 
"οἷστισι" :1, 
"οἷστισιν" :1, 
"οἵτινες" :1, 
"οἵῳ" :1, 
"οἵων" :1, 
"ὅλως" :1, 
"ὁμοίως" :1, 
"ὁμοῦ" :1, 
"ὅμως" :1, 
"ὂν" :1, 
"ὄν" :1, 
"ὃν" :1, 
"ὄνθ'" :1, 
"ὄνθ’" :1, 
"ὄντ'" :1, 
"ὄντ’" :1, 
"ὄντα" :1, 
"ὄντας" :1, 
"ὄντες" :1, 
"ὄντι" :1, 
"ὅντινα" :1, 
"ὄντος" :1, 
"ὄντων" :1, 
"ὅπερ" :1, 
"ὅπῃ" :1, 
"ὁπόθεν" :1, 
"ὅποι" :1, 
"ὁποίᾳ" :1, 
"ὁποῖα" :1, 
"ὁποῖαι" :1, 
"ὁποίαις" :1, 
"ὁποίαν" :1, 
"ὁποίας" :1, 
"ὁποῖοι" :1, 
"ὁποίοις" :1, 
"ὁποῖον" :1, 
"ὁποῖος" :1, 
"ὁποίου" :1, 
"ὁποίῳ" :1, 
"ὁποίων" :1, 
"ὁπόσα" :1, 
"ὁπόσαι" :1, 
"ὁπόσαισ" :1, 
"ὁπόσασ" :1, 
"ὁπόσην" :1, 
"ὁπόσης" :1, 
"ὁπόσοι" :1, 
"ὁπόσοις" :1, 
"ὁπόσον" :1, 
"ὁπόσος" :1, 
"ὁπόσου" :1, 
"ὁπόσους" :1, 
"ὁπόσῳ" :1, 
"ὁπόσων" :1, 
"ὁπότε" :1, 
"ὅπου" :1, 
"ὅπως" :1, 
"ὃς" :1, 
"ὅς" :1, 
"ὅσα" :1, 
"ὅσᾳ" :1, 
"ὅσαι" :1, 
"ὅσαις" :1, 
"ὅσῃ" :1, 
"ὅσην" :1, 
"ὅσης" :1, 
"ὅσοις" :1, 
"ὅσον" :1, 
"ὅσος" :1, 
"ὅσου" :1, 
"ὅστις" :1, 
"ὅσῳ" :1, 
"ὅσων" :1, 
"ὅταν" :1, 
"ὅτε" :1, 
"ὅτι" :1, 
"ὅτου" :1, 
"ὅτῳ" :1, 
"οὐ" :1, 
"οὗ" :1, 
"οὐδ" :1, 
"οὐδ'" :1, 
"οὐδ’" :1, 
"οὐδὲ" :1, 
"οὐδέ" :1, 
"οὐδεὶς" :1, 
"οὐδείς" :1, 
"οὐδεμία" :1, 
"οὐδεμίᾳ" :1, 
"οὐδεμίαν" :1, 
"οὐδεμιᾶς" :1, 
"οὐδὲν" :1, 
"οὐδέν" :1, 
"οὐδένας" :1, 
"οὐδένες" :1, 
"οὐδενὶ" :1, 
"οὐδενί" :1, 
"οὐδενὸς" :1, 
"οὐδενός" :1, 
"οὐδένων" :1, 
"οὐδέσι" :1, 
"οὐδέσιν" :1, 
"οὐθ'" :1, 
"οὐθ’" :1, 
"οὐκ" :1, 
"οὐκέτι" :1, 
"οὔκουν" :1, 
"οὐκοῦν" :1, 
"οὖν" :1, 
"οῦν" :1, 
"οὓς" :1, 
"οὖσα" :1, 
"οὖσαι" :1, 
"οὔσαις" :1, 
"οὖσαν" :1, 
"οὔσας" :1, 
"οὔσῃ" :1, 
"οὔσης" :1, 
"οὖσι" :1, 
"οὐσίαν" :1, 
"οὐσίας" :1, 
"οὖσιν" :1, 
"οὕστινας" :1, 
"οὔσων" :1, 
"οὔτ'" :1, 
"οὔτ’" :1, 
"οὔτε" :1, 
"οὔτι" :1, 
"οὗτινος" :1, 
"οὗτοι" :1, 
"οὗτος" :1, 
"οὕτω" :1, 
"οὕτως" :1, 
"οὑτῶς" :1, 
"οὐχ" :1, 
"οὐχὶ" :1, 
"οὐχί" :1, 
"πάλιν" :1, 
"πᾶν" :1, 
"πάνθ'" :1, 
"πάνθ’" :1, 
"πάντ'" :1, 
"πάντ’" :1, 
"πάντα" :1, 
"πάντας" :1, 
"πάντες" :1, 
"παντὶ" :1, 
"παντί" :1, 
"παντὸς" :1, 
"παντός" :1, 
"πάντων" :1, 
"πάντως" :1, 
"πάνυ" :1, 
"παρ" :1, 
"παρ'" :1, 
"παρ’" :1, 
"παρὰ" :1, 
"παρά" :1, 
"πᾶς" :1, 
"πᾶσ'" :1, 
"πᾶσ’" :1, 
"πᾶσα" :1, 
"πᾶσαι" :1, 
"πάσαις" :1, 
"πάσαισι" :1, 
"πᾶσαν" :1, 
"πάσας" :1, 
"πάσῃ" :1, 
"πάσης" :1, 
"πᾶσι" :1, 
"πᾶσιν" :1, 
"περὶ" :1, 
"περί" :1, 
"πῇ" :1, 
"πῃ" :1, 
"πλέον" :1, 
"πλὴν" :1, 
"πλήν" :1, 
"πόθ'" :1, 
"πόθ’" :1, 
"ποθ'" :1, 
"ποθ’" :1, 
"πόθεν" :1, 
"ποι" :1, 
"ποῖ" :1, 
"ποία" :1, 
"ποίᾳ" :1, 
"ποῖα" :1, 
"ποῖαι" :1, 
"ποίαις" :1, 
"ποίαν" :1, 
"ποίας" :1, 
"ποῖοι" :1, 
"ποίοις" :1, 
"ποῖον" :1, 
"ποῖος" :1, 
"ποίου" :1, 
"ποίους" :1, 
"ποίῳ" :1, 
"ποίων" :1, 
"πολλ'" :1, 
"πολλ’" :1, 
"πολλὰ" :1, 
"πολλά" :1, 
"πολλαὶ" :1, 
"πολλαί" :1, 
"πολλαῖς" :1, 
"πολλαῖσιν" :1, 
"πολλάκις" :1, 
"πολλὰς" :1, 
"πολλάς" :1, 
"πολλὴ" :1, 
"πολλή" :1, 
"πολλὴν" :1, 
"πολλήν" :1, 
"πολλῆς" :1, 
"πολλοὶ" :1, 
"πολλοί" :1, 
"πολλοῖς" :1, 
"πολλοῖσι" :1, 
"πολλοῖσιν" :1, 
"πολλοῦ" :1, 
"πολλοὺς" :1, 
"πολλούς" :1, 
"πολλῷ" :1, 
"πολλῶν" :1, 
"πολὺ" :1, 
"πολύ" :1, 
"πολὺν" :1, 
"πολύν" :1, 
"πολὺς" :1, 
"πολύς" :1, 
"πόσα" :1, 
"πόσαι" :1, 
"πόσαις" :1, 
"πόσας" :1, 
"πόση" :1, 
"πόσῃ" :1, 
"πόσην" :1, 
"πόσης" :1, 
"πόσοι" :1, 
"πόσοις" :1, 
"πόσον" :1, 
"πόσος" :1, 
"πόσου" :1, 
"πόσους" :1, 
"πόσῳ" :1, 
"πόσων" :1, 
"πότ'" :1, 
"πότ’" :1, 
"ποτ'" :1, 
"ποτ’" :1, 
"πότε" :1, 
"ποτε" :1, 
"ποτὲ" :1, 
"ποτέ" :1, 
"που" :1, 
"ποὺ" :1, 
"πού" :1, 
"ποῦ" :1, 
"πρὶν" :1, 
"πρίν" :1, 
"προ" :1, 
"πρὸ" :1, 
"πρό" :1, 
"πρὸς" :1, 
"πρός" :1, 
"πρότερον" :1, 
"πρῶτον" :1, 
"πώς" :1, 
"πῶς" :1, 
"πως" :1, 
"σ'" :1, 
"σ’" :1, 
"σαὶ" :1, 
"σαί" :1, 
"σαῖς" :1, 
"σε" :1, 
"σὲ" :1, 
"σέ" :1, 
"σὴ" :1, 
"σή" :1, 
"σῇ" :1, 
"σήν" :1, 
"σῆς" :1, 
"σοι" :1, 
"σοὶ" :1, 
"σοί" :1, 
"σὸν" :1, 
"σόν" :1, 
"σὸς" :1, 
"σός" :1, 
"σου" :1, 
"σού" :1, 
"σοῦ" :1, 
"σὺ" :1, 
"σύ" :1, 
"σὺν" :1, 
"σύν" :1, 
"σφέτερ'" :1, 
"σφέτερ’" :1, 
"σφέτερα" :1, 
"σφετέρᾳ" :1, 
"σφετέραις" :1, 
"σφετέραν" :1, 
"σφετέρας" :1, 
"σφετέροις" :1, 
"σφέτερον" :1, 
"σφέτερος" :1, 
"σφετέρου" :1, 
"σφετέρους" :1, 
"σφετέρῳ" :1, 
"σφετέρων" :1, 
"σῶν" :1, 
"τ'" :1, 
"τ’" :1, 
"τὰ" :1, 
"τά" :1, 
"τάδε" :1, 
"ταῖν" :1, 
"ταῖς" :1, 
"ταῖσδε" :1, 
"τὰς" :1, 
"τάς" :1, 
"τάσδε" :1, 
"ταῦτα" :1, 
"ταύταις" :1, 
"ταύτας" :1, 
"ταύτῃ" :1, 
"ταύτην" :1, 
"ταύτης" :1, 
"τε" :1, 
"τέ" :1, 
"τῇ" :1, 
"τῇδε" :1, 
"τὴν" :1, 
"τήν" :1, 
"τήνδε" :1, 
"τὴς" :1, 
"τῆς" :1, 
"της" :1, 
"τῆσδε" :1, 
"τι" :1, 
"τὶ" :1, 
"τί" :1, 
"τίν'" :1, 
"τίν’" :1, 
"τιν'" :1, 
"τιν’" :1, 
"τίνα" :1, 
"τινα" :1, 
"τινὰ" :1, 
"τινά" :1, 
"τίνας" :1, 
"τινάς" :1, 
"τίνε" :1, 
"τινέ" :1, 
"τίνες" :1, 
"τινές" :1, 
"τινες" :1, 
"τίνι" :1, 
"τινι" :1, 
"τινὶ" :1, 
"τινί" :1, 
"τινοῖν" :1, 
"τινοιν" :1, 
"τινὸς" :1, 
"τινός" :1, 
"τινος" :1, 
"τίνων" :1, 
"τινών" :1, 
"τινῶν" :1, 
"τινων" :1, 
"τὶς" :1, 
"τίς" :1, 
"τις" :1, 
"τίσι" :1, 
"τισι" :1, 
"τισὶ" :1, 
"τισί" :1, 
"τίσιν" :1, 
"τισὶν" :1, 
"τισίν" :1, 
"τισιν" :1, 
"τὸ" :1, 
"τό" :1, 
"τοι" :1, 
"τοὶ" :1, 
"τοί" :1, 
"τοιάδε" :1, 
"τοιᾷδε" :1, 
"τοιαίδε" :1, 
"τοιαῖσδε" :1, 
"τοιάνδε" :1, 
"τοιάσδε" :1, 
"τοιᾶσδε" :1, 
"τοιαῦθ'" :1, 
"τοιαῦθ’" :1, 
"τοιαῦτ'" :1, 
"τοιαῦτ’" :1, 
"τοιαῦτα" :1, 
"τοιαῦται" :1, 
"τοιαύταις" :1, 
"τοιαύτας" :1, 
"τοιαύτη" :1, 
"τοιαύτῃ" :1, 
"τοιαύτην" :1, 
"τοιαύτης" :1, 
"τοῖν" :1, 
"τοίνυν" :1, 
"τοιοίδε" :1, 
"τοιοῖσδε" :1, 
"τοιόνδε" :1, 
"τοιόσδε" :1, 
"τοιοῦδε" :1, 
"τοιοῦθ'" :1, 
"τοιοῦθ’" :1, 
"τοιούσδε" :1, 
"τοιοῦτ'" :1, 
"τοιοῦτ’" :1, 
"τοιοῦτο" :1, 
"τοιοῦτό" :1, 
"τοιοῦτοι" :1, 
"τοιούτοις" :1, 
"τοιοῦτον" :1, 
"τοιοῦτος" :1, 
"τοιούτου" :1, 
"τοιούτους" :1, 
"τοιούτῳ" :1, 
"τοιούτων" :1, 
"τοῖς" :1, 
"τοῖσδε" :1, 
"τοιῷδε" :1, 
"τοιῶνδε" :1, 
"τὸν" :1, 
"τόν" :1, 
"τόνδ'" :1, 
"τόνδ’" :1, 
"τόνδε" :1, 
"τοσάδε" :1, 
"τοσαίδε" :1, 
"τοσαῖσδε" :1, 
"τοσάσδε" :1, 
"τοσαῦτ'" :1, 
"τοσαῦτ’" :1, 
"τοσαῦτα" :1, 
"τοσαῦται" :1, 
"τοσαύταις" :1, 
"τοσαύτη" :1, 
"τοσαύτῃ" :1, 
"τοσαύτην" :1, 
"τοσαύτης" :1, 
"τοσήδε" :1, 
"τοσῇδε" :1, 
"τοσήνδε" :1, 
"τοσῆσδε" :1, 
"τοσοίδε" :1, 
"τοσοῖσδε" :1, 
"τοσόνδε" :1, 
"τοσόσδε" :1, 
"τοσοῦδε" :1, 
"τοσοῦθ'" :1, 
"τοσοῦθ’" :1, 
"τοσούσδε" :1, 
"τοσοῦτ'" :1, 
"τοσοῦτ’" :1, 
"τοσοῦτο" :1, 
"τοσοῦτοι" :1, 
"τοσούτοις" :1, 
"τοσοῦτον" :1, 
"τοσοῦτος" :1, 
"τοσούτου" :1, 
"τοσούτους" :1, 
"τοσούτῳ" :1, 
"τοσούτων" :1, 
"τοσῷδε" :1, 
"τοσῶνδε" :1, 
"τότ'" :1, 
"τότ’" :1, 
"τότε" :1, 
"τοτὲ" :1, 
"τοτέ" :1, 
"του" :1, 
"τοὺ" :1, 
"τού" :1, 
"τοῦ" :1, 
"τοῦδε" :1, 
"τοῦθ'" :1, 
"τοῦθ’" :1, 
"τοὺς" :1, 
"τούς" :1, 
"τούσδε" :1, 
"τοῦτ'" :1, 
"τοῦτ’" :1, 
"τουτέστι" :1, 
"τουτέστιν" :1, 
"τοῦτο" :1, 
"τούτοις" :1, 
"τοῦτον" :1, 
"τούτου" :1, 
"τούτους" :1, 
"τούτῳ" :1, 
"τούτων" :1, 
"τῷ" :1, 
"τώδε" :1, 
"τῷδε" :1, 
"τῶν" :1, 
"τῶνδ'" :1, 
"τῶνδ’" :1, 
"τῶνδε" :1, 
"ὑμᾶς" :1, 
"ὑμεῖς" :1, 
"ὑμέτερ'" :1, 
"ὑμέτερ’" :1, 
"ὑμέτερα" :1, 
"ὑμετέρα" :1, 
"ὑμετέρᾳ" :1, 
"ὑμέτεραι" :1, 
"ὑμετέραις" :1, 
"ὑμετέραν" :1, 
"ὑμετέρας" :1, 
"ὑμέτεροι" :1, 
"ὑμετέροις" :1, 
"ὑμέτερον" :1, 
"ὑμέτερος" :1, 
"ὑμετέρου" :1, 
"ὑμετέρους" :1, 
"ὑμετέρῳ" :1, 
"ὑμετέρων" :1, 
"ὑμῖν" :1, 
"ὑμῶν" :1, 
"ὑπ" :1, 
"ὑπ'" :1, 
"ὑπ’" :1, 
"ὑπὲρ" :1, 
"ὑπέρ" :1, 
"ὑπὸ" :1, 
"ὑπό" :1, 
"ὕστερον" :1, 
"ὑφ'" :1, 
"ὑφ’" :1, 
"χωρὶς" :1, 
"χωρίς" :1, 
"ὦ" :1, 
"ᾧ" :1, 
"ὧδ'" :1, 
"ὧδ’" :1, 
"ὧδε" :1, 
"ὢν" :1, 
"ὤν" :1, 
"ὧν" :1, 
"ὧντινων" :1, 
"ὥς" :1, 
"ὧς" :1, 
"ὡς" :1, 
"ὥσθ'" :1, 
"ὥσθ’" :1, 
"ὥσπερ" :1, 
"ὥστ'" :1, 
"ὥστ’" :1, 
"ὥστε" :1, 
"ὧτινι" :1 
}

let stopLA = {
"agr" :1, 
"ap" :1, 
"cn" :1, 
"mam" :1, 
"oct" :1, 
"opet" :1, 
"pro" :1, 
"ser" :1, 
"sert" :1, 
"sex" :1, 
"st" :1, 
"ti" :1, 
"uol" :1, 
"uop" :1, 
"vol" :1, 
"vop" :1, 
// CONJUNCTIONS
"ac" :1, 
"an" :1, 
"antequam" :1, 
"at" :1, 
"atque" :1, 
"aut" :1, 
"autem" :1, 
"donec" :1, 
"dum" :1, 
"enim" :1, 
"ergo" :1, 
"et" :1, 
"etenim" :1, 
"etiam" :1, 
"etiamsi" :1, 
"etsi" :1, 
"igitur" :1, 
"itaque" :1, 
"licet" :1, 
"nam" :1, 
"namque" :1, 
"ne" :1, 
"nec" :1, 
"necque" :1, 
"neque" :1, 
"ni" :1, 
"nisi" :1, 
"postquam" :1, 
"proinde" :1, 
"quamobrem" :1, 
"quamquam" :1, 
"quanquam" :1, 
"quare" :1, 
"que" :1, 
"quia" :1, 
"quomodo" :1, 
"quoniam" :1, 
"quoque" :1, 
"sed" :1, 
"seu" :1, 
"si" :1, 
"sin" :1, 
"siue" :1, 
"sive" :1, 
"tamen" :1, 
"tametsi" :1, 
"ue" :1, 
"uel" :1, 
"ut" :1, 
"utcunque" :1, 
"uterque" :1, 
"uti" :1, 
"utlibet" :1, 
"utne" :1, 
"utque" :1, 
"utraque" :1, 
"utrum" :1, 
"utrumque" :1, 
"utue" :1, 
"utve" :1, 
"ve" :1, 
"vel" :1, 
// PREPOSITIONS
"a" :1, 
"ab" :1, 
"abs" :1, 
"ad" :1, 
"aduersum" :1, 
"aduersus" :1, 
"adversum" :1, 
"adversus" :1, 
"ante" :1, 
"apud" :1, 
"circa" :1, 
"circum" :1, 
"contra" :1, 
"coram" :1, 
"cum" :1, 
"de" :1, 
"e" :1, 
"erga" :1, 
"ex" :1, 
"extra" :1, 
"in" :1, 
"infra" :1, 
"inter" :1, 
"intra" :1, 
"ob" :1, 
"penes" :1, 
"per" :1, 
"post" :1, 
"prae" :1, 
"praeter" :1, 
"pro" :1, 
"prope" :1, 
"propter" :1, 
"secundum" :1, 
"sine" :1, 
"sub" :1, 
"subter" :1, 
"super" :1, 
"supra" :1, 
"tenus" :1, 
"trans" :1, 
"ultra" :1, 
// ADVERBS 
"adeo" :1, 
"adhuc" :1, 
"aliquando" :1, 
"aliter" :1, 
"antea" :1, 
"certe" :1, 
"ceterum" :1, 
"cur" :1, 
"dein" :1, 
"deinde" :1, 
"demum" :1, 
"denique" :1, 
"diu" :1, 
"ecce" :1, 
"equidem" :1, 
"fere" :1, 
"forsitan" :1, 
"fortasse" :1, 
"forte" :1, 
"frustra" :1, 
"hactenus" :1, 
"haud" :1, 
"hinc" :1, 
"hodie" :1, 
"huc" :1, 
"iam" :1, 
"iamque" :1, 
"ibi" :1, 
"ideo" :1, 
"illic" :1, 
"immo" :1, 
"inde" :1, 
"interdum" :1, 
"interim" :1, 
"ita" :1, 
"item" :1, 
"iterum" :1, 
"iuxta" :1, 
"jam" :1, 
"jamque" :1, 
"juxta" :1, 
"magis" :1, 
"minime" :1, 
"minus" :1, 
"minusne" :1, 
"minusque" :1, 
"minusue" :1, 
"minusve" :1, 
"modo" :1, 
"mox" :1, 
"nihilo" :1, 
"nimirum" :1, 
"nimis" :1, 
"non" :1, 
"nondum" :1, 
"nonne" :1, 
"num" :1, 
"numquam" :1, 
"nunc" :1, 
"olim" :1, 
"omnino" :1, 
"paene" :1, 
"pariter" :1, 
"plane" :1, 
"plerumque" :1, 
"plus" :1, 
"plusne" :1, 
"plusque" :1, 
"plusue" :1, 
"plusve" :1, 
"postea" :1, 
"potius" :1, 
"praesertim" :1, 
"praeterea" :1, 
"primum" :1, 
"prius" :1, 
"priusquam" :1, 
"procul" :1, 
"profecto" :1, 
"protinus" :1, 
"qualibet" :1, 
"quam" :1, 
"quando" :1, 
"quasi" :1, 
"quatenus" :1, 
"quemadmodum" :1, 
"quidem" :1, 
"quin" :1, 
"quippe" :1, 
"quodam" :1, 
"quodammodo" :1, 
"quolibet" :1, 
"quondam" :1, 
"quot" :1, 
"quotiens" :1, 
"repente" :1, 
"rursum" :1, 
"rursus" :1, 
"saepe" :1, 
"sane" :1, 
"sat" :1, 
"satis" :1, 
"scilicet" :1, 
"semel" :1, 
"semper" :1, 
"sic" :1, 
"sicut" :1, 
"sicuti" :1, 
"simul" :1, 
"solum" :1, 
"sponte" :1, 
"statim" :1, 
"tam" :1, 
"tamquam" :1, 
"tandem" :1, 
"tantum" :1, 
"tantummodo" :1, 
"tot" :1, 
"totiens" :1, 
"tum" :1, 
"tunc" :1, 
"ubi" :1, 
"uelut" :1, 
"uero" :1, 
"uidelicet" :1, 
"uix" :1, 
"ultro" :1, 
"umquam" :1, 
"unde" :1, 
"undique" :1, 
"usque" :1, 
"utique" :1, 
"velut" :1, 
"vero" :1, 
"videlicet" :1, 
"vix" :1, 
// PRONOUNS 
"ego" :1, 
"egon" :1, 
"egone" :1, 
"egoque" :1, 
"me" :1, 
"mecum" :1, 
"mecumque" :1, 
"mecumst" :1, 
"med" :1, 
"medem" :1, 
"mei" :1, 
"mein" :1, 
"meique" :1, 
"meme" :1, 
"memet" :1, 
"men" :1, 
"mene" :1, 
"meque" :1, 
"mest" :1, 
"mi" :1, 
"mihi" :1, 
"mihin" :1, 
"mihine" :1, 
"mihique" :1, 
"mihist" :1, 
"min" :1, 
"mine" :1, 
"mist" :1, 
// meus 
"mea" :1, 
"meae" :1, 
"meaeque" :1, 
"meai" :1, 
"meam" :1, 
"meamne" :1, 
"meamque" :1, 
"mean" :1, 
"meane" :1, 
"meaque" :1, 
"mearum" :1, 
"mearumque" :1, 
"meas" :1, 
"measque" :1, 
"meast" :1, 
"mee" :1, 
"mei" :1, 
"mein" :1, 
"meique" :1, 
"meis" :1, 
"meisque" :1, 
"meo" :1, 
"meon" :1, 
"meone" :1, 
"meoque" :1, 
"meost" :1, 
"meum" :1, 
"meumque" :1, 
"meumst" :1, 
"meumve" :1, 
"meus" :1, 
"meusque" :1, 
"meust" :1, 
"mi" :1, 
"min" :1, 
"mine" :1, 
"mist" :1, 
// tu 
"te" :1, 
"tecum" :1, 
"tecumque" :1, 
"ted" :1, 
"temet" :1, 
"ten" :1, 
"tenve" :1, 
"tenveque" :1, 
"tenvis" :1, 
"teque" :1, 
"test" :1, 
"teve" :1, 
"tibi" :1, 
"tibimet" :1, 
"tibin" :1, 
"tibique" :1, 
"tibist" :1, 
"tu" :1, 
"tui" :1, 
"tuin" :1, 
"tuine" :1, 
"tuique" :1, 
"tun" :1, 
"tune" :1, 
"tuque" :1, 
"tute" :1, 
"tutemet" :1, 
// tuus
"tua" :1, 
"tuae" :1, 
"tuaen" :1, 
"tuaeque" :1, 
"tuaest" :1, 
"tuaique" :1, 
"tuam" :1, 
"tuamne" :1, 
"tuamque" :1, 
"tuamst" :1, 
"tuamve" :1, 
"tuan" :1, 
"tuane" :1, 
"tuaque" :1, 
"tuarum" :1, 
"tuarumque" :1, 
"tuas" :1, 
"tuasne" :1, 
"tuasque" :1, 
"tuast" :1, 
"tuasue" :1, 
"tue" :1, 
"tuest" :1, 
"tui" :1, 
"tuin" :1, 
"tuine" :1, 
"tuique" :1, 
"tuis" :1, 
"tuisne" :1, 
"tuisque" :1, 
"tuo" :1, 
"tuom" :1, 
"tuomque" :1, 
"tuomst" :1, 
"tuon" :1, 
"tuoque" :1, 
"tuorum" :1, 
"tuorumque" :1, 
"tuos" :1, 
"tuosne" :1, 
"tuosque" :1, 
"tuost" :1, 
"tuosve" :1, 
"tuum" :1, 
"tuumne" :1, 
"tuumque" :1, 
"tuus" :1, 
"tuusque" :1, 
"tuusue" :1, 
// hic 
"hac" :1, 
"hacne" :1, 
"hae" :1, 
"haec" :1, 
"haecine" :1, 
"haecinest" :1, 
"haecne" :1, 
"haeque" :1, 
"haeve" :1, 
"han" :1, 
"hanc" :1, 
"hancine" :1, 
"hancne" :1, 
"hancque" :1, 
"hann" :1, 
"harum" :1, 
"harumque" :1, 
"has" :1, 
"hasce" :1, 
"hascine" :1, 
"hasne" :1, 
"hasque" :1, 
"hi" :1, 
"hic" :1, 
"hicine" :1, 
"hicinest" :1, 
"hicne" :1, 
"hin" :1, 
"hine" :1, 
"hinn" :1, 
"hique" :1, 
"his" :1, 
"hisce" :1, 
"hisdem" :1, 
"hisne" :1, 
"hisque" :1, 
"hoc" :1, 
"hocin" :1, 
"hocine" :1, 
"hocinest" :1, 
"hocne" :1, 
"hocque" :1, 
"hon" :1, 
"horum" :1, 
"horumque" :1, 
"horunc" :1, 
"hos" :1, 
"hosce" :1, 
"hosne" :1, 
"hosque" :1, 
"host" :1, 
"huic" :1, 
"huius" :1, 
"huiusce" :1, 
"huiusne" :1, 
"huiusque" :1, 
"huiusve" :1, 
"hujus" :1, 
"hujusce" :1, 
"hujusne" :1, 
"hujusque" :1, 
"hujusve" :1, 
"hum" :1, 
"hunc" :1, 
"huncne" :1, 
// ille
"illa" :1, 
"illae" :1, 
"illaeque" :1, 
"illam" :1, 
"illamne" :1, 
"illan" :1, 
"illane" :1, 
"illaque" :1, 
"illarum" :1, 
"illas" :1, 
"illasque" :1, 
"illast" :1, 
"illave" :1, 
"ille" :1, 
"illene" :1, 
"illest" :1, 
"illi" :1, 
"illique" :1, 
"illis" :1, 
"illisque" :1, 
"illist" :1, 
"illisue" :1, 
"illiue" :1, 
"illius" :1, 
"illiusque" :1, 
"illiust" :1, 
"illo" :1, 
"illoque" :1, 
"illorum" :1, 
"illos" :1, 
"illosque" :1, 
"illost" :1, 
"illud" :1, 
"illudne" :1, 
"illudque" :1, 
"illum" :1, 
"illumne" :1, 
"illumque" :1, 
"illumst" :1, 
"illumve" :1, 
"olla" :1, 
"ollae" :1, 
"ollam" :1, 
"ollarum" :1, 
"ollas" :1, 
"olle" :1, 
"olli" :1, 
"ollique" :1, 
"ollis" :1, 
"ollisque" :1, 
"ollius" :1, 
"ollo" :1, 
"ollos" :1, 
"ollosque" :1,  
// iste 
"ista" :1, 
"istae" :1, 
"istaec" :1, 
"istam" :1, 
"istamque" :1, 
"istanc" :1, 
"istane" :1, 
"istaque" :1, 
"istarum" :1, 
"istas" :1, 
"istast" :1, 
"iste" :1, 
"istest" :1, 
"isti" :1, 
"istimet" :1, 
"istique" :1, 
"istis" :1, 
"istisne" :1, 
"istisve" :1, 
"istius" :1, 
"isto" :1, 
"iston" :1, 
"istorum" :1, 
"istos" :1, 
"istuc" :1, 
"istud" :1, 
"istum" :1, 
"istumne" :1, 
"istunc" :1, 
// ipse 
"ipsa" :1, 
"ipsae" :1, 
"ipsaeque" :1, 
"ipsam" :1, 
"ipsamque" :1, 
"ipsane" :1, 
"ipsaque" :1, 
"ipsarum" :1, 
"ipsarumque" :1, 
"ipsas" :1, 
"ipsasque" :1, 
"ipsast" :1, 
"ipse" :1, 
"ipsemet" :1, 
"ipsene" :1, 
"ipseque" :1, 
"ipsest" :1, 
"ipsi" :1, 
"ipsimet" :1, 
"ipsine" :1, 
"ipsique" :1, 
"ipsis" :1, 
"ipsisne" :1, 
"ipsisque" :1, 
"ipsist" :1, 
"ipsius" :1, 
"ipsiusque" :1, 
"ipso" :1, 
"ipson" :1, 
"ipsoque" :1, 
"ipsorum" :1, 
"ipsorumque" :1, 
"ipsos" :1, 
"ipsosne" :1, 
"ipsosque" :1, 
"ipsost" :1, 
"ipsum" :1, 
"ipsumne" :1, 
"ipsumque" :1, 
"ipsus" :1, 
"ipsusne" :1, 
"ipsusque" :1, 
"ipsust" :1, 
// is 
"ea" :1, 
"eae" :1, 
"eaeque" :1, 
"eam" :1, 
"eamdem" :1, 
"eamne" :1, 
"eamque" :1, 
"eamue" :1, 
"ean" :1, 
"eane" :1, 
"eanest" :1, 
"eaque" :1, 
"earum" :1, 
"earumne" :1, 
"earumque" :1, 
"earumue" :1, 
"earumve" :1, 
"eas" :1, 
"easque" :1, 
"east" :1, 
"easue" :1, 
"eaue" :1, 
"eave" :1, 
"ei" :1, 
"ein" :1, 
"eine" :1, 
"eique" :1, 
"eis" :1, 
"eisne" :1, 
"eisque" :1, 
"eiue" :1, 
"eius" :1, 
"eiusque" :1, 
"eiust" :1, 
"eiusue" :1, 
"eive" :1, 
"ejus" :1, 
"ejusque" :1, 
"ejust" :1, 
"ejusue" :1, 
"eo" :1, 
"eoque" :1, 
"eorum" :1, 
"eorumdem" :1, 
"eorumne" :1, 
"eorumque" :1, 
"eorumue" :1, 
"eorumve" :1, 
"eos" :1, 
"eosne" :1, 
"eosque" :1, 
"eost" :1, 
"eosue" :1, 
"eoue" :1, 
"eum" :1, 
"eumdem" :1, 
"eumne" :1, 
"eumque" :1, 
"eumue" :1, 
"eumve" :1, 
"id" :1, 
"idne" :1, 
"idnest" :1, 
"idque" :1, 
"idue" :1, 
"ii" :1, 
"iidem" :1, 
"iidemque" :1, 
"iique" :1, 
"iis" :1, 
"iisne" :1, 
"iisque" :1, 
"iisue" :1, 
"is" :1, 
"isne" :1, 
"isque" :1, 
// idem 
"eadem" :1, 
"eademne" :1, 
"eademque" :1, 
"eademst" :1, 
"eademve" :1, 
"eaedem" :1, 
"eaedemque" :1, 
"eandem" :1, 
"eandemque" :1, 
"earumdem" :1, 
"easdem" :1, 
"easdemne" :1, 
"easdemque" :1, 
"eidem" :1, 
"eidemque" :1, 
"eisdem" :1, 
"eisdemque" :1, 
"eiusdem" :1, 
"eiusdemque" :1, 
"ejusdem" :1, 
"ejusdemque" :1, 
"eodem" :1, 
"eodemque" :1, 
"eorundem" :1, 
"eosdem" :1, 
"eosdemne" :1, 
"eosdemque" :1, 
"eundem" :1, 
"eundemne" :1, 
"eundemque" :1, 
"idem" :1, 
"idemne" :1, 
"idemque" :1, 
"idemst" :1, 
"iisdem" :1, 
"iisdemque" :1, 
"isdem" :1, 
"isdemne" :1, 
"isdemque" :1, 
// suus 
"sua" :1, 
"suae" :1, 
"suaeque" :1, 
"suai" :1, 
"suam" :1, 
"suamne" :1, 
"suamque" :1, 
"suane" :1, 
"suaque" :1, 
"suarum" :1, 
"suarumque" :1, 
"suas" :1, 
"suasque" :1, 
"suaue" :1, 
"sue" :1, 
"sui" :1, 
"suique" :1, 
"suis" :1, 
"suisne" :1, 
"suisque" :1, 
"suist" :1, 
"suo" :1, 
"suom" :1, 
"suone" :1, 
"suoque" :1, 
"suorum" :1, 
"suorumque" :1, 
"suorumue" :1, 
"suos" :1, 
"suosque" :1, 
"suum" :1, 
"suumque" :1, 
"suus" :1, 
"suusque" :1, 
// sui 
"se" :1, 
"secum" :1, 
"secumque" :1, 
"secumue" :1, 
"secumve" :1, 
"semet" :1, 
"sen" :1, 
"sese" :1, 
"sest" :1, 
"sibi" :1, 
"sibimet" :1, 
"sibine" :1, 
"sibique" :1, 
"sui" :1, 
"suimet" :1, 
"suique" :1, 
"suist" :1, 
//// nos" :1, 
"nobis" :1, 
"nobiscum" :1, 
"nobiscumque" :1, 
"nobismet" :1, 
"nobisne" :1, 
"nobisque" :1, 
"nos" :1, 
"nosmet" :1, 
"nosne" :1, 
"nosque" :1, 
"nost" :1, 
"nostri" :1, 
"nostrique" :1, 
"nostrive" :1, 
"nostrum" :1, 
"nostrumne" :1, 
"nostrumque" :1, 
//// noster" :1, 
"noster" :1, 
"nosterque" :1, 
"nostra" :1, 
"nostrae" :1, 
"nostraeque" :1, 
"nostrai" :1, 
"nostram" :1, 
"nostramne" :1, 
"nostramque" :1, 
"nostrane" :1, 
"nostraque" :1, 
"nostrarum" :1, 
"nostrarumque" :1, 
"nostras" :1, 
"nostrasne" :1, 
"nostrasque" :1, 
"nostrast" :1, 
"nostri" :1, 
"nostrique" :1, 
"nostris" :1, 
"nostrisque" :1, 
"nostrisve" :1, 
"nostrive" :1, 
"nostro" :1, 
"nostrone" :1, 
"nostroque" :1, 
"nostrorum" :1, 
"nostrorumque" :1, 
"nostrorumst" :1, 
"nostros" :1, 
"nostrosque" :1, 
"nostrost" :1, 
"nostrum" :1, 
"nostrumne" :1, 
"nostrumque" :1, 
// vos" :1, 
"uestri" :1, 
"uestrique" :1, 
"uobis" :1, 
"uobiscum" :1, 
"uobismet" :1, 
"uobisne" :1, 
"uobisque" :1, 
"uon" :1, 
"uos" :1, 
"uosmet" :1, 
"uosne" :1, 
"uosque" :1, 
"uostrum" :1, 
"uostrumque" :1, 
"uostrumst" :1, 
"vestri" :1, 
"vestrique" :1, 
"vobis" :1, 
"vobiscum" :1, 
"vobismet" :1, 
"vobisne" :1, 
"vobisque" :1, 
"von" :1, 
"vos" :1, 
"vosmet" :1, 
"vosne" :1, 
"vosque" :1, 
"vostrum" :1, 
"vostrumque" :1, 
"vostrumst" :1, 
//// vester" :1, 
"uester" :1, 
"uesterque" :1, 
"uestra" :1, 
"uestrae" :1, 
"uestraene" :1, 
"uestraeque" :1, 
"uestram" :1, 
"uestramne" :1, 
"uestramque" :1, 
"uestrane" :1, 
"uestraque" :1, 
"uestrarum" :1, 
"uestras" :1, 
"uestrasque" :1, 
"uestri" :1, 
"uestrique" :1, 
"uestris" :1, 
"uestrisne" :1, 
"uestrisque" :1, 
"uestrius" :1, 
"uestro" :1, 
"uestrone" :1, 
"uestroque" :1, 
"uestrorum" :1, 
"uestrorumque" :1, 
"uestros" :1, 
"uestrosque" :1, 
"uestrum" :1, 
"uestrumque" :1, 
"uestrumst" :1, 
"uoster" :1, 
"uostra" :1, 
"uostrae" :1, 
"uostraeque" :1, 
"uostram" :1, 
"uostraque" :1, 
"uostrarum" :1, 
"uostras" :1, 
"uostrast" :1, 
"uostri" :1, 
"uostris" :1, 
"uostrist" :1, 
"uostro" :1, 
"uostrorum" :1, 
"uostros" :1, 
"uostrosque" :1, 
"uostrost" :1, 
"uostrum" :1, 
"uostrumque" :1, 
"uostrumst" :1, 
"vester" :1, 
"vesterque" :1, 
"vestra" :1, 
"vestrae" :1, 
"vestraene" :1, 
"vestraeque" :1, 
"vestram" :1, 
"vestramne" :1, 
"vestramque" :1, 
"vestrane" :1, 
"vestraque" :1, 
"vestrarum" :1, 
"vestras" :1, 
"vestrasque" :1, 
"vestri" :1, 
"vestrique" :1, 
"vestris" :1, 
"vestrisne" :1, 
"vestrisque" :1, 
"vestrius" :1, 
"vestro" :1, 
"vestrone" :1, 
"vestroque" :1, 
"vestrorum" :1, 
"vestrorumque" :1, 
"vestros" :1, 
"vestrosque" :1, 
"vestrum" :1, 
"vestrumque" :1, 
"vestrumst" :1, 
"voster" :1, 
"vostra" :1, 
"vostrae" :1, 
"vostraeque" :1, 
"vostram" :1, 
"vostraque" :1, 
"vostrarum" :1, 
"vostras" :1, 
"vostrast" :1, 
"vostri" :1, 
"vostris" :1, 
"vostrist" :1, 
"vostro" :1, 
"vostrorum" :1, 
"vostros" :1, 
"vostrosque" :1, 
"vostrost" :1, 
"vostrum" :1, 
"vostrumque" :1, 
"vostrumst" :1, 
//// qui" :1, 
"cui" :1, 
"cuilibet" :1, 
"cuine" :1, 
"cuipiam" :1, 
"cuiue" :1, 
"cuius" :1, 
"cuiuslibet" :1, 
"cuiuspiam" :1, 
"cuiust" :1, 
"cuiusue" :1, 
"cuiusve" :1, 
"cuive" :1, 
"cujus" :1, 
"cujuslibet" :1, 
"cujuspiam" :1, 
"cujust" :1, 
"cujusue" :1, 
"cujusve" :1, 
"qua" :1, 
"quae" :1, 
"quaedem" :1, 
"quaelibet" :1, 
"quaen" :1, 
"quaene" :1, 
"quaepiam" :1, 
"quaepiamst" :1, 
"quaest" :1, 
"quaestuis" :1, 
"quaestuist" :1, 
"quaeue" :1, 
"quaeve" :1, 
"quam" :1, 
"quamne" :1, 
"quampiam" :1, 
"quamue" :1, 
"quamve" :1, 
"quan" :1, 
"quapiam" :1, 
"quarum" :1, 
"quarumlibet" :1, 
"quas" :1, 
"quaslibet" :1, 
"quast" :1, 
"quasue" :1, 
"quasve" :1, 
"quaue" :1, 
"quave" :1, 
"quei" :1, 
"quein" :1, 
"queique" :1, 
"quem" :1, 
"quemlibet" :1, 
"quemne" :1, 
"quempiam" :1, 
"quemue" :1, 
"quemve" :1, 
"qui" :1, 
"quibus" :1, 
"quibuscum" :1, 
"quibuslibet" :1, 
"quibusue" :1, 
"quibusve" :1, 
"quicum" :1, 
"quicumuis" :1, 
"quicumvis" :1, 
"quilibet" :1, 
"quiue" :1, 
"quive" :1, 
"quod" :1, 
"quodlibet" :1, 
"quodne" :1, 
"quodpiam" :1, 
"quodue" :1, 
"quodve" :1, 
"quoi" :1, 
"quoicumque" :1, 
"quoin" :1, 
"quoique" :1, 
"quoiuis" :1, 
"quoivis" :1, 
"quon" :1, 
"quorum" :1, 
"quorumlibet" :1, 
"quorumst" :1, 
"quos" :1, 
"quoslibet" :1, 
"quosne" :1, 
"quospiam" :1, 
"quost" :1, 
"quosue" :1, 
"quosve" :1, 
"quum" :1, 
//// quis" :1, 
"quid" :1, 
"quidlibet" :1, 
"quidne" :1, 
"quidni" :1, 
"quidpiam" :1, 
"quidue" :1, 
"quidve" :1, 
"quis" :1, 
"quiscumque" :1, 
"quisue" :1, 
"quisve" :1, 
"quo" :1, 
"quon" :1, 
"quone" :1, 
"quost" :1, 
"quoue" :1, 
"quove" :1, 
//// quisquam" :1, 
"cuiquam" :1, 
"cuiquamst" :1, 
"cuiusquam" :1, 
"cujusquam" :1, 
"quamquam" :1, 
"quamquamst" :1, 
"quaquam" :1, 
"quaquamst" :1, 
"quemquam" :1, 
"quemquamne" :1, 
"quemquamst" :1, 
"quicquam" :1, 
"quicquamne" :1, 
"quicquamst" :1, 
"quidquam" :1, 
"quiquam" :1, 
"quisquam" :1, 
"quisquamne" :1, 
"quisquamst" :1, 
"quoquam" :1, 
//// quisnam" :1, 
"cuinam" :1, 
"cuiusnam" :1, 
"cujusnam" :1, 
"quaenam" :1, 
"quaenamst" :1, 
"quamnam" :1, 
"quanam" :1, 
"quarumnam" :1, 
"quasnam" :1, 
"quemnam" :1, 
"quibusnam" :1, 
"quidnam" :1, 
"quidnamst" :1, 
"quinam" :1, 
"quisnam" :1, 
"quodnam" :1, 
"quosnam" :1, 
//// quisquis" :1, 
"quaqua" :1, 
"quemquem" :1, 
"quicquid" :1, 
"quidquid" :1, 
"quiqui" :1, 
"quiquidem" :1, 
"quisquis" :1, 
"quoquo" :1, 
//// quisque" :1, 
"cuique" :1, 
"cuiquest" :1, 
"cuiusque" :1, 
"cujusque" :1, 
"quaeque" :1, 
"quamque" :1, 
"quaque" :1, 
"quarumque" :1, 
"quasque" :1, 
"quemque" :1, 
"quibusque" :1, 
"quicque" :1, 
"quidque" :1, 
"quique" :1, 
"quisque" :1, 
"quodque" :1, 
"quorumque" :1, 
"quosque" :1, 
//// quicumque" :1, 
"cuicumque" :1, 
"cuicunque" :1, 
"cuiuscumque" :1, 
"cuiuscunque" :1, 
"cujuscumque" :1, 
"cujuscunque" :1, 
"quacumque" :1, 
"quacunque" :1, 
"quaecumque" :1, 
"quaecunque" :1, 
"quamcumque" :1, 
"quamcunque" :1, 
"quarumcumque" :1, 
"quascumque" :1, 
"quascunque" :1, 
"quemcumque" :1, 
"quemcunque" :1, 
"quibuscumque" :1, 
"quibuscunque" :1, 
"quicumque" :1, 
"quicumquest" :1, 
"quicunque" :1, 
"quocumque" :1, 
"quodcumque" :1, 
"quodcunque" :1, 
"quorumcumque" :1, 
"quoscumque" :1, 
"quoscunque" :1, 
//// quivis" :1, 
"cuiuis" :1, 
"cuiusuis" :1, 
"cuiusvis" :1, 
"cuivis" :1, 
"cujusuis" :1, 
"cujusvis" :1, 
"quaeuis" :1, 
"quaevis" :1, 
"quamuis" :1, 
"quamvis" :1, 
"quarumuis" :1, 
"quarumvis" :1, 
"quasuis" :1, 
"quasvis" :1, 
"quauis" :1, 
"quavis" :1, 
"quemuis" :1, 
"quemvis" :1, 
"quibusuis" :1, 
"quibusvis" :1, 
"quiduis" :1, 
"quidvis" :1, 
"quiuis" :1, 
"quivis" :1, 
"quoduis" :1, 
"quodvis" :1, 
"quosuis" :1, 
"quosvis" :1, 
//// quidam" :1, 
"cuidam" :1, 
"cuiusdam" :1, 
"cujusdam" :1, 
"quadam" :1, 
"quaedam" :1, 
"quaedamque" :1, 
"quaedamst" :1, 
"quamdam" :1, 
"quandam" :1, 
"quandamque" :1, 
"quarumdam" :1, 
"quasdam" :1, 
"quasdamque" :1, 
"quemdam" :1, 
"quendam" :1, 
"quibusdam" :1, 
"quidam" :1, 
"quidamque" :1, 
"quidamst" :1, 
"quiddam" :1, 
"quiddamst" :1, 
"quoddam" :1, 
"quorumdam" :1, 
"quosdam" :1, 
"quosdamque" :1, 
"quosdamve" :1, 
//// aliqui" :1, 
"alicui" :1, 
"alicuius" :1, 
"alicujus" :1, 
"aliqua" :1, 
"aliquae" :1, 
"aliqualibet" :1, 
"aliquam" :1, 
"aliquan" :1, 
"aliquane" :1, 
"aliquarum" :1, 
"aliquas" :1, 
"aliquast" :1, 
"aliquaue" :1, 
"alique" :1, 
"aliquem" :1, 
"aliquemque" :1, 
"aliqui" :1, 
"aliquibus" :1, 
"aliquis" :1, 
"aliquisne" :1, 
"aliquisque" :1, 
"aliquit" :1, 
"aliquod" :1, 
"aliquodue" :1, 
"aliquorum" :1, 
"aliquos" :1, 
//// aliquis" :1, 
"aliquid" :1, 
"aliquidque" :1, 
"aliquidue" :1, 
"aliquis" :1, 
"aliquisne" :1, 
"aliquisque" :1, 
"aliquo" :1, 
// NOUNS" :1, 
//// res" :1, 
"re" :1, 
"rebus" :1, 
"rebusque" :1, 
"rei" :1, 
"reique" :1, 
"reist" :1, 
"rem" :1, 
"remque" :1, 
"remst" :1, 
"remve" :1, 
"reque" :1, 
"rerum" :1, 
"rerumne" :1, 
"rerumque" :1, 
"res" :1, 
"resne" :1, 
"resque" :1, 
"rest" :1, 
"resve" :1, 
//// nihil" :1, 
"nihil" :1, 
"nihilne" :1, 
"nihilque" :1, 
"nil" :1, 
"nilne" :1, 
"nilque" :1, 
//// causa (ablative in prepositional turn)" :1, 
"causa" :1, 
//// nemo" :1, 
"nemine" :1, 
"neminem" :1, 
"neminemne" :1, 
"nemini" :1, 
"neminis" :1, 
"neminisque" :1, 
"nemo" :1, 
"nemon" :1, 
"nemone" :1, 
"nemoque" :1, 
"nemost" :1, 
// ADJECTIVES" :1, 
//// omnis" :1, 
"omne" :1, 
"omnem" :1, 
"omnemque" :1, 
"omnene" :1, 
"omneque" :1, 
"omnes" :1, 
"omnesne" :1, 
"omnesque" :1, 
"omnest" :1, 
"omni" :1, 
"omnia" :1, 
"omnian" :1, 
"omniane" :1, 
"omniaque" :1, 
"omnibus" :1, 
"omnibusne" :1, 
"omnibusque" :1, 
"omnibust" :1, 
"omnibusue" :1, 
"omnin" :1, 
"omnique" :1, 
"omnis" :1, 
"omnisne" :1, 
"omnisque" :1, 
"omnist" :1, 
"omnium" :1, 
"omniumque" :1, 
"omniumst" :1, 
//// nullus" :1, 
"nulla" :1, 
"nullae" :1, 
"nullaene" :1, 
"nullaeque" :1, 
"nullam" :1, 
"nullamne" :1, 
"nullamque" :1, 
"nullan" :1, 
"nullane" :1, 
"nullaque" :1, 
"nullarum" :1, 
"nullas" :1, 
"nullasne" :1, 
"nullasque" :1, 
"nullast" :1, 
"nullave" :1, 
"nulli" :1, 
"nulline" :1, 
"nullique" :1, 
"nullis" :1, 
"nullisne" :1, 
"nullisque" :1, 
"nullius" :1, 
"nulliusque" :1, 
"nullo" :1, 
"nullon" :1, 
"nullone" :1, 
"nulloque" :1, 
"nullorum" :1, 
"nullorumque" :1, 
"nullos" :1, 
"nullosne" :1, 
"nullosque" :1, 
"nullum" :1, 
"nullumne" :1, 
"nullumque" :1, 
"nullumst" :1, 
"nullus" :1, 
"nullusne" :1, 
"nullusnest" :1, 
"nullusque" :1, 
"nullust" :1, 
//// ullus" :1, 
"ulla" :1, 
"ullae" :1, 
"ullam" :1, 
"ullamve" :1, 
"ullane" :1, 
"ullarum" :1, 
"ullas" :1, 
"ullast" :1, 
"ullave" :1, 
"ulli" :1, 
"ulline" :1, 
"ullis" :1, 
"ullius" :1, 
"ullo" :1, 
"ullorum" :1, 
"ullos" :1, 
"ullum" :1, 
"ullumve" :1, 
"ullus" :1, 
"ullusne" :1, 
"ullust" :1, 
//// multus" :1, 
"multa" :1, 
"multae" :1, 
"multaeque" :1, 
"multaeve" :1, 
"multam" :1, 
"multamque" :1, 
"multane" :1, 
"multaque" :1, 
"multarum" :1, 
"multarumque" :1, 
"multas" :1, 
"multasque" :1, 
"multi" :1, 
"multique" :1, 
"multis" :1, 
"multisne" :1, 
"multisque" :1, 
"multisve" :1, 
"multo" :1, 
"multoque" :1, 
"multorum" :1, 
"multorumque" :1, 
"multos" :1, 
"multosque" :1, 
"multost" :1, 
"multosve" :1, 
"multum" :1, 
"multumque" :1, 
"multumst" :1, 
"multus" :1, 
"multusque" :1, 
//// plus/plures" :1, 
"plura" :1, 
"pluraque" :1, 
"pluraue" :1, 
"plurave" :1, 
"plure" :1, 
"plures" :1, 
"pluresne" :1, 
"pluresque" :1, 
"pluresue" :1, 
"pluresve" :1, 
"pluribus" :1, 
"pluribusne" :1, 
"pluribusque" :1, 
"pluribusue" :1, 
"pluribusve" :1, 
"plurima" :1, 
"plurimae" :1, 
"plurimaeque" :1, 
"plurimam" :1, 
"plurimaque" :1, 
"plurimarum" :1, 
"plurimas" :1, 
"plurimasque" :1, 
"plurime" :1, 
"plurimi" :1, 
"plurimique" :1, 
"plurimis" :1, 
"plurimisque" :1, 
"plurimo" :1, 
"plurimoque" :1, 
"plurimorum" :1, 
"plurimos" :1, 
"plurimosque" :1, 
"plurimum" :1, 
"plurimumque" :1, 
"plurimumst" :1, 
"plurimus" :1, 
"plurimusque" :1, 
"pluris" :1, 
"plurisne" :1, 
"plurisque" :1, 
"plurisue" :1, 
"plurium" :1, 
"pluriumue" :1, 
"pluriumve" :1, 
"plus" :1, 
"plusne" :1, 
"plusque" :1, 
"plusve" :1, 
//// alius" :1, 
"alia" :1, 
"aliae" :1, 
"aliaeque" :1, 
"aliaest" :1, 
"aliaeue" :1, 
"aliaeve" :1, 
"aliam" :1, 
"aliamne" :1, 
"aliamque" :1, 
"aliamue" :1, 
"aliamve" :1, 
"alian" :1, 
"aliaque" :1, 
"aliarum" :1, 
"aliarumque" :1, 
"aliarumue" :1, 
"alias" :1, 
"aliasque" :1, 
"aliast" :1, 
"aliaue" :1, 
"aliave" :1, 
"alii" :1, 
"aliique" :1, 
"aliis" :1, 
"aliisne" :1, 
"aliisque" :1, 
"aliisue" :1, 
"aliisve" :1, 
"aliiue" :1, 
"alio" :1, 
"alione" :1, 
"alioque" :1, 
"aliorum" :1, 
"aliorumque" :1, 
"aliorumue" :1, 
"aliorumve" :1, 
"alios" :1, 
"aliosque" :1, 
"aliost" :1, 
"aliosve" :1, 
"alioue" :1, 
"aliove" :1, 
"aliud" :1, 
"aliudque" :1, 
"aliudue" :1, 
"aliudve" :1, 
"alium" :1, 
"aliumque" :1, 
"aliumue" :1, 
"aliumve" :1, 
"alius" :1, 
"aliusne" :1, 
"aliusque" :1, 
"aliusue" :1, 
"aliusve" :1, 
//// alter" :1, 
"alter" :1, 
"altera" :1, 
"alterae" :1, 
"alteram" :1, 
"alteramque" :1, 
"alteramue" :1, 
"alteraque" :1, 
"alterarum" :1, 
"alteras" :1, 
"alterast" :1, 
"alterave" :1, 
"alteri" :1, 
"alteris" :1, 
"alterius" :1, 
"alteriusque" :1, 
"alteriusue" :1, 
"alterive" :1, 
"altero" :1, 
"alteroque" :1, 
"alterorum" :1, 
"alteros" :1, 
"alteroue" :1, 
"alterove" :1, 
"alterque" :1, 
"alterue" :1, 
"alterum" :1, 
"alterumque" :1, 
"alterumue" :1, 
"alterumve" :1, 
"alterve" :1, 
//// ceter/ceterus" :1, 
"caetera" :1, 
"caeterae" :1, 
"caeteram" :1, 
"caeteras" :1, 
"caeteri" :1, 
"caeteris" :1, 
"caeterisque" :1, 
"caeteros" :1, 
"caeterus" :1, 
"cetera" :1, 
"ceterae" :1, 
"ceteraeque" :1, 
"ceteraeve" :1, 
"ceteram" :1, 
"ceteramque" :1, 
"ceteraque" :1, 
"ceterarum" :1, 
"ceterarumque" :1, 
"ceteras" :1, 
"ceterasque" :1, 
"ceteri" :1, 
"ceterique" :1, 
"ceteris" :1, 
"ceterisque" :1, 
"ceterisue" :1, 
"ceterive" :1, 
"cetero" :1, 
"ceteroque" :1, 
"ceterorum" :1, 
"ceterorumque" :1, 
"ceterorumue" :1, 
"ceteros" :1, 
"ceterosque" :1, 
"ceterum" :1, 
"ceterus" :1, 
//// qualis" :1, 
"quale" :1, 
"qualecumque" :1, 
"qualecunque" :1, 
"qualem" :1, 
"qualemcunque" :1, 
"qualemque" :1, 
"qualemve" :1, 
"quales" :1, 
"qualescumque" :1, 
"qualescunque" :1, 
"qualeslibet" :1, 
"qualesque" :1, 
"qualest" :1, 
"qualesve" :1, 
"quali" :1, 
"qualia" :1, 
"qualiacunque" :1, 
"qualiaque" :1, 
"qualibus" :1, 
"qualicumque" :1, 
"qualicunque" :1, 
"qualine" :1, 
"qualique" :1, 
"qualis" :1, 
"qualiscunque" :1, 
"qualislibet" :1, 
"qualisque" :1, 
"qualisve" :1, 
"qualiter" :1, 
"qualitercumque" :1, 
"qualitercunque" :1, 
"qualiterque" :1, 
"qualium" :1, 
"qualiumcumque" :1, 
//// talis" :1, 
"tale" :1, 
"talem" :1, 
"talemque" :1, 
"taleque" :1, 
"tales" :1, 
"talesne" :1, 
"talesque" :1, 
"talest" :1, 
"tali" :1, 
"talia" :1, 
"taliane" :1, 
"taliaque" :1, 
"talibus" :1, 
"talibusque" :1, 
"talin" :1, 
"taline" :1, 
"talique" :1, 
"talis" :1, 
"talisque" :1, 
"talisve" :1, 
"taliter" :1, 
"talium" :1, 
"taliumque" :1, 
//// quantus" :1, 
"quanta" :1, 
"quantacumque" :1, 
"quantacunque" :1, 
"quantae" :1, 
"quantaecumque" :1, 
"quantaelibet" :1, 
"quantaeque" :1, 
"quantaeuis" :1, 
"quantalibet" :1, 
"quantam" :1, 
"quantamcumque" :1, 
"quantamque" :1, 
"quantane" :1, 
"quantaque" :1, 
"quantarum" :1, 
"quantas" :1, 
"quantaslibet" :1, 
"quantasque" :1, 
"quantasuis" :1, 
"quantasve" :1, 
"quantasvis" :1, 
"quantauis" :1, 
"quantave" :1, 
"quantavis" :1, 
"quanti" :1, 
"quanticumque" :1, 
"quantilibet" :1, 
"quantine" :1, 
"quantique" :1, 
"quantis" :1, 
"quantiscumque" :1, 
"quantislibet" :1, 
"quantisque" :1, 
"quantist" :1, 
"quantiuis" :1, 
"quantivis" :1, 
"quanto" :1, 
"quantocumque" :1, 
"quantolibet" :1, 
"quantoque" :1, 
"quantorum" :1, 
"quantos" :1, 
"quantosne" :1, 
"quantosque" :1, 
"quantoue" :1, 
"quantouis" :1, 
"quantove" :1, 
"quantovis" :1, 
"quantum" :1, 
"quantumcumque" :1, 
"quantumlibet" :1, 
"quantumque" :1, 
"quantumst" :1, 
"quantumue" :1, 
"quantumuis" :1, 
"quantumvis" :1, 
"quantus" :1, 
"quantuscumque" :1, 
"quantusne" :1, 
"quantusque" :1, 
//// tantus" :1, 
"tanta" :1, 
"tantadem" :1, 
"tantae" :1, 
"tantaene" :1, 
"tantaeque" :1, 
"tantam" :1, 
"tantamne" :1, 
"tantamque" :1, 
"tantan" :1, 
"tantandem" :1, 
"tantane" :1, 
"tantaque" :1, 
"tantarum" :1, 
"tantarumque" :1, 
"tantas" :1, 
"tantasque" :1, 
"tantast" :1, 
"tante" :1, 
"tanti" :1, 
"tantidem" :1, 
"tantidemst" :1, 
"tantine" :1, 
"tantique" :1, 
"tantis" :1, 
"tantisque" :1, 
"tantist" :1, 
"tanto" :1, 
"tanton" :1, 
"tantone" :1, 
"tantoque" :1, 
"tantorum" :1, 
"tantorumque" :1, 
"tantos" :1, 
"tantosque" :1, 
"tantove" :1, 
"tantum" :1, 
"tantumdem" :1, 
"tantumdemst" :1, 
"tantumne" :1, 
"tantumque" :1, 
"tantumst" :1, 
"tantundem" :1, 
"tantundemque" :1, 
"tantundemst" :1, 
"tantus" :1, 
"tantusque" :1, 
// VERBS" :1, 
//// sum" :1, 
"eram" :1, 
"eramque" :1, 
"eramus" :1, 
"erant" :1, 
"erantque" :1, 
"eras" :1, 
"erat" :1, 
"eratis" :1, 
"eratne" :1, 
"eratque" :1, 
"erimus" :1, 
"erimusque" :1, 
"erin" :1, 
"eris" :1, 
"erisque" :1, 
"erit" :1, 
"eritis" :1, 
"eritisque" :1, 
"eritne" :1, 
"eritque" :1, 
"eritue" :1, 
"ero" :1, 
"eroque" :1, 
"erunt" :1, 
"eruntque" :1, 
"eruntue" :1, 
"eruntve" :1, 
"es" :1, 
"esne" :1, 
"esque" :1, 
"esse" :1, 
"essem" :1, 
"essemque" :1, 
"essemus" :1, 
"essemusne" :1, 
"essemusque" :1, 
"essemusve" :1, 
"essene" :1, 
"essent" :1, 
"essentne" :1, 
"essentque" :1, 
"essentve" :1, 
"esseque" :1, 
"esses" :1, 
"essesne" :1, 
"essesque" :1, 
"essesve" :1, 
"esset" :1, 
"essetis" :1, 
"essetisne" :1, 
"essetisque" :1, 
"essetisve" :1, 
"essetne" :1, 
"essetque" :1, 
"essetve" :1, 
"esseve" :1, 
"est" :1, 
"este" :1, 
"estene" :1, 
"esteque" :1, 
"esteve" :1, 
"estis" :1, 
"estisne" :1, 
"estisque" :1, 
"estisve" :1, 
"estne" :1, 
"esto" :1, 
"eston" :1, 
"estote" :1, 
"estque" :1, 
"estve" :1, 
"esve" :1, 
"fore" :1, 
"forem" :1, 
"forent" :1, 
"fores" :1, 
"foresque" :1, 
"foret" :1, 
"fuam" :1, 
"fuant" :1, 
"fuas" :1, 
"fuat" :1, 
"fueram" :1, 
"fueramque" :1, 
"fueramus" :1, 
"fuerant" :1, 
"fueras" :1, 
"fuerat" :1, 
"fueratis" :1, 
"fueratque" :1, 
"fuere" :1, 
"fuerim" :1, 
"fuerimque" :1, 
"fuerimus" :1, 
"fuerint" :1, 
"fuerintne" :1, 
"fuerintque" :1, 
"fueris" :1, 
"fuerisne" :1, 
"fuerit" :1, 
"fueritis" :1, 
"fueritne" :1, 
"fueritque" :1, 
"fueritue" :1, 
"fueritve" :1, 
"fuero" :1, 
"fuerunt" :1, 
"fueruntne" :1, 
"fueruntque" :1, 
"fui" :1, 
"fuimus" :1, 
"fuimusque" :1, 
"fuimusve" :1, 
"fuisse" :1, 
"fuissem" :1, 
"fuissemus" :1, 
"fuissent" :1, 
"fuisseque" :1, 
"fuisses" :1, 
"fuisset" :1, 
"fuissetis" :1, 
"fuissetque" :1, 
"fuisti" :1, 
"fuistin" :1, 
"fuistique" :1, 
"fuistis" :1, 
"fuistisne" :1, 
"fuit" :1, 
"fuitne" :1, 
"fuitque" :1, 
"futura" :1, 
"futurae" :1, 
"futuraeque" :1, 
"futuram" :1, 
"futuramque" :1, 
"futuraque" :1, 
"futurarum" :1, 
"futuras" :1, 
"futurast" :1, 
"futurave" :1, 
"future" :1, 
"futuri" :1, 
"futurique" :1, 
"futuris" :1, 
"futurisque" :1, 
"futuro" :1, 
"futurorum" :1, 
"futurorumque" :1, 
"futuros" :1, 
"futurosque" :1, 
"futurove" :1, 
"futurum" :1, 
"futurumque" :1, 
"futurumst" :1, 
"futurumve" :1, 
"futurus" :1, 
"futurusne" :1, 
"futurusque" :1, 
"futurusve" :1, 
"siem" :1, 
"sient" :1, 
"sies" :1, 
"siet" :1, 
"sim" :1, 
"simne" :1, 
"simque" :1, 
"simus" :1, 
"sint" :1, 
"sintne" :1, 
"sintque" :1, 
"sis" :1, 
"sisne" :1, 
"sisque" :1, 
"sist" :1, 
"sit" :1, 
"sitis" :1, 
"sitisque" :1, 
"sitne" :1, 
"sitque" :1, 
"sitve" :1, 
"sum" :1, 
"sumne" :1, 
"sumque" :1, 
"sumus" :1, 
"sumusque" :1, 
"sumusve" :1, 
"sunt" :1, 
"suntne" :1, 
"sunto" :1, 
"suntoque" :1, 
"suntque" :1, 
//// possum" :1, 
"posse" :1, 
"possem" :1, 
"possemne" :1, 
"possemque" :1, 
"possemus" :1, 
"possent" :1, 
"possentne" :1, 
"posseque" :1, 
"posses" :1, 
"possesne" :1, 
"posset" :1, 
"possetis" :1, 
"possetisne" :1, 
"possetne" :1, 
"possetque" :1, 
"possim" :1, 
"possimne" :1, 
"possimus" :1, 
"possimusne" :1, 
"possin" :1, 
"possint" :1, 
"possintne" :1, 
"possintque" :1, 
"possis" :1, 
"possisne" :1, 
"possisque" :1, 
"possit" :1, 
"possitis" :1, 
"possitne" :1, 
"possitque" :1, 
"possum" :1, 
"possumne" :1, 
"possumus" :1, 
"possumusne" :1, 
"possunt" :1, 
"possuntne" :1, 
"possuntque" :1, 
"potens" :1, 
"potensque" :1, 
"potentem" :1, 
"potentemque" :1, 
"potentes" :1, 
"potentesque" :1, 
"potenti" :1, 
"potentia" :1, 
"potentibus" :1, 
"potentis" :1, 
"potentisque" :1, 
"potentium" :1, 
"poteram" :1, 
"poteramus" :1, 
"poteramusne" :1, 
"poterant" :1, 
"poterantque" :1, 
"poteras" :1, 
"poterat" :1, 
"poteratis" :1, 
"poteratne" :1, 
"poteratque" :1, 
"poterimus" :1, 
"poterin" :1, 
"poteris" :1, 
"poterisne" :1, 
"poterisque" :1, 
"poterit" :1, 
"poteritis" :1, 
"poteritisne" :1, 
"poteritne" :1, 
"poteritque" :1, 
"potero" :1, 
"poteron" :1, 
"poterone" :1, 
"poterunt" :1, 
"poteruntque" :1, 
"potes" :1, 
"potesne" :1, 
"potesque" :1, 
"potest" :1, 
"potestis" :1, 
"potestisne" :1, 
"potestne" :1, 
"potestque" :1, 
"potueram" :1, 
"potueramus" :1, 
"potuerant" :1, 
"potueras" :1, 
"potuerat" :1, 
"potueratis" :1, 
"potuere" :1, 
"potuerim" :1, 
"potuerimus" :1, 
"potuerint" :1, 
"potueris" :1, 
"potuerit" :1, 
"potueritis" :1, 
"potueritne" :1, 
"potueritque" :1, 
"potuero" :1, 
"potuerunt" :1, 
"potueruntne" :1, 
"potueruntque" :1, 
"potui" :1, 
"potuimus" :1, 
"potuine" :1, 
"potuique" :1, 
"potuisse" :1, 
"potuissem" :1, 
"potuissemus" :1, 
"potuissent" :1, 
"potuisses" :1, 
"potuisset" :1, 
"potuissetis" :1, 
"potuisti" :1, 
"potuistine" :1, 
"potuistis" :1, 
"potuit" :1, 
"potuitne" :1, 
"potuitque" :1, 
"potuitue" :1, 
//// do" :1, 
"da" :1, 
"dabam" :1, 
"dabamus" :1, 
"dabant" :1, 
"dabantque" :1, 
"dabantur" :1, 
"dabanturque" :1, 
"dabar" :1, 
"dabas" :1, 
"dabat" :1, 
"dabatque" :1, 
"dabatur" :1, 
"dabaturque" :1, 
"daberis" :1, 
"dabimus" :1, 
"dabimusque" :1, 
"dabin" :1, 
"dabis" :1, 
"dabisne" :1, 
"dabisque" :1, 
"dabit" :1, 
"dabitis" :1, 
"dabitque" :1, 
"dabitur" :1, 
"dabiturne" :1, 
"dabiturque" :1, 
"dabo" :1, 
"daboque" :1, 
"dabor" :1, 
"dabunt" :1, 
"dabuntque" :1, 
"dabuntur" :1, 
"damur" :1, 
"damus" :1, 
"damusque" :1, 
"dan" :1, 
"danda" :1, 
"dandae" :1, 
"dandam" :1, 
"dandamque" :1, 
"dandaque" :1, 
"dandarum" :1, 
"dandas" :1, 
"dandi" :1, 
"dandique" :1, 
"dandis" :1, 
"dando" :1, 
"dandoque" :1, 
"dandorum" :1, 
"dandos" :1, 
"dandosne" :1, 
"dandosque" :1, 
"dandum" :1, 
"dandumque" :1, 
"dandumst" :1, 
"dandus" :1, 
"dandusque" :1, 
"dans" :1, 
"dant" :1, 
"dante" :1, 
"dantem" :1, 
"dantes" :1, 
"danti" :1, 
"dantia" :1, 
"dantibus" :1, 
"dantis" :1, 
"danto" :1, 
"dantque" :1, 
"dantur" :1, 
"daque" :1, 
"dare" :1, 
"darem" :1, 
"daremus" :1, 
"daren" :1, 
"darent" :1, 
"darentque" :1, 
"darentur" :1, 
"dareque" :1, 
"darer" :1, 
"dareris" :1, 
"dares" :1, 
"daret" :1, 
"daretis" :1, 
"daretque" :1, 
"daretur" :1, 
"dari" :1, 
"darier" :1, 
"darique" :1, 
"daris" :1, 
"dariue" :1, 
"das" :1, 
"dasne" :1, 
"dasque" :1, 
"dat" :1, 
"data" :1, 
"datae" :1, 
"datam" :1, 
"datamque" :1, 
"dataque" :1, 
"datarum" :1, 
"datas" :1, 
"datasque" :1, 
"datast" :1, 
"date" :1, 
"dati" :1, 
"datin" :1, 
"datiores" :1, 
"datique" :1, 
"datis" :1, 
"datisne" :1, 
"datisque" :1, 
"datne" :1, 
"dato" :1, 
"datoque" :1, 
"datorum" :1, 
"datos" :1, 
"datosque" :1, 
"datque" :1, 
"datu" :1, 
"datum" :1, 
"datumque" :1, 
"datumst" :1, 
"datur" :1, 
"datura" :1, 
"daturae" :1, 
"daturam" :1, 
"daturas" :1, 
"dature" :1, 
"daturi" :1, 
"daturin" :1, 
"daturique" :1, 
"daturis" :1, 
"daturo" :1, 
"daturos" :1, 
"daturque" :1, 
"daturum" :1, 
"daturumque" :1, 
"daturus" :1, 
"daturust" :1, 
"datus" :1, 
"datusque" :1, 
"datust" :1, 
"daue" :1, 
"dave" :1, 
"dederam" :1, 
"dederamque" :1, 
"dederamus" :1, 
"dederant" :1, 
"dederas" :1, 
"dederat" :1, 
"dederatque" :1, 
"dedere" :1, 
"dederim" :1, 
"dederimus" :1, 
"dederint" :1, 
"dederis" :1, 
"dederisque" :1, 
"dederit" :1, 
"dederitis" :1, 
"dederitque" :1, 
"dedero" :1, 
"dederunt" :1, 
"dederuntque" :1, 
"dedi" :1, 
"dedimus" :1, 
"dedin" :1, 
"dedique" :1, 
"dedisse" :1, 
"dedissem" :1, 
"dedissemus" :1, 
"dedissent" :1, 
"dedisses" :1, 
"dedisset" :1, 
"dedissetis" :1, 
"dedissetue" :1, 
"dedisti" :1, 
"dedistin" :1, 
"dedistique" :1, 
"dedistis" :1, 
"dedit" :1, 
"deditque" :1, 
"dem" :1, 
"demque" :1, 
"demus" :1, 
"demusque" :1, 
"den" :1, 
"dent" :1, 
"dentque" :1, 
"dentur" :1, 
"der" :1, 
"dere" :1, 
"deris" :1, 
"des" :1, 
"desque" :1, 
"det" :1, 
"detis" :1, 
"detisque" :1, 
"detque" :1, 
"detur" :1, 
"deturque" :1, 
"do" :1, 
"don" :1, 
"doque" :1, 
"dor" :1, 
"duim" :1, 
"duint" :1, 
"duis" :1, 
"duisque" :1, 
"duit" :1, 
//// video" :1, 
"uide" :1, 
"uideam" :1, 
"uideamini" :1, 
"uideamque" :1, 
"uideamur" :1, 
"uideamus" :1, 
"uideamusque" :1, 
"uideant" :1, 
"uideantur" :1, 
"uidear" :1, 
"uideare" :1, 
"uidearis" :1, 
"uideas" :1, 
"uideasque" :1, 
"uideat" :1, 
"uideatis" :1, 
"uideatque" :1, 
"uideatur" :1, 
"uideaturne" :1, 
"uideaturque" :1, 
"uidebam" :1, 
"uidebamini" :1, 
"uidebamque" :1, 
"uidebamur" :1, 
"uidebamus" :1, 
"uidebant" :1, 
"uidebantque" :1, 
"uidebantur" :1, 
"uidebanturque" :1, 
"uidebar" :1, 
"uidebare" :1, 
"uidebaris" :1, 
"uidebarque" :1, 
"uidebas" :1, 
"uidebat" :1, 
"uidebatis" :1, 
"uidebatque" :1, 
"uidebatur" :1, 
"uidebaturque" :1, 
"uidebere" :1, 
"uideberis" :1, 
"uidebimur" :1, 
"uidebimus" :1, 
"uidebis" :1, 
"uidebit" :1, 
"uidebitis" :1, 
"uidebitur" :1, 
"uidebo" :1, 
"uidebor" :1, 
"uidebunt" :1, 
"uidebuntque" :1, 
"uidebuntur" :1, 
"uidemini" :1, 
"uidemur" :1, 
"uidemurne" :1, 
"uidemus" :1, 
"uidemusne" :1, 
"uidemusque" :1, 
"uiden" :1, 
"uidenda" :1, 
"uidendae" :1, 
"uidendam" :1, 
"uidendaque" :1, 
"uidendi" :1, 
"uidendique" :1, 
"uidendis" :1, 
"uidendo" :1, 
"uidendos" :1, 
"uidendum" :1, 
"uidendumque" :1, 
"uidendumst" :1, 
"uidendus" :1, 
"uidens" :1, 
"uidensque" :1, 
"uident" :1, 
"uidente" :1, 
"uidentem" :1, 
"uidentes" :1, 
"uidenti" :1, 
"uidentibus" :1, 
"uidentique" :1, 
"uidentis" :1, 
"uidentium" :1, 
"uidento" :1, 
"uidentque" :1, 
"uidentur" :1, 
"uidenturne" :1, 
"uidenturque" :1, 
"uideo" :1, 
"uideon" :1, 
"uideone" :1, 
"uideoque" :1, 
"uideor" :1, 
"uideorne" :1, 
"uideorque" :1, 
"uideram" :1, 
"uideramus" :1, 
"uiderant" :1, 
"uideras" :1, 
"uiderat" :1, 
"uideratis" :1, 
"uidere" :1, 
"uiderem" :1, 
"uideremini" :1, 
"uideremur" :1, 
"uideremus" :1, 
"uiderent" :1, 
"uiderentque" :1, 
"uiderentur" :1, 
"uiderenturne" :1, 
"uidereque" :1, 
"uiderer" :1, 
"uiderere" :1, 
"uidereris" :1, 
"uideres" :1, 
"uideret" :1, 
"uideretis" :1, 
"uideretque" :1, 
"uideretur" :1, 
"uidereturne" :1, 
"uidereturque" :1, 
"uideri" :1, 
"uiderier" :1, 
"uiderim" :1, 
"uiderimus" :1, 
"uiderint" :1, 
"uiderintne" :1, 
"uiderintue" :1, 
"uiderique" :1, 
"uideris" :1, 
"uiderisque" :1, 
"uiderit" :1, 
"uideritis" :1, 
"uideritne" :1, 
"uideritque" :1, 
"uidero" :1, 
"uiderunt" :1, 
"uideruntque" :1, 
"uides" :1, 
"uidesne" :1, 
"uidesque" :1, 
"uidet" :1, 
"uidete" :1, 
"uidetin" :1, 
"uidetis" :1, 
"uidetisne" :1, 
"uideto" :1, 
"uidetote" :1, 
"uidetque" :1, 
"uidetur" :1, 
"uideturne" :1, 
"uideturque" :1, 
"uidi" :1, 
"uidimus" :1, 
"uidimusque" :1, 
"uidin" :1, 
"uidique" :1, 
"uidisse" :1, 
"uidissem" :1, 
"uidissemque" :1, 
"uidissemus" :1, 
"uidissent" :1, 
"uidissentque" :1, 
"uidisses" :1, 
"uidisset" :1, 
"uidissetis" :1, 
"uidissetque" :1, 
"uidissetve" :1, 
"uidisti" :1, 
"uidistin" :1, 
"uidistine" :1, 
"uidistis" :1, 
"uidit" :1, 
"uiditque" :1, 
"uisa" :1, 
"uisae" :1, 
"uisaeque" :1, 
"uisam" :1, 
"uisamque" :1, 
"uisanest" :1, 
"uisaque" :1, 
"uisas" :1, 
"uisast" :1, 
"uise" :1, 
"uisen" :1, 
"uisi" :1, 
"uisique" :1, 
"uisis" :1, 
"uisisque" :1, 
"uiso" :1, 
"uison" :1, 
"uisoque" :1, 
"uisorum" :1, 
"uisos" :1, 
"uisosque" :1, 
"uisu" :1, 
"uisum" :1, 
"uisumque" :1, 
"uisumst" :1, 
"uisun" :1, 
"uisuque" :1, 
"uisura" :1, 
"uisurae" :1, 
"uisuram" :1, 
"uisuraque" :1, 
"uisuras" :1, 
"uisure" :1, 
"uisuri" :1, 
"uisuris" :1, 
"uisuros" :1, 
"uisurum" :1, 
"uisurus" :1, 
"uisurusne" :1, 
"uisus" :1, 
"uisusque" :1, 
"uisust" :1, 
"uisuve" :1, 
"vide" :1, 
"videam" :1, 
"videamini" :1, 
"videamque" :1, 
"videamur" :1, 
"videamus" :1, 
"videamusque" :1, 
"videant" :1, 
"videantur" :1, 
"videar" :1, 
"videare" :1, 
"videaris" :1, 
"videas" :1, 
"videasque" :1, 
"videat" :1, 
"videatis" :1, 
"videatque" :1, 
"videatur" :1, 
"videaturne" :1, 
"videaturque" :1, 
"videbam" :1, 
"videbamini" :1, 
"videbamque" :1, 
"videbamur" :1, 
"videbamus" :1, 
"videbant" :1, 
"videbantque" :1, 
"videbantur" :1, 
"videbanturque" :1, 
"videbar" :1, 
"videbare" :1, 
"videbaris" :1, 
"videbarque" :1, 
"videbas" :1, 
"videbat" :1, 
"videbatis" :1, 
"videbatque" :1, 
"videbatur" :1, 
"videbaturque" :1, 
"videbere" :1, 
"videberis" :1, 
"videbimur" :1, 
"videbimus" :1, 
"videbis" :1, 
"videbit" :1, 
"videbitis" :1, 
"videbitur" :1, 
"videbo" :1, 
"videbor" :1, 
"videbunt" :1, 
"videbuntque" :1, 
"videbuntur" :1, 
"videmini" :1, 
"videmur" :1, 
"videmurne" :1, 
"videmus" :1, 
"videmusne" :1, 
"videmusque" :1, 
"viden" :1, 
"videnda" :1, 
"videndae" :1, 
"videndam" :1, 
"videndaque" :1, 
"videndi" :1, 
"videndique" :1, 
"videndis" :1, 
"videndo" :1, 
"videndos" :1, 
"videndum" :1, 
"videndumque" :1, 
"videndumst" :1, 
"videndus" :1, 
"videns" :1, 
"vidensque" :1, 
"vident" :1, 
"vidente" :1, 
"videntem" :1, 
"videntes" :1, 
"videnti" :1, 
"videntibus" :1, 
"videntique" :1, 
"videntis" :1, 
"videntium" :1, 
"vidento" :1, 
"videntque" :1, 
"videntur" :1, 
"videnturne" :1, 
"videnturque" :1, 
"video" :1, 
"videon" :1, 
"videone" :1, 
"videoque" :1, 
"videor" :1, 
"videorne" :1, 
"videorque" :1, 
"videram" :1, 
"videramus" :1, 
"viderant" :1, 
"videras" :1, 
"viderat" :1, 
"videratis" :1, 
"videre" :1, 
"viderem" :1, 
"videremini" :1, 
"videremur" :1, 
"videremus" :1, 
"viderent" :1, 
"viderentque" :1, 
"viderentur" :1, 
"viderenturne" :1, 
"videreque" :1, 
"viderer" :1, 
"viderere" :1, 
"videreris" :1, 
"videres" :1, 
"videret" :1, 
"videretis" :1, 
"videretque" :1, 
"videretur" :1, 
"videreturne" :1, 
"videreturque" :1, 
"videri" :1, 
"viderier" :1, 
"viderim" :1, 
"viderimus" :1, 
"viderint" :1, 
"viderintne" :1, 
"viderintue" :1, 
"viderique" :1, 
"videris" :1, 
"viderisque" :1, 
"viderit" :1, 
"videritis" :1, 
"videritne" :1, 
"videritque" :1, 
"videro" :1, 
"viderunt" :1, 
"videruntque" :1, 
"vides" :1, 
"videsne" :1, 
"videsque" :1, 
"videt" :1, 
"videte" :1, 
"videtin" :1, 
"videtis" :1, 
"videtisne" :1, 
"videto" :1, 
"videtote" :1, 
"videtque" :1, 
"videtur" :1, 
"videturne" :1, 
"videturque" :1, 
"vidi" :1, 
"vidimus" :1, 
"vidimusque" :1, 
"vidin" :1, 
"vidique" :1, 
"vidisse" :1, 
"vidissem" :1, 
"vidissemque" :1, 
"vidissemus" :1, 
"vidissent" :1, 
"vidissentque" :1, 
"vidisses" :1, 
"vidisset" :1, 
"vidissetis" :1, 
"vidissetque" :1, 
"vidissetve" :1, 
"vidisti" :1, 
"vidistin" :1, 
"vidistine" :1, 
"vidistis" :1, 
"vidit" :1, 
"viditque" :1, 
"visa" :1, 
"visae" :1, 
"visaeque" :1, 
"visam" :1, 
"visamque" :1, 
"visanest" :1, 
"visaque" :1, 
"visas" :1, 
"visast" :1, 
"vise" :1, 
"visen" :1, 
"visi" :1, 
"visique" :1, 
"visis" :1, 
"visisque" :1, 
"viso" :1, 
"vison" :1, 
"visoque" :1, 
"visorum" :1, 
"visos" :1, 
"visosque" :1, 
"visu" :1, 
"visum" :1, 
"visumque" :1, 
"visumst" :1, 
"visun" :1, 
"visuque" :1, 
"visura" :1, 
"visurae" :1, 
"visuram" :1, 
"visuraque" :1, 
"visuras" :1, 
"visure" :1, 
"visuri" :1, 
"visuris" :1, 
"visuros" :1, 
"visurum" :1, 
"visurus" :1, 
"visurusne" :1, 
"visus" :1, 
"visusque" :1, 
"visust" :1, 
"visuve" :1, 
//// facio" :1, 
"fac" :1, 
"face" :1, 
"facere" :1, 
"facerem" :1, 
"faceremque" :1, 
"faceremus" :1, 
"faceren" :1, 
"facerent" :1, 
"facerentque" :1, 
"faceres" :1, 
"facerest" :1, 
"faceret" :1, 
"faceretis" :1, 
"faceretne" :1, 
"faceretque" :1, 
"facereve" :1, 
"faci" :1, 
"faciam" :1, 
"faciamque" :1, 
"faciamus" :1, 
"faciant" :1, 
"faciantque" :1, 
"faciantur" :1, 
"facias" :1, 
"faciasne" :1, 
"faciasque" :1, 
"faciat" :1, 
"faciatis" :1, 
"faciatque" :1, 
"faciatur" :1, 
"faciebam" :1, 
"faciebamus" :1, 
"faciebant" :1, 
"faciebantque" :1, 
"faciebas" :1, 
"faciebat" :1, 
"faciebatis" :1, 
"faciebatque" :1, 
"faciemus" :1, 
"faciemusque" :1, 
"facienda" :1, 
"faciendae" :1, 
"faciendai" :1, 
"faciendam" :1, 
"faciendarum" :1, 
"faciendas" :1, 
"faciendi" :1, 
"faciendique" :1, 
"faciendis" :1, 
"faciendiue" :1, 
"faciendive" :1, 
"faciendo" :1, 
"faciendoque" :1, 
"faciendorum" :1, 
"faciendos" :1, 
"faciendosque" :1, 
"faciendum" :1, 
"faciendumne" :1, 
"faciendumque" :1, 
"faciendumst" :1, 
"faciendumve" :1, 
"faciendus" :1, 
"faciens" :1, 
"facient" :1, 
"faciente" :1, 
"facientem" :1, 
"facientes" :1, 
"facienti" :1, 
"facientia" :1, 
"facientibus" :1, 
"facientibusque" :1, 
"facientis" :1, 
"facientium" :1, 
"facientque" :1, 
"facientur" :1, 
"facies" :1, 
"faciesque" :1, 
"faciesve" :1, 
"faciet" :1, 
"facietis" :1, 
"facietisque" :1, 
"facietque" :1, 
"facimus" :1, 
"facio" :1, 
"facioque" :1, 
"facis" :1, 
"facisne" :1, 
"facisque" :1, 
"facit" :1, 
"facite" :1, 
"facitis" :1, 
"facitne" :1, 
"facito" :1, 
"facitoque" :1, 
"facitote" :1, 
"facitque" :1, 
"facitur" :1, 
"faciunda" :1, 
"faciundae" :1, 
"faciundam" :1, 
"faciundas" :1, 
"faciundi" :1, 
"faciundis" :1, 
"faciundisque" :1, 
"faciundo" :1, 
"faciundorum" :1, 
"faciundos" :1, 
"faciundum" :1, 
"faciundumst" :1, 
"faciundus" :1, 
"faciunt" :1, 
"faciuntne" :1, 
"faciunto" :1, 
"faciuntque" :1, 
"facque" :1, 
"facta" :1, 
"factae" :1, 
"factaeque" :1, 
"factam" :1, 
"factamque" :1, 
"factaque" :1, 
"factarum" :1, 
"factas" :1, 
"factast" :1, 
"factaue" :1, 
"facte" :1, 
"facti" :1, 
"factique" :1, 
"factis" :1, 
"factisque" :1, 
"factius" :1, 
"facto" :1, 
"factoque" :1, 
"factorum" :1, 
"factorumque" :1, 
"factos" :1, 
"factost" :1, 
"factoue" :1, 
"factu" :1, 
"factum" :1, 
"factumne" :1, 
"factumque" :1, 
"factumst" :1, 
"factumue" :1, 
"factumve" :1, 
"factuque" :1, 
"factura" :1, 
"facturae" :1, 
"facturam" :1, 
"facturas" :1, 
"facturave" :1, 
"facturi" :1, 
"facturis" :1, 
"facturo" :1, 
"facturos" :1, 
"facturosque" :1, 
"facturum" :1, 
"facturumque" :1, 
"facturumue" :1, 
"facturus" :1, 
"facturusne" :1, 
"facturusque" :1, 
"facturust" :1, 
"facturusue" :1, 
"factus" :1, 
"factusne" :1, 
"factusque" :1, 
"factust" :1, 
"faxim" :1, 
"faxint" :1, 
"faxis" :1, 
"faxit" :1, 
"faxo" :1, 
"feceram" :1, 
"feceramus" :1, 
"fecerant" :1, 
"fecerantque" :1, 
"feceras" :1, 
"fecerat" :1, 
"feceratis" :1, 
"feceratque" :1, 
"fecere" :1, 
"fecerim" :1, 
"fecerimque" :1, 
"fecerimus" :1, 
"fecerint" :1, 
"feceris" :1, 
"fecerisne" :1, 
"fecerit" :1, 
"feceritis" :1, 
"feceritque" :1, 
"feceritue" :1, 
"fecero" :1, 
"fecerunt" :1, 
"feceruntque" :1, 
"feci" :1, 
"fecimus" :1, 
"fecique" :1, 
"fecisse" :1, 
"fecissem" :1, 
"fecissemus" :1, 
"fecissent" :1, 
"fecissentque" :1, 
"fecisseque" :1, 
"fecisses" :1, 
"fecisset" :1, 
"fecissetis" :1, 
"fecissetue" :1, 
"fecisti" :1, 
"fecistique" :1, 
"fecistis" :1, 
"fecit" :1, 
"fecitne" :1, 
"fecitque" :1, 
//// dico" :1, 
"dic" :1, 
"dicam" :1, 
"dicamini" :1, 
"dicamne" :1, 
"dicamque" :1, 
"dicamur" :1, 
"dicamus" :1, 
"dicamve" :1, 
"dicant" :1, 
"dicantur" :1, 
"dicar" :1, 
"dicare" :1, 
"dicaris" :1, 
"dicarque" :1, 
"dicas" :1, 
"dicasque" :1, 
"dicasve" :1, 
"dicat" :1, 
"dicatis" :1, 
"dicatque" :1, 
"dicatur" :1, 
"dicaturque" :1, 
"dice" :1, 
"dicebam" :1, 
"dicebamini" :1, 
"dicebamque" :1, 
"dicebamus" :1, 
"dicebant" :1, 
"dicebantque" :1, 
"dicebantur" :1, 
"dicebanturque" :1, 
"dicebar" :1, 
"dicebare" :1, 
"dicebas" :1, 
"dicebat" :1, 
"dicebatis" :1, 
"dicebatque" :1, 
"dicebatur" :1, 
"dicemur" :1, 
"dicemus" :1, 
"dicemusque" :1, 
"dicen" :1, 
"dicenda" :1, 
"dicendae" :1, 
"dicendaeque" :1, 
"dicendaeve" :1, 
"dicendam" :1, 
"dicendamue" :1, 
"dicendane" :1, 
"dicendarum" :1, 
"dicendas" :1, 
"dicendast" :1, 
"dicende" :1, 
"dicendi" :1, 
"dicendique" :1, 
"dicendis" :1, 
"dicendo" :1, 
"dicendoque" :1, 
"dicendos" :1, 
"dicendove" :1, 
"dicendum" :1, 
"dicendumque" :1, 
"dicendumst" :1, 
"dicendus" :1, 
"dicens" :1, 
"dicensque" :1, 
"dicensve" :1, 
"dicent" :1, 
"dicente" :1, 
"dicentem" :1, 
"dicentemque" :1, 
"dicentes" :1, 
"dicenti" :1, 
"dicentia" :1, 
"dicentibus" :1, 
"dicentis" :1, 
"dicentium" :1, 
"dicentque" :1, 
"dicentur" :1, 
"dicere" :1, 
"dicerem" :1, 
"diceremus" :1, 
"dicerent" :1, 
"dicerentque" :1, 
"dicerentur" :1, 
"dicereque" :1, 
"dicerer" :1, 
"dicereris" :1, 
"diceres" :1, 
"diceresne" :1, 
"diceret" :1, 
"diceretis" :1, 
"diceretque" :1, 
"diceretur" :1, 
"dicereturue" :1, 
"diceris" :1, 
"dices" :1, 
"dicesne" :1, 
"dicesque" :1, 
"dicet" :1, 
"dicetis" :1, 
"dicetne" :1, 
"dicetque" :1, 
"dicetur" :1, 
"diceturque" :1, 
"dici" :1, 
"dicier" :1, 
"dicimini" :1, 
"dicimur" :1, 
"dicimus" :1, 
"dicin" :1, 
"dicique" :1, 
"dicis" :1, 
"dicisne" :1, 
"dicisque" :1, 
"dicit" :1, 
"dicite" :1, 
"dicitis" :1, 
"dicito" :1, 
"dicitque" :1, 
"dicitur" :1, 
"diciturne" :1, 
"dico" :1, 
"dicta" :1, 
"dictae" :1, 
"dictaeque" :1, 
"dictam" :1, 
"dictamque" :1, 
"dictaque" :1, 
"dictarum" :1, 
"dictas" :1, 
"dictasque" :1, 
"dictast" :1, 
"dicte" :1, 
"dicti" :1, 
"dictique" :1, 
"dictis" :1, 
"dictisque" :1, 
"dictiue" :1, 
"dicto" :1, 
"dictoque" :1, 
"dictorum" :1, 
"dictorumque" :1, 
"dictos" :1, 
"dictoue" :1, 
"dictove" :1, 
"dictu" :1, 
"dictum" :1, 
"dictumque" :1, 
"dictumst" :1, 
"dictumue" :1, 
"dictumve" :1, 
"dictuque" :1, 
"dictura" :1, 
"dicturam" :1, 
"dicturas" :1, 
"dicturi" :1, 
"dicturis" :1, 
"dicturo" :1, 
"dicturos" :1, 
"dicturosque" :1, 
"dicturum" :1, 
"dicturumque" :1, 
"dicturus" :1, 
"dicturusne" :1, 
"dicturusque" :1, 
"dicturusve" :1, 
"dictus" :1, 
"dictusque" :1, 
"dictust" :1, 
"dicunda" :1, 
"dicundae" :1, 
"dicundi" :1, 
"dicundis" :1, 
"dicundo" :1, 
"dicundum" :1, 
"dicundumst" :1, 
"dicunt" :1, 
"dicunto" :1, 
"dicuntque" :1, 
"dicuntur" :1, 
"dixe" :1, 
"dixeram" :1, 
"dixeramus" :1, 
"dixerant" :1, 
"dixeras" :1, 
"dixerat" :1, 
"dixeratis" :1, 
"dixere" :1, 
"dixerim" :1, 
"dixerimus" :1, 
"dixerin" :1, 
"dixerint" :1, 
"dixeris" :1, 
"dixerisne" :1, 
"dixerit" :1, 
"dixeritis" :1, 
"dixeritne" :1, 
"dixeritque" :1, 
"dixero" :1, 
"dixerunt" :1, 
"dixeruntque" :1, 
"dixi" :1, 
"diximus" :1, 
"dixin" :1, 
"dixique" :1, 
"dixisse" :1, 
"dixissem" :1, 
"dixissemus" :1, 
"dixissent" :1, 
"dixisses" :1, 
"dixisset" :1, 
"dixissetque" :1, 
"dixisti" :1, 
"dixistique" :1, 
"dixistis" :1, 
"dixit" :1, 
"dixitne" :1, 
"dixitque" :1, 
//// habeo" :1, 
"habe" :1, 
"habeam" :1, 
"habeamini" :1, 
"habeamus" :1, 
"habeant" :1, 
"habeantne" :1, 
"habeantque" :1, 
"habeantur" :1, 
"habear" :1, 
"habeare" :1, 
"habearis" :1, 
"habeas" :1, 
"habeasne" :1, 
"habeasque" :1, 
"habeat" :1, 
"habeatis" :1, 
"habeatque" :1, 
"habeatur" :1, 
"habeaturque" :1, 
"habebam" :1, 
"habebamus" :1, 
"habebant" :1, 
"habebantque" :1, 
"habebantur" :1, 
"habebas" :1, 
"habebat" :1, 
"habebatis" :1, 
"habebatque" :1, 
"habebatur" :1, 
"habebaturque" :1, 
"habebere" :1, 
"habeberis" :1, 
"habebimur" :1, 
"habebimus" :1, 
"habebis" :1, 
"habebit" :1, 
"habebitis" :1, 
"habebitque" :1, 
"habebitur" :1, 
"habebo" :1, 
"habebor" :1, 
"habebunt" :1, 
"habebuntque" :1, 
"habebuntur" :1, 
"habemur" :1, 
"habemus" :1, 
"haben" :1, 
"habenda" :1, 
"habendae" :1, 
"habendaeque" :1, 
"habendam" :1, 
"habendamque" :1, 
"habendarum" :1, 
"habendas" :1, 
"habendast" :1, 
"habendi" :1, 
"habendique" :1, 
"habendis" :1, 
"habendo" :1, 
"habendoque" :1, 
"habendorum" :1, 
"habendos" :1, 
"habendum" :1, 
"habendumque" :1, 
"habendumst" :1, 
"habendus" :1, 
"habendusve" :1, 
"habens" :1, 
"habensque" :1, 
"habent" :1, 
"habente" :1, 
"habentem" :1, 
"habentes" :1, 
"habenti" :1, 
"habentia" :1, 
"habentibus" :1, 
"habentis" :1, 
"habentium" :1, 
"habentne" :1, 
"habento" :1, 
"habentque" :1, 
"habentur" :1, 
"habeo" :1, 
"habeon" :1, 
"habeoque" :1, 
"habeor" :1, 
"habere" :1, 
"haberem" :1, 
"haberemque" :1, 
"haberemus" :1, 
"haberent" :1, 
"haberentque" :1, 
"haberentue" :1, 
"haberentur" :1, 
"habereque" :1, 
"haberes" :1, 
"haberet" :1, 
"haberetis" :1, 
"haberetne" :1, 
"haberetque" :1, 
"haberetur" :1, 
"habereturque" :1, 
"haberi" :1, 
"haberier" :1, 
"haberique" :1, 
"haberis" :1, 
"habes" :1, 
"habesne" :1, 
"habet" :1, 
"habete" :1, 
"habetin" :1, 
"habetis" :1, 
"habetisque" :1, 
"habeto" :1, 
"habetote" :1, 
"habetque" :1, 
"habetur" :1, 
"habeturque" :1, 
"habita" :1, 
"habitae" :1, 
"habitam" :1, 
"habitaque" :1, 
"habitas" :1, 
"habitasque" :1, 
"habitast" :1, 
"habite" :1, 
"habiti" :1, 
"habitior" :1, 
"habitis" :1, 
"habitissimum" :1, 
"habito" :1, 
"habitoque" :1, 
"habitorum" :1, 
"habitos" :1, 
"habitosque" :1, 
"habitu" :1, 
"habitum" :1, 
"habitumque" :1, 
"habitune" :1, 
"habituque" :1, 
"habitura" :1, 
"habiturae" :1, 
"habituram" :1, 
"habituras" :1, 
"habituri" :1, 
"habiturine" :1, 
"habituris" :1, 
"habituro" :1, 
"habituros" :1, 
"habiturum" :1, 
"habiturumue" :1, 
"habiturus" :1, 
"habiturusque" :1, 
"habiturust" :1, 
"habiturusue" :1, 
"habitus" :1, 
"habitusque" :1, 
"habitust" :1, 
"habueram" :1, 
"habueramus" :1, 
"habuerant" :1, 
"habueras" :1, 
"habuerat" :1, 
"habuere" :1, 
"habuerim" :1, 
"habuerimus" :1, 
"habuerint" :1, 
"habueris" :1, 
"habuerisque" :1, 
"habuerit" :1, 
"habueritis" :1, 
"habueritne" :1, 
"habueritque" :1, 
"habuero" :1, 
"habuerunt" :1, 
"habueruntque" :1, 
"habui" :1, 
"habuimus" :1, 
"habuique" :1, 
"habuisse" :1, 
"habuissem" :1, 
"habuissemus" :1, 
"habuissent" :1, 
"habuisseque" :1, 
"habuisses" :1, 
"habuisset" :1, 
"habuissetis" :1, 
"habuissetque" :1, 
"habuisti" :1, 
"habuistis" :1, 
"habuit" :1, 
"habuitne" :1, 
"habuitque" :1, 
//// fero" :1, 
"fer" :1, 
"feram" :1, 
"feramque" :1, 
"feramur" :1, 
"feramus" :1, 
"ferant" :1, 
"ferantur" :1, 
"feranturque" :1, 
"ferar" :1, 
"ferare" :1, 
"feraris" :1, 
"feras" :1, 
"ferasque" :1, 
"ferasue" :1, 
"ferat" :1, 
"feratis" :1, 
"feratque" :1, 
"feratur" :1, 
"feraturque" :1, 
"ferebam" :1, 
"ferebamur" :1, 
"ferebamus" :1, 
"ferebant" :1, 
"ferebantque" :1, 
"ferebantur" :1, 
"ferebanturque" :1, 
"ferebar" :1, 
"ferebare" :1, 
"ferebaris" :1, 
"ferebas" :1, 
"ferebat" :1, 
"ferebatis" :1, 
"ferebatque" :1, 
"ferebatur" :1, 
"ferebaturque" :1, 
"feremur" :1, 
"feremus" :1, 
"feren" :1, 
"ferenda" :1, 
"ferendae" :1, 
"ferendam" :1, 
"ferendaque" :1, 
"ferendarum" :1, 
"ferendas" :1, 
"ferendi" :1, 
"ferendine" :1, 
"ferendis" :1, 
"ferendo" :1, 
"ferendos" :1, 
"ferendum" :1, 
"ferendus" :1, 
"ferens" :1, 
"ferent" :1, 
"ferente" :1, 
"ferentem" :1, 
"ferentes" :1, 
"ferenti" :1, 
"ferentia" :1, 
"ferentibus" :1, 
"ferentis" :1, 
"ferentium" :1, 
"ferentur" :1, 
"ferere" :1, 
"fereris" :1, 
"feres" :1, 
"feresne" :1, 
"feret" :1, 
"feretis" :1, 
"feretque" :1, 
"feretur" :1, 
"fero" :1, 
"feroque" :1, 
"feror" :1, 
"ferorque" :1, 
"ferque" :1, 
"ferre" :1, 
"ferrem" :1, 
"ferremus" :1, 
"ferrent" :1, 
"ferrentur" :1, 
"ferreque" :1, 
"ferres" :1, 
"ferret" :1, 
"ferretis" :1, 
"ferretne" :1, 
"ferretque" :1, 
"ferretur" :1, 
"ferri" :1, 
"ferrique" :1, 
"ferrist" :1, 
"ferriue" :1, 
"ferrive" :1, 
"fers" :1, 
"fersne" :1, 
"fersque" :1, 
"fert" :1, 
"ferte" :1, 
"fertis" :1, 
"fertne" :1, 
"ferto" :1, 
"fertor" :1, 
"fertque" :1, 
"fertur" :1, 
"ferturque" :1, 
"ferue" :1, 
"ferundae" :1, 
"ferundam" :1, 
"ferundast" :1, 
"ferundi" :1, 
"ferundis" :1, 
"ferundo" :1, 
"ferundum" :1, 
"ferunt" :1, 
"ferunto" :1, 
"feruntque" :1, 
"feruntur" :1, 
"lata" :1, 
"latae" :1, 
"latam" :1, 
"latamque" :1, 
"lataque" :1, 
"latarum" :1, 
"latarumque" :1, 
"latas" :1, 
"late" :1, 
"lateque" :1, 
"latest" :1, 
"lati" :1, 
"latin" :1, 
"latine" :1, 
"latineque" :1, 
"latior" :1, 
"latiora" :1, 
"latiore" :1, 
"latiorem" :1, 
"latioremque" :1, 
"latiores" :1, 
"latioribus" :1, 
"latioribusque" :1, 
"latioris" :1, 
"latiorque" :1, 
"latiorum" :1, 
"latique" :1, 
"latis" :1, 
"latisque" :1, 
"latissima" :1, 
"latissimae" :1, 
"latissimam" :1, 
"latissimarum" :1, 
"latissimas" :1, 
"latissime" :1, 
"latissimeque" :1, 
"latissimi" :1, 
"latissimis" :1, 
"latissimo" :1, 
"latissimos" :1, 
"latissimum" :1, 
"latissimus" :1, 
"latius" :1, 
"latiusque" :1, 
"lato" :1, 
"laton" :1, 
"latone" :1, 
"latoque" :1, 
"latorum" :1, 
"latorumque" :1, 
"latos" :1, 
"latosque" :1, 
"latu" :1, 
"latum" :1, 
"latumque" :1, 
"latumst" :1, 
"latura" :1, 
"laturam" :1, 
"laturas" :1, 
"laturi" :1, 
"laturique" :1, 
"laturis" :1, 
"laturo" :1, 
"laturos" :1, 
"laturum" :1, 
"laturumque" :1, 
"laturus" :1, 
"latus" :1, 
"latusque" :1, 
"tetulere" :1, 
"tetulerit" :1, 
"tetulero" :1, 
"tetulerunt" :1, 
"tetuli" :1, 
"tetulisse" :1, 
"tetulissem" :1, 
"tetulissent" :1, 
"tetulisset" :1, 
"tetulisti" :1, 
"tetulit" :1, 
"tuleram" :1, 
"tuleramus" :1, 
"tulerant" :1, 
"tuleras" :1, 
"tulerat" :1, 
"tulere" :1, 
"tulerim" :1, 
"tulerimus" :1, 
"tulerint" :1, 
"tulerintque" :1, 
"tuleris" :1, 
"tulerit" :1, 
"tuleritis" :1, 
"tulero" :1, 
"tulerunt" :1, 
"tuleruntque" :1, 
"tuli" :1, 
"tulimus" :1, 
"tulimusque" :1, 
"tulique" :1, 
"tulisse" :1, 
"tulissem" :1, 
"tulissemus" :1, 
"tulissent" :1, 
"tulisses" :1, 
"tulisset" :1, 
"tulissetis" :1, 
"tulisti" :1, 
"tulistis" :1, 
"tulit" :1, 
"tulitque" :1, 
//// fio" :1, 
"fi" :1, 
"fiam" :1, 
"fiamque" :1, 
"fiamus" :1, 
"fiant" :1, 
"fiantque" :1, 
"fias" :1, 
"fiat" :1, 
"fiatque" :1, 
"ficumque" :1, 
"fiebam" :1, 
"fiebant" :1, 
"fiebat" :1, 
"fient" :1, 
"fientque" :1, 
"fierem" :1, 
"fierent" :1, 
"fieres" :1, 
"fieret" :1, 
"fieretque" :1, 
"fieretue" :1, 
"fieri" :1, 
"fierine" :1, 
"fierique" :1, 
"fieriue" :1, 
"fies" :1, 
"fiet" :1, 
"fietque" :1, 
"fimus" :1, 
"fin" :1, 
"fio" :1, 
"fis" :1, 
"fit" :1, 
"fite" :1, 
"fitque" :1, 
"fiunt" :1, 
"fiuntque" :1, 
//// inquam" :1, 
"inquam" :1, 
"inquamst" :1, 
"inque" :1, 
"inquiebat" :1, 
"inquies" :1, 
"inquiet" :1, 
"inquii" :1, 
"inquimus" :1, 
"inquin" :1, 
"inquis" :1, 
"inquisti" :1, 
"inquit" :1, 
"inquito" :1, 
"inquiunt" :1, 
//// aio" :1, 
"aiant" :1, 
"aias" :1, 
"aiat" :1, 
"aibant" :1, 
"aibas" :1, 
"aibat" :1, 
"aiebam" :1, 
"aiebamus" :1, 
"aiebant" :1, 
"aiebas" :1, 
"aiebat" :1, 
"aiebatis" :1, 
"ain" :1, 
"aio" :1, 
"ais" :1, 
"aisne" :1, 
"ait" :1, 
"aitque" :1, 
"aiunt" :1, 
"aiuntque": 1
}
let stopENG = {"the":1};
let stopDE = {"der":1, "die":1, "das":1};
let stopFR = {};
let stopSP = {};
let stopIT = {};

function normalizearraykeys(){
	//die Funktion muß einmal zu beginn des Seitenaufrufs überalle array laufen
	trenner = normarrayk( trenner );
	//leidenklammerung = normarrayk( leidenklammerung );
	buchstLAT = normarrayk( buchstLAT );
	vokaleLAT = normarrayk( vokaleLAT );
	disptongLAT = normarrayk( disptongLAT );
	konLAT = normarrayk( konLAT );
	doppelkonsonanzLAT  = normarrayk( doppelkonsonanzLAT );
	doppelabereinzelkonsonantLAT  = normarrayk( doppelabereinzelkonsonantLAT );
	labiovelareLAT  = normarrayk( labiovelareLAT );
	mutacumliquidaLAT = normarrayk( mutacumliquidaLAT );
	mutaeLAT = normarrayk( mutaeLAT );
	mediaeLAT = normarrayk( mediaeLAT );
	tenuesLAT = normarrayk( tenuesLAT );
	aspirataeLAT = normarrayk( aspirataeLAT );
	dauerlauteLAT = normarrayk( dauerlauteLAT );
	spirantesLAT  = normarrayk( spirantesLAT );
	nasalesLAT  = normarrayk( nasalesLAT );
	liquidaeLAT = normarrayk( liquidaeLAT );
    demonstrativpronomLAT = normarrayk( demonstrativpronomLAT );

	buchstGRI = normarrayk( buchstGRI );
	vokaleGRI = normarrayk( vokaleGRI );
	diphtongGRI = normarrayk( diphtongGRI );
	vokalelangGRI = normarrayk( vokalelangGRI );
	vokalekurzGRI = normarrayk( vokalekurzGRI );
	vokalelangkurzGRI = normarrayk( vokalelangkurzGRI );
	konGRI = normarrayk( konGRI );
	doppelkonsonanzGRI = normarrayk( doppelkonsonanzGRI );
	doppelabereinzelkonsonantGRI = normarrayk( doppelabereinzelkonsonantGRI );
	mutacumliquidaGRI = normarrayk( mutacumliquidaGRI );
	mutaeGRI = normarrayk( mutaeGRI );
	meiaeGRI = normarrayk( meiaeGRI );
	tenuesGRI = normarrayk( tenuesGRI );
	aspirataeGRI = normarrayk( aspirataeGRI );
	dauerlauteGRI = normarrayk( dauerlauteGRI );
	spirantesGRI = normarrayk( spirantesGRI );
	nasalesGRI = normarrayk( nasalesGRI );
	liquidaeGRI = normarrayk( liquidaeGRI );
	konsonantengruppenambeginneineswortes = normarrayk( konsonantengruppenambeginneineswortes );
	deklination1stammauslautGRI = normarrayk( deklination1stammauslautGRI );
	deklination1endGRI = normarrayk( deklination1endGRI );
	deklination2stammauslautGRI = normarrayk( deklination2stammauslautGRI );
	deklination2endGRI = normarrayk( deklination2endGRI );
	deklination3stammauslautGRI = normarrayk( deklination3stammauslautGRI );
	deklination3endGRI = normarrayk( deklination3endGRI );
    konjugationVerbaVocalia = normarrayk( konjugationVerbaVocalia );
    konjugationVerbaVocaliaVORS = normarrayk( konjugationVerbaVocaliaVORS );
    konjugationVerbaVocaliaVORW = normarrayk( konjugationVerbaVocaliaVORW );
    konjugationVerbaMuta = normarrayk( konjugationVerbaMuta );
    konjugationVerbaMuta = normarrayk( konjugationVerbaMuta );
	preposGRI = normarrayk( preposGRI );
    preposLAT = normarrayk( preposLAT );
    adverbLAT = normarrayk( adverbLAT );
	adverbGRI = normarrayk( adverbGRI );
	postproGRI = normarrayk( postproGRI );
    postproLAT = normarrayk( postproLAT );
	artikelGRI = normarrayk( artikelGRI );
    demonstrativpronomGRI = normarrayk( demonstrativpronomGRI );
	perspronomenGRI = normarrayk( perspronomenGRI );
    perspronomenLAT = normarrayk( perspronomenLAT );
	reflxivpronomenGRI = normarrayk( reflxivpronomenGRI );
    reflxivpronomenLAT = normarrayk( reflxivpronomenLAT );
	indefinitpronomenGRI = normarrayk( indefinitpronomenGRI );
    indefinitpronomenLAT = normarrayk( indefinitpronomenLAT );
	negativpronomenGRI = normarrayk( negativpronomenGRI );
    negativpronomenLAT = normarrayk( negativpronomenLAT );
	determinativpronomenGRI = normarrayk( determinativpronomenGRI );
	interogativpronomenGRI = normarrayk( interogativpronomenGRI );
    interogativpronomenLAT = normarrayk( interogativpronomenLAT );
	relativpronomenGRI = normarrayk( relativpronomenGRI );
    korrelativpronomenLAT = normarrayk( korrelativpronomenLAT );
    numeraladjektivaLAT = normarrayk( numeraladjektivaLAT );
	reziprokpronomenGRI = normarrayk( reziprokpronomenGRI );
    fktpartikelLAT = normarrayk( fktpartikelLAT );
    interjektionLAT = normarrayk( interjektionLAT );
    konjunktionSubjunktionLAT = normarrayk( konjunktionSubjunktionLAT ); 
    possesivpronLAT = normarrayk( possesivpronLAT );
	otiACIGRI = normarrayk( otiACIGRI );
	verneinungpartikelGRI = normarrayk( verneinungpartikelGRI );
	partikelGRI = normarrayk( partikelGRI );
	konjuncGRI = normarrayk( konjuncGRI );
	stopGR = normarrayk( stopGR );
    stopLA = normarrayk( stopLA );
    stopENG = normarrayk( stopENG );
    stopDE = normarrayk( stopDE );
    stopFR = normarrayk( stopFR );
    stopSP = normarrayk( stopSP );
    stopIT = normarrayk( stopIT );
    listofelusion = normarrayk( listofelusion );
    normarrayval( listofelusion );
	console.log("initiale "+analysisNormalform+" Normaliserung für die Listenschlüssel fertig");
}





/*------------------------------------------------------------------------------

LETTER- and LETTER-GROUP-LEVEL

------------------------------------------------------------------------------*/
//NOTE NO SECURE CODE, NO ERROR HANDLING - SPEED


function ngramWhole( A, n ){ //string input, but for more than a word
    if( A.indexOf( " " ) !== -1 ){ //containe spaces
        return ngram( A, n, 0 );
    } //add else
}

function ngramWords( B, n, padding ){
    //check B instance of array
    let kuku = [];
    for( let t in B ){
        kuku.push( ngram( B[t], n, padding ) );
    }
    return kuku;
}

function genngram( C, n ){
    //general ngrtam build
    return ngram( C, n, false );
}

function ngram( A, n, padding ){ //string input
    //bad
    if( n >= A.length  ){
        return A; //hellbadness 
    }

    if( padding ){
        //offset the strings fur gram building like this xxhalloxx = xxh, xha, hal, all, llo, lox, oxx
        let adddumm = ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"];
        A = adddumm.slice(0,n-1).join( "" )+A+adddumm.slice(0,n-1).join( "" )
    }

    //build the gam
    let vecA = [];
    const lele = A.length-n+1;
    for(let i = 0; i < lele; i++){
        vecA.push( A.slice(i,i+n) );
    }
    return vecA;
}

//suffix trees
function buildTree(){
    console.log("Build Tree Trigram");
    treeGram = {};

    for( let lang in inverseabkAWWAkba ){
        let vecTris = ngram( lang, 3, False );
        let kurz = inverseabkAWWAkba[ lang ];
        for( let v = 0; v < len( vecTris )-1; v+=1 ){
            if( treeGram[ vecTris[v] ] ){
                if( treeGram[ vecTris[v] ][0].indexOf( kurz ) == -1 ){
                    treeGram[ vecTris[v] ][0].push(kurz);
                }
            } else {
                treeGram[ vecTris[v] ] = [ [kurz], { } ];
            }
        }
    }   
    console.log("End Tree Tri");
}

//SILBEN
function einzeilzeichenzuLauteinheiten( dieeinzelzeichen, diphtong, 
										doppelabereinzelkonsonant, mutacumliquida , doppelkonsonanz ){
	/* Funktionmacht: Einzelzeichen müssen unter Umständen zu Diphtongen zusammen gesetzt werden, müssen als eher eine Einheit betrachtet werden (muta cum liquida), oder eben als mehrer Konsonanten. Bei der Silbentrennung werden dann nur diese Einheiten untersucht, ob sie vokal sind, und wie sie sich zu diesen hinordnen lassen. So kann man mit einem Vergleich auch mehrfache Konsonanten behandeln. Wa snicht geht ist die korrekte Trennung der muta cum liquida für den Fall der Zusammengesetzten Worte. Das muß eine Funktion vorher geschehen und benötigt noch ein Kriterium */
	let buchstaebliches = []; //Einzelzeichen und Diphtonge, Doppelkonsonanz auflösen und qu nicht trennen
    const lele = dieeinzelzeichen.length;
	for(let i = 1; i < lele; i++){
		let einheit = dieeinzelzeichen[i-1]+dieeinzelzeichen[i];
		let di = diphtong[ einheit ];
		//console.log(i, einheit, buchstaebliches, dieeinzelzeichen);
		if(di){ // ist diphtong
			buchstaebliches.pop();
			buchstaebliches.push( einheit );
		} else { // kein Diphtong
			let qu = doppelabereinzelkonsonant[ einheit ];
			if( qu ){ // ist qu oder ähnliches
				buchstaebliches.pop();//buchstabe i-1 ist schon drin also wieder raus ist ja auch in der einheit
				buchstaebliches.push( einheit );
			} else { // nicht qu
				let mcl = mutacumliquida[ einheit ];
				if( mcl ){
					buchstaebliches.pop();//buchstabe i-1 ist schon drin also wieder raus ist ja auch in der einheit
					buchstaebliches.push( einheit );
				} else {
					let doppelkon = doppelkonsonanz[ dieeinzelzeichen[i] ];
					if( doppelkon ){ //ist doppelkonsonant
						if(i == 1){ //ersten Buchstaben mitnehmen
							buchstaebliches.push(dieeinzelzeichen[i-1]);
						}
						let dkeinzeln = doppelkon.split( "" );
						//console.log(dkeinzeln);
						for( let d in dkeinzeln ){
							buchstaebliches.push( dkeinzeln[ d ] );
						}
					} else { //nicht doppelkonsonant -- also einfach zeichen übernhemen
						//console.log("doppelkonso", dieeinzelzeichen[i-1], dieeinzelzeichen[i]);
						if(i == 1){ 
                        //console.log("1111")
						//ersten Buchstaben nicht vergessen, und kontrollieren, ob er ein doppelkonsonant
							let doppelkon = doppelkonsonanz[ dieeinzelzeichen[i-1] ];
							if( doppelkon ){ //ist doppelkonsonant
								let dkeinzeln = doppelkon.split( "" );
								for( let d in dkeinzeln ){
									buchstaebliches.push( dkeinzeln[ d ] );
								}
							} else {
								buchstaebliches.push(dieeinzelzeichen[i-1]);
							}
							buchstaebliches.push(dieeinzelzeichen[i]);
						} else { // sonst nur den untersuchten und den davor nicht hinzufügen
							buchstaebliches.push(dieeinzelzeichen[i]);
						}
					}
				}
			}
		}
	}
	return buchstaebliches;
}

function trennSGRI( A ){
    let textelem = null;
    let diewoerter = [];
    if( A === undefined ){
	    textelem = document.getElementById( "inputtext"); //holt das html Element in das der Text eingegeben wird
	    diewoerter = diewoerter = ohnesatzzeichen( iotasubiotoadL( GRvorbereitungT( textelem.value ))); //holt den Text und spaltet ihn an den Leerzei., nennt das worte
	} else {
        diewoerter = diewoerter = ohnesatzzeichen( iotasubiotoadL( GRvorbereitungT( A )));;
    }
	
	let et = trennSGRInurarray( diewoerter );
	return et;
}

function trennSGRInurarray( diewoerter ){
	/*Die Regeln zur Trennung lauten:
	0. Silbe: Kopf+Nucleus+Koda
	1. ein einzelner Konsonant (auch Doppelkonsonaten) gehört zur folgenden Silbe
	2. Konsonantenfolgen, sofern ein griechsiches Wort damit beginnen kann, 
	   gehören zu folgenden Silbe, sonst werde diese aufgetrennt
	3. die Trennung der Konsonantenfolgen geschieht nicht, wenn die letzen Beiden eine Mutacumliquida bilden
	unerfüllt 3. Falls zwei oder mehr Konsonanten, ein Doppelkonsonant (ζ, ξ oder ψ) oder ein gelängter (geminierter) Konsonant zwischen zwei Silben innerhalb eines Wortes erscheinen, gehört der erste zu der davor und längt sie.
	unerfüllt 4. Plosive plus Liquide oder Nasale (z. B. τρ oder κν)
	unerfüllt 5. Zusammensetzungen an ihren Teilen trennen.
	*/
	
	let ergtext = ""; //darin werden die Ergebnisse der Trennung in Silben gespeichert
	for( let w in diewoerter ){
		let dieeinzelzeichen = diewoerter[ w ].split(""); //zerlege das wort in einzelene Zeichen
		let lautliches = einzeilzeichenzuLauteinheiten( dieeinzelzeichen, 
						diphtongGRI, doppelabereinzelkonsonantGRI, mutacumliquidaGRI, doppelkonsonanzGRI );
		//console.log( "gr lautliches", lautliches );
		let silben = [];
		let letzteeinheit = false;
		for(  let l in lautliches ){
			let istvokalisch = false;
			let lautlicheeinheit = lautliches[ l ] ;
			if( vokaleGRI[ lautlicheeinheit ] || diphtongGRI[ lautlicheeinheit ] ){
				istvokalisch = true;
			}
			if( istvokalisch ){ 
				if( letzteeinheit ){
					//wenn letzteeinheit als gruppe von konsonanten am anfang von worten stehen kann einfach pushen, sonst muß man split machen und aufteilen (letztes an die nächste oder wie)
					
					if( konsonantengruppenambeginneineswortes[ letzteeinheit ] > 1 ){ //was ist wenn es zwei und drei Konsonanten sein könnten  - st und stk
						silben.push( "-" );
						silben.push( letzteeinheit );
						silben.push( lautlicheeinheit );
					} else {
						let konsos = letzteeinheit.split("");
							//hier musst du auf mutacumliquida testen, die nicht getrennt werden
							//hier muss bercksichtigt werden, das ein Doppelvokal aufgetrennt wird, wenn er einzeln zwischen zwei vokalen steht -- falls die konsonantengruppen Regel nicht vorbestimmt werden diese richtig aufgetrennt!!!
						//console.log(konsos, konsos.length,  konsos[konsos.length-2]+konsos[konsos.length-1], mutacumliquidaGRI[konsos[konsos.length-2]+konsos[konsos.length-1]]);
						let lkonso = "";
						if( mutacumliquidaGRI[konsos[konsos.length-2]+konsos[konsos.length-1]] && konsos.length >= 2 ){
							let fk = konsos.pop();
							lkonso = konsos.pop()+fk;
						} else {
							lkonso = konsos.pop(); 
						}
						silben.push( konsos.join( "" ) );
						silben.push( "-" );
						silben.push( lkonso );
						silben.push( lautlicheeinheit );
					}
					letzteeinheit = false;
				} else {
					silben.push( "-" );
					silben.push( lautlicheeinheit );
				}
			} else { 
				if( letzteeinheit ){
					letzteeinheit += lautlicheeinheit;
				} else {
					letzteeinheit = lautlicheeinheit;
				}
			}
		}
		if( letzteeinheit ){ //letzter konsonant
			silben.push( letzteeinheit );
		}
		//console.log(lautliches.toString(), silben.toString());
		ergtext = ergtext + silben.join("") + "  ";
	}
	//
	return ergtext;
	
}
function trennSARA(){ //Arabisch ?

}
function trennSPER(){ //Persisch ?

}
function trennHEBR(){ //Hebräisch ?

}

function trennSLAT( A ){
    let textelem = null;
    let diewoerter = [];
    if( A === undefined ){
	    textelem = document.getElementById( "inputtext"); //holt das html Element in das der Text eingegeben wird
	    diewoerter = GRvorbereitungT( textelem.value.split("u").join("v") ); //holt den Text und spaltet ihn an den Leerzei., nennt das worte
	} else {
        diewoerter = GRvorbereitungT( A.split("u").join("v") );
    }
	let ergtext = ""; //darin werden die Ergebnisse der Trennung in Silben gespeichert
	for( let w in diewoerter ){ // für alles was wort bedeuten soll
		let dieeinzelzeichen = diewoerter[ w ].split(""); //zerlege das wort in einzelene Zeichen
		let lautliches = einzeilzeichenzuLauteinheiten( dieeinzelzeichen, disptongLAT, 
												doppelabereinzelkonsonantLAT, mutacumliquidaLAT, doppelkonsonanzLAT );
		//console.log( "Aus ", dieeinzelzeichen.toString(), " wird ", lautliches.toString(), "(Lauteinheiten)");

		/*Die Regeln zur Trennung lauten:
		0. Silbe: Kopf+Nucleus+Koda
		1. einzelner Konsonant und der zweite von zwei aufeinanderfolgenden einfachen Vokalen gehört zur folgenden 	          Silbe (do-mus, a-mi-cus)
		2. folgen auf einen Vokal zwei oder mehr Konsonanten, dann wird der letzte zur zweiten Silbe gezogen 
           (ful-mem, cur-rus) nur wenn es sich um muta cum liuida handelt dann nicht (pu-bli-cus, ce-le-bro)
		unerfüllt 3. zusammengesetzte Wörter werden nach ihren Bestandteilen getrennt, 
					dabei auch muta cum liquida trennen
		4. steht vor u kein Konsonant, dann ist es konsonantisch zu werten (vielleicht noch an anderen Stellen), bei iu ???
		5. gu, su, qu wenn danach ein Vokal - dann konsonantisch; labiovelare
		6. j/i ist halbvokal, wenn danach ein vokal (sievers-lindeman)(außer o) knommt, dann ist es konsonantisch j
			- zwischen zwei Konsonanten ist es vokalisch, bei iu ?
		7. zwei gleiche aufeinanderfolgende vokale trennen
		*/
		
		let silben = [];
		let letzteeinheit = "";
		let coda = [];
		let noVokalKonso = true;
		let labiovelare = false;
        const lele = lautliches.length;
		for( let l = 0; l < lele; l++ ){
			let vorhervokalisch = false;
			let diesvokalisch = false;
			let lautlicheeinheit = lautliches[ l ] ;
			
			if( vokaleLAT[ lautlicheeinheit ] || disptongLAT[ lautlicheeinheit ] ){
				diesvokalisch = true;
			}
			if( vokaleLAT[ letzteeinheit ] || disptongLAT[ letzteeinheit ] ){
				vorhervokalisch = true;
			}
		
			//console.log("dies vokalisch: ", diesvokalisch, "vorher vokalisch: ", vorhervokalisch,"letzeeinheit:", letzteeinheit, ", diese ", lautlicheeinheit, "nächste ", lautliches[l+1]);
			
			if( diesvokalisch == true &&  vorhervokalisch == true ){  //vokal-vokal uebergang
				//ACHTUNG DIE REIHENFOLGE DER IF ABFRAGEN STELLT EIN HIERARCHIE AUCH DER REGELN DAR
				if(vokaleLAT[ letzteeinheit ] == vokaleLAT[ lautlicheeinheit ]){ //zwei gleiche vokale
					//console.log("zwei gleiche vokle");

					silben.push( coda.join("") );
					silben.push( "-" );
					silben.push( lautlicheeinheit );
				}else if( labiovelareLAT[ letzteeinheit+lautlicheeinheit ] ){//regel 7, gleiche voakle trennenb
					silben.push( coda.join("") );
					silben.push( "-" );
					silben.push( letzteeinheit );
					silben.push( lautlicheeinheit );
				}  else if( labiovelareLAT[ lautliches[l-2]+letzteeinheit ] ){ //regel 5, labiovelare
					//console.log("regel 5, labiovelare", silben);
					let nostop = true;
					let rest = [];
					while(nostop){
						let curr = silben.pop();
						if( konLAT[ curr ] || curr == undefined ){
							rest.push( curr );
							nostop = false;
						} else {
							if( trenner[ curr ] == undefined ){
								rest.push(curr);
							}
						}
					}
					//console.log("regel 5, labiovelare", silben);
					silben.push( rest.pop() );
					silben.push( rest.join("") );
					silben.push( lautlicheeinheit );
				} else if( vokaleLAT[ letzteeinheit ] == 5 && //regel u oder v
						   //vokaleLAT[ l-2 ] == undefined &&
						   vokaleLAT[ lautlicheeinheit ] != 2){
					//console.log("regel u oder v");
					silben.push( coda.join("") );
					silben.push( lautlicheeinheit );
					//trennung wird dann gemacht beim übergang von konsoant zu vokal
				} else if( vokaleLAT[ letzteeinheit ] == 2 && 
						   vokaleLAT[ lautlicheeinheit ] &&
						   vokaleLAT[ lautlicheeinheit ] != 4 &&
							noVokalKonso == false){ //regel 6 i oder j
					coda.push( lautlicheeinheit );//coda += lautlicheeinheit; //also als konsoant gewertet
					//vorher war entweder konsonant vokal oder vokal vokal
					let nostrich = true;
					let rest = [];
					while( nostrich ){ 
						let curr = silben.pop();
						if( trenner[ curr ] || curr == undefined ){
							nostrich = false;
						} else {
							rest.push(curr);
						}
					}
					//console.log("i / j Regel", rest, silben);
					silben.push( rest.pop( ) );
					silben.push("-");
					silben.push( rest.join("") );
					silben.push( lautlicheeinheit );
				}else { //einfach zwei vokale aufeinander dann trennen
				    //console.log("einfachzwei vokale", coda);
					silben.push( coda.join("") );
					silben.push( "-" );
					silben.push( lautlicheeinheit );
					
				}
				coda = [];
			} else if( diesvokalisch == true &&  vorhervokalisch == false ) {//konsoant-voakle uebergang
					if(l == 0){
						silben.push( "-" );
						silben.push( letzteeinheit );
					} else {
						if( noVokalKonso ){
							silben.push( coda.join("") );
						} else {
							let letzterkonsoant = coda.pop();
							silben.push( coda.join("") );
							silben.push( "-" );
							silben.push( letzterkonsoant );
						}
					}
					silben.push( lautlicheeinheit );
					coda = [];
				
				
			} else if( diesvokalisch == false &&  vorhervokalisch == false ){//konsoant-konsoant uebergang
				coda.push( lautlicheeinheit );
			} else { //vokal konsoant uebergang
				
					coda.push( lautlicheeinheit );
					noVokalKonso = false;
				
				
			}
			letzteeinheit = lautlicheeinheit;
		}
		if( letzteeinheit ){ //letzter konsonant
			silben.push( coda.join("") );
		}
		//console.log(lautliches.toString(), silben.toString());
		if ( silben[0] == "-"){
			silben[0] = "";
		}
		ergtext = ergtext + silben.join("") + " ";
	
	}
	//
	return ergtext;
	//document.getElementById( "ergeb" ).innerHTML = document.getElementById( "ergeb" ).innerHTML +"<b>"+diewoerter.join(" ")+"</b><br/>"+"<i>"+ ergtext +"</i><br/><br/>";
}

let latlet = /[a-z]/i;
function islatinletter( L ){
    return L.length === 1 && L.match( latlet );
}

function islatinletters( w ){
    let bu = w.split( "" );
    let countletters = 0;
    for( let be = 0; be < bu.length; be += 1 ){
        if( islatinletter( bu[be] ) ){
            countletters += 1;
        }
    }

    if( countletters >= (bu.length/2)){
        return true;
    } else {
        return false;
    }
}

 
function silben( A ){ //string input
    let WS = A.split( " " );
    let allesilben = [];
    for( let t = 0; t < WS.length; t+=1 ){
        let B = WS[t];
        if( islatinletters( B ) ){
            allesilben.push( trennSLAT( B ) );
        } else {
            allesilben.push( trennSGRI( B ) );
        }

    }
    /*let insilb = t
    console.log(insilb, len( insilb ),len(A)+1, len( insilb ) <= len(A)+1)
    if( len( insilb ) <= len(A)+1 ){
        insilb = 
    }*/
    /*let WoeINSilben  = insilb.split(" "); // hier müssen wir noch unterscheiden, ob griechisch oder lateinische wörter
    
    const lele = WoeINSilben.length;
    for( let w = 0; w < lele; w++  ){
        if( WoeINSilben[ w ] != "" ){
            let spispa = WoeINSilben[ w ].split("-");
            const lelele = spispa.length;
            for( let s = 0; s < lelele; s++ ){
                 allesilben.push( spispa[ s ] );
            }
        }
    }
    */
    return allesilben;
}

function hasKEY( list, thekey ){
    if( list[ thekey ] ){
        return True;
    } else {
        return False;
    }
}

function ohneAusKEYS( A, kvlist ){ // string input
    let bu = A.toLowerCase().split( "" );
    let bun = [];
    const lele = bu.length;
    for( let b = 0; b < lele; b++ ){
        let ohnealles = delall( bu[b] );
        if( !hasKEY( kvlist, ohnealles ) ){
            bun.push( bu[b] );
        }
    }
    return bun.join( "" );
}

function ohneKon( A ){ //input String
    let bu = A.toLowerCase().split( "" );
    let bun = [];
    const lenbu = len( bu );
    for( let b = 0; b < lenbu; b++ ){
        let ohnealles = delall( bu[b] );
        if( hasKEY( vokaleLAT , ohnealles) ){
            bun.push( bu[b] );
        } else if( hasKEY( vokaleGRI , ohnealles) ){
            bun.push( bu[b] );
        } else if( bu[b] === " " ){
            bun.push( bu[b] );
        }
    }
    return bun.join( "" );
}

function ohnVoka( A ){ //input string
    let WS = A.split( " " );
    let retstr = "";
    for( let be = 0; be < WS.length; be += 1 ){
        let B = WS[be];
        if( islatinletters(B) ){
            retstr += " " + ohneAusKEYS( B, vokaleLAT );
        } else {
            retstr += " " + ohneAusKEYS( B, vokaleGRI );
        }
    }

    return retstr;
}

/*------------------------------------------------------------------------------

WORD-TYPE-LEVEL

------------------------------------------------------------------------------*/
function iskleineswort( aword ){
	let allresu = [];
	
	let resu2 = postproGRI[ aword ];
	if( resu2 ){
		allresu.push([ "postpos", resu2 ])
	}
    let resu2a = postproLAT[ aword ];
	if( resu2a ){
		allresu.push([ "postpos", resu2a ])
	}
	let resu3 = preposGRI[ aword ];
	if( resu3 ){
		allresu.push([ "prepos", resu3 ])
	}
    let resu3a = preposLAT[ aword ];
    if( resu3a ){
		allresu.push([ "prepos", resu3a ])
	}
	let resu4 = artikelGRI[ aword ];
	if(resu4){
		allresu.push([ "artikel", resu4 ])
	}
	let resu5 = perspronomenGRI[ aword ];
	if( resu5 ){
		allresu.push([ "perspron", resu5 ])
	}
    let resu5a = perspronomenLAT[ aword ];
    if( resu5a ){
		allresu.push([ "perspron", resu5a ])
	}
	let resu6 = reflxivpronomenGRI[ aword ];
	if(resu6){
		allresu.push([ "refpron", resu6 ])
	}
    let resu6a = reflxivpronomenLAT[ aword ];
    if( resu6a ){
		allresu.push([ "refpron", resu6a ])
	}
	let resu7 = indefinitpronomenGRI[ aword ];
	if( resu7 ){
		allresu.push([ "indpron", resu7 ])
	}
    let resu7a = indefinitpronomenLAT[ aword ];
    if( resu7a ){
		allresu.push([ "indpron", resu7a ])
	}
	let resu8 = negativpronomenGRI[ aword ];
	if( resu8 ){
		allresu.push([ "negpron", resu8 ])
	}
    let resu8a = negativpronomenLAT[ aword ];
    if( resu8a ){
		allresu.push([ "negpron", resu8a ])
	}
	/*let resu9 = determinativpronomenGRI[ aword ];
	if(resu9){
		allresu.push([ "deterpron", resu9 ])
	}*/
	let resu10 = determinativpronomenGRI[ aword ];
	if(resu10){
		allresu.push([ "deterpron", resu10 ])
	}
	let resu11 = interogativpronomenGRI[ aword ];
	if( resu11 ){
		allresu.push([ "interopron", resu11 ])
	}
    let resu11a = interogativpronomenLAT[ aword ];
    if( resu11a ){
		allresu.push([ "interopron", resu11a ])
	}
	let resu12 = relativpronomenGRI[ aword ];
	if( resu12 ){
		allresu.push([ "relatpron", resu12 ])
	}
    
	let resu13 = reziprokpronomenGRI[ aword ];
	if(resu13){
		allresu.push([ "rezipron", resu13 ])
	}
	let resu14 = otiACIGRI[ aword ];
	if(resu14){
		allresu.push([ "oti", resu14 ])
	}
	let resu15 = verneinungpartikelGRI[ aword ];
	if(resu15){
		allresu.push([ "vernein", resu15 ])
	}
	let resu16 = partikelGRI[ aword ];
	if(resu16){
		allresu.push([ "partikel", resu16 ])
	}
	let resu17 = konjuncGRI[ aword ];
	if(resu17){
		allresu.push([ "konjunktion", resu17 ])
	}
	let resu18 = demonstrativpronomGRI[ aword ];
	if( resu18 ){
		allresu.push([ "demonstpronom", resu18 ]);
	}
    let resu18a = demonstrativpronomLAT[ aword ];
    if( resu18a ){
        allresu.push([ "demonstpronom", resu18a ]);
    }
    let resu19 = adverbLAT[ aword ];
    if( resu19 ){
		allresu.push([ "adverb", resu19 ]);
	}
    let resu20 = korrelativpronomenLAT[ aword ];
    if( resu20 ){
		allresu.push([ "korrelpron", resu20 ]);
	}
    let resu21 = numeraladjektivaLAT[ aword ];
    if( resu21 ){
		allresu.push([ "numeraladj", resu21 ]);
	}
    let resu22 = fktpartikelLAT[ aword ];
    if( resu22 ){
		allresu.push([ "fktpartikel", resu22 ]);
	}
    let resu23 = interjektionLAT[ aword ]; 
    if( resu23 ){
		allresu.push([ "interjektion", resu23 ]);
	}
    let resu24 = konjunktionSubjunktionLAT[ aword ];
    if( resu24 ){
		allresu.push([ "konsubjunktion", resu24 ])
	} 
    let resu25 = possesivpronLAT[ aword ];
    if( resu25 ){
		allresu.push([ "possesivp", resu25 ])
	}

	if( allresu.length > 0 ){
		return allresu;
	} else {
		return false;
	}
}

function justKLEIN( A ){//array input
    let toret = [];  
    const lenA = len( A );  
    for( let a = 0; a < lenA; a+=1 ){
        //print( A[a], iskleineswort( A[a] ) );
        if( iskleineswort( A[a] ) != false || stopGR[ A[a] ] || stopLA[ A[a] ] ){
            toret.push( A[a] );
        }
    }
    return toret;
}


function justGROSZ( A ){//array input
    let toret = [];  
    const lenA = len( A );  
    for( let a = 0; a < lenA; a+=1 ){
        if( !(iskleineswort( A[a] ) != false || stopGR[ A[a] || stopLA[ A[a] ] ]) ){
            toret.push( A[a] );
        }
    }
    return toret;
}

/*------------------------------------------------------------------------------

nFIX-LEVEL

------------------------------------------------------------------------------*/

//kopf körper coda teilung / möglichst ebenmäßige disjunkte dreiteilung - coda variabler länge 3,4,5
function toKKC( A ){ //array input
    let toret = [];  
    const lenA = len( A );  
    for( let a = 0; a < lenA; a+=1 ){
        const lenAa = len( A[a] );
        if( 2 < lenAa ){
                let splistep = Math.floor( lenAa / 3 );
                toret.push( A[a].substring(0,splistep) );
                toret.push( A[a].substring(splistep, splistep*2) );
                toret.push( A[a].substring(splistep*2,len(A[a])) );
            
        } else {
            toret.push( A[a] );
        }
    }
    return toret;
}

//n-fix kopf körper coda teilung
function toKKCnSufixWords( B ){ //B array of "words"
    let nn = [];
    for( let t in B ){
        nn.push( toKKCnSufix( B[ t ] ) );
    }
    return nn;
}

function toKKCnSufix( A ){//partitionen (as a terminus technicus from kombinatorik)
    //EINE dieser PARTITIONEN ist die tatsächliche Aufteilung der Wörter in Kopf, Körper und Koda
    
    //in drei Partitionen

    // hallo - 

    //-, h, allo,
    //-, ha, llo
    //-, hal, llo
    //-, hall, o
    //-, hallo, -

    //h, a, llo
    //h, al, lo
    //h, all, o
    //h, allo, -

    //ha, l, lo
    //ha, ll, o
    //ha, llo, -

    //hal, l, o
    //hall, o, -

    //hallo, -, -
 
    let partitionen = [];
    let lele = A.length;
    for( let h = 0; h < lele; h+=1 ){
        let kopf = A.substring(0,h);
        for( let z = 0; z < lele-h+1; z+=1 ){
            let koerper = A.substring(h, (z+h));
            let coda = A.substring( (z+h), lele );
            partitionen.push( [ kopf, koerper, coda ] );
        }
        
        
    }
    partitionen.push( [ A, "", "" ] );
    return partitionen;
}

/*------------------------------------------------------------------------------

LETTER-TRANSFORMATION

------------------------------------------------------------------------------*/

function gettransformarray( awordarr ){ //words and phrases in this array
    let transallALL = [];
    const lele =  awordarr.length;
    for( let a = 0; a < lele; a++ ){
        let transall = [];
        let aword = awordarr[ a ];
          
           
        let awordtoLowerCased = aword.toLowerCase( );   
        transall.push( awordtoLowerCased ); // all toLowerCase case

        //KOPF
        //trafsorm first letter A if not Au to Au
        if( awordtoLowerCased[0] == "a" && !( awordtoLowerCased[1] == "u" )){
            transall.push("av"+awordtoLowerCased.slice( 1, awordtoLowerCased.length ));      
        }    
        
        
        //ENDUNGEN
        const len1 = transall.length;
        for(let i = 0; i < len1; i++){
            //last o to us
            if( awordtoLowerCased[ awordtoLowerCased.length-1 ] == "o" ){
                let topush = transall[i].slice(0, transall[i].length-1)+"vs";
                transall.push( topush );
            }
            //last e to non
            else if( awordtoLowerCased[ awordtoLowerCased.length-1 ] == "e" ){
                let topush = transall[i].slice(0, transall[i].length-1);
                transall.push( topush );
            }
            //last i to us
            else if( awordtoLowerCased[ awordtoLowerCased.length-1 ] == "i" ){
                let topush = transall[i].slice(0, transall[i].length-1)+"vs";
                transall.push( topush );
            }
            //last er to os
            else if( awordtoLowerCased[ awordtoLowerCased.length-2 ] == "e" && awordtoLowerCased[ awordtoLowerCased.length-1 ] == "r"){
                let topush = transall[ i ].slice(0, transall[ i ].length-2)+"ros";
                transall.push( topush );
            }
            //last us to os
            else if( awordtoLowerCased[awordtoLowerCased.length-2] == "u" && awordtoLowerCased[awordtoLowerCased.length-1] == "s"){
                let topush = transall[ i ].slice(0, transall[ i ].length-2)+"os";
                //print("topush", topush);
                transall.push( topush );
                topush = transall[ i ].slice(0, transall[ i ].length-3)+"e";
                transall.push( topush );
                topush = transall[ i ].slice(0, transall[ i ].length-3)+"y";
                transall.push( topush );
                topush = transall[ i ].slice(0, transall[ i ].length-1)+"o";
                transall.push( topush );
            }
            //last os to us
            else if( awordtoLowerCased[awordtoLowerCased.length-2] == "o" && awordtoLowerCased[awordtoLowerCased.length-1] == "s"){
                let topush = transall[ i ].slice(0, transall[ i ].length-2)+"us";
                transall.push( topush );
            }
        }
        
        //Punktendungen
        if( aword[aword.length-1] != "." ){ //last letter not dot
            //add to all trasformed a dot
            const len2 = transall.length;
            for(let i = 0; i < len2; i++){
                transall.push( transall[i] + "." );
            }
        }

        //transform letters i -> y,                                        
        if( awordtoLowerCased.indexOf( "i" ) != -1 ){ 
            const len3 = transall.length;
            for(let i = 0; i < len3; i++){
                transall.push( replaceLastofwith( transall[ i ], "i", toy1 ) );
            }
        }
        //transform letters e -> i // e -> eu
        if( awordtoLowerCased.indexOf( "e" ) != -1 ){
            const len4 = transall.length; 
            for(let i = 0; i < len4; i++){
                transall.push( replaceLastofwith( transall[ i ], "e", toi3 ) );
                transall.push( replaceLastofwith( transall[ i ], "e", toeu2 ) );
            }
        }
        //transform letters o -> u
        if( awordtoLowerCased.indexOf( "o" ) != -1 ){ 
            const len5 = transall.length; 
            for(let i = 0; i < len5; i++){
                transall.push( replaceLastofwith( transall[ i ], "o", tou4 ) );
            }
        }
        //transform letters o -> i
        if( awordtoLowerCased.indexOf( "o" ) != -1 ){
            const len6 = transall.length; 
            for(let i = 0; i < len6; i++){
                transall.push( replaceLastofwith( transall[ i ], "o", toi3 ) );
            }
        }
        //transform letters u -> o 
        if( awordtoLowerCased.indexOf( "v" ) != -1 ){ 
            const len7 = transall.length;
            for(let i = 0; i < len7; i++){
                transall.push( replaceLastofwith( transall[ i ], "v", too5 ) );
            }
        }
        //transform letters oi -> i
        if( awordtoLowerCased.indexOf( "oi" ) != -1 ){ 
            const len8 = transall.length;
            for(let i = 0; i < len8; i++){
                transall.push( replaceLastofwith( transall[ i ], "oi", toi3 ) );
            }
        }
        //transform letters ei -> i
        if( awordtoLowerCased.indexOf( "ei" ) != -1 ){ 
            const len9 = transall.length;
            for(let i = 0; i < len9; i++){
                transall.push( replaceLastofwith( transall[ i ], "ei", toi3 ) );
            }
        }
        //transform letters ai -> e // ai -> ae
        if( awordtoLowerCased.indexOf( "ai" ) != -1 ){
            const len10 = transall.length; 
            for(let i = 0; i < len10; i++){
                transall.push( replaceLastofwith( transall[ i ], "ai", toe8 ) );
                transall.push( replaceLastofwith( transall[ i ], "ai", toae9 ) );
            }
        }
        //transform letters c -> k // C -> K
        if( awordtoLowerCased.indexOf( "c" ) != -1 ){ 
            const len11 = transall.length;
            for(let i = 0; i < len11; i++){ 
                transall.push( transall[ i ].replace( fromc9, tok10 ).replace( fromC9, toK10 ) );
            }
        }

        //uppercase for all??
        const len12 = transall.length;
        for(let i = 0; i < len12; i++){ 
            transall.push( transall[ i ].toUpperCase( ) );
        }
        
        
        //first letter upper case to all
        const len13 = transall.length;
        for(let i = 0; i < len13; i++){ 
            transall.push( capitali( transall[ i ] ) );
        }
        

        //print("fetzig", aword, transall.length);
        transallALL = transallALL.concat( transall );
    }
    return transallALL;
}


/*------------------------------------------------------------------------------

schallow neighbourhood level

------------------------------------------------------------------------------*/
function isupper( awod ){
    if( len(awod) != 0 ){
        if( awod === awod.toUpperCase( ) ){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}



function simplekon( aDaaA ){
    let simplekonkordanz = {};
    let bigI = 0;
    
    let lenofall = len( aDaaA );
    for( let aw = 0; aw < lenofall; aw += 1 ){
        let cleanedword = aDaaA[ aw ].trim( );
        
        if( simplekonkordanz[ cleanedword ] ){ 
            simplekonkordanz[ cleanedword ] += 1
        } else {
            simplekonkordanz[ cleanedword ] = 1
        }
        bigI += 1
    }
    return [simplekonkordanz, bigI];
}


function schaneigh( simplekonkordanz, aDaaA ){
    let neighbournoonelovesyou = {}
    //all norm should be an option
    stopGR = normarrayksiguv( stopGR );
    stopLA = normarrayksiguv( stopLA );
    
    //neighboorhood dictionary
    let lenofall = len( aDaaA );
    for( let aw = 0; aw < lenofall; aw += 1 ){
        
        let cleanedword = aDaaA[ aw ].trim( );
        if( cleanedword === "" ){
            continue
        }           
        /*console.log(cleanedword, simplekonkordanz[ cleanedword ], cleanedword != "",
            simplekonkordanz[ cleanedword ] <= howmuchhaufisselten,
            !hasKEY( stopGR, cleanedword.toLowerCase() ), 
            !hasKEY( stopLA, cleanedword.toLowerCase() ), 
            !isnumber( cleanedword ))*/
        if( cleanedword != "" && 
            simplekonkordanz[ cleanedword ] <= howmuchhaufisselten &&
            !hasKEY( stopGR, cleanedword.toLowerCase() ) && 
            !hasKEY( stopLA, cleanedword.toLowerCase() ) && 
            !isnumber( cleanedword ) ){
                //console.log(cleanedword);
                //nachbarschaft
                let nachba = [];
                let st = aw-(parseInt(nachbarschaft/2)+1)
                if( st < 0 ){
                    st = 0
                }
                let count = 0
                while( count < nachbarschaft && st < lenofall ){
                    let naba = aDaaA[st].trim( );
                    let nabamore = normatext( naba, analysisNormalform ).toLowerCase();
                    if( !( naba.indexOf("-") === -1 && st == lenofall-1) && 
                        ( naba !== "" && st !== aw && !hasKEY(stopGR, nabamore) && !hasKEY(stopLA, nabamore) && !isnumber( nabamore ) ) ){
                        nachba.push( naba );
                        count += 1;
                    }
                    st+=1;
                    if( st === lenofall ){//brauch ich das noch???
                        count = nachbarschaft+1
                    }
                }
                if( neighbournoonelovesyou[cleanedword] ){ 
                    
                    for( let n in nachba ){
                        if( neighbournoonelovesyou[ cleanedword ][0][nachba[n]] ){
                            neighbournoonelovesyou[ cleanedword ][0][nachba[n]] += 1
                        } else {
                            neighbournoonelovesyou[ cleanedword ][0][nachba[n]] = 1
                        }
                    }
                } else {
                    let nana = {};
                    for( let n in nachba ){
                        nana[nachba[n]] = 1;
                    }
                    neighbournoonelovesyou[ cleanedword ] = [nana,1]//0: nachbararray, 2: haeufigkeit
                }
        }
    }
    return neighbournoonelovesyou;
}

function fnb( texttt ){
    let aDaa = normatext( sameallspacing(texttt), analysisNormalform );
    let aDaaA = Trennstricheraus( deledklammern( disambiguadashes( aDaa )).split(" ") );
    let stringggg = delUnterpunkt( umbrtospace( aDaaA.join( " " ) ) );//?
    stringggg = sigmaistgleich( deluv( delligaturen( delinterp( delmakup( delumbrbine( delnumbering( delunknown( stringggg  ))))))));    
    aDaaA = stringggg.split(" ");
    for( let w = 0; w < len( aDaaA ); w += 1 ){
        if( isupper( aDaaA[ w ] )){
            aDaaA[ w ] = capitali( aDaaA[ w ] )
        }
    }
    
    let konundbigi = simplekon( aDaaA );
    return schaneigh( konundbigi[0], aDaaA );
}

/*------------------------------------------------------------------------------

TEST

------------------------------------------------------------------------------*/


function zerl(){
    let stristrstrung = "πρῶτον μὲν οὐσίαν κεκτημένον μηδεμίαν μηδένα ἰδίαν, ἂν μὴ πᾶσα ἀνάγκη: ἔπειτα οἴκησιν καὶ ταμιεῖον μηδενὶ εἶναι μηδὲν τοιοῦτον, εἰς ὃ οὐ πᾶς ὁ βουλόμενος εἴσεισι: τὰ δ᾽ ἐπιτήδεια, ὅσων δέονται ἄνδρες ἀθληταὶ πολέμου σώφρονές τε καὶ ἀνδρεῖοι, ταξαμένους παρὰ τῶν ἄλλων πολιτῶν δέχεσθαι μισθὸν τῆς φυλακῆς τοσοῦτον ὅσον μήτε περιεῖναι αὐτοῖς εἰς τὸν ἐνιαυτὸν μήτε ἐνδεῖν: φοιτῶντας δὲ εἰς συσσίτια ὥσπερ ἐστρατοπεδευμένους κοινῇ ζῆν";
    stristrstrung = "„[IX]” ⁙ ἀλλ’ ἑτέραν τινὰ φύσιν ἄπειρον', ἐξ ἧς ἅπαντας γίνεσθαι τοὺς οὐρανοὺς καὶ τοὺς ἐν αὐτοῖς κόσμους· ἐξ ὧν δὲ ἡ γένεσίς ἐστι τοῖς οὖσι, καὶ τὴν φθορὰν εἰς ταῦτα γίνεσθαι κατὰ τὸ χρεών. διδόναι γὰρ αὐτὰ δίκην καὶ τίσιν ἀλλήλοις τῆς ἀδικίας κατὰ τὴν τοῦ χρόνου τάξιν, ποιητικωτέροις οὕτως ὀνόμασιν αὐτὰ λέγων· δῆλον δὲ ὅτι τὴν εἰς ἄλληλα μεταβολὴν τῶν τεττάρων στοιχείων οὗτος θεασάμενος οὐκ ἠξίωσεν ἕν τι τούτων ὑποκείμενον ποιῆσαι, ἀλλά τι ἄλλο παρὰ ταῦτα. οὗτος δὲ οὐκ ἀλλοιουμένου τοῦ στοιχείου τὴν γένεσιν ποιεῖ, ἀλλ’ ἀποκρινομένων τῶν ἐναντίων διὰ τῆς ἀιδίου κινή- σεως· 1 Summá pecúniae, quam dedit in [bla bla bla] aerarium vel plebei Romanae vel dimissis militibus=> denarium sexiens milliens. 2 Opera fecit nova § aedem Martis, Iovis Tonantis et Feretri, Apollinis, díví Iúli, § Quirini, § Minervae, Iunonis Reginae, Iovis Libertatis, Larum, deum Penátium, § Iuventatis, Matris deum, Lupercal, pulvinar ad [11] circum, § cúriam cum chalcidico, forum Augustum, basilicam 35 Iuliam, theatrum Marcelli, § porticus . . . . . . . . . . , nemus trans Tiberím Caesarum. § 3 Refécit Capitolium sacrasque aedes numero octoginta duas, theatrum Pompeí, aquarum rivos, viam Flaminiam.  Ϗ ϗ ϚϛȢȣꙊꙋἀἁἂἃἄἅἆἇἈἉἊἋἌἍἎἏἐἑἒἓἔἕἘἙἚἛἜἝἠἡἢἣἤἥἦἧἨἩἪἫἬἭἮἯἰἱἲἳἴἵἶἷἸἹἺἻἼἽἾἿὀὁὂὃὄὅὈὉὊὋὌὍὐὑὒὓὔὕὖὗὙὛὝὟὠὡὢὣὤὥὦὧὨὩὪὫὬὭὮὯὰάὲέὴήὶίὸόὺύὼώ	ᾀᾁᾂᾃᾄᾅᾆᾇᾈᾉᾊᾋᾌᾍᾎᾏᾐᾑᾒᾓᾔᾕᾖᾗᾘᾙᾚᾛᾜᾝᾞᾟᾠᾡᾢᾣᾤᾥᾦᾧᾨᾩᾪᾫᾬᾭᾮᾯᾰᾱᾲᾳᾴᾶᾷᾸᾹᾺΆᾼ᾽ι᾿῀῁ῂῃῄῆῇῈΈῊΉῌ῍῎῏ῐῑῒΐῖῗῘῙῚΊ῝῞῟ῠῡῢΰῤῥῦῧῨῩῪΎῬ῭΅`ῲῳῴῶῷῸΌῺΏῼ´῾ͰͱͲͳʹ͵Ͷͷͺͻͼͽ;Ϳ΄΅Ά·ΈΉΊΌΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿ Αι αι γγ γκ γξ γχ ου Υι υι ἄϋλος αὐλός  τί φῄς; γραφὴν σέ τις, ὡς ἔοικε, γέγραπται οὐ γὰρ ἐκεῖνό γε καταγνώσομαι, ὡς σὺ ἕτερον. δ̣[ὲ κ]αὶ";
    let Strout = "<b>Eingabe:</b><br>";
    Strout += stristrstrung +"<br><br>";

    let aswords = stristrstrung.split( " " );

    Strout += "<b>3 gram gesamter Text:</b><br>";
    Strout += ngramWhole( stristrstrung, 3 ).join("/ ") +"<br><br>";

    Strout += "<b>2 gram gesamter Text:</b><br>";
    Strout += ngramWhole( stristrstrung, 2 ).join("/ ") +"<br><br>";

    Strout += "<b>3 gram Wordlevel:</b><br>";
    Strout += genngram( aswords, 3 ).join("/ ") +"<br><br>";

    Strout += "<b>3 gram der Wörter nopadding:</b><br>";
    Strout += ngramWords( aswords, 3, False ).join("/ ")+"<br><br>";

    Strout += "<b>3 gram der Wörter padding:</b><br>";
    Strout += ngramWords( aswords, 3, True ).join("/ ")+"<br><br>";

    Strout += "<b>2 gram der Wörter padding:</b><br>";
    Strout += ngramWords( aswords, 2, True ).join("/ ")+"<br><br>";

    Strout += "<b>Pseudosilben:</b><br>";
    Strout += silben( stristrstrung.normalize( analysisNormalform ) ).join("/ ")+"<br><br>";

    Strout += "<b>Ohne Konsonanten:</b><br>";
    Strout += ohneKon( stristrstrung )+"<br><br>";

    Strout += "<b>Ohne Vokale:</b><br>";
    Strout += ohnVoka( stristrstrung )+"<br><br>";
    
    let wlist = ohnesatzzeichen( GRvorbereitungT( stristrstrung ) );
    Strout += "<b>Kleine Wörter:</b><br>";
    Strout += justKLEIN( wlist ).join("/ ")+"<br><br>";
    
    Strout += "<b>Große Wörter:</b><br>";
    Strout += justGROSZ( wlist ).join("/ ")+"<br><br>";
    
    Strout += "<b>Kopf-Körper-Coda I:</b><br>";
    Strout += toKKC( aswords ).join("/ ")+"<br><br>";

    Strout += "<b>Partitionen (Kopf-Körper-Coda II):</b><br>";
    let tempstr = "";
    let perwordpartionined = toKKCnSufixWords( aswords );
    for( let w in perwordpartionined ){
        for(let b in perwordpartionined[w] ){
            tempstr += "Ko: " + perwordpartionined[w][b][0] +" Koe: "+ perwordpartionined[w][b][1] +" Co: " +perwordpartionined[w][b][2]+" <br> ";
        }
        tempstr += " <br><br> ";
    }
    Strout += tempstr+"<br><br>";

    Strout += "<b>als flache Nachbarschaft:</b><br>";
    let stringtobeout = "";
    let gutgemacht = fnb( stristrstrung );
    //console.log(gutgemacht);
    for( let vv in gutgemacht ){
        let strighgsjhsj = "";
        for(let uuu in gutgemacht[vv][0]){
            strighgsjhsj+= uuu+":"+gutgemacht[vv][0][uuu].toString()+",";
        }
        stringtobeout = stringtobeout + vv +": ["+gutgemacht[vv][1].toString()+", ["+strighgsjhsj+"]]<br>";
    }
    Strout += stringtobeout+"<br><br>";
    

    //Suchstrategien 
    //und Nachbarschaften
    //windowit

    //nachbarschaften könnten window ist nutzen und einiges bewirken

    document.getElementById( "mata").innerHTML = Strout;
    
}


