import React, { useState } from 'react';
import './App.css';

interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  gridColumn: number;
  gridRow: number;
  category: string;
  description: string;
}

const neonColors: Record<string, string> = {
  'alkali metal': '#FF00FF',
  'alkaline earth metal': '#00FF00',
  'transition metal': '#00FFFF',
  'post-transition metal': '#FFA500',
  'metalloid': '#FF1493',
  'nonmetal': '#39FF14',
  'halogen': '#FFFF00',
  'noble gas': '#7FFF00',
  'lanthanide': '#FF4500',
  'actinide': '#1E90FF',
  'unknown': '#FF69B4'
};

const elements: Element[] = [
  { symbol: 'H',  name: 'Hydrogen', atomicNumber: 1,  gridColumn: 1,  gridRow: 1, category: 'nonmetal', description: 'Lightest and most abundant element.' },
  { symbol: 'He', name: 'Helium',   atomicNumber: 2,  gridColumn: 18, gridRow: 1, category: 'noble gas', description: 'Inert gas used in balloons and cooling.' },

  // Row 2
  { symbol: 'Li', name: 'Lithium',      atomicNumber: 3,  gridColumn: 1,  gridRow: 2, category: 'alkali metal', description: 'Soft metal used in batteries.' },
  { symbol: 'Be', name: 'Beryllium',    atomicNumber: 4,  gridColumn: 2,  gridRow: 2, category: 'alkaline earth metal', description: 'Light, strong metal used in aerospace.' },
  { symbol: 'B',  name: 'Boron',        atomicNumber: 5,  gridColumn: 13, gridRow: 2, category: 'metalloid', description: 'Used in glass and detergents.' },
  { symbol: 'C',  name: 'Carbon',       atomicNumber: 6,  gridColumn: 14, gridRow: 2, category: 'nonmetal', description: 'Basis of organic life; forms diamonds, graphite.' },
  { symbol: 'N',  name: 'Nitrogen',     atomicNumber: 7,  gridColumn: 15, gridRow: 2, category: 'nonmetal', description: '78% of Earth’s atmosphere.' },
  { symbol: 'O',  name: 'Oxygen',       atomicNumber: 8,  gridColumn: 16, gridRow: 2, category: 'nonmetal', description: 'Essential for respiration.' },
  { symbol: 'F',  name: 'Fluorine',     atomicNumber: 9,  gridColumn: 17, gridRow: 2, category: 'halogen', description: 'Highly reactive pale yellow gas.' },
  { symbol: 'Ne', name: 'Neon',         atomicNumber: 10, gridColumn: 18, gridRow: 2, category: 'noble gas', description: 'Used in bright neon lights.' },

  // Row 3
  { symbol: 'Na', name: 'Sodium',       atomicNumber: 11, gridColumn: 1, gridRow: 3, category: 'alkali metal', description: 'Soft metal used in salts.' },
  { symbol: 'Mg', name: 'Magnesium',    atomicNumber: 12, gridColumn: 2, gridRow: 3, category: 'alkaline earth metal', description: 'Used in alloys and fireworks.' },
  { symbol: 'Al', name: 'Aluminum',     atomicNumber: 13, gridColumn: 13, gridRow: 3, category: 'post-transition metal', description: 'Light, corrosion‑resistant metal.' },
  { symbol: 'Si', name: 'Silicon',      atomicNumber: 14, gridColumn: 14, gridRow: 3, category: 'metalloid', description: 'Key in semiconductors.' },
  { symbol: 'P',  name: 'Phosphorus',   atomicNumber: 15, gridColumn: 15, gridRow: 3, category: 'nonmetal', description: 'Vital for DNA and fertilizers.' },
  { symbol: 'S',  name: 'Sulfur',       atomicNumber: 16, gridColumn: 16, gridRow: 3, category: 'nonmetal', description: 'Used in vulcanization and matches.' },
  { symbol: 'Cl', name: 'Chlorine',     atomicNumber: 17, gridColumn: 17, gridRow: 3, category: 'halogen', description: 'Used in disinfectants.' },
  { symbol: 'Ar', name: 'Argon',        atomicNumber: 18, gridColumn: 18, gridRow: 3, category: 'noble gas', description: 'Inert shielding gas in welding.' },

  // Row 4
  { symbol: 'K',  name: 'Potassium',    atomicNumber: 19, gridColumn: 1,  gridRow: 4, category: 'alkali metal', description: 'Essential for nerve function.' },
  { symbol: 'Ca', name: 'Calcium',      atomicNumber: 20, gridColumn: 2,  gridRow: 4, category: 'alkaline earth metal', description: 'Important for bones and teeth.' },
  { symbol: 'Sc', name: 'Scandium',     atomicNumber: 21, gridColumn: 3,  gridRow: 4, category: 'transition metal', description: 'Light rare metal used in aerospace.' },
  { symbol: 'Ti', name: 'Titanium',     atomicNumber: 22, gridColumn: 4,  gridRow: 4, category: 'transition metal', description: 'Strong, corrosion‑resistant metal.' },
  { symbol: 'V',  name: 'Vanadium',     atomicNumber: 23, gridColumn: 5,  gridRow: 4, category: 'transition metal', description: 'Used in steel alloys.' },
  { symbol: 'Cr', name: 'Chromium',     atomicNumber: 24, gridColumn: 6,  gridRow: 4, category: 'transition metal', description: 'Used in stainless steel.' },
  { symbol: 'Mn', name: 'Manganese',    atomicNumber: 25, gridColumn: 7,  gridRow: 4, category: 'transition metal', description: 'Used in steel production.' },
  { symbol: 'Fe', name: 'Iron',         atomicNumber: 26, gridColumn: 8,  gridRow: 4, category: 'transition metal', description: 'Core component of steel.' },
  { symbol: 'Co', name: 'Cobalt',       atomicNumber: 27, gridColumn: 9,  gridRow: 4, category: 'transition metal', description: 'Used in batteries and magnets.' },
  { symbol: 'Ni', name: 'Nickel',       atomicNumber: 28, gridColumn: 10, gridRow: 4, category: 'transition metal', description: 'Used in coins and alloys.' },
  { symbol: 'Cu', name: 'Copper',       atomicNumber: 29, gridColumn: 11, gridRow: 4, category: 'transition metal', description: 'Excellent electrical conductor.' },
  { symbol: 'Zn', name: 'Zinc',         atomicNumber: 30, gridColumn: 12, gridRow: 4, category: 'transition metal', description: 'Used to galvanize steel.' },
  { symbol: 'Ga', name: 'Gallium',      atomicNumber: 31, gridColumn: 13, gridRow: 4, category: 'post-transition metal', description: 'Melts in your hand (~30 °C).' },
  { symbol: 'Ge', name: 'Germanium',    atomicNumber: 32, gridColumn: 14, gridRow: 4, category: 'metalloid', description: 'Used in fiber‑optic systems.' },
  { symbol: 'As', name: 'Arsenic',      atomicNumber: 33, gridColumn: 15, gridRow: 4, category: 'metalloid', description: 'Poisonous metalloid.' },
  { symbol: 'Se', name: 'Selenium',     atomicNumber: 34, gridColumn: 16, gridRow: 4, category: 'nonmetal', description: 'Used in electronics and glass.' },
  { symbol: 'Br', name: 'Bromine',      atomicNumber: 35, gridColumn: 17, gridRow: 4, category: 'halogen', description: 'A red‑brown liquid at room temperature.' },
  { symbol: 'Kr', name: 'Krypton',      atomicNumber: 36, gridColumn: 18, gridRow: 4, category: 'noble gas', description: 'Used in flash lamps and photography.' },

  // Row 5
  { symbol: 'Rb', name: 'Rubidium',     atomicNumber: 37, gridColumn: 1,  gridRow: 5, category: 'alkali metal', description: 'Soft, silvery‑white metal.' },
  { symbol: 'Sr', name: 'Strontium',    atomicNumber: 38, gridColumn: 2,  gridRow: 5, category: 'alkaline earth metal', description: 'Used in fireworks for red color.' },
  { symbol: 'Y',  name: 'Yttrium',      atomicNumber: 39, gridColumn: 3,  gridRow: 5, category: 'transition metal', description: 'Used in LEDs and superconductors.' },
  { symbol: 'Zr', name: 'Zirconium',    atomicNumber: 40, gridColumn: 4,  gridRow: 5, category: 'transition metal', description: 'Resists corrosion.' },
  { symbol: 'Nb', name: 'Niobium',      atomicNumber: 41, gridColumn: 5,  gridRow: 5, category: 'transition metal', description: 'Used in superconducting materials.' },
  { symbol: 'Mo', name: 'Molybdenum',   atomicNumber: 42, gridColumn: 6,  gridRow: 5, category: 'transition metal', description: 'High melting point metal.' },
  { symbol: 'Tc', name: 'Technetium',   atomicNumber: 43, gridColumn: 7,  gridRow: 5, category: 'transition metal', description: 'Radioactive element.' },
  { symbol: 'Ru', name: 'Ruthenium',    atomicNumber: 44, gridColumn: 8,  gridRow: 5, category: 'transition metal', description: 'Used in electronics.' },
  { symbol: 'Rh', name: 'Rhodium',      atomicNumber: 45, gridColumn: 9,  gridRow: 5, category: 'transition metal', description: 'Used in catalytic converters.' },
  { symbol: 'Pd', name: 'Palladium',    atomicNumber: 46, gridColumn: 10, gridRow: 5, category: 'transition metal', description: 'Used in electronics and jewelry.' },
  { symbol: 'Ag', name: 'Silver',       atomicNumber: 47, gridColumn: 11, gridRow: 5, category: 'transition metal', description: 'Best electrical conductor.' },
  { symbol: 'Cd', name: 'Cadmium',      atomicNumber: 48, gridColumn: 12, gridRow: 5, category: 'transition metal', description: 'Used in batteries and pigments.' },
  { symbol: 'In', name: 'Indium',       atomicNumber: 49, gridColumn: 13, gridRow: 5, category: 'post-transition metal', description: 'Used in touch screens.' },
  { symbol: 'Sn', name: 'Tin',          atomicNumber: 50, gridColumn: 14, gridRow: 5, category: 'post-transition metal', description: 'Used in solder and alloys.' },
  { symbol: 'Sb', name: 'Antimony',     atomicNumber: 51, gridColumn: 15, gridRow: 5, category: 'metalloid', description: 'Used in flame retardants.' },
  { symbol: 'Te', name: 'Tellurium',    atomicNumber: 52, gridColumn: 16, gridRow: 5, category: 'metalloid', description: 'Used in semiconductors.' },
  { symbol: 'I',  name: 'Iodine',       atomicNumber: 53, gridColumn: 17, gridRow: 5, category: 'halogen', description: 'Essential for thyroid health.' },
  { symbol: 'Xe', name: 'Xenon',        atomicNumber: 54, gridColumn: 18, gridRow: 5, category: 'noble gas', description: 'Used in lighting and anesthesia.' },

  // Row 6
  { symbol: 'Cs', name: 'Cesium',       atomicNumber: 55, gridColumn: 1,  gridRow: 6, category: 'alkali metal', description: 'Highly reactive, used in clocks.' },
  { symbol: 'Ba', name: 'Barium',       atomicNumber: 56, gridColumn: 2,  gridRow: 6, category: 'alkaline earth metal', description: 'Used in medical imaging.' },

  // Lanthanides – Row 9
  { symbol: 'La', name: 'Lanthanum',    atomicNumber: 57, gridColumn: 3,  gridRow: 9, category: 'lanthanide', description: 'Used in camera lenses.' },
  { symbol: 'Ce', name: 'Cerium',       atomicNumber: 58, gridColumn: 4,  gridRow: 9, category: 'lanthanide', description: 'Used in catalytic converters.' },

  
    // Lanthanides – period 6 f-block
    { symbol: 'La', name: 'Lanthanum',   atomicNumber: 57, gridColumn: 3, gridRow: 9, category: 'lanthanide', description: 'Used in camera lenses.' },
    { symbol: 'Ce', name: 'Cerium',      atomicNumber: 58, gridColumn: 4, gridRow: 9, category: 'lanthanide', description: 'Used in catalytic converters.' },
    { symbol: 'Pr', name: 'Praseodymium',atomicNumber: 59, gridColumn: 5, gridRow: 9, category: 'lanthanide', description: 'Used in magnets.' },
    { symbol: 'Nd', name: 'Neodymium',   atomicNumber: 60, gridColumn: 6, gridRow: 9, category: 'lanthanide', description: 'Used in strong permanent magnets.' },
    { symbol: 'Pm', name: 'Promethium',  atomicNumber: 61, gridColumn: 7, gridRow: 9, category: 'lanthanide', description: 'Radioactive, used in luminous paint.' },
    { symbol: 'Sm', name: 'Samarium',    atomicNumber: 62, gridColumn: 8, gridRow: 9, category: 'lanthanide', description: 'Used in magnets and cancer therapy.' },
    { symbol: 'Eu', name: 'Europium',    atomicNumber: 63, gridColumn: 9, gridRow: 9, category: 'lanthanide', description: 'Used in LED and fluorescent lighting.' },
    { symbol: 'Gd', name: 'Gadolinium',  atomicNumber: 64, gridColumn: 10, gridRow: 9, category: 'lanthanide', description: 'Used in MRI contrast agents.' },
    { symbol: 'Tb', name: 'Terbium',     atomicNumber: 65, gridColumn: 11, gridRow: 9, category: 'lanthanide', description: 'Used in green phosphors.' },
    { symbol: 'Dy', name: 'Dysprosium',  atomicNumber: 66, gridColumn: 12, gridRow: 9, category: 'lanthanide', description: 'Used in high‑temperature magnets.' },
    { symbol: 'Ho', name: 'Holmium',     atomicNumber: 67, gridColumn: 13, gridRow: 9, category: 'lanthanide', description: 'Used in lasers.' },
    { symbol: 'Er', name: 'Erbium',      atomicNumber: 68, gridColumn: 14, gridRow: 9, category: 'lanthanide', description: 'Used in fiber‑optic amplifiers.' },
    { symbol: 'Tm', name: 'Thulium',     atomicNumber: 69, gridColumn: 15, gridRow: 9, category: 'lanthanide', description: 'Used in portable X‑ray devices.' },
    { symbol: 'Yb', name: 'Ytterbium',   atomicNumber: 70, gridColumn: 16, gridRow: 9, category: 'lanthanide', description: 'Used in stainless steel and lasers.' },
    { symbol: 'Lu', name: 'Lutetium',    atomicNumber: 71, gridColumn: 17, gridRow: 9, category: 'lanthanide', description: 'Used in PET scan detectors.' },
  
    // Period 6 non-f-block: Hf–Rn (groups 4–18)
    { symbol: 'Hf', name: 'Hafnium',     atomicNumber: 72, gridColumn: 4, gridRow: 6, category: 'transition metal', description: 'Used in nuclear control rods.' },
    { symbol: 'Ta', name: 'Tantalum',    atomicNumber: 73, gridColumn: 5, gridRow: 6, category: 'transition metal', description: 'Used in electronics capacitors.' },
    { symbol: 'W',  name: 'Tungsten',    atomicNumber: 74, gridColumn: 6, gridRow: 6, category: 'transition metal', description: 'Very high melting point.' },
    { symbol: 'Re', name: 'Rhenium',     atomicNumber: 75, gridColumn: 7, gridRow: 6, category: 'transition metal', description: 'Used in jet engine alloys.' },
    { symbol: 'Os', name: 'Osmium',      atomicNumber: 76, gridColumn: 8, gridRow: 6, category: 'transition metal', description: 'Densest stable element.' },
    { symbol: 'Ir', name: 'Iridium',     atomicNumber: 77, gridColumn: 9, gridRow: 6, category: 'transition metal', description: 'Used in spark plugs.' },
    { symbol: 'Pt', name: 'Platinum',    atomicNumber: 78, gridColumn: 10, gridRow: 6, category: 'transition metal', description: 'Used in catalytic converters.' },
    { symbol: 'Au', name: 'Gold',        atomicNumber: 79, gridColumn: 11, gridRow: 6, category: 'transition metal', description: 'Precious metal for jewelry and electronics.' },
    { symbol: 'Hg', name: 'Mercury',     atomicNumber: 80, gridColumn: 12, gridRow: 6, category: 'transition metal', description: 'Only liquid metal at room temperature.' },
    { symbol: 'Tl', name: 'Thallium',    atomicNumber: 81, gridColumn: 13, gridRow: 6, category: 'post-transition metal', description: 'Used in electronics.' },
    { symbol: 'Pb', name: 'Lead',        atomicNumber: 82, gridColumn: 14, gridRow: 6, category: 'post-transition metal', description: 'Used in batteries (toxicity warning).' },
    { symbol: 'Bi', name: 'Bismuth',     atomicNumber: 83, gridColumn: 15, gridRow: 6, category: 'post-transition metal', description: 'Used in cosmetics and medicine.' },
    { symbol: 'Po', name: 'Polonium',    atomicNumber: 84, gridColumn: 16, gridRow: 6, category: 'metalloid', description: 'Radioactive, rare.' },
    { symbol: 'At', name: 'Astatine',    atomicNumber: 85, gridColumn: 17, gridRow: 6, category: 'halogen', description: 'Rare, radioactive halogen.' },
    { symbol: 'Rn', name: 'Radon',       atomicNumber: 86, gridColumn: 18, gridRow: 6, category: 'noble gas', description: 'Radioactive gas from uranium decay.' },
  
    // Period 7 d- and p-block before actinides
    { symbol: 'Fr', name: 'Francium',    atomicNumber: 87, gridColumn: 1, gridRow: 7, category: 'alkali metal', description: 'Highly radioactive.' },
    { symbol: 'Ra', name: 'Radium',      atomicNumber: 88, gridColumn: 2, gridRow: 7, category: 'alkaline earth metal', description: 'Radioactive, formerly used in luminescent paint.' },
  
    // Actinides – period 7 f-block
    { symbol: 'Ac', name: 'Actinium',    atomicNumber: 89, gridColumn: 3, gridRow: 10, category: 'actinide', description: 'Radioactive, used in radiation therapy.' },
    { symbol: 'Th', name: 'Thorium',     atomicNumber: 90, gridColumn: 4, gridRow: 10, category: 'actinide', description: 'Potential nuclear fuel.' },
    { symbol: 'Pa', name: 'Protactinium',atomicNumber: 91, gridColumn: 5, gridRow: 10, category: 'actinide', description: 'Radioactive, rare.' },
    { symbol: 'U',  name: 'Uranium',     atomicNumber: 92, gridColumn: 6, gridRow: 10, category: 'actinide', description: 'Nuclear fuel.' },
    { symbol: 'Np', name: 'Neptunium',   atomicNumber: 93, gridColumn: 7, gridRow: 10, category: 'actinide', description: 'Used in nuclear science.' },
    { symbol: 'Pu', name: 'Plutonium',   atomicNumber: 94, gridColumn: 8, gridRow: 10, category: 'actinide', description: 'Used in nuclear weapons and reactors.' },
    { symbol: 'Am', name: 'Americium',   atomicNumber: 95, gridColumn: 9, gridRow: 10, category: 'actinide', description: 'Used in smoke detectors.' },
    { symbol: 'Cm', name: 'Curium',      atomicNumber: 96, gridColumn: 10, gridRow: 10, category: 'actinide', description: 'Used in space probes.' },
    { symbol: 'Bk', name: 'Berkelium',   atomicNumber: 97, gridColumn: 11, gridRow: 10, category: 'actinide', description: 'Research use only.' },
    { symbol: 'Cf', name: 'Californium', atomicNumber: 98, gridColumn: 12, gridRow: 10, category: 'actinide', description: 'Used in neutron sources.' },
    { symbol: 'Es', name: 'Einsteinium', atomicNumber: 99, gridColumn: 13, gridRow: 10, category: 'actinide', description: 'Research element.' },
    { symbol: 'Fm', name: 'Fermium',     atomicNumber: 100,gridColumn: 14, gridRow: 10, category: 'actinide', description: 'Research.' },
    { symbol: 'Md', name: 'Mendelevium', atomicNumber: 101,gridColumn: 15, gridRow: 10, category: 'actinide', description: 'Research.' },
    { symbol: 'No', name: 'Nobelium',    atomicNumber: 102,gridColumn: 16, gridRow: 10, category: 'actinide', description: 'Research.' },
    { symbol: 'Lr', name: 'Lawrencium',  atomicNumber: 103,gridColumn: 17, gridRow: 10, category: 'actinide', description: 'Research.' },
  
    // Period 7 elements beyond actinides (d- and p-block)
    { symbol: 'Rf', name: 'Rutherfordium', atomicNumber: 104, gridColumn: 4, gridRow: 7, category: 'transition metal', description: 'Synthetic.' },
    { symbol: 'Db', name: 'Dubnium',       atomicNumber: 105, gridColumn: 5, gridRow: 7, category: 'transition metal', description: 'Synthetic.' },
    { symbol: 'Sg', name: 'Seaborgium',    atomicNumber: 106, gridColumn: 6, gridRow: 7, category: 'transition metal', description: 'Synthetic.' },
    { symbol: 'Bh', name: 'Bohrium',       atomicNumber: 107, gridColumn: 7, gridRow: 7, category: 'transition metal', description: 'Synthetic.' },
    { symbol: 'Hs', name: 'Hassium',       atomicNumber: 108, gridColumn: 8, gridRow: 7, category: 'transition metal', description: 'Synthetic.' },
    { symbol: 'Mt', name: 'Meitnerium',    atomicNumber: 109, gridColumn: 9, gridRow: 7, category: 'transition metal', description: 'Synthetic.' },
    { symbol: 'Ds', name: 'Darmstadtium',  atomicNumber: 110, gridColumn: 10, gridRow: 7, category: 'transition metal', description: 'Synthetic.' },
    { symbol: 'Rg', name: 'Roentgenium',   atomicNumber: 111, gridColumn: 11, gridRow: 7, category: 'transition metal', description: 'Synthetic.' },
    { symbol: 'Cn', name: 'Copernicium',   atomicNumber: 112, gridColumn: 12, gridRow: 7, category: 'transition metal', description: 'Synthetic.' },
    { symbol: 'Nh', name: 'Nihonium',      atomicNumber: 113, gridColumn: 13, gridRow: 7, category: 'post-transition metal', description: 'Synthetic.' },
    { symbol: 'Fl', name: 'Flerovium',     atomicNumber: 114, gridColumn: 14, gridRow: 7, category: 'post-transition metal', description: 'Synthetic.' },
    { symbol: 'Mc', name: 'Moscovium',     atomicNumber: 115, gridColumn: 15, gridRow: 7, category: 'post-transition metal', description: 'Synthetic.' },
    { symbol: 'Lv', name: 'Livermorium',   atomicNumber: 116, gridColumn: 16, gridRow: 7, category: 'post-transition metal', description: 'Synthetic.' },
    { symbol: 'Ts', name: 'Tennessine',    atomicNumber: 117, gridColumn: 17, gridRow: 7, category: 'halogen', description: 'Synthetic.' },
    { symbol: 'Og', name: 'Oganesson',     atomicNumber: 118, gridColumn: 18, gridRow: 7, category: 'noble gas', description: 'Synthetic.' },
  ];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<Element | null>(null);

  const searchResult = elements.find(
    el =>
      el.name.toLowerCase() === searchTerm.toLowerCase() ||
      el.symbol.toLowerCase() === searchTerm.toLowerCase()
  );

  return (
    <div className="App">
      {/* Navbar */}
      <div className="navbar">
        <div className="nav-home" onClick={() => setSearchTerm('')}>
          SEARCH
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or symbol..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Title */}
      <div>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '1rem' }}>
          Periodic Table of Elements
        </h1>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
        {Object.entries(neonColors).map(([cat, col]) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
            <div
              style={{
                width: '1rem',
                height: '1rem',
                backgroundColor: col,
                marginRight: '0.5rem',
                borderRadius: '0.2rem',
                boxShadow: `0 0 10px ${col}`
              }}
            />
            <span style={{ fontSize: '0.8rem', textTransform: 'capitalize' }}>{cat}</span>
          </div>
        ))}
      </div>

      {/* Highlighted element if search match */}
      {searchResult ? (
        <div className="highlighted-element">
          <div
            className="element-box"
            style={{
              backgroundColor: neonColors[searchResult.category],
              boxShadow: `0 0 16px ${neonColors[searchResult.category]}`,
              transform: 'scale(1.4)',
              transition: 'transform 0.2s'
            }}
            onClick={() => setSelected(searchResult)}
          >
            <div style={{ fontSize: '1.5rem' }}>{searchResult.symbol}</div>
            <div style={{ fontSize: '1rem' }}>{searchResult.atomicNumber}</div>
          </div>
        </div>
      ) : (
        <div className="periodic-grid">
          {elements.map(el => {
            const color = neonColors[el.category];
            return (
              <div
                key={el.atomicNumber}
                className="element-box"
                style={{
                  gridColumn: el.gridColumn,
                  gridRow: el.gridRow,
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}`
                }}
                onClick={() => setSelected(el)}
              >
                <div style={{ fontSize: '1.1rem' }}>{el.symbol}</div>
                <div style={{ fontSize: '0.8rem' }}>{el.atomicNumber}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="modal-box"
            onClick={e => e.stopPropagation()}
            style={{
              boxShadow: `0 0 20px ${neonColors[selected.category]}`,
              border: `2px solid ${neonColors[selected.category]}`
            }}
          >
            <h2>{selected.name} ({selected.symbol})</h2>
            <p>{selected.description}</p>
            <button
              className="modal-button"
              onClick={() => setSelected(null)}
              style={{
                backgroundColor: neonColors[selected.category],
                boxShadow: `0 0 10px ${neonColors[selected.category]}`
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
