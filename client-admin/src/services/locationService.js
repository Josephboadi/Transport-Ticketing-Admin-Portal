// const KEYS = {
//   locations: "locations",
//   locationId: "locationId",
// };

// // export const getDepartmentCollection = () => ([
// //     { id: '1', title: 'Development' },
// //     { id: '2', title: 'Marketing' },
// //     { id: '3', title: 'Accounting' },
// //     { id: '4', title: 'HR' },
// // ])

// // export function insertEmployee(data) {
// //     let employees = getAllEmployees();
// //     data['id'] = generateEmployeeId()
// //     employees.push(data)
// //     localStorage.setItem(KEYS.employees, JSON.stringify(employees))
// // }

// // export function updateEmployee(data) {
// //     let employees = getAllEmployees();
// //     let recordIndex = employees.findIndex(x => x.id == data.id);
// //     employees[recordIndex] = { ...data }
// //     localStorage.setItem(KEYS.employees, JSON.stringify(employees));
// // }

// // export function deleteEmployee(id) {
// //     let employees = getAllEmployees();
// //     employees = employees.filter(x => x.id != id)
// //     localStorage.setItem(KEYS.employees, JSON.stringify(employees));
// // }

// // export function generateEmployeeId() {
// //     if (localStorage.getItem(KEYS.employeeId) == null)
// //         localStorage.setItem(KEYS.employeeId, '0')
// //     var id = parseInt(localStorage.getItem(KEYS.employeeId))
// //     localStorage.setItem(KEYS.employeeId, (++id).toString())
// //     return id;
// // }

// export function getAllLocations() {
//   if (localStorage.getItem(KEYS.locations) == null)
//     localStorage.setItem(KEYS.locations, JSON.stringify([]));
//   const locations = JSON.parse(localStorage.getItem(KEYS.locations));

//   return (
//     locations.locations &&
//     locations.locations.map((x) => ({
//       ...x,
//       // drive: drives[x.driver - 1].title,
//     }))
//   );
// }
