// import { Checkbox, Select, Button, Rate } from "antd";
// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import "react-datepicker/dist/react-datepicker.css";
// import DateFnsUtils from "@date-io/date-fns";
// import IconButton from "@material-ui/core/IconButton";
// import {
//   KeyboardDatePicker,
//   MuiPickersUtilsProvider,
// } from "@material-ui/pickers";
// import { UploadOutlined } from "@ant-design/icons";

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";

// import { makeStyles } from "@material-ui/core/styles";
// import { TextField } from "@material-ui/core";
// import ButtonCircleTrans from "./ButtonCircleTrans";
// import { StarBorder, Star } from "@material-ui/icons";

// const { Option } = Select;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   },
// }));
// const StarButton = ({ active, onClick }) => (
//   <button type="button" className="starButton" onClick={onClick}>
//     {active ? <Star color="secondary" /> : <StarBorder />}
//   </button>
// );
// const StarField = ({ value, onChange }) => (
//   <>
//     <StarButton active={value >= 1} onClick={() => onChange(1)} />
//     <StarButton active={value >= 2} onClick={() => onChange(2)} />
//     <StarButton active={value >= 3} onClick={() => onChange(3)} />
//     <StarButton active={value >= 4} onClick={() => onChange(4)} />
//     <StarButton active={value >= 5} onClick={() => onChange(5)} />
//   </>
// );
// function Form() {
//   const [address, setAddress] = React.useState("");

//   const classes = useStyles();
//   const { register, handleSubmit, control } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//   };
//   return (
//     <>
//       <ButtonCircleTrans />
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* <input type="text" {...register("email", { required: true })} />
//          <input type="password" {...register("password", { required: true })} /> */}
//         {/* <input
//           type="file"
//           {...register("main_photo")}
//           id="main_photo"
//           style={{ display: "none" }}
//           multiple
//           accept=".png, .jpg, .jpeg"
//         />
//         <label htmlFor="main_photo">
//           <IconButton
//             color="secondary"
//             aria-label="upload picture"
//             component="span"
//           >
//             <UploadOutlined />
//           </IconButton>
//         </label>  */}

//         <section>
//           <label>Antd Rate</label>
//           <Controller
//             control={control}
//             name="rating"
//             render={({ field }) => <StarField {...field} />}
//           />
//         </section>
//         <section>
//           <label>Antd Checkbox</label>
//           <Controller
//             control={control}
//             name="AntdCheckbox"
//             render={({ field: { value, onChange } }) => (
//               <Checkbox
//                 checked={value}
//                 onChange={(e) => {
//                   onChange(e.target.checked);
//                 }}
//               />
//             )}
//           />
//         </section>

//         {/* <section>
//           <label>MUI Picker</label>
//           <MuiPickersUtilsProvider utils={DateFnsUtils}>
//             <Controller
//               name="MUIPicker"
//               control={control}
//               render={({ field: { ref, ...rest } }) => (
//                 <KeyboardDatePicker
//                   margin="normal"
//                   id="date-picker-dialog"
//                   label="Date picker dialog"
//                   format="dd/MM/yyyy"
//                   KeyboardButtonProps={{
//                     "aria-label": "change date",
//                   }}
//                   {...rest}
//                 />
//               )}
//             />
//           </MuiPickersUtilsProvider>
//         </section> */}

//         {/* <section>
//           <label>Antd Select</label>
//           <Controller
//             control={control}
//             name="AntdSelect"
//             render={({ field }) => (
//               <Select {...field} defaultValue="lucy">
//                 <Option value="jack">Jack</Option>
//                 <Option value="lucy">Lucy</Option>
//                 <Option value="Yiminghe">yiminghe</Option>
//               </Select>
//             )}
//           />
//         </section> */}
//         {/* <section>
//         <label>React Datepicker</label>
//         <Controller
//           control={control}
//           name="ReactDatepicker"
//           render={({ field }) => (
//             <ReactDatePicker
//               classNameName="inputReactDateTimePicker"
//               placeholderText="Select date"
//               onChange={(e) => field.onChange(e)}
//               selected={field.value}
//             />
//           )}
//         />
//       </section> */}
//         <input type="submit" />
//       </form>
//     </>
//   );
// }

// export default Form;
