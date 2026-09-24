import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firebaseErrorMessage } from "../../services/FirebaseErrorMessage";
import { signupSchema } from "../../validation/Zod_Validation_Schema";
import { app } from '../../firebase/FirebaseConnect'
import { FaRegEyeSlash } from 'react-icons/fa'
import { BiLogInCircle } from 'react-icons/bi'
import { MdLockPerson } from 'react-icons/md'
import { FaRegEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CiUser } from 'react-icons/ci'
import toast from "react-hot-toast";
import { useState } from 'react'

const SignupWithEmailPage = () => {
    const auth = getAuth(app);
    const database = getFirestore(app);

    const [showPassword, setShowPassword] = useState(false)
    const passwordShowToggle = () => { setShowPassword(!showPassword) }

    const [authentication, setAuthentication] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', isLoading: false, isErrorMessage: {} });
    const updateAuthentication = (data) => { setAuthentication(prev => ({ ...prev, ...data })) };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            // zod validation
            const validation = await signupSchema.safeParseAsync({
                first_name: authentication.firstName,
                last_name: authentication.lastName,
                email: authentication.email,
                password: authentication.password,
                confirm_password: authentication.confirmPassword
            });

            if (!validation.success) {
                const fieldErrors = {};
                validation.error.issues.forEach((issue) => {
                    if (!fieldErrors[issue.path[0]]) fieldErrors[issue.path[0]] = issue.message;
                });
                return updateAuthentication({ isLoading: false, isErrorMessage: fieldErrors });
            }

            updateAuthentication({ isLoading: true, isErrorMessage: {} });
            const { first_name, last_name, email, password } = validation.data

            // 1. Auth account create
            const createCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("1. auth done");

            if (createCredential) {
                // 2. Update profile
                await updateProfile(createCredential.user, { displayName: `${first_name} ${last_name}` });
                console.log("2. update profile done");

                // 3. Insert data in firestore database
                await setDoc(doc(database, "users", createCredential.user.uid), {
                    uid: createCredential.user.uid,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    createdAt: serverTimestamp()
                });

                console.log("3. firestore done");
                toast.success("Account Created Success.");
                updateAuthentication({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', isLoading: false, isErrorMessage: {} });
            }

        } catch (error) {
            updateAuthentication({ isLoading: false, isErrorMessage: { message: firebaseErrorMessage(error.code) } });
        }
    }

    return (
        <section className='login_section'>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-5">
                        {authentication.isErrorMessage.message && <div className="alert alert-danger m-0 rounded-0" role="alert">{authentication.isErrorMessage.message}</div>}
                        <form onSubmit={handleOnSubmit} className='border px-3 py-4 p-md-5'>
                            <h2 className='login_form_title'>Signup with Email</h2>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>First Name</label>
                                    <div className='position-relative'>
                                        <CiUser className='login_user_icon' />
                                        <input type="text" name='first_name'
                                            value={authentication.firstName}
                                            onChange={(event) => updateAuthentication({ firstName: event.target.value })}
                                            className={`form-control rounded-0 ps-5 ${authentication.isErrorMessage.first_name ? 'is-invalid' : ''}`}
                                            disabled={authentication.isLoading} />
                                        {authentication.isErrorMessage.first_name && <small className='text-danger d-block mt-1'>{authentication.isErrorMessage.first_name}</small>}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Last Name</label>
                                    <div className='position-relative'>
                                        <CiUser className='login_user_icon' />
                                        <input type="text" name='last_name'
                                            value={authentication.lastName}
                                            onChange={(event) => updateAuthentication({ lastName: event.target.value })}
                                            className={`form-control rounded-0 ps-5 ${authentication.isErrorMessage.last_name ? 'is-invalid' : ''}`}
                                            disabled={authentication.isLoading} />
                                        {authentication.isErrorMessage.last_name && <small className='text-danger d-block mt-1'>{authentication.isErrorMessage.last_name}</small>}
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Email</label>
                                    <div className='position-relative'>
                                        <CiUser className='login_user_icon' />
                                        <input type="email" name='email'
                                            value={authentication.email}
                                            onChange={(event) => updateAuthentication({ email: event.target.value })}
                                            className={`form-control rounded-0 ps-5 ${authentication.isErrorMessage.email ? 'is-invalid' : ''}`}
                                            disabled={authentication.isLoading} />
                                        {authentication.isErrorMessage.email && <small className='text-danger d-block mt-1'>{authentication.isErrorMessage.email}</small>}
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Password</label>
                                    <div className='position-relative'>
                                        <MdLockPerson className='login_lock_icon' />
                                        <input type={showPassword ? "text" : "password"} name='password'
                                            value={authentication.password}
                                            onChange={(event) => updateAuthentication({ password: event.target.value })}
                                            className={`form-control rounded-0 ps-5 ${authentication.isErrorMessage.password ? 'is-invalid' : ''}`}
                                            disabled={authentication.isLoading} />
                                        {authentication.isErrorMessage.password && <small className='text-danger d-block mt-1'>{authentication.isErrorMessage.password}</small>}
                                        <button type="button" className='password_show_btn' onClick={passwordShowToggle}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Confirm Password</label>
                                    <div className='position-relative'>
                                        <MdLockPerson className='login_lock_icon' />
                                        <input type={showPassword ? "text" : "password"} name='confirm_password'
                                            value={authentication.confirmPassword}
                                            onChange={(event) => updateAuthentication({ confirmPassword: event.target.value })}
                                            className={`form-control rounded-0 ps-5 ${authentication.isErrorMessage.confirm_password ? 'is-invalid' : ''}`}
                                            disabled={authentication.isLoading} />
                                        {authentication.isErrorMessage.confirm_password && <small className='text-danger d-block mt-1'>{authentication.isErrorMessage.confirm_password}</small>}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row gap-2">
                                        <button type="submit" className={`login_btn ${authentication.isLoading ? "bg-secondary" : "bg-primary"}`} disabled={authentication.isLoading}><BiLogInCircle />{authentication.isLoading ? "Please Wait" : "Sign Up"}</button>
                                        <p className='already_have_account'>Already have an account - <Link to="/signin-with-email">Sign In</Link></p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className="row">
                    <div className="col-12">
                        <p className='copyright_text_1'>Copyright &copy; Firebase Authentication System</p>
                        <p className='copyright_text_2'>Development By : Sabbir Hosain</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignupWithEmailPage