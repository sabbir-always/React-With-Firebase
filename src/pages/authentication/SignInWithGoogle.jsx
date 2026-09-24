import { BiLogInCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const SignInWithGoogle = () => {
    const [authentication, setAuthentication] = useState({ email: '', password: '', isLoading: false, isErrorMessage: '' });
    const updateAuthentication = (data) => { setAuthentication(prev => ({ ...prev, ...data })) };
    return (
        <section className='login_section'>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-5">
                        <div className='border px-3 py-4 p-md-5'>
                            <h2 className='login_form_title'>Continue with Google</h2>
                            <div className="d-flex flex-column gap-3">
                                <button type="submit" className={`login_btn ${authentication.isLoading ? "bg-secondary" : "bg-primary"}`} disabled={authentication.isLoading}><BiLogInCircle />{authentication.isLoading ? "Please Wait" : "Continue with Google"}</button>
                                <button type="submit" className={`login_btn ${authentication.isLoading ? "bg-secondary" : "bg-danger"}`} disabled={authentication.isLoading}><BiLogInCircle />{authentication.isLoading ? "Please Wait" : "Continue with Facebook"}</button>
                                <button type="submit" className={`login_btn ${authentication.isLoading ? "bg-secondary" : "bg-success"}`} disabled={authentication.isLoading}><BiLogInCircle />{authentication.isLoading ? "Please Wait" : "Continue with Github"}</button>
                                <p className='already_have_account'>Continue with - <Link to="/signin-with-email">Email</Link> or <Link to="/signin-with-phone">Phone</Link></p>
                            </div>
                        </div>
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

export default SignInWithGoogle