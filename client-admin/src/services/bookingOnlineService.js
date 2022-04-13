// import { tr } from "date-fns/locale";
// import moment from "moment";
// import { useSelector } from "react-redux";

// const KEYS = {
//   bookings: "bookings",
//   bookingId: "bookingId",
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

// export function GetAllBookings() {
//   // const bookingsData = useSelector((state) => state.data.bookings);
//   if (localStorage.getItem(KEYS.bookings) == null)
//     localStorage.setItem(KEYS.bookings, JSON.stringify([]));
//   const bookings = JSON.parse(localStorage.getItem(KEYS.bookings));

//   // console.log(bookingsData);

//   return (
//     bookings.bookings &&
//     bookings.bookings.map((x) => ({
//       ...x,
//     }))
//   );
// }

// export function getAllDailyBookings() {
//   if (localStorage.getItem(KEYS.bookings) == null)
//     localStorage.setItem(KEYS.bookings, JSON.stringify([]));
//   const bookings = JSON.parse(localStorage.getItem(KEYS.bookings));

//   let newDate = new Date();
//   let date_raw = newDate.getDate();
//   console.log(moment(newDate).format("DD MMM, YYYY").toString());

//   return (
//     bookings.bookings &&
//     bookings.bookings
//       .filter((daily) =>
//         daily.trips.find(
//           (tr) =>
//             moment(tr.trip.date).format("DD MMM, YYYY") ==
//             moment(newDate).format("DD MMM, YYYY")
//         )
//       )
//       .map((x) => ({
//         ...x,
//       }))
//   );
// }
// .toString() ==
