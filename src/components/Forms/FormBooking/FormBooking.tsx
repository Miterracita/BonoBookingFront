
// import { useForm } from "react-hook-form";
// import { useNavigate } from 'react-router-dom'; // Para hacer una redirección
// import { registerUser } from '../../../services/apiServices';
// import Button from '../../Button/Button';
// import './FormBooking.css';

// const FormBooking = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm({
//         defaultValues: {
//             userName: '',
//             password: '',
//             email: '',
//             img: ''
//         }
//     });

//     const navigate = useNavigate(); // Hook para redirigir

//     const onSubmit = async (formData:any) => {
//         try {
//           // Llamada al servicio de registro
//           const result = await registerUser(formData);
//           console.log("Registro exitoso:", result);
    
//         //guardamos el token
//         localStorage.setItem('token', result.token);
//         //redirigimos, en este caso la ruta es de la home
//         navigate('/listado-reservas'); 
//         // Puedes manejar la respuesta aquí, como mostrar un mensaje de éxito
//         alert('Usuario registrado correctamente');
    
//         } catch (error) {
//           console.error('Error durante el registro:', error);
//           // Manejar el error mostrando un mensaje de error en la interfaz
//           alert('Hubo un error al registrar el usuario');
//         }
//       };

//   return (
//     <div className="box-register-form">
//         <div className='box-title'>
//             <div className='icon'>
//                 <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#229799">
//                     <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
//                 </svg>
//             </div>
//             <h2><span>New</span> Booking</h2>
//         </div>

//         <form className="box-form-register" id="registerForm" onSubmit={handleSubmit(onSubmit)}>
//             <div className='flex'>                
//                 <div className='box-item'>
//                     <label>UserName: </label>
//                     <input type="text" id="username" {...register("userName", {
//                         required: {
//                             value: true,
//                             message: "Necesitas introducir un username para poder continuar"
//                         },
//                     })}
//                     style={{ borderColor: errors.userName ? "red" : "" }}/>
//                     <p style={{color: 'red', visibility: errors.userName ? 'visible' : 'hidden'}}>
//                         {errors.userName ? errors.userName.message : ''}
//                     </p>
//                 </div>
//                 <div className='box-item'>
//                     <label>Password: </label>
//                     <input type="password" id="password" {...register("password", {
//                         required: {
//                             value: true,
//                             message: "La contraseña es obligatoria"
//                         },
//                         pattern: {
//                             value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/,
//                             message:
//                             "La contraseña debe incluir números, letras Mayúsculas y minúsculas y como máximos 8 caracteres",
//                         },
//                     })}
//                     style={{ borderColor: errors.password ? "red" : "" }}/>
//                     <p style={{color: 'red', visibility: errors.password ? 'visible' : 'hidden'}}>
//                         {errors.password ? errors.password.message : ''}
//                     </p>
//                 </div>
//             </div>
//             <div className='box-item'>
//                 <label>Email: </label>
//                 <input type="email" id="email" {...register("email", {
//                     required: {
//                         value: true,
//                         message: "Necesitas introducir un email para poder continuar"
//                     },
//                 })}
//                 style={{ borderColor: errors.email ? "red" : "" }}/>
//                 <p style={{color: 'red', visibility: errors.email ? 'visible' : 'hidden'}}>
//                     {errors.email ? errors.email.message : ''}
//                 </p>
//             </div>      
//             <div className='box-item'>
//                 <label>Avatar: </label>
//                 <input type="file" id="img" {...register("img")} />
//             </div> 
//             <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
//                 <Button text="Guardar" color="dark" />
//             </div>
//         </form>
//     </div>
//   )
// };

// export default FormBooking;