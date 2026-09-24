import { FaRegEyeSlash } from 'react-icons/fa'
import { BiLogInCircle } from 'react-icons/bi'
import { MdLockPerson } from 'react-icons/md'
import { FaRegEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CiUser } from 'react-icons/ci'
import { useState } from 'react'

const SigninWithPhonePage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const passwordShowToggle = () => { setShowPassword(!showPassword) }

    const [authentication, setAuthentication] = useState({ phone: '', password: '', isLoading: false, isErrorMessage: '' });
    const updateAuthentication = (data) => { setAuthentication(prev => ({ ...prev, ...data })) };
    const handleOnChange = (e) => { updateAuthentication({ [e.target.name]: e.target.value }) };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        updateAuthentication({ isLoading: true })
        console.log(authentication);
    }

    return (
        <section className='login_section'>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-5">
                        <form onSubmit={handleOnSubmit} className='border px-3 py-4 p-md-5'>
                            <h2 className='login_form_title'>Signin with Phone</h2>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Phone</label>
                                    <div className='position-relative'>
                                        <input type="text" name='phone' onChange={handleOnChange} className='form-control rounded-0 ps-5' disabled={authentication.isLoading} required />
                                        <CiUser className='login_user_icon' />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Password</label>
                                    <div className='position-relative'>
                                        <input type={showPassword ? "text" : "password"} name='password' onChange={handleOnChange} className='form-control rounded-0 ps-5' disabled={authentication.isLoading} required />
                                        <button type="button" className='password_show_btn' onClick={passwordShowToggle}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                                        <small className='text-danger d-block mt-1'>{authentication.isErrorMessage}</small>
                                        <MdLockPerson className='login_lock_icon' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row gap-2">
                                        <button type="submit" className={`login_btn ${authentication.isLoading ? "bg-secondary" : "bg-primary"}`} disabled={authentication.isLoading}><BiLogInCircle />{authentication.isLoading ? "Please Wait" : "Sign In"}</button>
                                        <p className='already_have_account'>Already have an account - <Link to="/signup-with-phone">Sign Up</Link></p>
                                        <p className='already_have_account'>Continue with - <Link to="/signin-with-email">Email</Link></p>
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

export default SigninWithPhonePage