// "use client"
// import { FC, useEffect, useState } from 'react';


// type Division = {
//   id: string;
//   name: string;
//   bn_name?: string;
// };

// type District = {
//   id: string;
//   name: string;
//   bn_name?: string;
// };

// type Upzila = {
//   id: string;
//   name: string;
//   bn_name?: string;
// };

// type Union = {
//   id: string;
//   name: string;
//   bn_name?: string;
// };


// interface AddressProps {
//   className?: string;
// }

// const Address: FC<AddressProps> = () => {
//   const [divisions, setDivisions] = useState<Division[]>([]);
//   const [districts, setDistricts] = useState<District[]>([]);
//   const [upzilas, setUpzilas] = useState<Upzila[]>([]);
//   const [unions, setUnions] = useState<Union[]>([]);
  
//   const [selectedDivision, setSelectedDivision] = useState<string>('');
//   const [selectedDistrict, setSelectedDistrict] = useState<string>('');
//   const [selectedUpzila, setSelectedUpzila] = useState<string>('');
//   const [selectedUnion, setSelectedUnion] = useState<string>('');

//   const [result, setResult] = useState<string>('Selected Names: ');

//   const updateResult = () => {
//     const divisionName = divisions.find((div) => div.id === selectedDivision)?.name || '';
//     const districtName = districts.find((dist) => dist.id === selectedDistrict)?.name || '';
//     const upzilaName = upzilas.find((up) => up.id === selectedUpzila)?.name || '';
//     const unionName = unions.find((un) => un.id === selectedUnion)?.name || '';
    
//     setResult(`Selected Names: ${divisionName} ${districtName} ${upzilaName} ${unionName}`);
//   };

//   useEffect(() => {
//     const loadDivisions = async () => {
//       try {
//         const response = await fetch('https://sohojapi.vercel.app/api/divisions');
//         const divisions = await response.json();
//         setDivisions(divisions);
//       } catch (error) {
//         console.error("Error loading divisions:", error);
//       }
//     };
//     loadDivisions();
//   }, []);

//   const handleDivisionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const divisionId = e.target.value;
//     setSelectedDivision(divisionId);
//     setDistricts([]);
//     setUpzilas([]);
//     setUnions([]);
//     setSelectedDistrict('');
//     setSelectedUpzila('');
//     setSelectedUnion('');
    
//     if (divisionId) {
//       try {
//         const response = await fetch(`https://sohojapi.vercel.app/api/districts/${divisionId}`);
//         const districts = await response.json();
//         setDistricts(districts);
//       } catch (error) {
//         console.error("Error loading districts:", error);
//       }
//     }
//   };

//   const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const districtId = e.target.value;
//     setSelectedDistrict(districtId);
//     setUpzilas([]);
//     setUnions([]);
//     setSelectedUpzila('');
//     setSelectedUnion('');
    
//     if (districtId) {
//       try {
//         const response = await fetch(`https://sohojapi.vercel.app/api/upzilas/${districtId}`);
//         const upzilas = await response.json();
//         setUpzilas(upzilas);
//       } catch (error) {
//         console.error("Error loading upzilas:", error);
//       }
//     }
//   };

//   const handleUpzilaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const upzilaId = e.target.value;
//     setSelectedUpzila(upzilaId);
//     setUnions([]);
//     setSelectedUnion('');
    
//     if (upzilaId) {
//       try {
//         const response = await fetch(`https://sohojapi.vercel.app/api/unions/${upzilaId}`);
//         const unions = await response.json();
//         setUnions(unions);
//       } catch (error) {
//         console.error("Error loading unions:", error);
//       }
//     }
//   };

//   const handleUnionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const unionId = e.target.value;
//     setSelectedUnion(unionId);
//     updateResult();
//   };

//   useEffect(() => {
//     updateResult();
//   }, [selectedDivision, selectedDistrict, selectedUpzila, selectedUnion]);

//   return (
//     <div className="container">
//       <h1>Bangladeshi Division, District, Upzila, Unions Conditional Form</h1>

//       <label htmlFor="division">Select Division:</label>
//       <select id="division" value={selectedDivision} onChange={handleDivisionChange}>
//         <option value="">-- Select Division --</option>
//         {divisions.map((division) => (
//           <option key={division.id} value={division.id}>
//             {division.name}
//           </option>
//         ))}
//       </select>

//       <label htmlFor="district">Select District:</label>
//       <select
//         id="district"
//         value={selectedDistrict}
//         onChange={handleDistrictChange}
//         disabled={!selectedDivision}
//       >
//         <option value="">-- Select District --</option>
//         {districts.map((district) => (
//           <option key={district.id} value={district.id}>
//             {district.name}
//           </option>
//         ))}
//       </select>

//       <label htmlFor="upzila">Select Upzila:</label>
//       <select
//         id="upzila"
//         value={selectedUpzila}
//         onChange={handleUpzilaChange}
//         disabled={!selectedDistrict}
//       >
//         <option value="">-- Select Upzila --</option>
//         {upzilas.map((upzila) => (
//           <option key={upzila.id} value={upzila.id}>
//             {upzila.name}
//           </option>
//         ))}
//       </select>

//       <label htmlFor="union">Select Union:</label>
//       <select
//         id="union"
//         value={selectedUnion}
//         onChange={handleUnionChange}
//         disabled={!selectedUpzila}
//       >
//         <option value="">-- Select Union --</option>
//         {unions.map((union) => (
//           <option key={union.id} value={union.id}>
//             {union.name}
//           </option>
//         ))}
//       </select>

//       <div id="result">{result}</div>
//     </div>
//   );
// };

// export default Address;