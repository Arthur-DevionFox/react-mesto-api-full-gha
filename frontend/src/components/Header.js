import React from 'react';
import {Link, Route, Routes} from 'react-router-dom';

function Header({loggedIn, headerEmail, logout}) {

    function handleClickLogout(e) {
        e.preventDefault();
        logout();
    }

    return (
        <header className="header">
            <img alt="Лого" className={"header__logo"} src={require('../images/Vector.svg').default}/>
            <div className={"header__auth"}>
                {loggedIn && <p className={"header__auth-email"}>{headerEmail}</p>}
                <Routes>

                    <Route path={'/sign-in'}
                           element={<Link className={"header__auth-button"} to={'/sign-up'}>Регистрация</Link>}/>

                    <Route path={'/sign-up'}
                           element={<Link className={"header__auth-button"} to={'/sign-in'}>Войти</Link>}/>

                    <Route exact path="/"
                           element={<Link className={"header__auth-button header__auth-button_type_authorized"}
                                          to={'/sign-in'} onClick={handleClickLogout}>Выйти</Link>}/>

                </Routes>
            </div>
        </header>
    )
}

export default Header;