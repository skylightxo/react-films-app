import React from 'react'
import SignupForm from './forms/SignupForm'
import api from './api'

const SingupPage = props => {
    const submit = user => api.users.create(user)
        .then(() => {
            props.setMessage('success singup')
            props.history.push('/login')
        })

    return (
        <div className="ui grid">
            <div className="eight wide column">
                <SignupForm submit={submit} />
            </div>
        </div>
    )
}

export default SingupPage
