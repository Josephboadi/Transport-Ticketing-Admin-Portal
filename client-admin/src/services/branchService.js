// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addVehicle, fetchVehicles } from "../redux/actions/dataActions";

// const KEYS = {
//   branches: "branches",
//   branchId: "branchId",
// };

// // const dispatch = useDispatch();
// // export const getDriverCollection = () => [
// //   { id: "1", title: "Development" },
// //   { id: "2", title: "Marketing" },
// //   { id: "3", title: "Accounting" },
// //   { id: "4", title: "HR" },
// // ];

// export function InsertVehicle(data) {
//   // const dispatch = useDispatch();
//   // let vehicles = GetAllVehicles();
//   // data["id"] = generateVehicleId();
//   // vehicles.push(data);
//   // localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles));
//   // dispatch(addVehicle(data));
//   // GetAllVehicles();
// }

// // export function updateVehicle(data) {
// //   let vehicles = getAllVehicles();
// //   let recordIndex = vehicles.vehicles.findIndex((x) => x.id == data.id);
// //   vehicles[recordIndex] = { ...data };
// //   localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles));
// // }

// // export function deleteVehicle(id) {
// //   let vehicles = getAllVehicles();
// //   vehicles = vehicles.filter((x) => x.id != id);
// //   localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles));
// // }

// // export function generateVehicleId() {
// //   if (localStorage.getItem(KEYS.vehicleId) == null)
// //     localStorage.setItem(KEYS.vehicleId, "0");
// //   var id = parseInt(localStorage.getItem(KEYS.vehicleId));
// //   localStorage.setItem(KEYS.vehicleId, (++id).toString());
// //   return id;
// // }

// export function getAllBranches() {
//   // const { loading } = useSelector((state) => state.data);
//   // const vehiclesData = useSelector((state) => state.data.vehicles);

//   // const dispatch = useDispatch();

//   // useEffect(() => {
//   //   dispatch(fetchVehicles());
//   // }, []);

//   if (localStorage.getItem(KEYS.branches) == null)
//     localStorage.setItem(KEYS.branches, JSON.stringify([]));
//   const branches = JSON.parse(localStorage.getItem(KEYS.branches));
//   // let vehicles = vehiclesData;

//   //map departmentID to department title

//   // let drives = getDriverCollection();

//   return (
//     branches.branches &&
//     branches.branches.map((x) => ({
//       ...x,
//       // drive: drives[x.driver - 1].title,
//     }))
//   );

//   // } else {
//   //   return vehicles.vehicles.map((x) => ({
//   //     ...x,
//   //     // drive: drives[x.driver - 1].title,
//   //   }));
//   // }
// }
