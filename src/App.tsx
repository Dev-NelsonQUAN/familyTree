import React, { useState } from 'react';

interface Child {
  id: string;
  name: string;
  type: 'child';
}

interface Wife {
  id: string;
  name: string;
  type: 'wife';
  isExpanded: boolean;
  children: Child[];
}

interface Father {
  id: string;
  name: string;
  type: 'father';
  isExpanded: boolean;
  wives: Wife[];
}

const initialFamilyData: Father = {
  id: "father_hosea", // Changed father's ID
  name: "Hosea", // Changed father's name to Hosea
  type: "father",
  isExpanded: false, // Initially, the father's section is collapsed
  wives: [
    {
      id: "wife_onere", // Changed wife's ID
      name: "Onere", // Changed first wife's name to Onere
      type: "wife",
      isExpanded: false,
      children: [
        { id: "child_onere_john", name: "John", type: "child" },
        { id: "child_onere_mary", name: "Mary", type: "child" },
        { id: "child_onere_peter", name: "Peter", type: "child" },
        { id: "child_onere_jane", name: "Jane", type: "child" },
        { id: "child_onere_michael", name: "Michael", type: "child" },
        { id: "child_onere_emily", name: "Emily", type: "child" },
        { id: "child_onere_daniel", name: "Daniel", type: "child" },
        { id: "child_onere_olivia", name: "Olivia", type: "child" }
      ]
    },
    {
      id: "wife_luko", // Changed wife's ID
      name: "Luko", // Changed second wife's name to Luko
      type: "wife",
      isExpanded: false,
      children: [
        { id: "child_luko_james", name: "James", type: "child" },
        { id: "child_luko_sophia", name: "Sophia", type: "child" },
        { id: "child_luko_william", name: "William", type: "child" },
        { id: "child_luko_ava", name: "Ava", "type": "child" }
      ]
    },
    {
      id: "wife_mabo", // Changed wife's ID
      name: "Mabo", // Changed third wife's name to Mabo
      type: "wife",
      isExpanded: false,
      children: [
        { id: "child_mabo_joseph", name: "Joseph", type: "child" },
        { id: "child_mabo_mia", name: "Mia", type: "child" },
        { id: "child_mabo_charles", name: "Charles", type: "child" },
        { id: "child_mabo_isabella", name: "Isabella", type: "child" },
        { id: "child_mabo_thomas", name: "Thomas", type: "child" },
        { id: "child_mabo_charlotte", name: "Charlotte", type: "child" },
        { id: "child_mabo_henry", name: "Henry", type: "child" },
        { id: "child_mabo_amelia", name: "Amelia", type: "child" }
      ]
    }
  ]
};

// Main App component
const App: React.FC = () => {
  // State to manage the family tree data and its expanded/collapsed status
  const [familyTree, setFamilyTree] = useState<Father>(initialFamilyData);

  // Function to toggle the expansion of the father's wives
  const toggleFatherExpansion = () => {
    setFamilyTree(prevTree => ({
      ...prevTree,
      isExpanded: !prevTree.isExpanded,
      // When father's expansion is toggled, also collapse all wives' children
      wives: prevTree.wives.map(wife => ({
        ...wife,
        isExpanded: false // Ensure children are hidden when father's view changes
      }))
    }));
  };

  // Function to toggle the expansion of a specific wife's children
  const toggleWifeExpansion = (wifeId: string) => {
    setFamilyTree(prevTree => ({
      ...prevTree,
      wives: prevTree.wives.map(wife =>
        wife.id === wifeId ? { ...wife, isExpanded: !wife.isExpanded } : wife
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4 font-inter">
      <div className="bg-white shadow-2xl rounded-xl p-8 md:p-12 w-full max-w-4xl text-center relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8">
          Family Tree
        </h1>

        {/* Father Node */}
        <div className="mb-8 relative z-10">
          <button
            onClick={toggleFatherExpansion}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {familyTree.name} {familyTree.isExpanded ? '▲' : '▼'}
          </button>
          {/* Text under father's name */}
          <p className="mt-2 text-gray-600 text-lg font-medium">Wives and Children</p>
        </div>

        {/* Line from Father to Wives Connector */}
        {familyTree.isExpanded && (
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-400"
               style={{ top: '160px', height: '40px', zIndex: 0 }}></div>
        )}

        {/* Wives Section (conditionally rendered) */}
        {familyTree.isExpanded && (
          <div className="flex flex-col md:flex-row justify-center items-start md:items-stretch gap-8 mb-8 relative z-10">
            {/* Horizontal line connecting from father's vertical line to wives */}
            <div className="absolute top-[-10px] left-0 right-0 h-0.5 bg-gray-400 mx-auto"
                 style={{ width: 'calc(100% - 64px)', zIndex: 0 }}></div> {/* Adjusted width for padding */}

            {familyTree.wives.map((wife, index) => (
              <div key={wife.id} className="bg-blue-50 p-6 rounded-lg shadow-md w-full md:w-1/3 flex flex-col items-center border border-blue-200 relative">
                {/* Vertical line from horizontal connector to wife */}
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-gray-400 z-0"></div>

                <button
                  onClick={() => toggleWifeExpansion(wife.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 mb-4 z-10"
                >
                  {wife.name} {wife.isExpanded ? '▲' : '▼'}
                </button>

                {/* Line from Wife to Children Connector */}
                {wife.isExpanded && (
                  <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-400"
                       style={{ top: '100px', height: '40px', zIndex: 0 }}></div>
                )}

                {/* Children Section (conditionally rendered) */}
                {wife.isExpanded && (
                  <div className="mt-4 w-full relative">
                    {/* Horizontal line connecting from wife's vertical line to children */}
                    <div className="absolute top-[-10px] left-0 right-0 h-0.5 bg-gray-400 mx-auto"
                         style={{ width: 'calc(100% - 32px)', zIndex: 0 }}></div> {/* Adjusted width for padding */}

                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Children of {wife.name}:</h3>
                    <ul className="list-none p-0 space-y-2">
                      {wife.children.map((child, childIndex) => (
                        <li key={child.id} className="bg-white py-2 px-4 rounded-md shadow-sm text-gray-800 text-sm border border-gray-100 relative z-10">
                          {/* Vertical line from horizontal connector to child */}
                          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-gray-400 z-0"></div>
                          {child.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;



// import React, { useState } from 'react';

// // Define TypeScript interfaces for the data structure
// interface Child {
//   id: string;
//   name: string;
//   type: 'child';
// }

// interface Wife {
//   id: string;
//   name: string;
//   type: 'wife';
//   isExpanded: boolean;
//   children: Child[];
// }

// interface Father {
//   id: string;
//   name: string;
//   type: 'father';
//   isExpanded: boolean;
//   wives: Wife[];
// }

// // The initial family tree data based on your specification
// const initialFamilyData: Father = {
//   id: "father_david",
//   name: "David",
//   type: "father",
//   isExpanded: false, // Initially, the father's section is collapsed
//   wives: [
//     {
//       id: "wife_sarah",
//       name: "Sarah",
//       type: "wife",
//       isExpanded: false,
//       children: [
//         { id: "child_sarah_john", name: "John", type: "child" },
//         { id: "child_sarah_mary", name: "Mary", type: "child" },
//         { id: "child_sarah_peter", name: "Peter", type: "child" },
//         { id: "child_sarah_jane", name: "Jane", type: "child" },
//         { id: "child_sarah_michael", name: "Michael", type: "child" },
//         { id: "child_sarah_emily", name: "Emily", type: "child" },
//         { id: "child_sarah_daniel", name: "Daniel", type: "child" },
//         { id: "child_sarah_olivia", name: "Olivia", type: "child" }
//       ]
//     },
//     {
//       id: "wife_rebecca",
//       name: "Rebecca",
//       type: "wife",
//       isExpanded: false,
//       children: [
//         { id: "child_rebecca_james", name: "James", type: "child" },
//         { id: "child_rebecca_sophia", name: "Sophia", type: "child" },
//         { id: "child_rebecca_william", name: "William", type: "child" },
//         { id: "child_rebecca_ava", name: "Ava", type: "child" }
//       ]
//     },
//     {
//       id: "wife_leah",
//       name: "Leah",
//       type: "wife",
//       isExpanded: false,
//       children: [
//         { id: "child_leah_joseph", name: "Joseph", type: "child" },
//         { id: "child_leah_mia", name: "Mia", type: "child" },
//         { id: "child_leah_charles", name: "Charles", type: "child" },
//         { id: "child_leah_isabella", name: "Isabella", type: "child" },
//         { id: "child_leah_thomas", name: "Thomas", type: "child" },
//         { id: "child_leah_charlotte", name: "Charlotte", type: "child" },
//         { id: "child_leah_henry", name: "Henry", type: "child" },
//         { id: "child_leah_amelia", name: "Amelia", type: "child" }
//       ]
//     }
//   ]
// };

// // Main App component
// const App: React.FC = () => {
//   // State to manage the family tree data and its expanded/collapsed status
//   const [familyTree, setFamilyTree] = useState<Father>(initialFamilyData);

//   // Function to toggle the expansion of the father's wives
//   const toggleFatherExpansion = () => {
//     setFamilyTree(prevTree => ({
//       ...prevTree,
//       isExpanded: !prevTree.isExpanded,
//       // When father's expansion is toggled, also collapse all wives' children
//       wives: prevTree.wives.map(wife => ({
//         ...wife,
//         isExpanded: false // Ensure children are hidden when father's view changes
//       }))
//     }));
//   };

//   // Function to toggle the expansion of a specific wife's children
//   const toggleWifeExpansion = (wifeId: string) => {
//     setFamilyTree(prevTree => ({
//       ...prevTree,
//       wives: prevTree.wives.map(wife =>
//         wife.id === wifeId ? { ...wife, isExpanded: !wife.isExpanded } : wife
//       )
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4 font-inter">
//       <div className="bg-white shadow-2xl rounded-xl p-8 md:p-12 w-full max-w-4xl text-center">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8">
//           Family Tree
//         </h1>

//         {/* Father Node */}
//         <div className="mb-8">
//           <button
//             onClick={toggleFatherExpansion}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
//           >
//             {familyTree.name} {familyTree.isExpanded ? '▲' : '▼'}
//           </button>
//         </div>

//         {/* Wives Section (conditionally rendered) */}
//         {familyTree.isExpanded && (
//           <div className="flex flex-col md:flex-row justify-center items-start md:items-stretch gap-8 mb-8">
//             {familyTree.wives.map(wife => (
//               <div key={wife.id} className="bg-blue-50 p-6 rounded-lg shadow-md w-full md:w-1/3 flex flex-col items-center border border-blue-200">
//                 <button
//                   onClick={() => toggleWifeExpansion(wife.id)}
//                   className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 mb-4"
//                 >
//                   {wife.name} {wife.isExpanded ? '▲' : '▼'}
//                 </button>

//                 {/* Children Section (conditionally rendered) */}
//                 {wife.isExpanded && (
//                   <div className="mt-4 w-full">
//                     <h3 className="text-lg font-semibold text-gray-700 mb-3">Children of {wife.name}:</h3>
//                     <ul className="list-none p-0 space-y-2">
//                       {wife.children.map(child => (
//                         <li key={child.id} className="bg-white py-2 px-4 rounded-md shadow-sm text-gray-800 text-sm border border-gray-100">
//                           {child.name}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;