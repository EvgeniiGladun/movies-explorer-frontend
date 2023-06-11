import './Login.css';
import WithForm from '../../WithForm/WithForm';
import { useFormWithValidation } from '../../Validate/Validate';

function Login({ serverResWithError, handleLogin, ...props }) {

    const { values, handleChange, errors, isValid } = useFormWithValidation();


    function handleLogins(email, password) {
        handleLogin(email, password);
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        const { email, password } = values;
        handleLogins(email, password);
    }

    return (
        <section className='authorization'>
            <div className='authorization__container'>
                <WithForm
                    className='authorization'
                    title='Рады видеть!'
                    buttonText='Войти'
                    authText='Ещё не зарегистрированы?'
                    authLinkText='Регистрация'
                    authLink='/signup'
                >

                    <form
                        onSubmit={handleSubmit}
                        className="authorization__form"
                        action="formEntrance"
                        name="formEntrance"
                    >
                        <div className='authorization__inputs'>
                            <label className='authorization__label'>E-mail</label>
                            <input className='authorization__input authorization__input_user_email' onChange={handleChange} type='email' id='user-email' name='email' required />
                            <span className={`authorization__span ${!errors ? "" : "authorization__span_type_input_error"}`}
                            >{errors.email}</span>
                            <label className='authorization__label'>Пароль</label>
                            <input className='authorization__input authorization__input_user_password' onChange={handleChange} type='password' id='user-password' name='password' required />
                            <span className={`authorization__span ${!errors ? "" : "authorization__span_type_input_error"}`}
                            >{errors.password}</span>
                        </div>

                        <span
                            className={
                                `authorization__span ${!serverResWithError
                                    ? ""
                                    : "authorization__span_type_login"}`
                            }
                        >
                            {serverResWithError.message}
                        </span>
                        <button
                            className={`authorization__form-btn-sends-authorization ${isValid ? "authorization__form-btn-sends-authorization_active" : ""}`}
                            disabled={!isValid}
                            type='submit'

                        >
                            Войти
                        </button>
                    </form>
                </WithForm>
            </div>
        </section>
    )
}

export default Login