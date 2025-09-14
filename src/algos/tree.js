// export const tree = {
//     id: "A", x: 300, y: 50, children: [
//         {
//             id: "B", x: 150, y: 150, children: [
//                 { id: "D", x: 75, y: 250, children: [] },
//                 { id: "E", x: 225, y: 250, children: [] }
//             ]
//         },
//         {
//             id: "C", x: 450, y: 150, children: [
//                 { id: "F", x: 450, y: 250, children: [] }
//             ]
//         }
//     ]
// };
export const tree = {
    id: "A", children: [
        {
            id: "B", children: [
                { id: "D", children: [] },
                { id: "E", children: [] }
            ]
        },
        {
            id: "C", children: [
                { id: "F", children: [] }
            ]
        }
    ]
};
