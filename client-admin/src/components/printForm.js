import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import { addLocation, fetchLocations } from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import { green } from "@material-ui/core/colors";
import PrintIcon from "@material-ui/icons/Print";
import moment from "moment";
// import { ComponentToPrint } from "./ComponentToPrint";

export class ComponentToPrint extends React.PureComponent {
  render() {
    const { record, seatNo, tripData, name } = this.props;
    // console.log(record, seatNo, tripData, name);
    const fare = record.totalPrice - record.taxPrice;
    return (
      <Grid container>
        <div
          style={{
            backgroundColor: "whitesmoke",
            // border: "2px",
            // borderWidth: "2px",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            padding: "15px",
          }}>
          <div
            style={{
              width: "150px",
              // backgroundColor: "gray",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "center",
              }}>
              <div style={{ zIndex: 100 }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "white",
                    marginTop: "14px",
                    marginRight: "-4px",
                    // zIndex: 100,
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "white",
                    marginTop: "4px",
                    marginRight: "-4px",
                    // zIndex: 100,
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "white",
                    marginTop: "4px",
                    marginRight: "-4px",
                    // zIndex: 100,
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "white",
                    marginTop: "4px",
                    marginRight: "-4px",
                    // zIndex: 100,
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div
                style={{
                  backgroundColor: "green",
                  width: "100px",
                  justifyContent: "center",
                  alignItems: "center",
                  // marginLeft: "20px",
                  marginTop: "10px",
                  // marginBottom: "5px",
                  padding: "2px",
                  paddingBottom: "5px",
                  // zIndex: 1,
                }}>
                <h2
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    marginLeft: "25px",
                    // marginTop: "10px",
                    // marginBottom: "5px",
                  }}>
                  BUS
                </h2>
                <h5
                  style={{
                    color: "white",
                    marginLeft: "25px",
                    // marginBottom: "10px",
                  }}>
                  TICKET
                </h5>
              </div>
              <div>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "white",
                    marginTop: "14px",
                    marginLeft: "-4px",
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "white",
                    marginTop: "4px",
                    marginLeft: "-4px",
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "white",
                    marginTop: "4px",
                    marginLeft: "-4px",
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "white",
                    marginTop: "4px",
                    marginLeft: "-4px",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
            {/* <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "5px",
              }}>
              <h6 style={{ alignSelf: "center", fontSize: "10px" }}>{name}</h6>
            </div> */}
            <div style={{ width: "140px", marginTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                }}>
                <div style={{}}>
                  <h6 style={{ marginBottom: "5px" }}>Ticket ID</h6>
                  <h6 style={{ marginBottom: "5px" }}>Qyt</h6>
                  <h6 style={{ marginBottom: "5px" }}>Fare</h6>
                  <h6 style={{ marginBottom: "5px" }}>Tax</h6>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    // justifyContent: "flex-end",
                  }}>
                  <h6 style={{ marginBottom: "5px" }}>{record.ticketId}</h6>
                  <h6 style={{ marginBottom: "5px" }}>{record.quantity}</h6>
                  <h6 style={{ marginBottom: "5px" }}>{`Ghc ${fare}`}</h6>
                  <h6
                    style={{
                      marginBottom: "5px",
                    }}>{`Ghc ${record.taxPrice}`}</h6>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "1px",
                  alignContent: "center",
                  backgroundColor: "black",
                  // width: "100%",
                }}></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginTop: "4px",
                  width: "100%",
                }}>
                <div style={{}}>
                  <h5 style={{ marginBottom: "5px" }}>Total</h5>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    // justifyContent: "flex-end",
                  }}>
                  <h5
                    style={{
                      marginBottom: "5px",
                    }}>{`Ghc ${record.totalPrice}`}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              height: "11px",
              width: "1.5px",

              marginTop: "14px",
              backgroundColor: "lightgrey",
            }}
          />
          <div
            style={{
              height: "11px",
              width: "1.5px",

              marginTop: "10px",
              backgroundColor: "lightgrey",
            }}
          />
          <div
            style={{
              height: "11px",
              width: "1.5px",

              marginTop: "10px",
              backgroundColor: "lightgrey",
            }}
          />
          <div
            style={{
              height: "11px",
              width: "1.5px",

              marginTop: "10px",
              backgroundColor: "lightgrey",
            }}
          />
          <div
            style={{
              height: "11px",
              width: "1.5px",

              marginTop: "10px",
              backgroundColor: "lightgrey",
            }}
          />
          <div
            style={{
              height: "11px",
              width: "1.5px",

              marginTop: "10px",
              backgroundColor: "lightgrey",
            }}
          />
          <div
            style={{
              height: "11px",
              width: "1.5px",

              marginTop: "10px",
              backgroundColor: "lightgrey",
            }}
          />
          {/* <div
            style={{
              height: "11px",
              width: "1.5px",

              marginTop: "10px",
              backgroundColor: "lightgrey",
            }}
          /> */}
          <div
            style={{
              height: "11px",
              width: "1.5px",

              marginTop: "10px",
              backgroundColor: "lightgrey",
            }}
          />
          <div
            style={{
              height: "11px",
              width: "1.5px",

              marginTop: "10px",
              backgroundColor: "lightgrey",
            }}
          />
        </div>

        <div
          style={{
            backgroundColor: "whitesmoke",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            borderLeftColor: "lightgrey",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
          }}>
          <div
            style={{
              width: "220px",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
              // backgroundColor: "yellow",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h1
                  style={{
                    fontWeight: "bolder",
                    fontSize: "35px",
                    // fontStyle: "italic",
                    // wordSpacing: "2px",
                  }}>
                  BUS
                </h1>
                <h1
                  style={{
                    fontWeight: "bolder",
                    fontSize: "35px",
                    marginLeft: "10px",

                    // fontStyle: "italic",
                    // wordSpacing: "2px",
                  }}>
                  TICKET
                </h1>
              </div>
              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}>
                  {name}
                </p>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "lightgray",
                  // marginBottom: "5px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  // justifyContent: "space-around",
                  width: "100%",
                }}>
                <div
                  style={{
                    marginRight: "5px",
                    width: "35%",
                    marginTop: "4px",
                  }}>
                  <div>
                    <p style={{ fontSize: "9px" }}>Bus</p>
                    <h6 style={{ marginBottom: "10px" }}>
                      {tripData.trip.vehicle.regNumber}
                    </h6>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // marginTop: "5px",
                    }}>
                    <p style={{ fontSize: "9px" }}>Seat</p>
                    <h6 style={{ marginBottom: "5px" }}>
                      {record.seatNumber ? record.seatNumber : seatNo}
                    </h6>
                  </div>
                  {/* <h6 style={{ marginBottom: "5px" }}>Fare</h6> */}
                </div>
                {/* <div style={{ flex: 1 }}> */}
                <div
                  style={{
                    height: "60px",
                    width: "2px",
                    marginRight: "5px",
                    // marginTop: "-10px",

                    backgroundColor: "lightgray",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "65%",
                    justifyContent: "space-between",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "space-between",
                      justifyContent: "space-around",
                      marginTop: "6px",
                      width: "100%",
                      flex: 1,
                      marginRight: "5px",
                    }}>
                    <div>
                      <p style={{ fontSize: "9px" }}>From</p>
                      <h6 style={{ marginBottom: "5px" }}>
                        {tripData.trip.from.name}
                      </h6>
                    </div>
                    <div>
                      <p style={{ fontSize: "9px" }}>To</p>
                      <h6 style={{ marginBottom: "5px" }}>
                        {tripData.trip.to.name}
                      </h6>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "space-between",
                      justifyContent: "space-around",
                      marginTop: "6px",
                      width: "100%",
                      flex: 1,
                    }}>
                    <div>
                      <p style={{ fontSize: "9px" }}>Date</p>
                      <h6 style={{ marginBottom: "5px" }}>
                        {moment(tripData.trip.date).format("DD MMM, YYYY")}
                      </h6>
                    </div>
                    <div>
                      <p style={{ fontSize: "9px" }}>Time</p>
                      <h6 style={{ marginBottom: "5px" }}>
                        {tripData.trip.time}
                      </h6>
                    </div>
                  </div>

                  {/* <h6 style={{ marginBottom: "5px" }}>Ghc 44</h6> */}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  marginTop: "12px",
                  // bottom: 5,
                  fontSize: "10px",
                  // marginRight: "30px",
                }}>
                <p>Powered by Sesafrica</p>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Grid>
    );
  }
}
// import React from "react";
// export default function TripForm(props)
export class Example extends React.PureComponent {
  render() {
    const { record, seatNo, tripData, name, printTick } = this.props;
    // console.log(tripData);
    const PrintTick = () => {
      printTick();
    };
    return (
      <div>
        <ComponentToPrint
          ref={(el) => (this.componentRef = el)}
          record={record}
          seatNo={seatNo}
          tripData={tripData}
          name={name}
        />
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.

            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "green",
                  width: "120px",
                  alignContent: "center",
                  marginLeft: "240px",
                  justifyContent: "center",
                  padding: "5px",
                  borderRadius: "5px",
                  marginTop: "10px",
                  color: "white",
                }}>
                <PrintIcon fontSize="medium" />
                <a
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "17px",
                  }}
                  onClick={() => PrintTick()}
                  href="#">
                  Print Ticket
                </a>
              </div>
            );
          }}
          content={() => this.componentRef}
          // printTick={}
        />
      </div>
    );
  }
}

// export default function LocationForm(props) {
//   const dispatch = useDispatch();
//   const [isSuccessfull, setIsSuccessfull] = useState(false);
//   const { loading } = useSelector((state) => state.data);
//   const locationsData = useSelector((state) => state.data.locations);

//   const { addOrEdit, recordForEdit } = props;

//   const validate = (fieldValues = values) => {
//     let temp = { ...errors };
//     if ("name" in fieldValues)
//       temp.name = fieldValues.name ? "" : "This field is required.";
//     if ("region" in fieldValues)
//       temp.region = fieldValues.region ? "" : "This field is required.";

//     setErrors({
//       ...temp,
//     });

//     if (fieldValues == values) return Object.values(temp).every((x) => x == "");
//   };

// const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
//   useForm(initialFValues, true, validate);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSuccessfull(true);
//   if (validate()) {
//     const locationData = {
//       name: values.name,
//       region: values.region,
//     };

//     dispatch(addLocation(locationData));
//     // dispatch(fetchLocations());

//     // {
//     loading === false && dispatch(fetchLocations());
//     dispatch(fetchLocations());
// addOrEdit(locationData, resetForm);
//   localStorage.setItem(
//     "locations",
//     JSON.stringify([locationsData.locations])
//   );
// const locationsda = JSON.parse(localStorage.getItem("locations"));
// const { locations } = await locationsda;

// let countDownDate = new Date().getTime();
// let countDownDateSeconds =
//   Math.floor((countDownDate % (1000 * 60)) / 1000) + 3;

// // update every second
// let x = setInterval(function () {
//   // Get todays date and time
//   let now = new Date().getTime();

//   let nowSeconds = Math.floor((now % (1000 * 60)) / 1000);

// find the distance between now and count down date
//       let distance = countDownDateSeconds - nowSeconds;

//       if (distance < 0) {
//         clearInterval(x);
//         setIsSuccessfull(false);
//         addOrEdit(locationData, resetForm);
//       }
//     }, 1000);
//     // }
//   }
// };

// useEffect(() => {
//   if (recordForEdit != null)
//     setValues({
//       ...recordForEdit,
//     });
// }, [recordForEdit]);

// return (
//   <Form onSubmit={handleSubmit}>
// <Grid container>
//   <Grid item xs={12}>
{
  /* <Controls.Input
            name="name"
            label="Location Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          /> */
}

{
  /* <Controls.Select
            label="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            options={capitalItems}
            error={errors.name}
          />

          <Controls.Select
            label="Region"
            name="region"
            value={values.region}
            onChange={handleInputChange}
            options={regionItems}
            error={errors.region}
          /> */
}
{
  /* <Controls.Select
            label="Region"
            name="region"
            value={values.region}
            onChange={handleInputChange}
            options={regionItems}
            error={errors.region}
          /> */
}
{
  /* <div>
            <Controls.Button
              disabled={isSuccessfull}
              type="submit"
              text="Submit"
            />
            <Controls.Button text="Reset" color="default" />
          </div> */
}

{
  /* <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div> */
}
{
  /* </Grid> */
}
{
  /* <Grid item xs={6}>
          <Controls.Select
            label="Region"
            name="region"
            value={values.region}
            onChange={handleInputChange}
            options={regionItems}
            error={errors.region}
          /> */
}
{
  /* <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          <Controls.DatePicker
            name="hireDate"
            label="Hire Date"
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            name="isPermanent"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleInputChange}
          /> */
}

{
  /* <div>
            <Controls.Button
              disabled={isSuccessfull}
              type="submit"
              text="Submit"
            />
            <Controls.Button text="Reset" color="default" />
          </div>
        </Grid> */
}
{
  /* </Grid>
    </Form>
  );
} */
}
