import React, { useState } from 'react';

interface Child {
  id: string;
  name: string;
  type: 'child';
}

interface Wife {
  id: string;
  name: string;
  maidenName?: string;
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
  id: "father_hosea",
  name: "Hosea Leke",
  type: "father",
  isExpanded: false,
  wives: [
    {
      id: "wife_esther",
      name: "Esther Leke",
      maidenName: "(Nee ebiesuwa)",
      type: "wife",
      isExpanded: false,
      children: [
        { id: "child_esther_bamigbe", name: "Bamigbe Leke (F) (Married to Akinjile)", type: "child" },
        { id: "child_esther_tunji", name: "Tunji Leke (M) (Late)", type: "child" },
        { id: "child_esther_adeoga", name: "Adeoga Leke (M)", type: "child" },
        { id: "child_esther_ogo-oluwa", name: "Ogo-oluwa Leke (M)", type: "child" },
        { id: "child_esther_ire", name: "Ire Leke (F)", type: "child" },
        { id: "child_esther_aro", name: "Aro Leke (F) (Married to Balogun)", type: "child" },
        { id: "child_esther_olametan", name: "Olametan Leke (F) (Married to Alademehin)", type: "child" },
      ]
    },
    {
      id: "wife_florence",
      name: "Florence Leke",
      maidenName: "(Nee Ikujimbola)",
      type: "wife",
      isExpanded: false,
      children: [
        { id: "child_florence_gbenro", name: "Gbenro Leke (M)", type: "child" },
        { id: "child_florence_anu", name: "Anu Leke (F)", type: "child" },
        { id: "child_florence_gbotemi", name: "Gbotemi Leke (M)", type: "child" },
        { id: "child_florence_kayode", name: "Kayode Leke (M)", "type": "child" }
      ]
    },
    {
      id: "wife_ibironke",
      name: "Ibironke Leke",
      type: "wife",
      isExpanded: false,
      children: [
        { id: "child_ibironke_kosede", name: "Kosede Leke (M)", type: "child" },
        { id: "child_ibironke_ayo", name: "Ayo Leke (F)", type: "child" },
        { id: "child_ibironke_sunday", name: "Sunday Leke (Late)", type: "child" },
        { id: "child_ibironke_monday", name: "Monday Leke (M)", type: "child" },
        { id: "child_ibironke_iyabo", name: "Iyabo Leke (F)", type: "child" },
        { id: "child_ibironke_toyin", name: "Toyin Leke (F)", type: "child" },
      ]
    }
  ]
};

const App: React.FC = () => {
  const [familyTree, setFamilyTree] = useState<Father>(initialFamilyData);

  const toggleFatherExpansion = () => {
    setFamilyTree(prevTree => ({
      ...prevTree,
      isExpanded: !prevTree.isExpanded,
      wives: prevTree.wives.map(wife => ({
        ...wife,
        isExpanded: false
      }))
    }));
  };

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

        <div className="mb-8 relative z-10">
          <button
            onClick={toggleFatherExpansion}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {familyTree.name} {familyTree.isExpanded ? '▲' : '▼'}
          </button>
          <p className="mt-2 text-gray-600 text-lg font-medium">Wives and Children</p>
        </div>

        {familyTree.isExpanded && (
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-400"
               style={{ top: '160px', height: '40px', zIndex: 0 }}></div>
        )}

        {familyTree.isExpanded && (
          <div className="flex flex-col md:flex-row justify-center items-start md:items-stretch gap-8 mb-8 relative z-10">
            <div className="absolute top-[-10px] left-0 right-0 h-0.5 bg-gray-400 mx-auto"
                 style={{ width: 'calc(100% - 64px)', zIndex: 0 }}></div>

            {familyTree.wives.map((wife) => (
              <div key={wife.id} className="bg-blue-50 p-6 rounded-lg shadow-md w-full md:w-1/3 flex flex-col items-center border border-blue-200 relative">
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-gray-400 z-0"></div>

                <button
                  onClick={() => toggleWifeExpansion(wife.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 mb-4 z-10"
                >
                  <span>
                    {wife.name}
                    {wife.maidenName && <br />}
                    {wife.maidenName}
                  </span>
                  <span className="ml-2">{wife.isExpanded ? '▲' : '▼'}</span>
                </button>

                {wife.isExpanded && (
                  <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-400"
                       style={{ top: '100px', height: '40px', zIndex: 0 }}></div>
                )}

                {wife.isExpanded && (
                  <div className="mt-4 w-full relative">
                    <div className="absolute top-[-10px] left-0 right-0 h-0.5 bg-gray-400 mx-auto"
                         style={{ width: 'calc(100% - 32px)', zIndex: 0 }}></div>

                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Children of {wife.name}:</h3>
                    <ul className="list-none p-0 space-y-2">
                      {wife.children.map((child) => (
                        <li key={child.id} className="bg-white py-2 px-4 rounded-md shadow-sm text-gray-800 text-sm border border-gray-100 relative z-10">
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