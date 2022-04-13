// import moment from "moment";

// const KEYS = {
//   trips: "trips",
//   tripId: "tripId",
// };

// // export const getDepartmentCollection = () => [
// //   { id: "1", title: "Development" },
// //   { id: "2", title: "Marketing" },
// //   { id: "3", title: "Accounting" },
// //   { id: "4", title: "HR" },
// // ];

// // export function insertEmployee(data) {
// //   let employees = getAllEmployees();
// //   data["id"] = generateEmployeeId();
// //   employees.push(data);
// //   localStorage.setItem(KEYS.employees, JSON.stringify(employees));
// // }

// // export function updateEmployee(data) {
// //   let employees = getAllEmployees();
// //   let recordIndex = employees.findIndex((x) => x.id == data.id);
// //   employees[recordIndex] = { ...data };
// //   localStorage.setItem(KEYS.employees, JSON.stringify(employees));
// // }

// // export function deleteEmployee(id) {
// //   let employees = getAllEmployees();
// //   employees = employees.filter((x) => x.id != id);
// //   localStorage.setItem(KEYS.employees, JSON.stringify(employees));
// // }

// // export function generateEmployeeId() {
// //   if (localStorage.getItem(KEYS.employeeId) == null)
// //     localStorage.setItem(KEYS.employeeId, "0");
// //   var id = parseInt(localStorage.getItem(KEYS.employeeId));
// //   localStorage.setItem(KEYS.employeeId, (++id).toString());
// //   return id;
// // }

// export function getAllTrips() {
//   if (localStorage.getItem(KEYS.trips) == null)
//     localStorage.setItem(KEYS.trips, JSON.stringify([]));
//   const trips = JSON.parse(localStorage.getItem(KEYS.trips));

//   return (
//     trips.trips &&
//     trips.trips.map((x) => ({
//       ...x,
//       // drive: drives[x.driver - 1].title,
//     }))
//   );
// }

// export function getAllDailyTrips() {
//   if (localStorage.getItem(KEYS.trips) == null)
//     localStorage.setItem(KEYS.trips, JSON.stringify([]));
//   const trips = JSON.parse(localStorage.getItem(KEYS.trips));

//   let newDate = new Date();
//   let date_raw = newDate.getDate();
//   console.log(moment(newDate).format("DD MMM, YYYY").toString());

//   return (
//     trips.trips &&
//     trips.trips
//       .filter(
//         (daily) =>
//           moment(daily.date).format("DD MMM, YYYY") >
//             moment(newDate).format("DD MMM, YYYY") && daily.ticketsCount > 0
//       )
//       .map((x) => ({
//         ...x,
//       }))
//   );
// }
